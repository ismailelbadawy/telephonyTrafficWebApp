import { Component, OnInit } from '@angular/core';
import { GetTableFromParamsViewModel } from 'src/core/usecases/get-table-from-params/get-table-from-params.viewmodel';
import { GetTableFromParamsUseCase } from 'src/core/usecases/get-table-from-params/get-table-from-params.usecase';
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';
import { GetValueFromTableUseCase } from 'src/core/usecases/get-value-from-table/get-value-from-table.usecase';
import { GetTableFromParamsCommand } from 'src/core/usecases/get-table-from-params/get-table-from-params.command';
import { ErlangFormula } from 'src/core/usecases/get-value-from-table/get-value-from-table.command';

@Component({
  selector: 'app-full-table',
  templateUrl: './full-table.component.html',
  styleUrls: ['./full-table.component.css']
})
export class FullTableComponent implements OnInit {

  fullTable: GetTableFromParamsViewModel;
  selectedFormula: string;

  isLoadingFullTable: boolean;
  gosValues = [0.5, 1, 2, 3, 5];

  constructor(private _telephonyCalculator: ITelephonyCalculator) {

  }

  ngOnInit() {
  }

  async getFullTable() {
    console.log('Started getting the table....');
    let formula : ErlangFormula = this.selectedFormula == 'ErlangB' ? ErlangFormula.ErlangB : 
      (this.selectedFormula == 'ErlangC' ? ErlangFormula.ErlangC : this.selectedFormula == 'Poisson' ? ErlangFormula.Poisson : null);
    new GetTableFromParamsUseCase(
      new GetValueFromTableUseCase(this._telephonyCalculator))
      .execute(new GetTableFromParamsCommand(formula, this.gosValues, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).then((table) => {
        this.fullTable = table;
        console.log('table:');
        console.log(this.fullTable);
      }).catch((error) => {
        console.log(error);
      });
  }
}
