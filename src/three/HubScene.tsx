"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  LuHistory,
  LuLayers,
  LuBrainCircuit,
  LuFolderGit2,
  LuFlaskConical,
  LuTrophy,
  LuFileText,
  LuMail,
} from "react-icons/lu";
import { HUB_NODES, scrollToNode } from "./hubNodes";
import { attachContextRecovery } from "./contextRecovery";
import { profile } from "@/lib/data";

const NODE_ICONS = [LuHistory, LuLayers, LuBrainCircuit, LuFolderGit2, LuFlaskConical, LuTrophy, LuFileText, LuMail];

const RADIUS = 2.35;

// Your photo lives once, as its own hero portrait above the name — this hub is a pure
// navigation ring, so its center carries initials/status rather than a second copy of it.
function CentralMark() {
  const ring = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.15;
  });

  return (
    <group>
      <group ref={ring}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.95, 0.025, 16, 64]} />
          <meshStandardMaterial color="#ff7a29" emissive="#ff7a29" emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
      </group>
      <mesh>
        <circleGeometry args={[0.88, 48]} />
        <meshStandardMaterial color="#101a14" roughness={0.6} />
      </mesh>
      {/*
        Rendered as a real DOM element anchored to this 3D point (via drei's Html), not a WebGL
        mesh. The torus + circle meshes above give this a glow when WebGL paints correctly, but
        some GPUs/drivers fail to paint the canvas at all; when that happens the DOM layer here
        still looks intentional (dark ring + dark disc) instead of leaving a bare white gap.
      */}
      <Html center distanceFactor={6} position={[0, 0, 0.01]} occlude={false}>
        <div className="relative flex h-[168px] w-[168px] select-none items-center justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-full opacity-90 blur-[2px]"
            style={{ background: "conic-gradient(from 90deg, #ff7a29, #a58bff, #ff7a29)" }}
          />
          <div className="pointer-events-none relative flex h-[168px] w-[168px] flex-col items-center justify-center gap-1 overflow-hidden rounded-full border-2 border-[#101a14] bg-[#101a14]">
            <span className="font-display text-4xl font-bold text-[#e8f3ec]">{profile.initials}</span>
            <span className="font-display text-[10px] uppercase tracking-wide text-[#8fa89a]">open to roles</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

function Node({
  index,
  total,
  label,
  Icon,
  targetId,
}: {
  index: number;
  total: number;
  label: string;
  Icon: (typeof NODE_ICONS)[number];
  targetId: string;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const angleOffset = useRef(0);

  useFrame((state, delta) => {
    angleOffset.current += delta * 0.08;
    const angle = (index / total) * Math.PI * 2 + angleOffset.current;
    const x = Math.cos(angle) * RADIUS;
    const y = Math.sin(angle) * RADIUS * 0.62;
    const z = Math.sin(angle) * 0.4;
    if (group.current) {
      group.current.position.set(x, y, z);
      const s = THREE.MathUtils.damp(group.current.scale.x, hovered ? 1.18 : 1, 6, delta);
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <Html center distanceFactor={7} occlude={false}>
        <button
          type="button"
          onClick={() => scrollToNode(targetId)}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-label={`Go to ${label}`}
          className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3.5 py-3 font-display text-[11px] backdrop-blur-sm transition-colors cursor-pointer ${
            hovered
              ? "border-[#ff7a29]/60 bg-[#101a14]/95 text-[#ff7a29] shadow-[0_0_24px_rgba(255,122,41,0.35)]"
              : "border-white/10 bg-[#0e1712]/85 text-[#c7d8ce]"
          }`}
        >
          <Icon size={18} aria-hidden />
          {label}
        </button>
      </Html>
    </group>
  );
}

function HubContent() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  const nodes = useMemo(
    () => HUB_NODES.map((n, i) => ({ ...n, Icon: NODE_ICONS[i % NODE_ICONS.length] })),
    []
  );

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 3]} intensity={0.6} color="#ff7a29" />
      <pointLight position={[-2, -1, 2]} intensity={0.4} color="#a58bff" />
      <CentralMark />
      {nodes.map((n, i) => (
        <Node key={n.id} index={i} total={nodes.length} label={n.label} Icon={n.Icon} targetId={n.targetId} />
      ))}
    </group>
  );
}

export function HubScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
      style={{ touchAction: "pan-y" }}
      onCreated={attachContextRecovery}
    >
      <HubContent />
    </Canvas>
  );
}
