import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HERO_COLORS } from './heroConfig';

/**
 * Creates the high-fidelity 3D Reverie R01 Orion Watch
 * Builds a multi-material horology model with case, dial, hands, crystal, caseback & bracelet,
 * and seamlessly loads external GLB when available.
 */
export function createWatchGroup(onLoaded) {
  const watchGroup = new THREE.Group();
  watchGroup.name = 'ReverieWatch_R01';

  // Master Luxury Materials
  const polishedSteelMat = new THREE.MeshStandardMaterial({
    color: HERO_COLORS.steel,
    metalness: 0.95,
    roughness: 0.12,
    envMapIntensity: 1.5,
  });

  const brushedSteelMat = new THREE.MeshStandardMaterial({
    color: 0xBCBFC4,
    metalness: 0.88,
    roughness: 0.38,
    envMapIntensity: 1.0,
  });

  const goldAccentMat = new THREE.MeshStandardMaterial({
    color: HERO_COLORS.gold,
    metalness: 0.92,
    roughness: 0.18,
    envMapIntensity: 1.4,
  });

  const dialMat = new THREE.MeshStandardMaterial({
    color: HERO_COLORS.dialNavy,
    metalness: 0.45,
    roughness: 0.25,
    envMapIntensity: 0.8,
  });

  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.22,
    roughness: 0.05,
    transmission: 0.92,
    ior: 1.52, // Sapphire IOR
    thickness: 0.3,
    reflectivity: 0.6,
  });

  const rotorGoldMat = new THREE.MeshStandardMaterial({
    color: HERO_COLORS.goldLight,
    metalness: 0.9,
    roughness: 0.25,
  });

  const movementSteelMat = new THREE.MeshStandardMaterial({
    color: 0x8E9196,
    metalness: 0.85,
    roughness: 0.35,
  });

  // 1. MAIN CASE (39.5mm diameter scale)
  const caseGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.45, 64);
  const caseMesh = new THREE.Mesh(caseGeo, brushedSteelMat);
  caseMesh.rotation.x = Math.PI / 2;
  watchGroup.add(caseMesh);

  // 2. BEZEL (Polished Stepped Ring)
  const bezelGeo = new THREE.TorusGeometry(2.02, 0.08, 24, 64);
  const bezelMesh = new THREE.Mesh(bezelGeo, polishedSteelMat);
  watchGroup.add(bezelMesh);

  // Inner Bezel Flange
  const flangeGeo = new THREE.CylinderGeometry(1.92, 1.84, 0.12, 64, 1, true);
  const flangeMesh = new THREE.Mesh(flangeGeo, polishedSteelMat);
  flangeMesh.rotation.x = Math.PI / 2;
  flangeMesh.position.z = 0.16;
  watchGroup.add(flangeMesh);

  // 3. DIAL (Sunburst Navy / Obsidian)
  const dialGeo = new THREE.CircleGeometry(1.84, 64);
  const dialMesh = new THREE.Mesh(dialGeo, dialMat);
  dialMesh.position.z = 0.18;
  watchGroup.add(dialMesh);

  // 4. APPLIED HOUR MARKERS (12 Faceted Batons)
  const markerGroup = new THREE.Group();
  const markerGeo = new THREE.BoxGeometry(0.06, 0.28, 0.04);
  const doubleMarkerGeo = new THREE.BoxGeometry(0.12, 0.30, 0.04);

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 1.58;
    const isTwelve = i === 0;

    const marker = new THREE.Mesh(
      isTwelve ? doubleMarkerGeo : markerGeo,
      i % 3 === 0 ? goldAccentMat : polishedSteelMat
    );

    marker.position.x = Math.sin(angle) * radius;
    marker.position.y = Math.cos(angle) * radius;
    marker.position.z = 0.21;
    marker.rotation.z = -angle;
    markerGroup.add(marker);
  }
  watchGroup.add(markerGroup);

  // 5. INNER CHAPTER RING / MINUTE TRACK
  const trackGeo = new THREE.RingGeometry(1.72, 1.74, 64);
  const trackMat = new THREE.MeshBasicMaterial({
    color: HERO_COLORS.muted,
    transparent: true,
    opacity: 0.4,
  });
  const trackMesh = new THREE.Mesh(trackGeo, trackMat);
  trackMesh.position.z = 0.19;
  watchGroup.add(trackMesh);

  // 6. BRAND BADGE / LOGO TEXTURE SIMULATION
  const brandPlateGeo = new THREE.PlaneGeometry(0.6, 0.15);
  const brandPlateMat = new THREE.MeshBasicMaterial({
    color: HERO_COLORS.ivory,
    transparent: true,
    opacity: 0.75,
  });
  const brandPlate = new THREE.Mesh(brandPlateGeo, brandPlateMat);
  brandPlate.position.set(0, 0.85, 0.20);
  watchGroup.add(brandPlate);

  // 7. FACETED DAUPHINE HANDS
  const handsGroup = new THREE.Group();
  handsGroup.position.z = 0.23;

  // Hour Hand (Set to 10:10 classic horology setting)
  const hourHandGeo = new THREE.ConeGeometry(0.06, 1.0, 4);
  const hourHand = new THREE.Mesh(hourHandGeo, polishedSteelMat);
  hourHand.position.y = 0.42;
  hourHand.rotation.z = 0;

  const hourPivot = new THREE.Group();
  hourPivot.rotation.z = (10 / 12) * Math.PI * 2 + 0.18; // ~10 o'clock
  hourPivot.add(hourHand);
  handsGroup.add(hourPivot);

  // Minute Hand
  const minHandGeo = new THREE.ConeGeometry(0.05, 1.45, 4);
  const minHand = new THREE.Mesh(minHandGeo, polishedSteelMat);
  minHand.position.y = 0.65;

  const minPivot = new THREE.Group();
  minPivot.rotation.z = -(2 / 12) * Math.PI * 2 - 0.18; // ~2 o'clock
  minPivot.add(minHand);
  handsGroup.add(minPivot);

  // Central Seconds Hand (Gold Needle with Counterbalance)
  const secHandGeo = new THREE.CylinderGeometry(0.012, 0.012, 1.7, 8);
  const secHand = new THREE.Mesh(secHandGeo, goldAccentMat);
  secHand.position.y = 0.55;

  const secPivot = new THREE.Group();
  secPivot.name = 'SecondsPivot';
  secPivot.rotation.z = -(4.5 / 12) * Math.PI * 2;
  secPivot.add(secHand);
  handsGroup.add(secPivot);

  // Central Pin Cap
  const centerCapGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
  const centerCap = new THREE.Mesh(centerCapGeo, goldAccentMat);
  centerCap.rotation.x = Math.PI / 2;
  centerCap.position.z = 0.02;
  handsGroup.add(centerCap);

  watchGroup.add(handsGroup);

  // 8. DOUBLE-DOMED SAPPHIRE CRYSTAL
  const crystalGeo = new THREE.SphereGeometry(2.0, 64, 16, 0, Math.PI * 2, 0, Math.PI / 8);
  const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
  crystalMesh.position.z = 0.10;
  watchGroup.add(crystalMesh);

  // 9. ARCHITECTURAL FLUTED CROWN (3 o'clock position)
  const crownGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.28, 24);
  const crownMesh = new THREE.Mesh(crownGeo, polishedSteelMat);
  crownMesh.rotation.z = Math.PI / 2;
  crownMesh.position.set(2.15, 0, 0);
  watchGroup.add(crownMesh);

  // Crown Gem Inset
  const crownGemGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const crownGemMat = new THREE.MeshStandardMaterial({
    color: 0x050811,
    roughness: 0.1,
    metalness: 0.1,
  });
  const crownGem = new THREE.Mesh(crownGemGeo, crownGemMat);
  crownGem.position.set(2.30, 0, 0);
  watchGroup.add(crownGem);

  // 10. SCULPTED INTEGRATED LUGS & ARTICULATED BRACELET
  const braceletGroup = new THREE.Group();

  function createBraceletLink(yOffset, width, isTop) {
    const linkGeo = new THREE.BoxGeometry(width, 0.42, 0.22);
    const link = new THREE.Mesh(linkGeo, brushedSteelMat);
    link.position.y = isTop ? yOffset : -yOffset;
    link.position.z = -0.04 - Math.abs(yOffset) * 0.04;
    link.rotation.x = isTop ? -0.06 : 0.06;

    // Center polished link strip
    const centerStripGeo = new THREE.BoxGeometry(width * 0.38, 0.43, 0.24);
    const centerStrip = new THREE.Mesh(centerStripGeo, polishedSteelMat);
    link.add(centerStrip);

    return link;
  }

  // Top Links
  braceletGroup.add(createBraceletLink(2.25, 1.8, true));
  braceletGroup.add(createBraceletLink(2.68, 1.68, true));
  braceletGroup.add(createBraceletLink(3.08, 1.56, true));
  braceletGroup.add(createBraceletLink(3.46, 1.48, true));

  // Bottom Links
  braceletGroup.add(createBraceletLink(2.25, 1.8, false));
  braceletGroup.add(createBraceletLink(2.68, 1.68, false));
  braceletGroup.add(createBraceletLink(3.08, 1.56, false));
  braceletGroup.add(createBraceletLink(3.46, 1.48, false));

  watchGroup.add(braceletGroup);

  // 11. CASEBACK WITH EXHIBITION SAPPHIRE & ROTOR (Viewable on rotation)
  const casebackGroup = new THREE.Group();
  casebackGroup.position.z = -0.24;

  const casebackRimGeo = new THREE.RingGeometry(1.2, 2.0, 64);
  const casebackRim = new THREE.Mesh(casebackRimGeo, polishedSteelMat);
  casebackRim.rotation.y = Math.PI;
  casebackGroup.add(casebackRim);

  const movementBaseGeo = new THREE.CircleGeometry(1.2, 32);
  const movementBase = new THREE.Mesh(movementBaseGeo, movementSteelMat);
  movementBase.rotation.y = Math.PI;
  movementBase.position.z = 0.01;
  casebackGroup.add(movementBase);

  // Oscillating Rotor (Reverie Gold Skeleton Rotor)
  const rotorGeo = new THREE.RingGeometry(0.2, 1.1, 32, 1, 0, Math.PI);
  const rotor = new THREE.Mesh(rotorGeo, rotorGoldMat);
  rotor.rotation.y = Math.PI;
  rotor.position.z = 0.02;
  rotor.name = 'OscillatingRotor';
  casebackGroup.add(rotor);

  watchGroup.add(casebackGroup);

  // Load external GLB (wristwatch.glb from design folder)
  const loader = new GLTFLoader();
  const modelUrl = '/models/wristwatch.glb';

  loader.load(
    modelUrl,
    (gltf) => {
      const loadedScene = gltf.scene;

      // Center the model at origin (0, 0, 0)
      const box = new THREE.Box3().setFromObject(loadedScene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      loadedScene.position.sub(center);

      // Wrapper group for normalized scale
      const normalizedGroup = new THREE.Group();
      normalizedGroup.add(loadedScene);

      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetScale = 4.4 / (maxDim || 1);
      normalizedGroup.scale.setScalar(targetScale);

      // Fine-tune materials for studio lighting
      loadedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.envMapIntensity = 1.6;
            if (child.material.isMeshStandardMaterial) {
              child.material.needsUpdate = true;
            }
          }
        }
      });

      // Replace procedural placeholder with real 3D model
      while (watchGroup.children.length > 0) {
        watchGroup.remove(watchGroup.children[0]);
      }
      watchGroup.add(normalizedGroup);
      if (onLoaded) onLoaded(true);
    },
    undefined,
    () => {
      // Fallback to internal procedural luxury model if GLB load encounters any issue
      if (onLoaded) onLoaded(false);
    }
  );

  return watchGroup;
}
