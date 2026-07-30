"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ==========================================================================
   The 10m target, built to ISSF geometry.

   An official 10m air pistol face has a 11.5mm ten-ring and each successive
   ring is 16mm larger in diameter, out to 155.5mm at the one-ring. The black
   aiming mark covers rings 7 to 10. Those are the real numbers, normalised
   here so the one-ring sits at radius 1.

   The rings are stepped forward in z as they get smaller, so raking light
   reads the face as a machined gauge rather than a printed sheet — and the
   ten-ring carries the signal red from the Chauhan Sports mark.
   ========================================================================== */

const TEN_RING_MM = 11.5;
const RING_STEP_MM = 16;
const OUTER_MM = TEN_RING_MM + RING_STEP_MM * 9; // 155.5mm at the one-ring

/** Outer radius of ring n (1 = largest), normalised so ring 1 = 1.0 */
const radiusOf = (ring: number) =>
  (TEN_RING_MM + RING_STEP_MM * (10 - ring)) / OUTER_MM;

const PAPER = "#d8d4cb";
const PAPER_EDGE = "#7d7970";
const AIMING_BLACK = "#0e1014";
const AIMING_EDGE = "#4a5058";
const SIGNAL = "#d92d20";

/* How far each ring steps toward the viewer. Enough relief that raking
   light catches every edge once the face is turned away from the camera. */
const RING_STEP_Z = 0.021;

/* The face hangs turned away from the camera, so it reads as a plate in
   space rather than a printed circle. */
const BASE_TILT_Y = 0.66;
const BASE_TILT_X = -0.21;
const BASE_TILT_Z = 0.06;

function TargetFace() {
  const tenRef = React.useRef<THREE.MeshStandardMaterial>(null);
  const flashRef = React.useRef(0);

  // Rings 1 through 9 are annuli; ring 10 is the disc at the centre.
  const annuli = React.useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const ring = i + 1;
        return {
          ring,
          outer: radiusOf(ring),
          inner: radiusOf(ring + 1),
          // Rings 7-10 sit inside the black aiming mark.
          black: ring >= 7,
          z: (ring - 1) * RING_STEP_Z,
        };
      }),
    []
  );

  const tenRadius = radiusOf(10);
  const tenZ = 9 * RING_STEP_Z;

  useFrame((_, delta) => {
    // Decay the bullseye bloom left by a pellet strike.
    if (flashRef.current > 0) {
      flashRef.current = Math.max(0, flashRef.current - delta * 1.6);
    }
    if (tenRef.current) {
      tenRef.current.emissiveIntensity = 0.35 + flashRef.current * 2.4;
    }
  });

  // Exposed so the pellet can register a hit.
  React.useEffect(() => {
    const onHit = () => {
      flashRef.current = 1;
    };
    window.addEventListener("chauhan:pellet-hit", onHit);
    return () => window.removeEventListener("chauhan:pellet-hit", onHit);
  }, []);

  return (
    <group>
      {/* Backing plate the face is pinned to */}
      <mesh position={[0, 0, -0.06]} receiveShadow>
        <circleGeometry args={[1.14, 96]} />
        <meshStandardMaterial color="#1a1d22" roughness={0.55} metalness={0.7} />
      </mesh>

      {/* Bezel */}
      <mesh position={[0, 0, -0.02]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.09, 0.022, 20, 160]} />
        <meshStandardMaterial color="#33383f" roughness={0.3} metalness={0.95} />
      </mesh>

      {/* Scoring rings */}
      {annuli.map(({ ring, outer, inner, black, z }) => (
        <group key={ring}>
          <mesh position={[0, 0, z]}>
            <ringGeometry args={[inner, outer, 128]} />
            <meshStandardMaterial
              color={black ? AIMING_BLACK : PAPER}
              roughness={black ? 0.85 : 0.95}
              metalness={0}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Scoring line — the same hairline device used across the page */}
          <mesh position={[0, 0, z + 0.004]}>
            <ringGeometry args={[inner, inner + 0.011, 128]} />
            <meshBasicMaterial
              color={black ? AIMING_EDGE : PAPER_EDGE}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* The ten-ring — the bullseye from the logo */}
      <mesh position={[0, 0, tenZ]}>
        <circleGeometry args={[tenRadius, 64]} />
        <meshStandardMaterial
          ref={tenRef}
          color={SIGNAL}
          emissive={SIGNAL}
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

/**
 * A single pellet, fired every few seconds. Restrained on purpose: one quiet
 * shot, a thin trace, a brief bloom at the centre.
 */
function Pellet({ active }: { active: boolean }) {
  const group = React.useRef<THREE.Group>(null);
  const trail = React.useRef<THREE.Mesh>(null);
  const state = React.useRef({ t: -2.5, hit: false });

  const CYCLE = 7; // seconds between shots
  const FLIGHT = 0.55; // seconds of visible travel
  const START_Z = 5;

  useFrame((_, delta) => {
    if (!active || !group.current) return;
    const s = state.current;
    s.t += delta;

    if (s.t > CYCLE) {
      s.t = 0;
      s.hit = false;
    }

    const flying = s.t >= 0 && s.t <= FLIGHT;
    group.current.visible = flying;

    if (flying) {
      const p = s.t / FLIGHT;
      // Slight arc in, settling onto the ten-ring.
      const z = START_Z * (1 - p) + 0.14 * p;
      group.current.position.set(0.1 * (1 - p) ** 2, 0.16 * (1 - p) ** 2, z);

      if (trail.current) {
        const len = Math.min(1.6, (START_Z - z) * 0.5);
        trail.current.scale.z = len;
        trail.current.position.z = len / 2;
        (trail.current.material as THREE.MeshBasicMaterial).opacity =
          0.5 * (1 - p);
      }
    } else if (s.t > FLIGHT && !s.hit) {
      s.hit = true;
      window.dispatchEvent(new Event("chauhan:pellet-hit"));
    }
  });

  return (
    <group ref={group} visible={false}>
      <mesh>
        <sphereGeometry args={[0.019, 16, 16]} />
        <meshStandardMaterial
          color="#cfd4da"
          roughness={0.25}
          metalness={1}
          emissive="#8b9199"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={trail} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.0035, 0.0035, 1, 6]} />
        <meshBasicMaterial
          color="#e8d6b0"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Drifts the whole assembly with the pointer, so it reads as a real object. */
function Rig({
  children,
  motion,
}: {
  children: React.ReactNode;
  motion: boolean;
}) {
  const group = React.useRef<THREE.Group>(null);
  const target = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!motion) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [motion]);

  useFrame((s, delta) => {
    if (!group.current) return;
    const k = 1 - Math.pow(0.001, delta);
    const idle = motion ? Math.sin(s.clock.elapsedTime * 0.22) * 0.045 : 0;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      BASE_TILT_Y + target.current.x * 0.18 + idle,
      k
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      BASE_TILT_X + target.current.y * 0.14,
      k
    );
  });

  return (
    <group ref={group} rotation={[BASE_TILT_X, BASE_TILT_Y, BASE_TILT_Z]}>
      {children}
    </group>
  );
}

export default function TargetScene() {
  const [motion, setMotion] = React.useState(true);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      camera={{ position: [0.35, 0, 5.1], fov: 32 }}
      style={{ pointerEvents: "none" }}
    >
      {/* Raking key light rolls across the face and falls off at the far edge */}
      <directionalLight position={[-3.5, 2.5, 2]} intensity={3.4} />
      {/* Cool rim from behind-right separates the plate from the page */}
      <directionalLight position={[4, -1.5, -1]} intensity={1.2} color="#7f9dc9" />
      <ambientLight intensity={0.55} />

      {/* The render loop is left on its default "always". Switching it to
          "demand" for reduced motion leaves the face blank, because nothing
          then invalidates it — a static scene still has to be drawn once. */}
      <Rig motion={motion}>
        <TargetFace />
        <Pellet active={motion} />
      </Rig>
    </Canvas>
  );
}
