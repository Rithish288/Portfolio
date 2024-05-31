import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonVariablesService } from 'app/services/common-variables.service';
import { validator } from './validator';

@Component({
  selector: 'simple-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  public display: FormControl = new FormControl('', {
    validators: validator()
  });
  constructor(private common: CommonVariablesService) { }

  ngOnInit(): void {
    console.log(this.display.errors["consecutive-operator"])
  }

  public addValue(value: string): void {
    if(value === 'del' && value.length > 0) return this.display.setValue(this.display.value.slice(0, -1))
    return this.display.setValue(this.display.value + value);
  }
}
