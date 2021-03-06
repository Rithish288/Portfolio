import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';
import { CommonVariablesService } from 'src/app/services/common-variables.service';

@Component({
  selector: 'simple-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit, AfterViewInit {
  private numOperNumRegEx: RegExp = /\d+ (\+|\-|\*|\/) \d+/g;
  public display: string = '';
  constructor(private common: CommonVariablesService, private calc: CalculatorService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  onNumberInput(number: number) {
    this.display += number;
  }
  onOperInput(oper: string) {
    console.log(oper)
  }
}
