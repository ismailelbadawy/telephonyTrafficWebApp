import { Component, OnInit } from '@angular/core';
import { ErlangFormula } from 'src/core/usecases/get-value-from-table/get-value-from-table.command';
import { GetTableFromParamsUseCase } from 'src/core/usecases/get-table-from-params/get-table-from-params.usecase';
import { GetValueFromTableUseCase } from 'src/core/usecases/get-value-from-table/get-value-from-table.usecase';
import { GetTableFromParamsCommand } from 'src/core/usecases/get-table-from-params/get-table-from-params.command';
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';
import { GetTableFromParamsViewModel } from 'src/core/usecases/get-table-from-params/get-table-from-params.viewmodel';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
/**
 * The whole custom table component works exactly like the full table except that 
 */
export class CustomTableComponent implements OnInit {

  isLoadingTable: boolean;

  selectedFormula: string;

  customTable: GetTableFromParamsViewModel;
  gosValues: number[];
  trunkValues: number[];

  trunksFormControl = new FormControl('', [Validators.required]);
  gosFormControl = new FormControl('', [Validators.required]);

  constructor(private _telephonyCalculator: ITelephonyCalculator) { }

  ngOnInit() {
    // If the value in the trunk form changes we split it to ensure that an array exists.
    this.trunksFormControl.valueChanges.subscribe(async (value : string) => {
      let preprocessed = value.replace(' ', '');
      let trunksStrings = preprocessed.split(',');
      this.trunkValues = [];
      for(let str of trunksStrings) {
        let n : number = parseInt(str);
        this.trunkValues.push(n);
      }
      console.log(this.trunkValues);
    });

    // When the value in the gos form changes we split it into an array of numbers.
    this.gosFormControl.valueChanges.subscribe(async (value : string) =>{
      let preprocessed = value.replace(' ', '');
      let gosStrings = preprocessed.split(',');
      this.gosValues = [];
      for(let str of gosStrings) {
        let gos : number = parseFloat(str);
        this.gosValues.push(gos);
      }
      console.log(this.gosValues);
    });
  }


  async generateTable(): Promise<void> {
    // If any of the user inputs is not placed the function does not calculate anything.
    if(this.selectedFormula == undefined) {
      return;
    }
    if(this.gosValues == undefined || this.gosValues.length == 0){
      return;
    }
    if(this.trunkValues == undefined || this.trunkValues.length == 0){
      return;
    }

    // If the user has any input that will not be available in the full table then stop the table generation.
    if((this.trunkValues.filter(s => s < 1) != null && this.trunkValues.filter(s => s < 1).length != 0) 
    || (this.gosValues.filter(s => s < 0.01) != null && this.gosValues.filter(s => s < 0.01).length != 0) ){
      return;
    }

    let formula: ErlangFormula = this.selectedFormula == 'ErlangB' ? ErlangFormula.ErlangB :
      (this.selectedFormula == 'ErlangC' ? ErlangFormula.ErlangC : this.selectedFormula == 'Poisson' ? ErlangFormula.Poisson : null);
    this.isLoadingTable = true;
    // We call the use case execute function by the user input.
    new GetTableFromParamsUseCase(
      new GetValueFromTableUseCase(this._telephonyCalculator))
      .execute(new GetTableFromParamsCommand(formula, this.gosValues, this.trunkValues)).then((table) => {
        this.customTable = table;
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.isLoadingTable = false;
      })
  }
}
