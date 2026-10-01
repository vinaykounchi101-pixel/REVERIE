export const brandData = {
  name: "REVERIE",
  tagline: "Timeless by Design",
  wordmark: "R E V E R I E",
  origin: "Genève • Switzerland",
  year: 2026,
};

export const navigationLinks = [
  { label: "Home", href: "#hero" },
  { label: "Collections", href: "#collections" },
  { label: "Men", href: "#collections" },
  { label: "Women", href: "#collections" },
  { label: "About", href: "#brand-story" },
];

export const heroSlideData = {
  eyebrow: "THE ORION",
  headline: "Timeless\nby Design",
  description:
    "The Orion blends modern craftsmanship with classic elegance. A watch designed for those who value more than just time — they value what it represents.",
  primaryCta: "Explore Collection",
  image: "/assets/hero-watch.jpg",
  slides: ["01", "02", "03"],
  viewModes: [
    { id: "3d", label: "3D View", active: true },
    { id: "360", label: "360° View", active: false },
    { id: "ar", label: "AR Try-On", active: false },
  ],
  variants: [
    { id: "blue", name: "Midnight Navy", color: "#1D3557" },
    { id: "black", name: "Onyx Black", color: "#111215" },
    { id: "rose", name: "Rose Gold", color: "#C59B76" },
  ],
};

export const trustItems = [
  {
    id: "shipping",
    title: "Free Shipping",
    description: "Worldwide delivery",
    iconName: "Truck",
  },
  {
    id: "warranty",
    title: "2 Year Warranty",
    description: "Confidence in every watch",
    iconName: "ShieldCheck",
  },
  {
    id: "returns",
    title: "Easy Returns",
    description: "Hassle-free process",
    iconName: "RotateCcw",
  },
  {
    id: "support",
    title: "Dedicated Support",
    description: "We're here for you",
    iconName: "Headphones",
  },
];

export const collectionsData = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Timeless elegance for every occasion.",
    description: "Timeless elegance for every occasion.",
    referenceCode: "R01 – R05",
    image: "/assets/collection-classic.jpg",
    href: "#featured",
  },
  {
    id: "sport",
    name: "Sport",
    tagline: "Built for adventure. Made for performance.",
    description: "Built for adventure. Made for performance.",
    referenceCode: "R11 – R15",
    image: "/assets/collection-sport.jpg",
    href: "#featured",
  },
  {
    id: "heritage",
    name: "Heritage",
    tagline: "A legacy of craftsmanship. A future of style.",
    description: "A legacy of craftsmanship. A future of style.",
    referenceCode: "R46 – R50",
    image: "/assets/collection-heritage.jpg",
    href: "#featured",
  },
];

export const featuredWatchData = {
  eyebrow: "FEATURED",
  name: "The Orion Automatic",
  price: "$1,299",
  currency: "USD",
  description:
    "A perfect balance of sophistication and performance. The Orion Automatic features a Swiss movement, sapphire crystal and a timeless design.",
  ctaText: "Add to Cart",
  image: "/assets/hero-watch.jpg",
  specifications: [
    { label: "Movement", value: "Swiss Automatic Movement", icon: "Clock" },
    { label: "Crystal", value: "Sapphire Crystal with Anti-Reflective Coating", icon: "Sparkles" },
    { label: "Case & Bracelet", value: "Stainless Steel Case & Bracelet", icon: "Shield" },
    { label: "Water Resistance", value: "Water Resistant (100m / 10 ATM)", icon: "Droplets" },
    { label: "Dimensions", value: "Case Diameter: 41mm | Thickness: 11.2mm", icon: "Maximize2" },
  ],
  variants: [
    { id: "navy", name: "Midnight Navy", color: "#1b2a4a", active: true },
    { id: "black", name: "Obsidian Black", color: "#121316", active: false },
    { id: "steel", name: "Brushed Steel", color: "#c0c4c9", active: false },
    { id: "gold", name: "Warm Champagne", color: "#b89772", active: false },
  ],
};

export const craftsmanshipData = {
  eyebrow: "THE DETAILS",
  title: "Precision in every detail",
  description:
    "From the meticulously finished dial to the hand-polished case, every element is crafted with purpose and precision.",
  ctaText: "Explore Craftsmanship",
  heroImage: "/assets/collection-editorial.jpg",
  details: [
    {
      id: "crown",
      title: "Crown",
      subtitle: "Screw-down crown for enhanced water resistance",
      description: "Machined from high-grade stainless steel with knurled knurling for optimal grip and double gasket seal.",
      image: "/assets/craft-crown.jpg",
    },
    {
      id: "movement",
      title: "Movement",
      subtitle: "Swiss automatic movement with 70h power reserve",
      description: "Self-winding mechanical caliber featuring 21 jewels, perlage finishing, and custom weighted tungsten rotor.",
      image: "/assets/craft-movement.jpg",
    },
    {
      id: "crystal",
      title: "Crystal",
      subtitle: "Sapphire crystal with anti-reflective coating",
      description: "Scratch-resistant synthetic sapphire crystal double-domed with multi-layer inner anti-reflective treatment.",
      image: "/assets/craft-crystal.jpg",
    },
  ],
};

export const threeDExperienceData = {
  eyebrow: "INTERACTIVE 3D EXPERIENCE",
  title: "Explore in real time",
  description:
    "Rotate. Zoom. Discover. Interact with every angle of the watch in stunning 3D precision.",
  ctaText: "Explore 3D Viewer",
  image: "/assets/watch-3d.jpg",
  controls: [
    { id: "rotate", label: "Rotate", icon: "Rotate3d" },
    { id: "zoom", label: "Zoom", icon: "ZoomIn" },
    { id: "pan", label: "Pan", icon: "Move" },
    { id: "fullscreen", label: "Fullscreen", icon: "Maximize" },
  ],
  angles: ["Front View", "Bezel Profile", "Skeleton Caseback", "Lume Illumination"],
};

export const brandStoryData = {
  eyebrow: "OUR HERITAGE",
  title: "More than a watch",
  tagline: "A legacy on your wrist.",
  description:
    "Founded on the relentless pursuit of horological purity, REVERIE creates time instruments that transcend fleeting trends. Each timepiece is an enduring testament to Swiss precision engineering and refined aesthetic restraint.",
  ctaText: "Our Story",
  backgroundImage: "/assets/brand-story.jpg",
};

export const footerData = {
  brand: "REVERIE",
  tagline: "Precision horology crafted for generations.",
  columns: [
    {
      title: "Collections",
      links: [
        { label: "Classic", href: "#collections" },
        { label: "Sport", href: "#collections" },
        { label: "Heritage", href: "#collections" },
        { label: "Chronograph", href: "#collections" },
        { label: "Limited Editions", href: "#collections" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Our Story", href: "#brand-story" },
        { label: "Craftsmanship", href: "#craftsmanship" },
        { label: "Journal", href: "#" },
        { label: "Sustainability", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact", href: "#" },
        { label: "Shipping & Delivery", href: "#" },
        { label: "Returns & Exchanges", href: "#" },
        { label: "2-Year Warranty", href: "#" },
        { label: "Watch Care Guide", href: "#" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} REVERIE. All rights reserved.`,
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Settings", href: "#" },
  ],
};
