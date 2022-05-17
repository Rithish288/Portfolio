import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceAfter'
})
export class SpaceAfterPipe implements PipeTransform {

  transform(value: string[] | number[], separator: string): string {
    return value.join().replace(/,(?=[^\s])/g, separator);
  }

}
