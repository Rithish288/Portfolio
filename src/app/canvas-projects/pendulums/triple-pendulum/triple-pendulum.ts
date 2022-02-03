const g: number = 1;

const pow = Math.pow;
const sin = Math.sin;
const cos = Math.cos;

interface Bob {
  mass: number;
  length: number;
  angle: number;
  inertia: number,
  damping: number,
  velocity: number;
  x: number;
  y: number;
  acc: number
}

export class Pendulum {
  private bob1: Bob = {
    damping: 5e-3,
    inertia: 9.526e-3,
    mass: 0.2944,
    length: 0.508,
    angle: Math.PI / 2,
    velocity: 0,
    x: 0, y: 0,
    acc: 0
  }

  private bob2: Bob = {
    damping: 0,
    inertia: 1.625e-3,
    mass: 0.1756,
    length: 0.254,
    angle: Math.PI / 2,
    velocity: 0,
    x: 0, y: 0,
    acc: 0
  }

  private bob3: Bob = {
    damping: 8e-4,
    inertia: 1.848e-4,
    mass: 0.0947,
    length: 0.127,
    angle: Math.PI / 2,
    velocity: 0,
    x: 0, y: 0,
    acc: 0
  }

  public radius: number = 10;
  public color: string = 'black';

  private canvas: HTMLCanvasElement;
  private c: CanvasRenderingContext2D;

  private gravity: number = 1;

  constructor(canvas: HTMLCanvasElement, color: string, radius: number, length1: number, length2: number, length3: number) {
    this.canvas = canvas;
    this.c = this.canvas.getContext('2d');
    this.radius = radius
  };

  line(x1: number, y1: number, x2: number, y2: number, color: string) {
    this.c.beginPath();
    this.c.moveTo(x1, y1);
    this.c.lineTo(x2, y2);
    this.c.strokeStyle = color;
    this.c.stroke();
  }

  bob(xCoord: number, yCoord: number, radius: number, color: string) {
    this.c.beginPath();
    this.c.arc(xCoord, yCoord, radius, 0, Math.PI * 2, false);
    this.c.fillStyle = color;
    this.c.fill();
    this.c.closePath();
  }

  draw() {
    //drawing the pendulum
    this.line(this.c.canvas.width/2, 0, this.bob1.x, this.bob1.y, this.color);
    this.bob(this.bob1.x, this.bob1.y, this.radius, this.color);
    //first string and bob ^
    this.line(this.bob1.x, this.bob1.y, this.bob2.x, this.bob2.y, this.color);
    this.bob(this.bob2.x, this.bob2.y, this.radius, this.color);
    //second string and bob ^^
    this.line(this.bob2.x, this.bob2.y, this.bob3.x, this.bob3.y, this.color);
    this.bob(this.bob3.x, this.bob3.y, this.radius, this.color);
    //third string and bob ^^
  }

  theta1DotDot(
    a1: number, a2: number, a3: number, v1: number, v2: number, v3: number,
    m1: number, m2: number, m3: number, l1: number, l2: number, l3: number,
    i1: number, i2: number, i3: number, k1: number, k2: number, k3: number
  ): number {

    let formula: number =
      -(2*(pow(l3,2)*pow(m3,2)*sin(2*a1-2*a3)*(4*i2-pow(l2,2)*m2)+pow(l2,2)*sin(2*a1-2*a2)*(m2+2*m3)*(m2*m3*pow(l3,2)+4*i3*(m2+
      2*m3)))*pow(l1,2)*pow(v1,2)+(l2*(sin(a1-a2)*((m2*m3*(m2+3*m3)*pow(l3,2)+4*i3*(pow(m2,2)+6*m2*m3+8*pow(m3,2))*pow(l2,2)+4*i2*(m3*(m2+
      m3)*pow(l3,2)+4*i3*(m2+2*m3)))+pow(l3,2)*pow(m3,2)*sin(a1+a2-2*a3)*(4*i2-pow(l2,2)*m2))*pow(v2,2)-4*k2*l2*(cos(a1-a2)*(m3*(m2+
      m3)*pow(l3,2)+4*i3*(m2+2*m3))-pow(l3,2)*pow(m3,2)*cos(a1+a2-2*a3))*v2+l3*m3*(sin(a1-a3)*(8*i3*m3*pow(l2,2)+4*i2*m3*pow(l3,2)+16*i2*i3)+
      pow(l2,2)*sin(a1-2*a2+a3)*(m2*m3*pow(l3,2)+4*i3*(m2+2*m3)))*v3-4*k3*l3*m3*(cos(a1-a3)*(2*m3*pow(l2,2)+4*i2)-pow(l2,2)*cos(a1-
      2*a2+a3)*(m2+2*m3))*v3-g*(sin(a1)*((m3*(m1*m2+2*m1*m3+3*m2*m3+pow(m2,2))*pow(l3,2)+4*i3*(pow(m2,2)+6*m2*m3+
      m1*m2+4*pow(m3,2)+4*m1*m3))*pow(l2,2)+4*i2*(m3*(m1+2*m2+m3)*pow(l3,2)+4*i3*(m1+2*m2+2*m3)))+pow(l3,2)*pow(m3,2)*(sin(a1-
      2*a3)*(4*i2-pow(l2,2)*m2)-2*pow(l2,2)*cos(2*a2-2*a3)*sin(a1)*(m1+m2))+pow(l2,2)*sin(a1-2*a2)*(m2+2*m3)*(m2*m3*pow(l3,2)+
      4*i3*(m2+2*m3))))*l1+2*k1*(4*i2*(m3*pow(l3,2)+4*i3)+pow(l2,2)*(m3*(m2+2*m3)*pow(l3,2)+4*i3*(m2+4*m3))-2*pow(l2,2)*pow(l3,2)*pow(m3,2)*cos(2*a2-
      2*a3))*v1))/(64*i1*i2*i3+8*i3*pow(l1,2)*pow(l2,2)*pow(m2,2)+8*i1*pow(l2,2)*pow(l3,2)*pow(m3,2) +8*i2*pow(l1,2)*pow(l3,2)*pow(m3,2)+32*i3*pow(l1,2)*pow(l2,2)*pow(l3,2)+16*i2*i3*pow(l1,2)*m1+16*i1*i3*pow(l2,2)*m2+
      64*i2*i3*pow(l1,2)*m2+16*i1*i2*pow(l3,2)*m3+64*i1*i1*pow(l2,2)*m3+64*i2*i3*pow(l1,2)*m3+4*i3*pow(l1,2)*pow(l2,2)*m1*m2+4*i2*pow(l1,2)*pow(l3,2)*m1*m3+16*i3*pow(l1,2)*pow(l2,2)*m1*m3+
      4*i1*pow(l2,2)*pow(l3,2)*m2*m3+16*i2*pow(l1,2)*pow(l3,2)*m2*m3+48*i3*pow(l1,2)*pow(l2,2)*m2*m3-8*i1*pow(l2,2)*pow(l3,2)*pow(m3,2)*cos(2*a2-2*a3)-2*pow(l1,2)*pow(l2,2)*cos(2*a1-2*a2)*(m2+
      2*m3)*(m2*m3*pow(l3,2)+4*i3*(m2+2*m3))-2*pow(l1,2)*pow(l3,2)*pow(m3,2)*cos(2*a1-2*a3)*(-m2*pow(l2,2)+4*i2)+2*pow(l1,2)*pow(l2,2)*pow(l3,2)*m1*pow(m3,2)+6*pow(l1,2)*pow(l2,2)*pow(l3,2)*m2*pow(m3,2)+
      2*pow(l1,2)*pow(l2,2)*pow(l3,2)*pow(m2,2)*m3+pow(l1,2)*pow(l2,2)*pow(l3,2)*m1*m2*m3-2*pow(l1,2)*pow(l2,2)*pow(l3,2)*m1*pow(m3,2)*cos(2*a2-2*a3)-4*pow(l1,2)*pow(l2,2)*pow(l3,2)*m2*pow(m3,2)*cos(2*a2-2*a3));
    return formula;
  }

  theta2DotDot(
    a1: number, a2: number, a3: number, v1: number, v2: number, v3: number,
    m1: number, m2: number, m3: number, l1: number, l2: number, l3: number,
    i1: number, i2: number, i3: number, k1: number, k2: number, k3: number
  ): number {
    let formula: number =
      (2*((pow(l1,2)*sin(2*a1-2*a2)*(m2+2*m3)*(m2*m3*pow(l3,2)+4*i3*(m2+2*m3))-pow(l3,2)*pow(m3,2)*sin(2*a2-2*a3)*((m1+
      2*m2)*pow(l1,2)+4*i1))*pow(l2,2)*pow(v2,2)+l1*(sin(a1-a2)*((m3*(m1*(m2+m3)+2*m2*(2*m2+3*m3))*pow(l3,2)+4*i3*(m2+2*m3)*(m1+
      4*m2+4*m3))*pow(l1,2)+4*i1*(m3*(m2+m3)*pow(l3,2)+4*i3*(m2+2*m3)))-pow(l3,2)*pow(m3,2)*sin(a1+a2-2*a3)*((m1+2*m2)*pow(l1,2)+
      4*i1))*l2*pow(v1,2)+4*k1*l1*(cos(a1-a2)*(m3*(m2+m3)*pow(l3,2)+4*i3*(m2+2*m3))-pow(l3,2)*pow(m3,2)*cos(a1+a2-2*a3))*l2*v1+
      (-l3*m3*(sin(a2-a3)*((m3*(m1+3*m2)*pow(l3,2)+4*i3*(m1+3*m2+2*m3))*pow(l1,2)+4*i1*(m3*pow(l3,2)+4*i3))-pow(l1,2)*sin(2*a1-a2-
      a3)*(m2*m3*pow(l3,2)+4*i3*(m2+2*m3)))*pow(v3,2)+4*k3*l3*m3*(cos(a2-a3)*((m1+3*m2+2*m3)*pow(l1,2)+4*i1)-pow(l1,2)*cos(2*a1-
      a2-a3)*(m2+2*m3))*v3+g*(sin(a2)*((m2*m3*(2*m2+3*m3)*pow(l3,2)+8*i3*(pow(m2,2)+3*m2*m3+2*pow(m3,2)))*pow(l1,2)+4*i1*(m3*(m2+
      m3)*pow(l3,2)+4*i3*(m2+2*m3)))-pow(l1,2)*sin(2*a1-a2)*(m3*(m1*(m2+m3)+m2*(2*m2+3*m3))*pow(l3,2)+4*i3*(m2+
      2*m3)*(m1+2*m2+2*m3))+pow(l3,2)*pow(m3,2)*(sin(a2-2*a3)*(m2*pow(l1,2)+4*i1)+pow(l1,2)*sin(2*a1+a2-2*a3)*(m1+m2))))*l2-
      2*k2*(4*i1*(m3*pow(l3,2)+4*i3)+pow(l1,2)*(m3*(m1+4*m2+2*m3)*pow(l3,2)+4*i3*(m1+4*m2+4*m3))-2*pow(l1,2)*pow(l3,2)*pow(m3,2)*cos(2*a1-
      2*a3))*v2))/(64*i1*i2*i3+8*i3*pow(l1,2)*pow(l2,2)*pow(m2,2)+8*i1*pow(l2,2)*pow(l3,2)*pow(m3,2) +8*i2*pow(l1,2)*pow(l3,2)*pow(m3,2)+32*i3*pow(l1,2)*pow(l2,2)*pow(l3,2)+16*i2*i3*pow(l1,2)*m1+16*i1*i3*pow(l2,2)*m2+
      64*i2*i3*pow(l1,2)*m2+16*i1*i2*pow(l3,2)*m3+64*i1*i1*pow(l2,2)*m3+64*i2*i3*pow(l1,2)*m3+4*i3*pow(l1,2)*pow(l2,2)*m1*m2+4*i2*pow(l1,2)*pow(l3,2)*m1*m3+16*i3*pow(l1,2)*pow(l2,2)*m1*m3+
      4*i1*pow(l2,2)*pow(l3,2)*m2*m3+16*i2*pow(l1,2)*pow(l3,2)*m2*m3+48*i3*pow(l1,2)*pow(l2,2)*m2*m3-8*i1*pow(l2,2)*pow(l3,2)*pow(m3,2)*cos(2*a2-2*a3)-2*pow(l1,2)*pow(l2,2)*cos(2*a1-2*a2)*(m2+
      2*m3)*(m2*m3*pow(l3,2)+4*i3*(m2+2*m3))-2*pow(l1,2)*pow(l3,2)*pow(m3,2)*cos(2*a1-2*a3)*(-m2*pow(l2,2)+4*i2)+2*pow(l1,2)*pow(l2,2)*pow(l3,2)*m1*pow(m3,2)+6*pow(l1,2)*pow(l2,2)*pow(l3,2)*m2*pow(m3,2)+
      2*pow(l1,2)*pow(l2,2)*pow(l3,2)*pow(m2,2)*m3+pow(l1,2)*pow(l2,2)*pow(l3,2)*m1*m2*m3-2*pow(l1,2)*pow(l2,2)*pow(l3,2)*m1*pow(m3,2)*cos(2*a2-2*a3)-4*pow(l1,2)*pow(l2,2)*pow(l3,2)*m2*pow(m3,2)*cos(2*a2-2*a3));;
    return formula;
  }

  theta3DotDot(
    a1: number, a2: number, a3: number, v1: number, v2: number, v3: number,
    m1: number, m2: number, m3: number, l1: number, l2: number, l3: number,
    i1: number, i2: number, i3: number, k1: number, k2: number, k3: number
  ): number {
    let formula: number =
      -(2*(32*i1*i2*k3*v3-l2*l3*m3*pow(v2,2)*(sin(a2-a3)*((pow(l2,2)*(m1*m2+4*m1*m3+6*m2*m3+pow(m2,2)+4*i2*(m1+
      3*m2+2*m3))*pow(l1,2)+4*i1*(4*i2+pow(l2,2)*(m2+4*m3)))+pow(l1,2)*sin(2*a1-a2-a3)*(m2+2*m3)*(4*i2-m2*pow(l2,2)))-
      l1*l3*m3*pow(v1,2)*(sin(a1-a3)*(8*i1*(m3*pow(l2,2)+2*i2)+2*pow(l1,2)*((m1*m3-pow(m2,2)*pow(l2,2)+2*i2*(m1+4*m2+4*m3)))-pow(l2,2)*sin(a1-
      2*a2+a3)*(m2+2*m3)*((m1+2*m2)*pow(l1,2)+4*i1))+4*k3*pow(l1,2)*pow(l2,2)*pow(m2,2)*v3+16*k3*pow(l1,2)*pow(l2,2)*pow(m3,2)*v3+8*i2*k3*pow(l1,2)*m1*v3+
      8*i1*k3*pow(l2,2)*m2*v3+32*i2*k3*pow(l1,2)*m2*v3+32*i1*k3*pow(l2,2)*m3*v3+32*i2*k3*pow(l1,2)*m3*v3-4*k1*l1*l3*m3*v1*(cos(a1-a3)*(2*m3*pow(l2,2)+
      4*i2)-pow(l2,2)*cos(a1-2*a2+a3)*(m2+2*m3))-16*i1*i2*g*l3*m3*sin(a3)-4*i1*pow(l1,2)*pow(l3,2)*pow(m3,2)*pow(v3,2)*sin(2*a1-2*a3)-
      4*i1*pow(l2,2)*pow(l3,2)*pow(m3,2)*pow(v3,2)*sin(2*a2-2*a3)+8*i1*g*pow(l1,2)*l3*pow(m3,2)*sin(2*a1-a3)+8*i1*g*pow(l2,2)*l3*pow(m3,2)*sin(2*a2-a3)+2*k3*pow(l1,2)*pow(l2,2)*m1*m2*v3+
      8*k3*pow(l1,2)*pow(l2,2)*m1*m3*v3+24*k3*pow(l1,2)*pow(l2,2)*m2*m3*v3-4*k2*l2*l3*m3*v2*(cos(a2-a3)*((m1+3*m2+2*m3)*pow(l1,2)+4*i1)-
      pow(l1,2)*cos(2*a1-a2-a3)*(m2+2*m3))-8*i1*g*pow(l2,2)*l3*pow(m3,2)*sin(a3)-8*i2*g*pow(l1,2)*l3*pow(m3,2)*sin(a3)-4*k3*pow(l1,2)*pow(l2,2)*pow(m2,2)*v3*cos(2*a1-
      2*a2)-16*k3*pow(l1,2)*pow(l2,2)*pow(m3,2)*v3*cos(2*a1-2*a2)-8*i2*g*pow(l1,2)*l3*m2*m3*sin(a3)-16*k3*pow(l1,2)*pow(l2,2)*m2*m3*v3*cos(2*a1-2*a2)-
      pow(l1,2)*pow(l2,2)*pow(l3,2)*m1*pow(m3,2)*pow(v3,2)*sin(2*a2-2*a3)+pow(l1,2)*pow(l2,2)*pow(l3,2)*m2*pow(m3,2)*pow(v3,2)*sin(2*a1-2*a3)-2*pow(l1,2)*pow(l2,2)*pow(l3,2)*m2*pow(m3,2)*pow(v3,2)*sin(2*a2-
      2*a3)+2*g*pow(l1,2)*pow(l2,2)*l3*m1*pow(m3,2)*sin(2*a1-a3)-g*pow(l1,2)*pow(l2,2)*l3*pow(m2,2)*m3*sin(2*a1-a3)+2*g*pow(l1,2)*pow(l2,2)*l3*m2*pow(m3,2)*sin(2*a2-
      a3)))));
    return formula;
  }

  update() {
    this.bob1.x = this.bob1.length * Math.sin(this.bob1.angle) + this.canvas.width/2;
    this.bob1.y = this.bob1.length * Math.cos(this.bob1.angle);

    this.bob2.x = this.bob1.x + this.bob2.length * Math.sin(this.bob2.angle);
    this.bob2.y = this.bob1.y + this.bob2.length * Math.cos(this.bob2.angle);

    this.bob3.x = this.bob2.x + this.bob3.length * Math.sin(this.bob3.angle);
    this.bob3.y = this.bob2.y + this.bob3.length * Math.cos(this.bob3.angle);
    this.draw()
  }
}


