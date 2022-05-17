import { accentColor } from "src/app/colors";

interface Bob {
  mass: number;
  rad: number;
  angle: number;
  velocity: number;
  x: number;
  y: number;
  acc: number
}

export class DoublePendulum {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private bob1: Bob = {
    mass: 10,
    rad: 0,
    angle: Math.PI / 2,
    velocity: 0,
    x: 0, y: 0,
    acc: 0
  }

  private bob2: Bob = {
    mass: 10,
    rad: 0,
    angle: Math.PI / 2,
    velocity: 0,
    x: 0, y: 0,
    acc: 0
  }

  public radius: number = 10;
  public color: string = 'black';

  gravity: number = 1.1;

  length = {
    bob1: 0, bob2: 0
  }

  path: Array<any> = [];

  constructor(canvas:HTMLCanvasElement, radius: number, color: string, bob1: {length: number, angle: number, mass?: number}, bob2: {length: number, angle: number, mass?: number}) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.radius = radius;
    this.color = color;

    this.bob1.rad = this.length.bob1 = bob1.length;
    this.bob2.rad = this.length.bob2 = bob1.length;
    this.bob1.angle = bob1.angle;
    this.bob2.angle = bob2.angle;
    this.bob1.mass = bob1.mass;
    this.bob2.mass = bob2.mass;
  }

  line(x1: number, y1: number, x2: number, y2: number, color: string, thickness?: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = thickness;
    this.ctx.stroke();
  }

  bob(xCoord: number, yCoord: number, radius: number, color: string) {
    this.ctx.beginPath();
    this.ctx.arc(xCoord, yCoord, radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  draw() {
    //drawing the pendulum
    this.line(this.canvas.width/2, 0, this.bob1.x, this.bob1.y, 'grey');
    this.line(this.bob1.x, this.bob1.y, this.bob2.x, this.bob2.y, 'grey');
    this.bob(this.bob1.x, this.bob1.y, this.radius, this.color);
    this.bob(this.bob2.x, this.bob2.y, this.radius, this.color);
    //second string and bob ^^

    //hanger
    this.ctx.beginPath();
    this.ctx.fillStyle = accentColor;
    this.ctx.fillRect(this.canvas.width/2 - 50, -1, 100, 5);
  }

  update() {
    let formula1 = {
      part1: -this.gravity * (2 * this.bob1.mass + this.bob2.mass) * Math.sin(this.bob1.angle),
      part2: -this.bob2.mass * this.gravity * Math.sin(this.bob1.angle - 2 * this.bob2.angle),
      part3: -2 * Math.sin(this.bob1.angle - this.bob2.angle) * this.bob2.mass,
      part4: (this.bob2.velocity ** 2) * this.bob2.rad + (this.bob1.velocity ** 2) * this.bob1.rad * Math.cos(this.bob1.angle - this.bob2.angle),
      denominator: this.bob1.rad * (2 * this.bob1.mass + this.bob2.mass - this.bob2.mass * Math.cos(2 * this.bob1.angle - 2 * this.bob2.angle))
    };

    this.bob1.acc = (formula1.part1 + formula1.part2 + formula1.part3 * formula1.part4) / formula1.denominator;

    let formula2 = {
      part1: 2 * Math.sin(this.bob1.angle - this.bob2.angle),
      part2: ((this.bob1.velocity ** 2) * this.bob1.rad * (this.bob1.mass + this.bob2.mass)),
      part3: this.gravity * (this.bob1.mass + this.bob2.mass) * Math.cos(this.bob1.angle),
      part4: (this.bob2.velocity ** 2) * this.bob2.rad * this.bob2.mass * Math.cos(this.bob1.angle - this.bob2.angle),
      denominator: this.bob2.rad * (2 * this.bob1.mass + this.bob2.mass - this.bob2.mass * Math.cos(2 * this.bob1.angle - 2 * this.bob2.angle))
    };

    this.bob2.acc = (formula2.part1 * (formula2.part2 + formula2.part3 + formula2.part4)) / formula2.denominator;

    this.bob1.velocity += this.bob1.acc;
    this.bob2.velocity += this.bob2.acc;

    this.bob1.angle += this.bob1.velocity;
    this.bob2.angle += this.bob2.velocity;

    if(this.bob1.acc && this.bob2.acc !== NaN) {
      this.bob1.x = this.length.bob1 * (Math.sin( this.bob1.angle)) + this.canvas.width/2;
      this.bob1.y = this.length.bob2 * (Math.cos( this.bob1.angle));
      this.bob2.x = this.bob1.x + this.length.bob2 * Math.sin( this.bob2.angle);
      this.bob2.y = this.bob1.y + this.length.bob2 * Math.cos( this.bob2.angle);
    }

    this.path.unshift({x: this.bob2.x, y: this.bob2.y});

    //Tracing the path of the pendulum
    for (let i = 1; i < this.path.length; i++) {
      this.line(this.path[i].x, this.path[i].y, this.path[i - 1].x, this.path[i - 1].y, `hsl(${i}, 100%, 50%)`);
    }

    if(this.path.length > 700) {
      this.path.pop();
    }
    this.draw()
  }
}
