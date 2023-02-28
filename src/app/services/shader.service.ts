import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
interface Shaders {
  vertex: Observable<string>,
  fragment: Observable<string>;
}
@Injectable({
  providedIn: 'root'
})
export class ShaderService {
  private attractor: Shaders;
  private cliffordAttractor: Shaders;
  private space: Shaders;
  private bohrElectrons: Shaders;
  constructor(private http: HttpClient) { }

  public getSpaceShaders(): Shaders {
    if(this.space) return this.space;
    else return this.space = {
      vertex: this.http.get('assets/shaders/space/vertex.vert', {responseType: 'text'}).pipe(shareReplay()),
      fragment: this.http.get('assets/shaders/space/fragment.frag', {responseType: 'text'}).pipe(shareReplay())
    };
  }

  public getBohrModelElectronShaders(): Shaders {
    if(this.bohrElectrons) return this.bohrElectrons;
    else return this.bohrElectrons = {
      vertex: this.http.get('assets/shaders/bohrModel-3d/vertex.vert', {responseType: 'text'}).pipe(shareReplay()),
      fragment: this.http.get('assets/shaders/bohrModel-3d/fragment.frag', {responseType: 'text'}).pipe(shareReplay())
    };
  }

  public getAttractorShaders(): Shaders {
    if(this.attractor) return this.attractor
    else return this.attractor = {
      vertex: this.http.get('assets/shaders/attractor/vertex.vert', {responseType: 'text'}).pipe(shareReplay()),
      fragment: this.http.get('assets/shaders/attractor/fragment.frag', {responseType: 'text'}).pipe(shareReplay())
    }
  }

  public getCliffordAttractorShaders(): Shaders {
    if(this.cliffordAttractor) return this.cliffordAttractor
    else return this.cliffordAttractor = {
      vertex: this.http.get('assets/shaders/clifford-attractor/vertex.vert', {responseType: 'text'}).pipe(shareReplay()),
      fragment: this.http.get('assets/shaders/clifford-attractor/fragment.frag', {responseType: 'text'}).pipe(shareReplay())
    }
  }
}
