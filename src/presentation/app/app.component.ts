import { Component, OnInit } from '@angular/core';
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';
import { GetValueFromTableUseCase } from 'src/core/usecases/get-value-from-table/get-value-from-table.usecase';
import { GetValueFromTableCommand, ErlangFormula, OutputParam } from 'src/core/usecases/get-value-from-table/get-value-from-table.command';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'telephony-webapp';


  constructor() {

  }

  ngOnInit(): void {
    
  }
}
