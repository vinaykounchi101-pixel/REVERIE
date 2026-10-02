"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';

const TOTAL_FRAMES = 240;

const HeroFrameCanvas = forwardRef(function HeroFrameCanvas(
  { isReducedMotion = false, onLoadProgress, onReady },
  ref
) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameIndexRef = useRef(0);
  const targetFrameIndexRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const isRenderingRef = useRef(false);
  const lastDrawnImageRef = useRef(null);

  // Draw a specific frame onto the canvas with high-DPI crispness and correct containment
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = contextRef.current;
    if (!ctx) {
      ctx = canvas.getContext('2d', { alpha: true });
      contextRef.current = ctx;
    }
    if (!ctx) return;

    const img = imagesRef.current[frameIndex] || imagesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgAspect = imgW / imgH;
    const canvasAspect = displayWidth / displayHeight;

    let drawW, drawH, drawX, drawY;

    // Mobile vs Desktop responsive containment
    const isMobile = displayWidth <= 768;
    const scaleMultiplier = isMobile ? 0.92 : 0.88;

    if (canvasAspect > imgAspect) {
      drawH = displayHeight * scaleMultiplier;
      drawW = drawH * imgAspect;
    } else {
      drawW = displayWidth * scaleMultiplier;
      drawH = drawW / imgAspect;
    }

    drawX = (displayWidth - drawW) / 2;
    drawY = (displayHeight - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    currentFrameIndexRef.current = frameIndex;
    lastDrawnImageRef.current = img;
  }, []);

  // RAF render scheduler
  const scheduleRender = useCallback((targetIndex) => {
    targetFrameIndexRef.current = targetIndex;
    if (isRenderingRef.current) return;

    isRenderingRef.current = true;
    animFrameIdRef.current = requestAnimationFrame(() => {
      drawFrame(targetFrameIndexRef.current);
      isRenderingRef.current = false;
    });
  }, [drawFrame]);

  // Preload all 240 frames
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const loadAllFrames = async () => {
      const promises = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const frameIndex = i;
        const frameNum = String(i + 1).padStart(3, '0');
        const src = `/hero-sequence/ezgif-frame-${frameNum}.jpg`;

        const img = new Image();
        img.src = src;
        images[frameIndex] = img;

        const p = new Promise((resolve) => {
          img.onload = () => {
            if (isCancelled) return resolve();
            loaded++;
            if (onLoadProgress) {
              onLoadProgress(loaded, TOTAL_FRAMES);
            }
            // Draw initial frame strictly once on start
            if (frameIndex === 0 && currentFrameIndexRef.current === 0 && !lastDrawnImageRef.current) {
              drawFrame(0);
            }
            if (frameIndex === targetFrameIndexRef.current && frameIndex !== 0) {
              drawFrame(targetFrameIndexRef.current);
            }
            resolve();
          };

          img.onerror = () => {
            loaded++;
            if (onLoadProgress) {
              onLoadProgress(loaded, TOTAL_FRAMES);
            }
            resolve();
          };
        });

        promises.push(p);
      }

      imagesRef.current = images;

      await Promise.all(promises);
      if (!isCancelled && onReady) {
        onReady();
      }
    };

    loadAllFrames();

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame, onLoadProgress, onReady]);

  // Expose imperative interface for ScrollTrigger
  useImperativeHandle(ref, () => ({
    setFrame: (frameIdx) => {
      if (isReducedMotion) {
        drawFrame(0);
        return;
      }
      const safeIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIdx));
      scheduleRender(safeIdx);
    },
    updateProgress: (scrollProgress) => {
      if (isReducedMotion) {
        drawFrame(0);
        return;
      }
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      // Hold final frame from 0.88 to 1.00
      const sequenceProgress = Math.min(1, Math.max(0, clampedProgress / 0.88));
      const targetIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(sequenceProgress * (TOTAL_FRAMES - 1)))
      );
      scheduleRender(targetIndex);
    },
    getCurrentFrame: () => currentFrameIndexRef.current,
    getTotalFrames: () => TOTAL_FRAMES,
  }), [isReducedMotion, drawFrame, scheduleRender]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(targetFrameIndexRef.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  return (
    <div className="hero-frame-canvas-container">
      <canvas ref={canvasRef} className="hero-frame-canvas" />
    </div>
  );
});

export default HeroFrameCanvas;
