"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Robot, type RobotPhase } from "./Robot";
import { BugSpider } from "./BugSpider";
import { BugIcon } from "./BugIcon";
import { AppMockup, type AppState } from "./AppMockup";
import { Backdrop } from "./Backdrop";
import { attachContextRecovery } from "./contextRecovery";
import type { IntroStepName } from "./introTimeline";

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

const ROBOT_POS = V(-0.95, -0.15, 0.35);
const APP_POS = V(0.85, 0.25, 0);
const BUG_SPAWN = V(1.05, 0.55, 0.35);
const SPIDER_OFFSTAGE = V(-2.6, -0.35, 0.6);
const SPIDER_AT_BUG = V(0.95, 0.15, 0.5);

const CAMERA_START = V(0.4, 1.6, 7.5);
const CAMERA_MAIN = V(0, 0.25, 4.3);
const CAMERA_CLOSE = V(0.15, 0.35, 3.7);
const CAMERA_OUT = V(0, 0.6, 6.8);

function lerp(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return a.clone().lerp(b, THREE.MathUtils.smoothstep(t, 0, 1));
}

function CameraRig({ stepName, stepProgress }: { stepName: IntroStepName; stepProgress: number }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 0.15, 0));

  useFrame(() => {
    let pos: THREE.Vector3;
    let look = new THREE.Vector3(0, 0.15, 0);

    switch (stepName) {
      case "cameraIn":
        pos = lerp(CAMERA_START, CAMERA_MAIN, stepProgress);
        break;
      case "text1":
      case "text2":
      case "text3":
      case "text4":
        pos = lerp(CAMERA_MAIN, CAMERA_CLOSE, stepName === "text1" ? stepProgress : 1);
        look = ROBOT_POS.clone().add(V(0, 0.5, 0));
        break;
      case "cameraOut":
        pos = lerp(CAMERA_CLOSE, CAMERA_OUT, stepProgress);
        break;
      case "done":
        pos = CAMERA_OUT;
        break;
      default:
        pos = CAMERA_MAIN;
    }

    camera.position.lerp(pos, 0.12);
    lookAt.current.lerp(look, 0.12);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function SceneContent({ stepName, stepProgress }: { stepName: IntroStepName; stepProgress: number }) {
  const robotPhase: RobotPhase = useMemo(() => {
    switch (stepName) {
      case "robotEnter":
      case "appAppear":
        return "enter";
      case "robotReach":
      case "appClick":
        return "reachOut";
      case "appBreak":
      case "bugAppear":
        return "react";
      case "spiderEnter":
      case "spiderCatch":
      case "spiderReturn":
        return "greetBug";
      case "text1":
      case "text2":
        return "idle";
      case "text3":
      case "text4":
        return "wave";
      default:
        return "idle";
    }
  }, [stepName]);

  const appState: AppState = useMemo(() => {
    if (stepName === "appClick") return "clicked";
    if (
      stepName === "appBreak" ||
      stepName === "bugAppear" ||
      stepName === "spiderEnter" ||
      stepName === "spiderCatch" ||
      stepName === "spiderReturn" ||
      stepName === "text1" ||
      stepName === "text2" ||
      stepName === "text3" ||
      stepName === "text4" ||
      stepName === "cameraOut" ||
      stepName === "done"
    )
      return "broken";
    return "normal";
  }, [stepName]);

  const robotVisible = stepName !== "cameraIn";
  const robotEnterT = stepName === "robotEnter" ? stepProgress : robotVisible ? 1 : 0;
  const robotPos = lerp(ROBOT_POS.clone().add(V(-1.5, 0.3, 0)), ROBOT_POS, robotEnterT);

  const appVisible = stepName !== "cameraIn";
  const appEnterT = stepName === "appAppear" ? stepProgress : appVisible ? 1 : 0;

  const spiderActive =
    stepName === "spiderEnter" || stepName === "spiderCatch" || stepName === "spiderReturn";
  let spiderPos = SPIDER_OFFSTAGE;
  if (stepName === "spiderEnter") spiderPos = lerp(SPIDER_OFFSTAGE, SPIDER_AT_BUG, stepProgress);
  else if (stepName === "spiderCatch") spiderPos = SPIDER_AT_BUG;
  else if (stepName === "spiderReturn")
    spiderPos = lerp(SPIDER_AT_BUG, ROBOT_POS.clone().add(V(0, 0.3, 0.4)), stepProgress);

  const bugVisible =
    stepName === "bugAppear" ||
    stepName === "spiderEnter" ||
    stepName === "spiderCatch" ||
    stepName === "spiderReturn";
  let bugPos = BUG_SPAWN;
  if (stepName === "bugAppear") bugPos = BUG_SPAWN;
  else if (stepName === "spiderEnter") bugPos = BUG_SPAWN;
  else if (stepName === "spiderCatch") bugPos = lerp(BUG_SPAWN, SPIDER_AT_BUG, stepProgress);
  else if (stepName === "spiderReturn") bugPos = spiderPos.clone().add(V(0, 0.08, 0));

  return (
    <>
      <Backdrop />

      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 3]} intensity={1.4} castShadow />
      <pointLight position={[-2, 1, 2]} intensity={0.4} color="#ff7a29" />
      <pointLight position={[2, -1, -1]} intensity={0.3} color="#a58bff" />

      <CameraRig stepName={stepName} stepProgress={stepProgress} />

      <group scale={THREE.MathUtils.lerp(0.85, 1, appEnterT)}>
        <AppMockup state={appState} position={[APP_POS.x, APP_POS.y, APP_POS.z]} />
      </group>
      <Robot phase={robotPhase} position={[robotPos.x, robotPos.y, robotPos.z]} />
      <BugSpider active={spiderActive} position={[spiderPos.x, spiderPos.y, spiderPos.z]} scale={0.9} />
      <BugIcon position={[bugPos.x, bugPos.y, bugPos.z]} visible={bugVisible} />

      {/* soft ground shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <shadowMaterial opacity={0.25} />
      </mesh>
    </>
  );
}

export function IntroScene({
  stepName,
  stepProgress,
}: {
  stepName: IntroStepName;
  stepProgress: number;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [CAMERA_START.x, CAMERA_START.y, CAMERA_START.z], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
      onCreated={attachContextRecovery}
    >
      <color attach="background" args={["#070c09"]} />
      <fog attach="fog" args={["#070c09", 7, 19]} />
      <SceneContent stepName={stepName} stepProgress={stepProgress} />
    </Canvas>
  );
}
