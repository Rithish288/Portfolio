import { WebglBoilerPlateService } from "./services/webgl-boiler-plate.service";

const primaryColor: string = '#75afff';
const primaryLightColor: string = '#dae9ff';
const primaryDarkColor: string = '#1a66e7';

const accentColor: string = '#ffc95f';
const accentLightColor: string = '#ffefcf';
const accentDarkColor: string = '#f3a022';

const primaryMappedArr: number[] = [WebglBoilerPlateService.primaryMappedColor.r, WebglBoilerPlateService.primaryMappedColor.r, WebglBoilerPlateService.primaryMappedColor.r];
const primaryColorArr: number[] = [WebglBoilerPlateService.primaryColor.r, WebglBoilerPlateService.primaryColor.r, WebglBoilerPlateService.primaryColor.r];

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
