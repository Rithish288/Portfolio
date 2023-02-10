import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  public currentYear = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {

  }

}