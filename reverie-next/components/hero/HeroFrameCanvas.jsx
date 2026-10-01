"use client";
import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';

const TOTAL_FRAMES = 240;
const FRAME_BASE_PATH = '/hero-sequence/ezgif-frame-';

function getFrameUrl(index) {
  const padded = String(index).padStart(3, '0');
  return `${FRAME_BASE_PATH}${padded}.jpg`;
}

const HeroFrameCanvas = forwardRef(function HeroFrameCanvas(
  { isReducedMotion = false, onLoadProgress, onReady },
  ref
) {
  const canvasRef = useRef(null);
  const debugIndicatorRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const lastDrawnImageRef = useRef(null);
  const currentFrameIndexRef = useRef(0);
  const targetFrameIndexRef = useRef(0);
  const renderQueuedRef = useRef(false);

  // High-DPI Canvas Draw Method
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Find target image
    let imgToDraw = null;
    const targetImg = images[frameIdx];

    if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
      imgToDraw = targetImg;
    } else if (lastDrawnImageRef.current && lastDrawnImageRef.current.complete && lastDrawnImageRef.current.naturalWidth > 0) {
      // PERSISTENT CONTINUITY: Always hold the last drawn frame instead of jumping back to frame 0
      imgToDraw = lastDrawnImageRef.current;
    } else {
      // Search immediately adjacent neighbors (±2 frames only)
      for (let offset = 1; offset <= 3; offset++) {
        const prev = frameIdx - offset;
        if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
          imgToDraw = images[prev];
          break;
        }
        const next = frameIdx + offset;
        if (next < TOTAL_FRAMES && images[next] && images[next].complete && images[next].naturalWidth > 0) {
          imgToDraw = images[next];
          break;
        }
      }
    }

    // Safety: If no image is valid at all, DO NOT clear canvas
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      return;
    }

    lastDrawnImageRef.current = imgToDraw;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Contained sizing (Dominant watch focus, luxury negative space)
    const isMobile = displayWidth <= 768;
    const scaleFactor = isMobile ? 0.90 : 0.82;

    const imgWidth = imgToDraw.naturalWidth || 1920;
    const imgHeight = imgToDraw.naturalHeight || 1080;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = displayWidth / displayHeight;

    let renderWidth, renderHeight;
    if (canvasRatio > imgRatio) {
      renderHeight = displayHeight * scaleFactor;
      renderWidth = renderHeight * imgRatio;
    } else {
      renderWidth = displayWidth * scaleFactor;
      renderHeight = renderWidth / imgRatio;
    }

    const offsetX = (displayWidth - renderWidth) / 2;
    const offsetY = (displayHeight - renderHeight) / 2;

    // Background fill
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Draw crisp image
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(imgToDraw, offsetX, offsetY, renderWidth, renderHeight);
    ctx.restore();

    currentFrameIndexRef.current = frameIdx;

    // Update debug indicator text
    if (debugIndicatorRef.current) {
      debugIndicatorRef.current.textContent = `FRAME: ${String(frameIdx + 1).padStart(3, '0')} / ${TOTAL_FRAMES}`;
    }
  }, []);

  // RequestAnimationFrame Render Queue
  const scheduleRender = useCallback((frameIdx) => {
    targetFrameIndexRef.current = frameIdx;
    if (renderQueuedRef.current) return;

    renderQueuedRef.current = true;
    requestAnimationFrame(() => {
      renderQueuedRef.current = false;
      drawFrame(targetFrameIndexRef.current);
    });
  }, [drawFrame]);

  // Preload and decode all 240 frames
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;
    const images = new Array(TOTAL_FRAMES);

    const loadAllFrames = async () => {
      const promises = [];

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const frameIndex = i - 1;
        const img = new Image();
        img.src = getFrameUrl(i);
        images[frameIndex] = img;

        const p = new Promise((resolve) => {
          img.onload = async () => {
            if (isCancelled) return resolve();
            try {
              if (img.decode) {
                await img.decode();
              }
            } catch (err) {
              // Non-blocking decode catch
            }
            loaded++;
            if (onLoadProgress) {
              onLoadProgress(loaded, TOTAL_FRAMES);
            }
            // Draw initial frame strictly once on start
            if (frameIndex === 0 && currentFrameIndexRef.current === 0 && !lastDrawnImageRef.current) {
              drawFrame(0);
            }
            // If newly loaded frame matches current scroll target, redraw it
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

  // Handle Resize
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

      {/* Development Debug Indicator verifying real frame progression */}
      <div 
        ref={debugIndicatorRef}
        className="hero-frame-debug-tag font-mono"
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          padding: '6px 12px',
          background: 'rgba(8, 8, 8, 0.85)',
          border: '1px solid rgba(184, 155, 99, 0.4)',
          color: '#B89B63',
          fontSize: '11px',
          letterSpacing: '0.12em',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        FRAME: 001 / 240
      </div>
    </div>
  );
});

export default HeroFrameCanvas;

