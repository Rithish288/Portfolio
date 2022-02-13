import { Inject, Injectable } from '@angular/core';
import { add, lusolve, chain, MathType, Matrix } from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class PendulumService {
  public n: number = 15;
  public thetas: any = [];
  public velocities: MathType = [];
  public g: number = 9.8
  constructor(
    @Inject(Number) n: number,
    @Inject(Number) thetas: number[],
    @Inject(Number) velocities: number[],
    @Inject(Number) gravity: number
  ) {
    this.n = n;
    this.thetas = thetas;
    this.velocities = velocities;
    this.g = -gravity;
  }

  public A(thetas: MathType): number[][] {
    let M: Array<number[]> = [];
    for (let i = 0; i < this.n; i++) {
      let row: number[] = [];
      for (let j = 0; j < this.n; j++) {
        row.push((this.n - Math.max(i, j)) * Math.cos(thetas[i] - thetas[j]));
      }
      M.push(row)
    }
    return M;
  }

  public b(thetas: MathType, thetaDots: MathType): number[] {
    let v: number[] = [];
    for (let i = 0; i < this.n; i++) {
      let b_i: number = 0;
      for (let j = 0; j < this.n; j++) {
        b_i -= (this.n - Math.max(i, j)) * Math.sin(thetas[i] - thetas[j]) * thetaDots[j] ** 2;
      }
      b_i -= this.g * (this.n - i) * Math.sin(thetas[i]);
      v.push(b_i);
    }
    return v;
  }

  f(thetas: MathType, thetaDots: MathType): number[] | any[] | Matrix[] {
    let A: number[][] = this.A(thetas);
    let b: number[] = this.b(thetas, thetaDots);
    return [thetaDots, lusolve(A, b).map((x: any) => x[0])];
  }

  RK4(dt: number, thetas: MathType, thetaDots: MathType): MathType[] {
    let k1: number[] | any[] | Matrix[] = this.f(thetas, thetaDots);
    let k2: number[] | any[] | Matrix[] = this.f(
      add(thetas, k1[0].map((x: number) => 0.5*dt*x)),
      add(thetaDots, k1[1].map((x: number) => 0.5*dt*x))
    );

    let k3: number[] | any[] | Matrix[] = this.f(
      add(thetas, k2[0].map((x: number) => 0.5*dt*x)),
      add(thetaDots, k2[1].map((x: number) => 0.5*dt*x))
    );

    let k4: number[] | any[] | Matrix[] = this.f(
      add(thetas, k3[0].map((x: number) => 1.0*dt*x)),
      add(thetaDots, k3[1].map((x: number) => 1.0*dt*x))
    );

    let thetaDeltas    = Array.from(chain(k1[0]).add(k2[0].map((x: number) => 2 * x)).add(k3[0].map((x: number) => 2 * x)).add(k4[0]).done()).map((x: number) => x * dt/6);
    let thetaDotDeltas = Array.from(chain(k1[1]).add(k2[1].map((x: number) => 2 * x)).add(k3[1].map((x: number) => 2 * x)).add(k4[1]).done()).map((x: number) => x * dt/6);

    return [add(thetas, thetaDeltas), thetaDots = add(thetaDots, thetaDotDeltas)]
  }

  tick(dt: number) {
    let newState: MathType[] = this.RK4(dt, this.thetas, this.velocities);
    this.thetas = newState[0];
    this.velocities = newState[1];
  }

  get Coordinates() {
    let x = 0;
    let y = 0;
    let coords: {x: number, y: number}[] = [];
    for (let i = 0; i < this.thetas.length; i++) {
      let theta = this.thetas[i]
      x += Math.sin(theta);
      y += Math.cos(theta);
      coords.push({x:x, y:y})
    }
    return coords;
  }

}
