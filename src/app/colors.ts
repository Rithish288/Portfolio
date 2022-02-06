import { MATH } from "math-extended";
import { WebglBoilerPlateService } from "./services/webgl-boiler-plate.service";

interface Color {
  r: number;
  g: number;
  b: number;
}

const primaryColorRGB: Color = {
  r: 115,
  g: 151,
  b: 228
}

const primaryColor: string = '#75afff';
const primaryLightColor: string = '#dae9ff';
const primaryDarkColor: string = '#1a66e7';

const accentColor: string = '#ffc95f';
const accentLightColor: string = '#ffefcf';
const accentDarkColor: string = '#f3a022';

const primaryColorArr: number[] = [primaryColorRGB.r, primaryColorRGB.g, primaryColorRGB.b];
const primaryMappedArr = [MATH.map(primaryColorRGB.r, 0, 255, 0, 1), MATH.map(primaryColorRGB.g, 0, 255, 0, 1), MATH.map(primaryColorRGB.b, 0, 255, 0, 1)];

export {
  primaryColor,
  primaryLightColor,
  primaryDarkColor,
  accentColor,
  accentLightColor,
  accentDarkColor,
  primaryMappedArr,
  primaryColorArr
}
