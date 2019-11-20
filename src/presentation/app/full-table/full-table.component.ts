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
/**
 * This is the component also for the Full Table it holds the data for the html view and the html page references it
 */
export class FullTableComponent implements OnInit {
  // The table to be viewed by the html page
  fullTable: GetTableFromParamsViewModel;

  // The string value that the user has chosen
  selectedFormula: string;

  // This indicates that the table is currently loading.
  isLoadingFullTable: boolean;
  
  // The presented gos values to be viewed.
  gosValues = [0.5, 1, 2, 3, 5];

  constructor(private _telephonyCalculator: ITelephonyCalculator) {

  }

  ngOnInit() {
  }

  /**
   * The asynchronous function calls the GetTableFromParamsUseCase to get the rows of the table.
   */
  async getFullTable() : Promise<void> {
    console.log('Started getting the table....');
    
    // First we have to identify which formula to use. This is according to the user input.
    let formula : ErlangFormula = this.selectedFormula == 'ErlangB' ? ErlangFormula.ErlangB : 
      (this.selectedFormula == 'ErlangC' ? ErlangFormula.ErlangC : this.selectedFormula == 'Poisson' ? ErlangFormula.Poisson : null);
    
    // Takes one parameter which is a Usecase that gets a single value from the equations and another parameter 
    new GetTableFromParamsUseCase(
      new GetValueFromTableUseCase(this._telephonyCalculator))
      // We call the function execute that simply executes the use case using the gos values defined in the component and the trunk values in the 
      .execute(new GetTableFromParamsCommand(formula, this.gosValues, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).then((table) => {
        this.fullTable = table;
        console.log('table:');
        console.log(this.fullTable);
      }).catch((error) => {
        console.log(error);
      });
  }
}
