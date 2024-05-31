import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
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
