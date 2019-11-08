import { Component, OnInit } from '@angular/core';
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';
import { GetValueFromTableUseCase } from 'src/core/usecases/get-value-from-table/get-value-from-table.usecase';
import { GetValueFromTableCommand, ErlangFormula, OutputParam } from 'src/core/usecases/get-value-from-table/get-value-from-table.command';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'telephony-webapp';

  constructor(private _calculate : ITelephonyCalculator) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    new GetValueFromTableUseCase(this._calculate).execute(
      new GetValueFromTableCommand(ErlangFormula.ErlangC, OutputParam.GradeOfService, 1.259, 5, null, null))
    .then((response) => {
      console.log(`Grade of Service (GoS) : ${(response.gradeOfService * 100).toPrecision(2)}%`);
      console.log(`Traffic (A) : ${response.overallTraffic}`);
      console.log(`Number of trunks (N) : ${response.numberOfTrunks}`);
    }).catch((error) => {
      console.log(error);
    });
  }
}
