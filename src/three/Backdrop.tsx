"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";

function makeGradientTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Diagonal blend: deep orange glow (top-left) → near-black center → soft violet glow (bottom-right)
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, "#2a1408");
  grad.addColorStop(0.42, "#070c09");
  grad.addColorStop(0.58, "#070c09");
  grad.addColorStop(1, "#160f28");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // soft radial vignette so the edges stay dark regardless of viewing angle
  const vign = ctx.createRadialGradient(size / 2, size / 2, size * 0.15, size / 2, size / 2, size * 0.72);
  vign.addColorStop(0, "rgba(0,0,0,0)");
  vign.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = vign;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function Backdrop() {
  const texture = useMemo(() => makeGradientTexture(), []);

  return (
    <>
      <mesh scale={-1}>
        <sphereGeometry args={[18, 32, 32]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
      </mesh>
      <Sparkles count={70} scale={[10, 6, 8]} size={2} speed={0.25} opacity={0.5} color="#ff7a29" />
      <Sparkles count={40} scale={[10, 6, 8]} size={1.6} speed={0.2} opacity={0.35} color="#a58bff" />
    </>
  );
}
