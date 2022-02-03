export class Pendulum {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D ;

  x: number;
  y: number;

  isFriction = false;

  public initX: number;
  public initY: number;
  radius: number;
  color: string;
  gravity = 9.8;
  mass: number = 10;
  public friction: number = 0.9993;
  private dfc:number = 200;
  radians = Math.PI / 3;
  private acceleration: number = 0;
  public velocity: number = 0;

  constructor(canvas: HTMLCanvasElement, x: number, y: number, radius: number, color: string, length: number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;
    this.color = color;
    this.radius = radius;
    this.dfc = length;
  }


  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.initX, this.initY);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.strokeStyle = 'grey';
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = '#ffc95f';
    this.ctx.fillRect(this.initX - 40, this.initY - 2, 80, 5);

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    this.x = this.initX + Math.sin(this.radians) * this.dfc;
    this.y = this.initY + Math.cos(this.radians) * this.dfc;

    this.acceleration = (-this.gravity/this.dfc) * Math.sin(this.radians);
    this.velocity += this.acceleration / 3;
    this.radians += this.velocity;
    this.velocity *= this.friction;
    this.draw();
  }
}
