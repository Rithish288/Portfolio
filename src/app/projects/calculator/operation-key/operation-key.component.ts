import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CalculatorService } from 'app/services/calculator.service';

@Component({
  selector: 'operation-key',
  template:  `
    <button (click)="emitOperation(operation); setOperation(operation)" mat-button>
      {{operation}}
    </button>
  `,
  styles: [
    ':host {display: block}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['operation'],
  outputs: ['key']
})
export class OperationKeyComponent {
  @Input('operation') operation: string;
  @Output('key') emitter: EventEmitter<string> = new EventEmitter();

  constructor(private calc: CalculatorService) {}

  emitOperation(string: string) {
    this.emitter.emit(' '+string+' ');
  }

  setOperation(value: string) {
    this.calc.setOperation(true);
    switch(value) {
      case '+':
        this.calc.setCurrentOperand('+');
        break;
      case '-':
        this.calc.setCurrentOperand('-');
        break;
      case '÷':
        this.calc.setCurrentOperand('/');
        break;
      case '×':
        this.calc.setCurrentOperand('*');
    }
  }

}
