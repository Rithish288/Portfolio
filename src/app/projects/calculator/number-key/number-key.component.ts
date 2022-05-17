import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'number-key',
  template:  `
    <button (click)="emitNumber(number)" mat-button>
      {{number}}
    </button>
  `,
  styles: [
    ':host {display: block}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['number'],
  outputs: ['key']
})
export class NumberKeyComponent {
  @Input('number') number: number;
  @Output('key') emitter: EventEmitter<number> = new EventEmitter();

  emitNumber(number: number) {
    this.emitter.emit(number)
  }
}
