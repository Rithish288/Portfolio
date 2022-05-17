import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export declare type operations = '+' | '-' | '*' | '/';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  //check if there's adecimal already
  public decimal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //check if there's an operation
  public operation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //what is the current operation
  public currentOperand: BehaviorSubject<operations> = new BehaviorSubject(null);

  setDecimal(bool: boolean): void {
    return this.decimal.next(bool);
  }

  setOperation(bool: boolean): void {
    return this.operation.next(bool);
  }

  setCurrentOperand(oper: operations): void {
    return this.currentOperand.next(oper);
  }
}
