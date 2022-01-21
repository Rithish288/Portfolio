import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  present: boolean;
  constructor() {
    this.present = true;
  }

  hide() {
    this.present = false;
  }

  show() {
    this.present = true;
  }
}
