/**
 * REVERIE — 3D Hero Master Configuration
 * Conforms to Reverie_Antigravity_3D_Hero_Master_Spec_V1.0
 */

export const REVERIE_ORION_DATA = {
  id: "r01",
  ref: "R01 — ORION",
  name: "REVERIE NO. 01",
  tagline: "AUTOMATIC MECHANICAL WATCH",
  price: "$4,800",
  calibre: "Calibre R-101 Ultra-Thin Automatic",
  dimensions: "39.5mm • 9.8mm Profile",
  reserve: "52 Hours Power Reserve",
  crystal: "Double-Curved Sapphire with Anti-Reflective Coating",
  caseMaterial: "316L High-Lustre Marine Grade Stainless Steel",
  waterResistance: "50 Meters (5 ATM)",
  modelPath: "/models/wristwatch.glb",
  fallbackImage: "/assets/hero-watch.jpg",
};

export const HERO_COLORS = {
  obsidian: 0x080808,
  charcoal: 0x111111,
  surface: 0x151515,
  surfaceElevated: 0x1C1C1C,
  ivory: 0xF4F1EA,
  warmWhite: 0xE9E5DC,
  muted: 0xA5A29B,
  subtle: 0x6F6D68,
  gold: 0xB89B63,
  goldLight: 0xD2B77C,
  steel: 0xD6D8DB,
  steelDark: 0x4A4D52,
  dialNavy: 0x0A1118,
};

export const SCROLL_PHASES = {
  arrival: { start: 0, end: 0.15 },
  heroLock: { start: 0.15, end: 0.35 },
  detailReveal: { start: 0.35, end: 0.55 },
  mechanicalReveal: { start: 0.55, end: 0.75 },
  productStory: { start: 0.75, end: 0.90 },
  exitTransition: { start: 0.90, end: 1.0 },
};
