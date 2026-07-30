"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ==========================================================================
   The catalogue deck.
   Product photographs arranged along an arc, the active one square to the
   camera and its neighbours turned away, over a dark floor.

   The catalogue photography is cut out on a white studio background. Left
   alone that reads as a row of glaring white slabs, so the shader keys the
   near-white out and only the instrument itself is drawn — the rifles hang
   in the dark like they would in a case.

   Textures are requested through Next's image optimizer so they stay
   same-origin, which keeps WebGL out of CORS trouble with the ImageKit CDN.
   ========================================================================== */

const PLANE_W = 1.85;
const PLANE_H = PLANE_W * 0.75; // 4:3
const PLANE_ASPECT = PLANE_W / PLANE_H;
const ARC_RADIUS = 3.6;
const ANGLE_STEP = 0.4;

/* 828 is one of Next's default deviceSizes — the optimizer rejects widths
   that aren't in deviceSizes/imageSizes with a 400. */
const optimized = (src: string) =>
  src.startsWith("/") && !src.startsWith("//")
    ? src
    : `/_next/image?url=${encodeURIComponent(src)}&w=828&q=75`;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uReflect;
  varying vec2 vUv;

  void main() {
    vec4 t = texture2D(uMap, vUv);
    float lum = dot(t.rgb, vec3(0.2126, 0.7152, 0.0722));

    // The studio sweep is bright AND colourless. Testing both means JPEG
    // noise in the background is caught too, while blued steel, anodised
    // blue and chrome — which all carry some tint — are left alone.
    float mx = max(t.r, max(t.g, t.b));
    float mn = min(t.r, min(t.g, t.b));
    float sat = mx - mn;
    float bg = smoothstep(0.72, 0.93, lum) * (1.0 - smoothstep(0.03, 0.14, sat));

    // Hold the sweep back to a warm paper grey. The card still reads as a
    // card — which is what separates one instrument from the next — but it
    // stops behaving like a lit panel on a near-black page.
    vec3 rgb = t.rgb * mix(vec3(1.0), vec3(0.40, 0.39, 0.37), bg);

    // The mirrored copy is flipped, so its strongest edge is vUv.y = 0.
    float a = uOpacity *
      mix(1.0, (1.0 - smoothstep(0.0, 0.55, vUv.y)) * 0.16, uReflect);

    if (a < 0.006) discard;
    gl_FragColor = vec4(rgb, a);
  }
`;

/**
 * Fits the whole photograph inside the plate. Contain rather than cover:
 * with the background keyed out there is no letterboxing to hide, and
 * cropping a rifle is how you lose the muzzle or the buttplate.
 */
function fitTexture(tex: THREE.Texture) {
  const img = tex.image as { width: number; height: number } | undefined;
  if (!img?.width || !img?.height) return;
  const imgAspect = img.width / img.height;

  const rx = imgAspect > PLANE_ASPECT ? 1 : PLANE_ASPECT / imgAspect;
  const ry = imgAspect > PLANE_ASPECT ? imgAspect / PLANE_ASPECT : 1;

  tex.repeat.set(rx, ry);
  tex.offset.set((1 - rx) / 2, (1 - ry) / 2);
  // Sampling runs outside 0–1, so the border pixel is repeated. That border
  // is the white sweep, which the shader keys away.
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
}

/**
 * Loads a photograph without suspending. A plate whose image fails stays
 * blank instead of taking the whole deck down with it.
 */
function useSafeTexture(url: string) {
  const [tex, setTex] = React.useState<THREE.Texture | null>(null);

  React.useEffect(() => {
    if (!url) return;
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    let loaded: THREE.Texture | null = null;

    loader.load(
      optimized(url),
      (t) => {
        if (cancelled) {
          t.dispose();
          return;
        }
        loaded = t;
        fitTexture(t);
        setTex(t);
      },
      undefined,
      () => setTex(null)
    );

    return () => {
      cancelled = true;
      loaded?.dispose();
    };
  }, [url]);

  return tex;
}

function Plate({ url, offset }: { url: string; offset: number }) {
  const group = React.useRef<THREE.Group>(null);
  const frameMat = React.useRef<THREE.MeshBasicMaterial>(null);
  const tex = useSafeTexture(url);

  const [faceMat, echoMat] = React.useMemo(() => {
    const make = (reflect: number) =>
      new THREE.ShaderMaterial({
        uniforms: {
          uMap: { value: null },
          uOpacity: { value: 1 },
          uReflect: { value: reflect },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      });
    return [make(0), make(1)];
  }, []);

  React.useEffect(() => {
    faceMat.uniforms.uMap.value = tex;
    echoMat.uniforms.uMap.value = tex;
  }, [tex, faceMat, echoMat]);

  React.useEffect(
    () => () => {
      faceMat.dispose();
      echoMat.dispose();
    },
    [faceMat, echoMat]
  );

  useFrame(() => {
    if (!group.current) return;
    const d = offset;
    const angle = d * ANGLE_STEP;

    group.current.position.x = Math.sin(angle) * ARC_RADIUS;
    group.current.position.z = Math.cos(angle) * ARC_RADIUS - ARC_RADIUS;
    group.current.rotation.y = -angle * 1.15;

    // The active plate sits slightly proud of the deck.
    const near = Math.max(0, 1 - Math.abs(d));
    group.current.position.y = near * 0.05;
    group.current.scale.setScalar(0.9 + near * 0.1);

    // Neighbours fall back so the eye stays on the centre.
    const vis = THREE.MathUtils.clamp(1 - (Math.abs(d) - 2.2) / 1.1, 0, 1);
    const level = vis * (0.45 + near * 0.55);
    faceMat.uniforms.uOpacity.value = level;
    echoMat.uniforms.uOpacity.value = level;
    if (frameMat.current) frameMat.current.opacity = vis * (0.16 + near * 0.5);
    group.current.visible = vis > 0.01;
  });

  if (!tex) return null;

  return (
    <group ref={group}>
      {/* Hairline edge — the same rule the rest of the site is drawn with */}
      <mesh position={[0, 0, -0.008]}>
        <planeGeometry args={[PLANE_W + 0.022, PLANE_H + 0.022]} />
        <meshBasicMaterial ref={frameMat} color="#6f757d" transparent />
      </mesh>

      <mesh material={faceMat}>
        <planeGeometry args={[PLANE_W, PLANE_H]} />
      </mesh>

      <mesh
        material={echoMat}
        position={[0, -PLANE_H - 0.03, 0]}
        scale={[1, -1, 1]}
      >
        <planeGeometry args={[PLANE_W, PLANE_H]} />
      </mesh>
    </group>
  );
}

function Deck({ urls, active }: { urls: string[]; active: number }) {
  const pos = React.useRef(active);
  const [, force] = React.useReducer((n: number) => n + 1, 0);

  useFrame((_, delta) => {
    const k = 1 - Math.pow(0.0015, delta);
    const next = THREE.MathUtils.lerp(pos.current, active, k);
    if (Math.abs(next - pos.current) > 0.0004) {
      pos.current = next;
      force();
    }
  });

  return (
    <group position={[0, 0.34, 0]}>
      {urls.map((url, i) => (
        <Plate key={`${url}-${i}`} url={url} offset={i - pos.current} />
      ))}
    </group>
  );
}

export default function CoverflowScene({
  urls,
  active,
}: {
  urls: string[];
  active: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      camera={{ position: [0, 0.1, 3.5], fov: 42 }}
      style={{ pointerEvents: "none" }}
    >
      <Deck urls={urls} active={active} />
    </Canvas>
  );
}
