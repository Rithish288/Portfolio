import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'prime-numbers',
  templateUrl: './prime-numbers.component.html',
  styleUrls: ['./prime-numbers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimeNumbersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvas: ElementRef<HTMLCanvasElement>;
  private c: CanvasRenderingContext2D;
  private primeNumbers: number[] = [];
  private animation: number = 0;
  private counter: number = 0;
  private primeGap: number = 1;
  constructor() { }

  ngOnInit(): void {
    // this.fillPrimes(0, 100)
  }

  isPrime(number: number) {
    for(let i = 2, s = Math.sqrt(number); i <= s; i++)
    if(number % i === 0) return false;
    else {}
    return number > 1;
  }

  ngAfterViewInit(): void {
    this.c = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    // this.animate()
    this.c.scale(0.25, 5);
  }

  private fillPrimes(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      let flag = 0;

      // looping through 2 to user input number
      for (let j = 2; j < i; j++) {
        if (i % j == 0) {
          flag = 1;
          break;
        }
      }

      // if number greater than 1 and not divisible by other numbers
      if (i > 1 && flag == 0) {
        console.log(i);
        this.primeNumbers.push(i)
      }
    }
  }

  primeNumberFromIndex(index: number) {
    const n = index;
    let num: number = 1, count: number = 0, i: number;
    while (count < n)  {
      num=num+1;
      for (i = 2; i <= num; i++) {
        if (num % i == 0) {
          break;
        }
      } if (i == num) {
        count = count+1;
      }
    }
    return num;
  }

  animate() {
    this.animation = requestAnimationFrame(this.animate.bind(this));
    this.primeGap = this.primeNumberFromIndex(this.animation+1) - this.primeNumberFromIndex(this.animation);
    // if(this.isPrime(this.animation)) {
      this.counter += 1;
      this.c.beginPath()
      // this.c.moveTo(this.counter, this.animation / 20);
      // this.c.lineTo(this.counter, (this.animation+1) / 20);
      this.c.arc(this.counter, this.primeGap, 0.5, 0, Math.PI * 2);
      this.c.fill();
      // this.c.scale(1, this.animation/(window.innerHeight * 0.04))
    // }
    // console.log(this.primeNumberFromIndex(this.animation))
  }

  ngOnDestroy(): void {
      cancelAnimationFrame(this.animation);
  }
}
