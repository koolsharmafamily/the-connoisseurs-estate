"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

interface SignatureScene3DProps {
  className?: string;
  onSceneReady?: () => void;
}

export default function SignatureScene3D({
  className = "",
  onSceneReady,
}: SignatureScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);

      // Check WebGL availability
      try {
        const testCanvas = document.createElement("canvas");
        const gl =
          testCanvas.getContext("webgl") ||
          testCanvas.getContext("experimental-webgl");
        if (!gl) {
          setHasWebGL(false);
          return () => mediaQuery.removeEventListener("change", listener);
        }
      } catch {
        setHasWebGL(false);
        return () => mediaQuery.removeEventListener("change", listener);
      }

      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  useEffect(() => {
    if (!hasWebGL || reducedMotion || !canvasRef.current || !containerRef.current) {
      setIsLoaded(true);
      if (onSceneReady) onSceneReady();
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;

    let animationFrameId: number;
    let isVisible = true;

    // SCENE SETUP
    const scene = new THREE.Scene();

    // CAMERA
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    camera.position.set(0, 0.1, 4.2);

    // RENDERER
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
    } catch {
      setHasWebGL(false);
      return;
    }

    // LIGHTING: Warm, intimate palazzo gallery atmosphere
    // Ambient light - gentle warm fill
    const ambientLight = new THREE.AmbientLight(0xf4efe6, 0.7);
    scene.add(ambientLight);

    // Directional raking light (simulating afternoon light from a high Tuscan window)
    const keyLight = new THREE.DirectionalLight(0xffecd0, 2.4);
    keyLight.position.set(3.5, 4.0, 3.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Soft warm brass rim light
    const rimLight = new THREE.DirectionalLight(0xa58a58, 0.9);
    rimLight.position.set(-3.0, -1.0, 1.5);
    scene.add(rimLight);

    // Subtle candle/lamp fill
    const pointLight = new THREE.PointLight(0xffdfa8, 1.2, 8, 2);
    pointLight.position.set(-1.5, 1.8, 2.0);
    scene.add(pointLight);

    // 3D OBJECT: THE PATINATED ANTIQUE FRAME & CANVAS
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // MATERIALS
    // Antique patinated gilt brass moulding material
    const giltMaterial = new THREE.MeshStandardMaterial({
      color: 0xa58850,
      roughness: 0.52,
      metalness: 0.68,
      bumpScale: 0.05,
    });

    // Dark aged walnut backing material
    const walnutMaterial = new THREE.MeshStandardMaterial({
      color: 0x35251f,
      roughness: 0.75,
      metalness: 0.1,
    });

    // Inner ebony bevel
    const ebonyMaterial = new THREE.MeshStandardMaterial({
      color: 0x181412,
      roughness: 0.6,
      metalness: 0.2,
    });

    // FRAME DIMENSIONS
    const innerW = 1.55;
    const innerH = 2.05;
    const mouldingW = 0.16;
    const mouldingD = 0.09;
    const outerW = innerW + mouldingW * 2;
    const outerH = innerH + mouldingW * 2;

    // Dark walnut backboard
    const backGeo = new THREE.BoxGeometry(outerW + 0.08, outerH + 0.08, 0.03);
    const backMesh = new THREE.Mesh(backGeo, walnutMaterial);
    backMesh.position.z = -0.04;
    backMesh.receiveShadow = true;
    masterGroup.add(backMesh);

    // Outer Gilt Frame Bars (Top, Bottom, Left, Right)
    // Top Bar
    const topBar = new THREE.Mesh(
      new THREE.BoxGeometry(outerW, mouldingW, mouldingD),
      giltMaterial
    );
    topBar.position.set(0, innerH / 2 + mouldingW / 2, 0);
    topBar.castShadow = true;
    masterGroup.add(topBar);

    // Bottom Bar
    const bottomBar = new THREE.Mesh(
      new THREE.BoxGeometry(outerW, mouldingW, mouldingD),
      giltMaterial
    );
    bottomBar.position.set(0, -innerH / 2 - mouldingW / 2, 0);
    bottomBar.castShadow = true;
    masterGroup.add(bottomBar);

    // Left Bar
    const leftBar = new THREE.Mesh(
      new THREE.BoxGeometry(mouldingW, innerH, mouldingD),
      giltMaterial
    );
    leftBar.position.set(-innerW / 2 - mouldingW / 2, 0, 0);
    leftBar.castShadow = true;
    masterGroup.add(leftBar);

    // Right Bar
    const rightBar = new THREE.Mesh(
      new THREE.BoxGeometry(mouldingW, innerH, mouldingD),
      giltMaterial
    );
    rightBar.position.set(innerW / 2 + mouldingW / 2, 0, 0);
    rightBar.castShadow = true;
    masterGroup.add(rightBar);

    // Inner ebony bevel step
    const bevelStepW = 0.035;
    const bevelStepD = 0.04;
    const innerBevelMat = ebonyMaterial;

    const innerTop = new THREE.Mesh(
      new THREE.BoxGeometry(innerW + bevelStepW * 2, bevelStepW, bevelStepD),
      innerBevelMat
    );
    innerTop.position.set(0, innerH / 2 - bevelStepW / 2, 0.02);
    masterGroup.add(innerTop);

    const innerBottom = new THREE.Mesh(
      new THREE.BoxGeometry(innerW + bevelStepW * 2, bevelStepW, bevelStepD),
      innerBevelMat
    );
    innerBottom.position.set(0, -innerH / 2 + bevelStepW / 2, 0.02);
    masterGroup.add(innerBottom);

    // CANVAS WITH MASTER PORTRAIT
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/images/master-portrait-canvas.jpg",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.generateMipmaps = true;

        const canvasGeo = new THREE.PlaneGeometry(innerW - 0.04, innerH - 0.04);
        const canvasMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.82,
          metalness: 0.04,
        });

        const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
        canvasMesh.position.z = 0.01;
        canvasMesh.receiveShadow = true;
        masterGroup.add(canvasMesh);

        setIsLoaded(true);
        if (onSceneReady) onSceneReady();
      },
      undefined,
      () => {
        // Fallback color if image texture fails
        const canvasGeo = new THREE.PlaneGeometry(innerW - 0.04, innerH - 0.04);
        const canvasMat = new THREE.MeshStandardMaterial({
          color: 0x2a1e18,
          roughness: 0.85,
        });
        const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
        masterGroup.add(canvasMesh);
        setIsLoaded(true);
        if (onSceneReady) onSceneReady();
      }
    );

    // INITIAL POSITIONING & ROTATION: Slightly resting, dignified angle
    masterGroup.rotation.x = -0.04;
    masterGroup.rotation.y = 0.06;
    masterGroup.position.set(0.7, 0, 0);

    // POINTER INTERACTION: Subtle, restrained tilt
    const targetRotation = { x: -0.04, y: 0.06 };
    const currentRotation = { x: -0.04, y: 0.06 };
    let scrollYOffset = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      // Restrained tilt angle: max ~3.5 degrees
      targetRotation.y = 0.06 + normX * 0.12;
      targetRotation.x = -0.04 - normY * 0.09;
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      scrollYOffset = Math.min(scrolled / 900, 1.2);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;

        // Adjust camera distance for mobile screens
        if (width < 768) {
          camera.position.z = 5.6;
          masterGroup.position.x = 0;
        } else if (width < 1024) {
          camera.position.z = 4.8;
          masterGroup.position.x = 0.35;
        } else {
          camera.position.z = 4.2;
          masterGroup.position.x = 0.7;
        }

        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // INTERSECTION OBSERVER: Pause when offscreen to save 100% resources
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // VISIBILITY CHANGE (Tab hidden)
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // ANIMATION LOOP
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Smooth lerp pointer tilt
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      // Apply subtle scroll-driven camera shift
      masterGroup.rotation.x = currentRotation.x + scrollYOffset * 0.06;
      masterGroup.rotation.y = currentRotation.y - scrollYOffset * 0.08;
      masterGroup.position.y = -scrollYOffset * 0.35;

      // Soft light sway
      keyLight.position.x = 3.5 + Math.sin(Date.now() * 0.0008) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Dispose Three.js resources
      renderer.dispose();
      giltMaterial.dispose();
      walnutMaterial.dispose();
      ebonyMaterial.dispose();
    };
  }, [hasWebGL, reducedMotion, onSceneReady]);

  // STATIC POSTER FALLBACK if WebGL is unavailable or reduced-motion is requested
  if (!hasWebGL || reducedMotion) {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
        aria-label="Framed Italian Old Master portrait resting on aged walnut surface"
      >
        <div className="relative w-full max-w-md aspect-[3/4] p-4 bg-walnut-dark shadow-2xl border border-brass/30">
          <div className="relative w-full h-full border-4 border-brass/50 overflow-hidden shadow-inner">
            <Image
              src="/images/master-portrait-canvas.jpg"
              alt="Italian Renaissance Master portrait of a gentleman connoisseur in dark velvet doublet"
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none pointer-events-none ${className}`}
      aria-label="Interactive 3D patinated antique frame with Old Master portrait"
      role="img"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-1000 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border border-brass/30 border-t-brass animate-spin rounded-full" />
        </div>
      )}
    </div>
  );
}
