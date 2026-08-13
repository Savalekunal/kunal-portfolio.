"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LEG_COLOR = "#5b6b62";
const BODY_COLOR = "#1a2620";
const ACCENT = "#ff7a29";

/**
 * Small geometric "bug catcher" bot — a rounded body on four thin jointed legs.
 * Legs animate with a simple scurry cycle; position/visibility driven by parent.
 */
export function BugSpider({
  active,
  position = [0, 0, 0],
  scale = 1,
}: {
  active: boolean;
  position?: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const legs = useRef<THREE.Group[]>([]);
  const t0 = useRef(0);

  const legAngles = useMemo(
    () => [
      [-0.55, 0.35],
      [0.55, 0.35],
      [-0.55, -0.35],
      [0.55, -0.35],
    ],
    []
  );

  useFrame((_, delta) => {
    t0.current += delta;
    if (!active) return;
    legs.current.forEach((leg, i) => {
      if (!leg) return;
      const phase = t0.current * 10 + i * Math.PI;
      leg.rotation.x = Math.sin(phase) * 0.35;
    });
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t0.current * 10) * 0.02;
    }
  });

  return (
    <group ref={group} position={position} scale={scale} visible={active}>
      <mesh castShadow>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.02, 0.11]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      {legAngles.map(([x, z], i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) legs.current[i] = el;
          }}
          position={[x * 0.16, -0.02, z * 0.16]}
          rotation={[0, Math.atan2(z, x), 0]}
        >
          <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.22, 6]} />
            <meshStandardMaterial color={LEG_COLOR} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
