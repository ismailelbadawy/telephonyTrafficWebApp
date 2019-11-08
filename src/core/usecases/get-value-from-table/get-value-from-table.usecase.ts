import { UseCase } from 'src/core/base/use-case';
import { GetValueFromTableCommand, ErlangFormula, OutputParam } from './get-value-from-table.command';
import { GetValueFromTableViewModel } from './get-value-from-table.viewmodel';
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';
import { Output } from '@angular/core';

export class GetValueFromTableUseCase implements UseCase<GetValueFromTableCommand, GetValueFromTableViewModel> {
    
    async execute(params: GetValueFromTableCommand): Promise<GetValueFromTableViewModel> {
        
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
        switch (params.output) {
            case OutputParam.GradeOfService:
                let gradeOfSerivce = await usedFunction(params.numberOfTrunks, params.traffic);
                return new GetValueFromTableViewModel(params.numberOfTrunks, params.numberOfUsers, params.traffic, gradeOfSerivce);
            default:
            case OutputParam.Traffic:
                let outputTraffic : number;
                for(let a = 0; a < 165.0; a += 0.0001){
                    gradeOfSerivce = await usedFunction(params.numberOfTrunks, a);
                    if( Math.abs(gradeOfSerivce - params.gradeOfService) < 0.000001) {
                        outputTraffic = a;
                        break;
                    }
                }
                return new GetValueFromTableViewModel(params.numberOfTrunks, params.numberOfUsers, outputTraffic, params.gradeOfService);
            case OutputParam.Trunks:
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