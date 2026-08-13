import type { RootState } from "@react-three/fiber";

/**
 * By default, browsers only *attempt* to restore a lost WebGL context if the app calls
 * preventDefault() on the 'webglcontextlost' event — otherwise the loss is treated as
 * permanent and the canvas stays blank forever. R3F's <Canvas> doesn't do this for you,
 * so without this, any context loss (GPU driver hiccup, tab backgrounding, low-VRAM
 * devices, too many concurrent WebGL contexts) permanently blanks the scene.
 */
export function attachContextRecovery(state: RootState) {
  const canvas = state.gl.domElement;

  const handleLost = (event: Event) => {
    event.preventDefault();
    console.warn("[three] WebGL context lost — attempting recovery");
  };

  const handleRestored = () => {
    console.info("[three] WebGL context restored");
    state.gl.forceContextRestore?.();
    state.invalidate();
  };

  canvas.addEventListener("webglcontextlost", handleLost, false);
  canvas.addEventListener("webglcontextrestored", handleRestored, false);
}
