import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';
import { MathsTelephonyCalculator } from 'src/data/calculators/maths.calculator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material components
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { CalculatorPanelsComponent } from './calculator-panels/calculator-panels.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorPanelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: ITelephonyCalculator,
      useClass: MathsTelephonyCalculator
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
