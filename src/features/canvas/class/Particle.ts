export class Particle {
  declare x: number;
  declare y: number;
  declare size: number;
  declare speedX: number;
  declare speedY: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 25 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) return;
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath(); // 새로운 도형 : 전에 그린것과 분리
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
