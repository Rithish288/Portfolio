import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { CommonVariablesService } from 'app/services/common-variables.service';

@Component({
  selector: 'simple-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit, AfterViewInit {
  private numOperNumRegEx: RegExp = /\d+ (\+|\-|\*|\/) \d+/g;
  public display: string = '';
  constructor(private common: CommonVariablesService) { }

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
