import { UseCase } from "src/core/base/use-case";
import { GetTableFromParamsCommand } from './get-table-from-params.command';
import { GetTableFromParamsViewModel, TrafficViewItem } from './get-table-from-params.viewmodel';
import { GetValueFromTableUseCase } from '../get-value-from-table/get-value-from-table.usecase';
import { GetValueFromTableCommand, OutputParam } from '../get-value-from-table/get-value-from-table.command';

export class GetTableFromParamsUseCase implements UseCase<GetTableFromParamsCommand, GetTableFromParamsViewModel> {

    async execute(params: GetTableFromParamsCommand): Promise<GetTableFromParamsViewModel> {
        console.log('Started calculation');
        let rows : TrafficViewItem[] = [];
        for (let gos of params.gosValues) {
            let trafficRow = new TrafficViewItem([]);
            for (let trunk of params.trunkValues) {
                let trafficValue = await this._getOneTrafficValue.execute(new GetValueFromTableCommand(params.trafficFormula, 
                    OutputParam.Traffic, null, 
                    trunk, null, gos/ 100));
                console.log(`Traffic value : ${trafficValue} for GoS : ${gos} and trunk : ${trunk}`);
                trafficRow.trafficValues.push(trafficValue.overallTraffic);
            }
            console.log(`For GoS : ${gos} traffic : ${trafficRow.trafficValues}`);
            rows.push(trafficRow);
        }
        return new GetTableFromParamsViewModel(rows);
    }

    constructor(private _getOneTrafficValue: GetValueFromTableUseCase) {

    }

}