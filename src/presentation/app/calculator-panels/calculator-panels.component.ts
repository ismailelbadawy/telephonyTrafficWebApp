import { Component, OnInit, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { OutputParam, ErlangFormula, GetValueFromTableCommand } from "../../../core/usecases/get-value-from-table/get-value-from-table.command";
import { GetValueFromTableUseCase } from 'src/core/usecases/get-value-from-table/get-value-from-table.usecase';
import { GetValueFromTableViewModel } from "src/core/usecases/get-value-from-table/get-value-from-table.viewmodel";
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';
import { GetTableFromParamsUseCase } from 'src/core/usecases/get-table-from-params/get-table-from-params.usecase';
import { GetTableFromParamsCommand } from 'src/core/usecases/get-table-from-params/get-table-from-params.command';
import { GetTableFromParamsViewModel } from 'src/core/usecases/get-table-from-params/get-table-from-params.viewmodel';

@Component({
  selector: 'calculator-panels',
  templateUrl: './calculator-panels.component.html',
  styleUrls: ['./calculator-panels.component.css']
})
export class CalculatorPanelsComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {

  }

  formula: string;
  outputType: string;

  numberOfTrunksFromControl = new FormControl('', [Validators.min(1), Validators.max(100)]);
  trafficFormControl = new FormControl('', [Validators.min(1), Validators.max(100)]);
  gradeOfServiceFormControl = new FormControl('', []);

  outputValue: string;

  usecase: GetValueFromTableUseCase;

  fullTableUseCase: GetTableFromParamsUseCase;
  customTableUseCase: GetTableFromParamsUseCase;

  isLoadingFullTable: boolean;
  tableFormula: string;

  fullTable: GetTableFromParamsViewModel;

  constructor(private _caluclator: ITelephonyCalculator) {
    this.usecase = new GetValueFromTableUseCase(this._caluclator);
    this.fullTableUseCase = new GetTableFromParamsUseCase(new GetValueFromTableUseCase(this._caluclator));
  }

  ngOnInit() {
    this.executeUseCase();

  }

  executeUseCase() {
    let outputEnum: OutputParam = this.outputType === 'GoS' ? OutputParam.GradeOfService :
      (this.outputType === 'A' ? OutputParam.Traffic :
        (this.outputType === 'N' ? OutputParam.Trunks : null));

    let trafficFormula = this._getFormulaFromString(this.formula);

    if (outputEnum == null || trafficFormula == null) {
      this.outputValue = 'Waiting for your input';
      return;
    }
    let numberOfTrunks = this.numberOfTrunksFromControl.value;
    let traffic = this.trafficFormControl.value;
    let gradeOfService = this.gradeOfServiceFormControl.value / 100;
    this.usecase.execute(new GetValueFromTableCommand(trafficFormula, outputEnum, traffic, numberOfTrunks, null, gradeOfService))
      .then((response) => {
        switch (outputEnum) {
          case OutputParam.GradeOfService:
            this.outputValue = `GoS : ${response.gradeOfService * 100}%`
            break;
          case OutputParam.Traffic:
            this.outputValue = `Traffic (A) : ${response.overallTraffic} Erlang`;
            break;
          case OutputParam.Trunks:
            this.outputValue = `Number of Trunks (N) : ${response.numberOfTrunks} trunk(s)`;
            break;
          default:
            this.outputType = `Waiting for value`;
            break;
        }
      })
  }

  private _getFormulaFromString(form: string): ErlangFormula {
    return form == 'ErlangB' ? ErlangFormula.ErlangB :
      (form == 'ErlangC' ? ErlangFormula.ErlangC :
        (form == 'Poisson' ? ErlangFormula.Poisson : null));
  }
}
