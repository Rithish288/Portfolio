import elementData from 'assets/json/element-data.json';
import { Component, ChangeDetectionStrategy, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ElementDataService } from 'app/services/element-data.service';
import { ElementDetails } from '../element-details';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodicTableComponent implements AfterViewInit {
  public elements: ElementDetails[] = elementData.elementData as ElementDetails[];
  private configuration: string = '';
  private breakPoints: HTMLDivElement[];
  @ViewChildren('periodicElement') components: QueryList<ElementRef<HTMLDivElement>>;
  constructor(private router: Router, private elementDetails: ElementDataService) { }

  ngAfterViewInit(): void {
    this.breakPoints = [
      this.components.get(2 -1).nativeElement,
      this.components.get(10-1).nativeElement,
      this.components.get(18-1).nativeElement,
      this.components.get(36-1).nativeElement,
      this.components.get(54-1).nativeElement,
      this.components.get(86-1).nativeElement
    ];
  }

  public getElementDetails(x: number) {
    this.router.navigateByUrl('/projects/periodic-elements/element-data');
    this.electronConfiguration(this.elements[x-1]);
    this.elements[x-1].electronConfig = this.configuration;
    this.elementDetails.updateElement(this.elements[x-1]);
    window.sessionStorage.setItem('element-details', JSON.stringify(this.elements[x-1]))
  }

  private electronConfiguration(elem: ElementDetails) {
    if(elem.name === "Hydrogen") {
      this.configuration = '1s1';
      return null
    } else if(elem.name === "Helium") {
      this.configuration = '1s2';
      return null
    };

    const breakPoint = this.nearestNobleGas(elem.atomicNumber);
    this.configuration += '['+breakPoint+']' + ' ';

    const final = this.objArrayCount(
      this.reduceInbetweenArray(
        this.findInBetweenElems(
          this.elements.filter(
            e => e.symbol == breakPoint
          )[0].atomicNumber,
          elem.atomicNumber
        )
      )
    )
    const configurationArray =
      Object.entries(final)
            .reduce((acc, [number, letterFrequencyObj]) =>
              [...acc, ...Object.entries(letterFrequencyObj)
            .map(([letter, frequency]) =>
              [number, letter, frequency])],[]
            );
    configurationArray.forEach(config => {
      this.configuration += config.join('') + ' ';
    })
    return this.configuration;
  }
  findInBetweenElems(start: number, end: number) {
    let inBetweenItems: ElementDetails[] = [];
    for (let i = start; i < end; i++) {
      if(this.elements[i].atomicNumber == 57 || this.elements[i].atomicNumber == 89) this.elements[i].block = 'd';
      inBetweenItems.push(this.elements[i]);
    }
    return inBetweenItems;
  }

  reduceInbetweenArray(arr: ElementDetails[]) {
    let partialConfiguration = [];
    let rings: number;
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].block == 'd') rings = arr[i].shells.length - 1
      else if(arr[i].block == 'f') rings = arr[i].shells.length - 2;
      else rings = arr[i].shells.length
      partialConfiguration.push([rings, arr[i].block, 1])
    }
    return partialConfiguration;
  }

  private objArrayCount(arr: any[]): {[n: number]: string} {
    return arr.reduce((acc, [number, letter]) => ({
      ...acc,
      [number]: {
          ...acc[number],
          [letter]: acc[number] && acc[number][letter] ? acc[number][letter] + 1 : 1
      }
    }), {});
  }

  private nearestNobleGas(x: number) {
    for (let i = this.breakPoints.length-1; i >= 0; i--) {
      if(x > parseInt(this.breakPoints[i].children[0].textContent)) {
        return this.breakPoints[i].children[1].textContent;
      }
    } return null;
  }
}
