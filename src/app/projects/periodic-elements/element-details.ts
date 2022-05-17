
export declare type category = 'Other-non-metals' | 'Noble-gases' | 'Alkali-Metals' | 'Alkaline-Earth-Metals' | 'Metalloids' | 'Halogens' | 'Post-Transition-Metals' | 'Transition-metals' | 'Lanthanides' | 'Actinides';
export declare type group = number | string;
export declare type appearance = string;
export declare type year = string;
export declare type Block = 's' | 'p' | 'd' | 'f';
export declare type temperature = string;
export declare type applications = string[];
export declare type plainText = string;
export declare type state = 'solid' | 'liquid' | 'gas';

export interface ElementDetails {
  atomicNumber: number;
  name: plainText;
  block: Block;
  atomicMass: plainText;
  symbol: plainText;
  group: group;
  discovered: year;
  appearance: appearance;
  boilingPoint: temperature;
  meltingPoint: temperature;
  discoveredBy: plainText;
  density: plainText;
  category: category;
  state: state;
  history: string[]
  shells: number[];
  uses: applications;
  description: plainText;
  electronConfig?: plainText;
}
