import { AbstractControl, ValidatorFn } from "@angular/forms";

function isOperator(val: string): boolean {
  return val === '+' || val === '-' || val === '*' || val === '/';
};

export function validator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    for(let i = 0; i < control.value.length-1; i++) {
      console.log(isOperator(control.value[i]), control.value[i])
      // if(isOperator(control.value[i]) && isOperator(control.value[i+1])) return {"consecutive-operator": true};
    }
    return null;
  }
}
