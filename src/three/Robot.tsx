"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import Image from "next/image";
import * as THREE from "three";
import { profile } from "@/lib/data";

export type RobotPhase =
  | "enter"
  | "idle"
  | "reachOut"
  | "react"
  | "greetBug"
  | "wave";

const ACCENT = "#ff7a29";
const SHELL = "#e7ede9";
const SHELL_DARK = "#aab6b0";
const EYE_GLOW = "#ff7a29";

/**
 * Your photo, shown on the robot's visor like a small screen — only mounted once a photo
 * exists. Rendered as a real DOM <img> anchored to this 3D point (via drei's Html), not a
 * WebGL texture — loading a decoded photo as a GPU texture proved unstable in some
 * environments (WebGL context loss on texture upload), so this sidesteps that entirely.
 */
function RobotFacePhoto() {
  return (
    <group position={[0, 0.02, 0.31]}>
      <mesh position={[0, 0, -0.005]}>
        <circleGeometry args={[0.155, 32]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.9} toneMapped={false} />
      </mesh>
      <Html center distanceFactor={2.2} position={[0, 0, 0.001]} occlude={false}>
        <div className="pointer-events-none h-[62px] w-[62px] select-none overflow-hidden rounded-full">
          <Image
            src={profile.photo as string}
            alt={profile.name}
            width={62}
            height={62}
            className="h-full w-full object-cover"
          />
        </div>
      </Html>
    </group>
  );
}

/**
 * A small, friendly geometric "QA robot" built entirely from primitives —
 * no external model assets. Floats/hovers rather than walking, animated via
 * simple procedural motion driven by `phase`.
 */
export function Robot({
  phase,
  position = [0, 0, 0],
}: {
  phase: RobotPhase;
  position?: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const eyeMat = useRef<THREE.MeshStandardMaterial>(null);
  const t0 = useRef(0);

  const target = useMemo(() => {
    switch (phase) {
      case "enter":
        return { y: 0.15, armL: -0.2, armR: -0.2, headTilt: 0, eye: 0.6 };
      case "idle":
        return { y: 0, armL: -0.3, armR: -0.3, headTilt: 0, eye: 0.8 };
      case "reachOut":
        return { y: 0, armL: -0.3, armR: -1.35, headTilt: -0.08, eye: 1 };
      case "react":
        return { y: 0.05, armL: -0.9, armR: -0.9, headTilt: 0.12, eye: 1.6 };
      case "greetBug":
        return { y: 0, armL: -0.6, armR: -0.3, headTilt: -0.15, eye: 1 };
      case "wave":
        return { y: 0, armL: -0.3, armR: -1.7, headTilt: 0.1, eye: 1.2 };
      default:
        return { y: 0, armL: -0.3, armR: -0.3, headTilt: 0, eye: 0.8 };
    }
  }, [phase]);

  useFrame((state, delta) => {
    t0.current += delta;
    const bob = Math.sin(t0.current * 1.6) * 0.05;

    if (group.current) {
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, target.y + bob, 4, delta);
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        Math.sin(t0.current * 0.5) * 0.06,
        4,
        delta
      );
    }
    if (head.current) {
      head.current.rotation.z = THREE.MathUtils.damp(head.current.rotation.z, target.headTilt, 5, delta);
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, Math.sin(t0.current * 0.8) * 0.12, 5, delta);
    }
    if (armL.current) {
      armL.current.rotation.z = THREE.MathUtils.damp(armL.current.rotation.z, target.armL, 5, delta);
    }
    if (armR.current) {
      const wave = phase === "wave" ? Math.sin(t0.current * 8) * 0.25 : 0;
      armR.current.rotation.z = THREE.MathUtils.damp(armR.current.rotation.z, target.armR + wave, 5, delta);
    }
    if (eyeMat.current) {
      eyeMat.current.emissiveIntensity = THREE.MathUtils.damp(
        eyeMat.current.emissiveIntensity,
        target.eye + Math.sin(t0.current * 3) * 0.08,
        4,
        delta
      );
    }
  });

  const hasPhoto = Boolean(profile.photo);

  return (
    <group ref={group} position={position}>
      {/* head */}
      <group ref={head} position={[0, 0.62, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.15} />
        </mesh>
        {/* visor */}
        <mesh position={[0, 0.02, 0.27]}>
          <boxGeometry args={[0.4, 0.16, 0.08]} />
          <meshStandardMaterial color="#0b1310" roughness={0.4} />
        </mesh>
        {hasPhoto ? (
          <RobotFacePhoto />
        ) : (
          <mesh position={[0, 0.02, 0.32]}>
            <boxGeometry args={[0.32, 0.09, 0.02]} />
            <meshStandardMaterial
              ref={eyeMat}
              color={EYE_GLOW}
              emissive={EYE_GLOW}
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
        )}
        {/* antenna */}
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.18, 8]} />
          <meshStandardMaterial color={SHELL_DARK} />
        </mesh>
        <mesh position={[0, 0.48, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1} toneMapped={false} />
        </mesh>
      </group>

      {/* torso */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <capsuleGeometry args={[0.24, 0.28, 8, 16]} />
        <meshStandardMaterial color={SHELL} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.14, 0.2]}>
        <circleGeometry args={[0.09, 24]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.5} toneMapped={false} />
      </mesh>

      {/* arms */}
      <group ref={armL} position={[-0.28, 0.28, 0]}>
        <mesh position={[0, -0.16, 0]} castShadow>
          <capsuleGeometry args={[0.055, 0.28, 6, 12]} />
          <meshStandardMaterial color={SHELL_DARK} roughness={0.45} />
        </mesh>
      </group>
      <group ref={armR} position={[0.28, 0.28, 0]}>
        <mesh position={[0, -0.16, 0]} castShadow>
          <capsuleGeometry args={[0.055, 0.28, 6, 12]} />
          <meshStandardMaterial color={SHELL_DARK} roughness={0.45} />
        </mesh>
      </group>

      {/* floating base ring instead of legs */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.03, 12, 32]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
    </group>
  );
}
