"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function drawUI(ctx: CanvasRenderingContext2D, w: number, h: number, state: "normal" | "clicked" | "broken") {
  ctx.clearRect(0, 0, w, h);

  // panel background
  ctx.fillStyle = "#0e1712";
  roundRect(ctx, 0, 0, w, h, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(232,243,236,0.12)";
  ctx.lineWidth = 2;
  roundRect(ctx, 1, 1, w - 2, h - 2, 28);
  ctx.stroke();

  // title bar
  ctx.fillStyle = "rgba(232,243,236,0.06)";
  roundRect(ctx, 0, 0, w, 54, 28, true);
  ctx.fill();

  const dotColors = ["#ff6b6b", "#f2b73f", "#3fdd8f"];
  dotColors.forEach((c, i) => {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(34 + i * 30, 27, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // nav line
  ctx.fillStyle = "rgba(232,243,236,0.15)";
  roundRect(ctx, 28, 82, w - 56, 14, 7);
  ctx.fill();

  // body text lines
  ctx.fillStyle = "rgba(232,243,236,0.22)";
  roundRect(ctx, 28, 118, w * 0.55, 12, 6);
  ctx.fill();
  roundRect(ctx, 28, 142, w * 0.4, 12, 6);
  ctx.fill();

  // the button
  const btnY = 190;
  const btnW = 190;
  const btnH = 52;
  const btnX = 28;
  if (state === "broken") {
    ctx.fillStyle = "#3a1414";
  } else if (state === "clicked") {
    ctx.fillStyle = "#ff7a29";
  } else {
    ctx.fillStyle = "#c94a0a";
  }
  roundRect(ctx, btnX, btnY, btnW, btnH, 12);
  ctx.fill();
  ctx.fillStyle = state === "broken" ? "#ff8f8f" : "#fff3ea";
  ctx.font = "600 22px monospace";
  ctx.textBaseline = "middle";
  ctx.fillText(state === "broken" ? "Run Test — Failed" : "Run Test", btnX + 22, btnY + btnH / 2 + 1);

  if (state === "broken") {
    // error badge
    ctx.fillStyle = "#ff6b6b";
    roundRect(ctx, w - 210, btnY, 182, btnH, 12);
    ctx.fill();
    ctx.fillStyle = "#2a0a0a";
    ctx.font = "700 20px monospace";
    ctx.fillText("✕ 500 Error", w - 195, btnY + btnH / 2 + 1);
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  topOnly = false
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + (topOnly ? h : h - r));
  if (!topOnly) ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  else ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + r, y + h);
  if (!topOnly) ctx.arcTo(x, y + h, x, y + h - r, r);
  else ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export type AppState = "normal" | "clicked" | "broken";

export function AppMockup({
  state,
  position = [0, 0, 0],
}: {
  state: AppState;
  position?: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 640;
    c.height = 320;
    return c;
  }, []);
  const texture = useMemo(() => new THREE.CanvasTexture(canvas), [canvas]);
  const t0 = useRef(0);
  const shake = useRef(0);

  // Flagging a THREE.CanvasTexture dirty after redrawing its source canvas is the
  // standard, documented way to make three.js re-upload it to the GPU — mutating it
  // here is idiomatic three.js/R3F, not a React state bug.
  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawUI(ctx, canvas.width, canvas.height, state);
    texture.needsUpdate = true;
    if (state === "broken") shake.current = 0.4;
  }, [state, canvas, texture]);
  /* eslint-enable react-hooks/immutability */

  useFrame((_, delta) => {
    t0.current += delta;
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t0.current * 0.9) * 0.06;
      if (shake.current > 0) {
        shake.current -= delta * 1.6;
        group.current.position.x = position[0] + (Math.random() - 0.5) * 0.06 * Math.max(shake.current, 0);
        group.current.rotation.z = (Math.random() - 0.5) * 0.03 * Math.max(shake.current, 0);
      } else {
        group.current.position.x = THREE.MathUtils.damp(group.current.position.x, position[0], 4, delta);
        group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, 0, 4, delta);
      }
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh castShadow receiveShadow>
        <planeGeometry args={[2.4, 1.2]} />
        <meshStandardMaterial map={texture} roughness={0.6} metalness={0.05} toneMapped={false} />
      </mesh>
      {state === "broken" && (
        <pointLight position={[0, 0, 0.5]} color="#ff6b6b" intensity={2.5} distance={2.5} />
      )}
    </group>
  );
}
