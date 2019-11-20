import { UseCase } from "src/core/base/use-case";
import { GetTableFromParamsCommand } from './get-table-from-params.command';
import { GetTableFromParamsViewModel, TrafficViewItem } from './get-table-from-params.viewmodel';
import { GetValueFromTableUseCase } from '../get-value-from-table/get-value-from-table.usecase';
import { GetValueFromTableCommand, OutputParam } from '../get-value-from-table/get-value-from-table.command';

export class GetTableFromParamsUseCase implements UseCase<GetTableFromParamsCommand, GetTableFromParamsViewModel> {

    /**
     * The execute function just uses two arrays an array of trunk values and an array of gos values 
     * it terates over both arrays and gets traffic for every possible combinations.
     */
    execute(params: GetTableFromParamsCommand): Promise<GetTableFromParamsViewModel> {
        console.log('Started calculation');
        return new Promise(async (resolve, reject) => {
            let rows: TrafficViewItem[] = [];
            for (let i = 0; i < params.trunkValues.length; i++) {
                let trafficRow = new TrafficViewItem([]);
                for (let j = 0; j < params.gosValues.length; j++) {
                    let trafficValue = await this._getOneTrafficValue.execute(new GetValueFromTableCommand(params.trafficFormula,
                        OutputParam.Traffic, null,
                        params.trunkValues[i], null, params.gosValues[j]/ 100));
                    trafficRow.trafficValues.push(trafficValue.overallTraffic);
                }
                console.log(`Row ${i} : ${trafficRow}`);
                rows.push(trafficRow);
            }
            resolve(new GetTableFromParamsViewModel(rows));
        });
    }

    constructor(private _getOneTrafficValue: GetValueFromTableUseCase) {

    }

}