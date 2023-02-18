import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public present: boolean = true;
  constructor() {}
  public hide(){
    setTimeout(() => {
      this.present = false;
    }, 0)
  };
  public show(){
    setTimeout(() => {
      this.present = true;
    }, 0)
  }
}
