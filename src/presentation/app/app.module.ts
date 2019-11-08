import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';
import { MathsTelephonyCalculator } from 'src/data/calculators/maths.calculator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: ITelephonyCalculator,
      useClass : MathsTelephonyCalculator
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
