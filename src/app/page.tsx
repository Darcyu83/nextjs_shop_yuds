"use client";
import Image from "next/image";

import styles from "./page.module.css";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(
    null
  );

  const [arrOfParticles, setArrOfParticles] = useState<Particle[]>([]);

  const intervalId = useRef<NodeJS.Timeout>();
  const incrementRef = useRef<number>(0);
  const [increment, setIncrement] = useState(0);

  const [mouseXY, setMouseXY] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  function drawRect(
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number
  ) {
    if (!ctx) return;
    // 사각형
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 100, 20);
  }

  class Particle {
    declare x: number;
    declare y: number;
    declare size: number;
    declare speedX: number;
    declare speedY: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    draw(ctx: CanvasRenderingContext2D | null) {
      if (!ctx) return;
      ctx.fillStyle = "blue";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.beginPath(); // 새로운 도형 : 전에 그린것과 분리
      ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  function initParticles() {
    const arr: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      arr.push(new Particle(mouseXY.x ?? 0, mouseXY.y ?? 0));
    }

    setArrOfParticles((curr) => [...curr, ...arr]);
  }

  // function drawCircle(
  //   ctx: CanvasRenderingContext2D | null,
  //   x: number,
  //   y: number
  // ) {
  //   if (!ctx) return;
  //   // 원
  //   ctx.fillStyle = "blue";
  //   ctx.strokeStyle = "red";
  //   ctx.lineWidth = 3;
  //   ctx.beginPath(); // 새로운 도형 : 전에 그린것과 분리
  //   ctx.arc(x, y, 50, 0, Math.PI * 2);
  //   ctx.fill();
  //   ctx.stroke();
  // }

  // const animateCircle = useCallback(() => {
  //   if (!canvasCtx) return;
  //   canvasCtx?.clearRect(
  //     0,
  //     0,
  //     canvasRef.current?.width ?? 0,
  //     canvasRef.current?.height ?? 0
  //   );

  //   if (!mouseXY.x || !mouseXY.y) return;

  //   drawCircle(canvasCtx, mouseXY.x, mouseXY.y);
  // }, [canvasCtx, mouseXY.x, mouseXY.y]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    setCanvasCtx(ctx);

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // 클릭 이벤트
    canvas.addEventListener("click", (e) => {
      setMouseXY({ x: e.x, y: e.y });
    });

    canvas.addEventListener("mousemove", (e) => {
      setMouseXY({ x: e.x, y: e.y });
    });

    initParticles();
  }, []);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      incrementRef.current += 1;

      if (incrementRef.current === 3000) {
        clearInterval(intervalId.current);
        return;
      }
      setIncrement(incrementRef.current);
    }, 1);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [increment]);

  // 마우스 이동 :: 원 따라다니게
  useEffect(() => {
    // animateCircle();

    if (!canvasCtx) return;
    canvasCtx?.clearRect(
      0,
      0,
      canvasRef.current?.width ?? 0,
      canvasRef.current?.height ?? 0
    );
    arrOfParticles.map((particle) => {
      particle.update();
      particle.draw(canvasCtx);
    });
  }, [arrOfParticles, canvasCtx, mouseXY.x, mouseXY.y, increment]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Glassmorphism */}

      <div className={styles.glass_container}>
        haha
        <div className={styles.glass_card}></div>
      </div>

      <canvas
        ref={canvasRef}
        id="tutorial"
        className={styles.canvas_tutorial}
      ></canvas>
    </main>
  );
}
