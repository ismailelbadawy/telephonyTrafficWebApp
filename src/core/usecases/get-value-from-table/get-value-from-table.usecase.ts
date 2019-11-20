import { UseCase } from 'src/core/base/use-case';
import { GetValueFromTableCommand, ErlangFormula, OutputParam } from './get-value-from-table.command';
import { GetValueFromTableViewModel } from './get-value-from-table.viewmodel';
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';

export class GetValueFromTableUseCase implements UseCase<GetValueFromTableCommand, GetValueFromTableViewModel> {
    
    /**
     * 
     * @param params `GetValueFromTableCommand` refer to that file.
     * @returns `GetValueFromTableViewModel` refer to the file for the return type.
     */
    async execute(params: GetValueFromTableCommand): Promise<GetValueFromTableViewModel> {
        // The first step is getting a reference to the function used according to the input by the user.
        let usedFunction : Function = null;
        switch (params.erlangFormula) {
            case ErlangFormula.ErlangB:
                usedFunction = this._trafficFormulaCalculator.erlangB;
                break;
            case ErlangFormula.ErlangC :
                usedFunction = this._trafficFormulaCalculator.erlangC;
                break;
            case ErlangFormula.Poisson:
                usedFunction = this._trafficFormulaCalculator.poisson;
                break;
            default:
                break;
        }

        // According to the output type we calculate.
        switch (params.output) {
            case OutputParam.GradeOfService:
                // When calculating the gradae of service we just call the used function using the number of trunks and traffic.
                let gradeOfSerivce = await usedFunction(params.numberOfTrunks, params.traffic);
                return new GetValueFromTableViewModel(params.numberOfTrunks, params.numberOfUsers, params.traffic, gradeOfSerivce);
            case OutputParam.Traffic:
                // Traffic is needed to be calculated 
                // We begin an iterative process by setting the outputTraffic to 0.0001
                let outputTraffic : number = 0.0001;
                // We save 2 gos values a current gos and the last one.
                let predictedGoS : number = 0.0;
                let lastPredictedGoS : number = 0.0;
                while(true) {
                    // calculate the value of gos given the known number of trunks and our guess of traffic.
                    predictedGoS = await usedFunction(params.numberOfTrunks, outputTraffic);
                    // if we get a higher gos than the required gos and at the same time we had a lower value last time
                    // Then we most certainly had a right guess for the traffic value.
                    if(predictedGoS > params.gradeOfService && lastPredictedGoS < params.gradeOfService) {
                        // We just tweak the number a little bit
                        outputTraffic -= 0.00005;
                        // Then break the iterative loop
                        break;
                    }
                    // If we are in either poisson or ErlangC we sometimes do not get a right guess so we need to check how far are we from the required gos 
                    // If we are in range of the required gos we just halt the loop again.
                    if(params.erlangFormula != ErlangFormula.ErlangB && Math.abs(predictedGoS - params.gradeOfService) <= 0.00001){
                        break;
                    }
                    lastPredictedGoS = predictedGoS;
                    // Here to speed up the poisson calculation we just increase the traffic value by 0.01 incase we pass 5 trunks.
                    // Normally we increase the output traffic by 0.0001 to ensure precision.
                    outputTraffic += params.erlangFormula == ErlangFormula.Poisson && params.numberOfTrunks > 5 ? 0.01 : 0.0001;
                }
                return new GetValueFromTableViewModel(params.numberOfTrunks, params.numberOfUsers, outputTraffic, params.gradeOfService);
            case OutputParam.Trunks:
                // We here do the same as in the traffic except we have a really easy guess for the number of trunks, because it's an integer between 1 and 100
                let trunks = 0;
                console.log(`Trying to calculate the number of trunks`);
                for(let n = 1; n < 100; n++){
                    let gradeOfSerivce = await usedFunction(n, params.traffic);
                    if(Math.abs(gradeOfSerivce - params.gradeOfService) < 0.0001) {
                        trunks = n;
                        break;
                    }
                }
                return new GetValueFromTableViewModel(trunks, params.numberOfUsers, params.traffic, params.gradeOfService);
        }
    }

    constructor(private _trafficFormulaCalculator : ITelephonyCalculator) {
        
    }
}