import { accentColor, primaryGrey } from "src/app/colors";

export class BohrModel {
  private c: CanvasRenderingContext2D;
  public runAnimation: boolean = true;
  public animation: number;
  private radius: number;
  private cx: number;
  private cy: number;
  public symbolColor: string = '';
  private counter: number = 0;

  constructor(private canvas: HTMLCanvasElement, private electronShells: number[], private spin: boolean, private symbol: string) {
    this.c = canvas.getContext('2d');
    this.radius = this.canvas.height / 2.5 / this.electronShells.length;
    this.cx = this.canvas.width/2;
    this.cy = this.canvas.height/2
  }

  public drawShells() {
    for (let i = 0; i <= this.electronShells.length; i++) {
      this.c.beginPath();
      this.c.arc(this.cx, this.cy, this.radius * i, 0, Math.PI * 2);
      this.c.strokeStyle = primaryGrey;
      this.c.stroke();
    }
  }

  public drawElectrons() {
    this.c.fillStyle = accentColor;
    this.counter++;
    let x: number, y: number;
    this.electronShells.forEach((ar, i) => {
      i+=1
      let radians = (Math.PI * 2) / ar;
      for (let j = 1; j <= ar; j++) {
        x = this.cx + Math.cos(radians * j + this.counter * 0.02 / i) * i * this.radius;
        y = this.cy + Math.sin(radians * j + this.counter * 0.02 / i) * i* this.radius;
        this.c.beginPath();
        this.c.arc(x, y, 3, 0, Math.PI * 2, false);
        this.c.fill();
        this.c.closePath();
      }
    })
  }

  public drawSymbol() {
    this.c.fillStyle = this.symbolColor == 'lightTheme'? 'black' : 'white';
    this.c.textAlign = "center";
    this.c.textBaseline = "middle";
    this.c.font = "600 16px sans-serif"
    this.c.fillText(this.symbol, this.cx, this.cy);
  }

  public animate() {
    this.animation = requestAnimationFrame(this.animate.bind(this));
    if(!this.runAnimation) return
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawShells();
    this.drawElectrons();
    this.drawSymbol();
  }
}
