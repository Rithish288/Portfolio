import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

const modules = [
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule
]

@NgModule({
  imports: [CommonModule],
  exports: [...modules]
})
export class MaterialFormsModule {}
