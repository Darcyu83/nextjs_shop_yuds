"use client";
import Image from "next/image";

import styles from "./page.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Particle } from "../features/canvas/class/Particle";
import Link from "next/link";

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
    x: number;
    y: number;
  } | null>(null);

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

  const initParticles = useCallback(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      arr.push(new Particle(mouseXY?.x ?? 0, mouseXY?.y ?? 0));
    }

    intervalId.current = setInterval(() => {
      incrementRef.current += 1;

      if (!canvasCtx) return;

      canvasCtx?.clearRect(
        0,
        0,
        canvasRef.current?.width ?? 0,
        canvasRef.current?.height ?? 0
      );
      arr.map((particle) => {
        particle.update();
        particle.draw(canvasCtx);
      });

      if (incrementRef.current >= 4000) {
        clearInterval(intervalId.current);
        incrementRef.current = 0;
        return;
      }

      setIncrement(incrementRef.current);
    }, 10);
  }, [canvasCtx, mouseXY]);

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
      incrementRef.current = 0;
      setMouseXY({ x: e.x, y: e.y });
      initParticles();
    });

    // canvas.addEventListener("mousemove", (e) => {
    //   setMouseXY({ x: e.x, y: e.y });
    // });
  }, []);

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
      <Link href={"/click"} title="클릭 캔버스">
        클릭 캔버스
      </Link>
    </main>
  );
}
