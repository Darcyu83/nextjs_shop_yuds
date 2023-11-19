"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";

import styles from "./page.module.css";
import { Particle } from "../../features/canvas/class/Particle";
interface IProps {}
interface IParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}
function Click(props: IProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  //   const arrOfArrOfParticles = useRef<IParticle[][]>([]);

  const [clickEvents, setClickEvents] = useState<IParticle[][]>([]);

  const handleMouseClick = (event: MouseEvent) => {
    console.log("yuds === handleMouseClick", event);

    console.log("yuds === handleMouseClick", clickEvents);
    const mouseX =
      event.clientX - (canvasRef.current?.getBoundingClientRect().left || 0);
    const mouseY =
      event.clientY - (canvasRef.current?.getBoundingClientRect().top || 0);
    const particles: IParticle[] = []; // Create a new array for each click event

    // Create particles around the click point for this event
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: mouseX,
        y: mouseY,
        size: Math.random() * 5 + 2,
        speedX: (Math.random() - 0.5) * 8,
        speedY: (Math.random() - 0.5) * 8,
        color: `hsla(${Math.random() * 360}, 50%, 50%, 1)`,
      });
    }

    // Store the particles for this click event in the array
    //   clickEvents.push(particles);
    setClickEvents((curr) => [...curr, particles]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (ctx) {
      ctxRef.current = ctx;
    }
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
    </main>
  );
}

export default Click;
