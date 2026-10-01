"use client";
import React, { useState, useRef } from 'react';
import { RotateCw, ZoomIn, Move, Maximize, RotateCcw } from 'lucide-react';
import { threeDExperienceData } from '../../data/watchData';
import Button from '../ui/Button';

export default function ThreeDExperience({ onNavigate }) {
  const { eyebrow, title, description, ctaText, image } =
    threeDExperienceData;

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - dragStartRef.current.x) * 0.4;
    const deltaY = (e.clientY - dragStartRef.current.y) * 0.2;
    setRotation((prev) => ({
      x: Math.max(-20, Math.min(20, prev.x - deltaY)),
      y: Math.max(-40, Math.min(40, prev.y + deltaX)),
    }));
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setRotation({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.2 : 1));
  };

  return (
    <section id="threed" className="threed-section">
      <div className="container threed-container">
        {/* Left Column: Narrative */}
        <div className="threed-content">
          <span className="eyebrow eyebrow-dark font-ui">
            {eyebrow}
          </span>
          <h2 className="threed-title font-display">
            {title}
          </h2>
          <p className="threed-description font-ui">
            {description}
          </p>
          <div className="threed-cta-wrap">
            <Button variant="white" onClick={toggleZoom} arrow>
              {ctaText}
            </Button>
          </div>
        </div>

        {/* Center / Right: Interactive Watch Stage */}
        <div
          className="threed-stage"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Transforming Watch Image */}
          <div
            className="threed-watch-wrap"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoomLevel})`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            <img
              src={image}
              alt="REVERIE 3D Watch Model"
              className="threed-watch-image"
              draggable="false"
              loading="lazy"
            />
          </div>

          {/* Understated Minimal Controls Overlay */}
          <div className="threed-minimal-toolbar font-ui">
            <button
              type="button"
              className="threed-toolbar-btn"
              onClick={handleReset}
              title="Rotate / Reset"
            >
              <RotateCw size={14} />
              <span>Rotate</span>
            </button>
            <button
              type="button"
              className={`threed-toolbar-btn ${zoomLevel > 1 ? 'threed-toolbar-btn--active' : ''}`}
              onClick={toggleZoom}
              title="Zoom"
            >
              <ZoomIn size={14} />
              <span>Zoom</span>
            </button>
            <button
              type="button"
              className="threed-toolbar-btn"
              onClick={() => setRotation({ x: 0, y: rotation.y + 15 })}
              title="Pan"
            >
              <Move size={14} />
              <span>Pan</span>
            </button>
            <button
              type="button"
              className="threed-toolbar-btn"
              onClick={toggleZoom}
              title="Fullscreen"
            >
              <Maximize size={14} />
              <span>Full Screen</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

