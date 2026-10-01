import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createWatchGroup } from './HeroWatchModel';
import { HERO_COLORS } from './heroConfig';

export default function HeroScene3D({ scrollProgress = 0, isReducedMotion = false, onSceneReady }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const watchGroupRef = useRef(null);
  const reqIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const [isLoading, setIsLoading] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      setIsLoading(false);
      return;
    }

    // 1. SCENE CREATION
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. CAMERA SETUP (38° FOV for luxury telephoto watch look)
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);
    cameraRef.current = camera;

    // 3. RENDERER SETUP (DPR Capped per Section 21)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    const isMobile = window.innerWidth <= 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.8));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. STUDIO LIGHTING (Key, Fill, Rim & Ambient)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Key Light (Top-Left Warm Studio)
    const keyLight = new THREE.DirectionalLight(0xfff8ed, 2.4);
    keyLight.position.set(-4, 5, 6);
    scene.add(keyLight);

    // Fill Light (Bottom-Right Steel Tonal)
    const fillLight = new THREE.DirectionalLight(0xdde5f0, 1.2);
    fillLight.position.set(5, -3, 4);
    scene.add(fillLight);

    // Rim Light (Top-Back High-Lustre Edge)
    const rimLight = new THREE.DirectionalLight(0xd2b77c, 3.2);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Crown Specular Spot
    const crownSpot = new THREE.PointLight(0xffffff, 1.5, 10);
    crownSpot.position.set(3.5, 0, 2);
    scene.add(crownSpot);

    // 5. ATTACH WATCH GROUP
    const watchGroup = createWatchGroup(() => {
      setIsLoading(false);
      if (onSceneReady) onSceneReady();
    });
    watchGroup.position.set(0, -0.2, 0);
    watchGroup.rotation.set(0.1, -0.2, 0.05);
    scene.add(watchGroup);
    watchGroupRef.current = watchGroup;

    // Pointer move listener for subtle parallax
    const handleMouseMove = (e) => {
      if (isReducedMotion) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.15;
      mouseRef.current.targetY = ny * 0.12;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 6. RENDER LOOP (Decoupled from React State for 60fps)
    let clock = new THREE.Clock();
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Continuous subtle tick of seconds hand
      if (watchGroup) {
        const secPivot = watchGroup.getObjectByName('SecondsPivot');
        if (secPivot) {
          secPivot.rotation.z -= delta * (Math.PI / 30); // Real continuous smooth sweep
        }
        const rotor = watchGroup.getObjectByName('OscillatingRotor');
        if (rotor) {
          rotor.rotation.z += delta * 0.4;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // CLEANUP ON UNMOUNT (Section 20 of Master Spec)
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [isReducedMotion]);

  // UPDATE SCENE BASED ON SCROLL FILM STORYBOARD (Sections 10 & 11)
  useEffect(() => {
    const watch = watchGroupRef.current;
    const camera = cameraRef.current;
    if (!watch || !camera || isReducedMotion) return;

    const p = Math.max(0, Math.min(1, scrollProgress));

    // Phase 1: 0% - 15% (Arrival — emergence from darkness)
    // Phase 2: 15% - 35% (Hero Reveal — dominant front/three-quarter)
    // Phase 3: 35% - 55% (Craftsmanship — camera close-up on dial/bevels)
    // Phase 4: 55% - 75% (Rotation — 9.8mm profile & architectural crown)
    // Phase 5: 75% - 90% (Caseback — rear exhibition sapphire & movement)
    // Phase 6: 90% - 100% (Final Composition — settles into ecommerce pose and releases)

    if (p <= 0.15) {
      // Phase 1: Arrival
      const localP = p / 0.15;
      watch.rotation.set(
        0.25 - localP * 0.15 + mouseRef.current.y,
        -0.45 + localP * 0.25 + mouseRef.current.x,
        0.04
      );
      watch.position.set(0, -0.6 + localP * 0.4, 0);
      camera.position.set(0, 0, 10.5 - localP * 1.3);
    } else if (p <= 0.35) {
      // Phase 2: Hero Reveal
      const localP = (p - 0.15) / 0.20;
      watch.rotation.set(
        0.10 - localP * 0.05 + mouseRef.current.y,
        -0.20 + localP * 0.20 + mouseRef.current.x,
        0.02
      );
      watch.position.set(0, -0.2 + localP * 0.2, 0);
      camera.position.set(0, 0, 9.2 - localP * 0.4);
    } else if (p <= 0.55) {
      // Phase 3: Craftsmanship & Dial Close-Up
      const localP = (p - 0.35) / 0.20;
      watch.rotation.set(
        0.05 + localP * 0.12 + mouseRef.current.y,
        0.0 + localP * 0.45 + mouseRef.current.x,
        -localP * 0.08
      );
      watch.position.set(-localP * 0.85, -localP * 0.25, 0);
      camera.position.set(0, 0, 8.8 - localP * 2.0); // Dolly in
    } else if (p <= 0.75) {
      // Phase 4: Rotation & Side Profile
      const localP = (p - 0.55) / 0.20;
      watch.rotation.set(
        0.17 - localP * 0.07 + mouseRef.current.y,
        0.45 + localP * (Math.PI * 0.45) + mouseRef.current.x,
        -0.08 + localP * 0.12
      );
      watch.position.set(-0.85 + localP * 0.9, -0.25 + localP * 0.25, 0);
      camera.position.set(0, 0, 6.8 + localP * 1.2);
    } else if (p <= 0.90) {
      // Phase 5: Exhibition Caseback
      const localP = (p - 0.75) / 0.15;
      const rotY = 0.45 + Math.PI * 0.45 + localP * (Math.PI * 0.55);
      watch.rotation.set(
        0.10 + localP * 0.05 + mouseRef.current.y,
        rotY + mouseRef.current.x,
        0.04
      );
      watch.position.set(0.05 + localP * 0.5, localP * 0.1, 0);
      camera.position.set(0, 0, 8.0 + localP * 0.5);
    } else {
      // Phase 6: Final Product Composition & Exit Transition
      const localP = (p - 0.90) / 0.10;
      watch.rotation.set(
        0.15 - localP * 0.05 + mouseRef.current.y,
        Math.PI * 2 - 0.25 * (1 - localP) + mouseRef.current.x,
        0
      );
      watch.position.set(0.55 - localP * 0.55, 0.1 - localP * 0.4, 0);
      camera.position.set(0, 0, 8.5 + localP * 0.7);
    }
  }, [scrollProgress, isReducedMotion]);

  if (!webglSupported) {
    return (
      <div className="hero-fallback-stage">
        <img
          src="/assets/hero-watch.jpg"
          alt="REVERIE R01 Orion"
          className="hero-fallback-image"
        />
      </div>
    );
  }

  return (
    <div className="hero-3d-scene-container" ref={containerRef}>
      {isLoading && (
        <div className="hero-3d-loader font-mono">
          <span className="hero-loader-brand">REVERIE</span>
          <span className="hero-loader-text">CALIBRATING TIMEPIECE...</span>
        </div>
      )}
    </div>
  );
}
