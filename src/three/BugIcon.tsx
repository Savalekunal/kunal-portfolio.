"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BUG_COLOR = "#ff6b6b";

/** A small glowing icosahedron representing a caught defect. */
export function BugIcon({ position = [0, 0, 0] as [number, number, number], visible = true }) {
  const mesh = useRef<THREE.Mesh>(null);
  const t0 = useRef(0);

  useFrame((_, delta) => {
    t0.current += delta;
    if (mesh.current) {
      mesh.current.rotation.x += delta * 1.4;
      mesh.current.rotation.y += delta * 1.9;
    }
  });

  return (
    <mesh ref={mesh} position={position} visible={visible}>
      <icosahedronGeometry args={[0.07, 0]} />
      <meshStandardMaterial color={BUG_COLOR} emissive={BUG_COLOR} emissiveIntensity={1.3} toneMapped={false} />
    </mesh>
  );
}
