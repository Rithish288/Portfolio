import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent implements OnInit {
  public links = [
    {
      link: "https://rithish288.github.io/Digital-Clock/",
      title: "Digital Clock",
      "descr": "My first ever Project"
    },
    {
      link: "https://rithish288.github.io/Navigation-bar/",
      title: "Navigation bar",
      "descr": "A simple responsive nav bar"
    },
    {
      link: "https://github.com/Rithish288/r-math",
      title: "r-math",
      "descr": "A TypeScript math library"
    },
    {
      link: "https://balam314.github.io/pasapapor/",
      title: "Past Paper opener",
      "descr": "A tool that lets you open past papers quicker. Co-developed with <a target=\"_blank\" href=\"https://github.com/BalaM314\">@BalaM314</a>"
    },
    {
      link: "https://finjoe-aks.github.io/AkshayaHGlobalWebsite/",
      title: "ICT Group Project",
      "descr": "An old school group project"
    },
    {
      link: "https://rithish288.github.io/Periodic-Table/",
      title: "Periodic table",
      "descr": "I'm most proud of this one"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
