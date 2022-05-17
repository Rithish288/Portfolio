import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElementDetails } from '../projects/periodic-elements/element-details';

@Injectable({
  providedIn: 'root'
})
export class ElementDataService {
  private elementData: BehaviorSubject<ElementDetails> = new BehaviorSubject({
    atomicNumber: 1,
    name: "Hydrogen",
    block: "s",
    atomicMass: "1.00784",
    symbol: "H",
    group: 1,
    discovered: "1766",
    appearance: "colorless and odorless",
    boilingPoint: "-252.879 ",
    meltingPoint: "-259.16 ",
    discoveredBy: "Henry Cavendish",
    density: "0.08988 g/L",
    category: "Other-non-metals",
    state: "gas",
    history: [
        "Robert Boyle discovered and described the reaction between iron filings and dilute acids, which results in the production of hydrogen gas.In 1766, Henry Cavendish was the first to recognize hydrogen gas as a discrete substance, by naming the gas from a metal-acid reaction \"inflammable air\".",
        "In 1783, Antoine Lavoisier gave the element the name hydrogen (from the Greek ὑδρο- hydro meaning \"water\" and -γενής genes meaning \"former\") when he and Laplace reproduced Cavendish's finding that water is produced when hydrogen is burned.",
        "Hydrogen was liquefied for the first time by James Dewar in 1898 by using regenerative cooling and his invention, the vacuum flask."
    ],
    shells: [1],
    uses: [
        "Hydrogen is consumed in refineries in a variety of hydro-desulfurisation (HDS) and hydrocracking operations.",
        "Next to oil refineries, ammonia is currently the largest application of hydrogen.",
        "Hydrogen is used commercially to extract tungsten from its ore.",
        "The large-scale production of hydrochloric acid (HCl) is almost always integrated with the industrial scale production of other chemicals.",
        "Food industries, for instance, use hydrogen to make hydrogenated vegetable oils such as margarine and butter."
    ],
    description: "Hydrogen is the chemical element with the symbol H and atomic number 1. With a standard atomic weight of 1.008, hydrogen is the lightest element in the periodic table. Hydrogen is the most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass."
  });
  public currentElement = this.elementData.asObservable();
  constructor() { }

  updateElement(data: ElementDetails) {
    this.elementData.next(data);
  }
}
