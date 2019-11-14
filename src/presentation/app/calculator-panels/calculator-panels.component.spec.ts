import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorPanelsComponent } from './calculator-panels.component';

describe('CalculatorPanelsComponent', () => {
  let component: CalculatorPanelsComponent;
  let fixture: ComponentFixture<CalculatorPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
