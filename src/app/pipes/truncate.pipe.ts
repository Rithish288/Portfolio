import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  private limit: number = 0;
  private trail: number = 0;
  transform(value: string, limit: number = 20, ...args: any[]): string {
    this.limit = args.length > 0 ? parseInt(args[0], 10) : limit;
    this.trail = args.length > 1 ? args[1] : '...';
    return value.length > this.limit ? value.substring(0, this.limit) + this.trail : value;
  }

}
