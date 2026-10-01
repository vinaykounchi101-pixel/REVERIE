// Full Product Catalog with Crystal Clear Multi-Angle High-Resolution Assets
// Every watch contains a multi-angle gallery (Front, 45-deg Angle, On-Wrist, Movement, Crown/Crystal)

export const allWatchCatalog = [
  // =========================================================================
  // MEN'S COLLECTION (V-SERIES)
  // =========================================================================

  // V-001: Classic Royale Blue
  {
    id: "v-001",
    ref: "V-001",
    name: "Velara Classic Royale Blue",
    gender: "Men",
    collection: "Classic",
    category: "Classic",
    price: 1250,
    priceFormatted: "$1,250",
    rating: 4.9,
    reviewsCount: 86,
    shortDesc: "Steel case with royal navy sunburst dial, faceted indices and blue alligator leather strap.",
    image: "/assets/watch-classic-blue-front.jpg",
    gallery: [
      "/assets/watch-classic-blue-front.jpg",
      "/assets/watch-classic-blue-side.jpg",
      "/assets/watch-classic-blue-wrist.jpg",
      "/assets/craft-movement.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#1D3557", "#111215", "#D6C5A9"],
    straps: ["Leather", "Steel"],
    inStock: true,
    specs: { caseDiameter: "40mm", thickness: "9.8mm", caseMaterial: "316L Stainless Steel", movement: "Calibre V-101 Ultra-Thin Automatic", powerReserve: "48 Hours", crystal: "Double-domed Sapphire with Multi-AR", waterResistance: "50m (5 ATM)", strapWidth: "20mm" }
  },

  // V-002: Classic Rose Gold
  {
    id: "v-002",
    ref: "V-002",
    name: "Velara Classic 18k Rose Gold",
    gender: "Men",
    collection: "Heritage",
    category: "Classic",
    price: 1450,
    priceFormatted: "$1,450",
    rating: 4.9,
    reviewsCount: 62,
    shortDesc: "Polished 18k rose gold case with champagne dial, Roman numerals, and dark alligator strap.",
    image: "/assets/watch-heritage-gold-front.jpg",
    gallery: [
      "/assets/watch-heritage-gold-front.jpg",
      "/assets/collection-heritage.jpg",
      "/assets/watch-classic-blue-wrist.jpg",
      "/assets/craft-movement.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#D6C5A9", "#111215"],
    straps: ["Leather"],
    inStock: true,
    specs: { caseDiameter: "39mm", thickness: "9.5mm", caseMaterial: "18k 5N Rose Gold Plated Steel", movement: "Calibre V-102 Automatic", powerReserve: "48 Hours", crystal: "Domed Sapphire Crystal", waterResistance: "50m (5 ATM)", strapWidth: "20mm" }
  },

  // V-003: Classic Obsidian Black
  {
    id: "v-003",
    ref: "V-003",
    name: "Velara Classic Obsidian Black",
    gender: "Men",
    collection: "Classic",
    category: "Classic",
    price: 1190,
    priceFormatted: "$1,190",
    rating: 4.8,
    reviewsCount: 45,
    shortDesc: "Brushed steel case with deep obsidian black dial and black leather strap.",
    image: "/assets/collection-classic.jpg",
    gallery: [
      "/assets/collection-classic.jpg",
      "/assets/watch-classic-blue-side.jpg",
      "/assets/watch-classic-blue-wrist.jpg",
      "/assets/craft-crystal.jpg"
    ],
    dialColors: ["#111215", "#1D3557"],
    straps: ["Leather", "Steel"],
    inStock: true,
    specs: { caseDiameter: "40mm", thickness: "9.6mm", caseMaterial: "316L Stainless Steel", movement: "Calibre V-101 Automatic", powerReserve: "48 Hours", crystal: "Flat Sapphire with AR", waterResistance: "50m (5 ATM)", strapWidth: "20mm" }
  },

  // V-004: Classic Opaline Silver
  {
    id: "v-004",
    ref: "V-004",
    name: "Velara Classic Opaline Silver",
    gender: "Men",
    collection: "Classic",
    category: "Classic",
    price: 1220,
    priceFormatted: "$1,220",
    rating: 4.8,
    reviewsCount: 39,
    shortDesc: "Subtle opaline silver dial with heat-blued steel hands and dark leather strap.",
    image: "/assets/watch-classic-blue-side.jpg",
    gallery: [
      "/assets/watch-classic-blue-side.jpg",
      "/assets/watch-classic-blue-front.jpg",
      "/assets/watch-classic-blue-wrist.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#E2DFD8", "#111215"],
    straps: ["Leather"],
    inStock: true,
    specs: { caseDiameter: "39.5mm", thickness: "9.4mm", caseMaterial: "316L Stainless Steel", movement: "Calibre V-101 Automatic", powerReserve: "48 Hours", crystal: "Double-domed Sapphire", waterResistance: "50m (5 ATM)", strapWidth: "20mm" }
  },

  // V-005: Automatique Sunburst
  {
    id: "v-005",
    ref: "V-005",
    name: "Velara Automatique Sunburst",
    gender: "Men",
    collection: "Classic",
    category: "Automatic",
    price: 1380,
    priceFormatted: "$1,380",
    rating: 4.9,
    reviewsCount: 71,
    shortDesc: "Radial guilloché sunburst dial with exhibition sapphire caseback.",
    image: "/assets/watch-classic-blue-front.jpg",
    gallery: [
      "/assets/watch-classic-blue-front.jpg",
      "/assets/watch-classic-blue-side.jpg",
      "/assets/craft-movement.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#1B3150", "#111215"],
    straps: ["Leather", "Steel"],
    inStock: true,
    specs: { caseDiameter: "40mm", thickness: "10.2mm", caseMaterial: "316L Stainless Steel", movement: "Calibre V-200 Exhibition Automatic", powerReserve: "55 Hours", crystal: "Sapphire Crystal", waterResistance: "50m (5 ATM)", strapWidth: "20mm" }
  },

  // V-006: Automatique Silver Steel
  {
    id: "v-006",
    ref: "V-006",
    name: "Velara Automatique Silver Steel",
    gender: "Men",
    collection: "Classic",
    category: "Automatic",
    price: 1350,
    priceFormatted: "$1,350",
    rating: 4.8,
    reviewsCount: 53,
    shortDesc: "Monochrome silver dial with satin-brushed steel link bracelet.",
    image: "/assets/hero-watch.jpg",
    gallery: [
      "/assets/hero-watch.jpg",
      "/assets/watch-classic-blue-wrist.jpg",
      "/assets/craft-crystal.jpg"
    ],
    dialColors: ["#DCD9D3", "#111215"],
    straps: ["Steel", "Leather"],
    inStock: true,
    specs: { caseDiameter: "40mm", thickness: "10.0mm", caseMaterial: "316L Stainless Steel", movement: "Calibre V-200 Automatic", powerReserve: "55 Hours", crystal: "Sapphire Crystal", waterResistance: "50m (5 ATM)", strapWidth: "20mm" }
  },

  // V-008: Open-Heart Automatique
  {
    id: "v-008",
    ref: "V-008",
    name: "Velara Open-Heart Automatique",
    gender: "Men",
    collection: "Signature",
    category: "Automatic",
    price: 1650,
    priceFormatted: "$1,650",
    rating: 5.0,
    reviewsCount: 54,
    shortDesc: "Dial aperture revealing the balance wheel in continuous mechanical motion.",
    image: "/assets/craft-movement.jpg",
    gallery: [
      "/assets/craft-movement.jpg",
      "/assets/craft-crystal.jpg",
      "/assets/watch-classic-blue-front.jpg"
    ],
    dialColors: ["#111215", "#8D7C6D"],
    straps: ["Leather", "Steel"],
    inStock: true,
    specs: { caseDiameter: "41mm", thickness: "10.8mm", caseMaterial: "316L Stainless Steel", movement: "Calibre V-210 Open Heart", powerReserve: "60 Hours", crystal: "Sapphire Crystal", waterResistance: "50m (5 ATM)", strapWidth: "20mm" }
  },

  // V-009: Chrono Panda Vintage
  {
    id: "v-009",
    ref: "V-009",
    name: "Velara Chrono Panda Vintage",
    gender: "Men",
    collection: "Sport",
    category: "Chronograph",
    price: 1720,
    priceFormatted: "$1,720",
    rating: 4.9,
    reviewsCount: 98,
    shortDesc: "Dual-register vintage panda layout with black counters and tachymeter scale.",
    image: "/assets/collection-sport.jpg",
    gallery: [
      "/assets/collection-sport.jpg",
      "/assets/watch-chrono-front.jpg",
      "/assets/craft-crown.jpg",
      "/assets/craft-movement.jpg"
    ],
    dialColors: ["#E8E6E1", "#111215"],
    straps: ["Leather", "Steel", "Rubber"],
    inStock: true,
    specs: { caseDiameter: "41.5mm", thickness: "13.2mm", caseMaterial: "316L Stainless Steel", movement: "Calibre V-7750 Column-Wheel Chrono", powerReserve: "62 Hours", crystal: "Domed Sapphire", waterResistance: "100m (10 ATM)", strapWidth: "21mm" }
  },

  // V-010: Vanguard Chrono Stealth Black
  {
    id: "v-010",
    ref: "V-010",
    name: "Vanguard Chrono Stealth Black",
    gender: "Men",
    collection: "Sport",
    category: "Chronograph",
    price: 1790,
    priceFormatted: "$1,790",
    rating: 4.8,
    reviewsCount: 84,
    shortDesc: "Triple-register tachymeter chronograph in DLC matte black with red accents.",
    image: "/assets/watch-chrono-front.jpg",
    gallery: [
      "/assets/watch-chrono-front.jpg",
      "/assets/collection-sport.jpg",
      "/assets/craft-crown.jpg",
      "/assets/craft-movement.jpg"
    ],
    dialColors: ["#121316", "#1D3557"],
    straps: ["Rubber", "Steel", "Leather"],
    inStock: true,
    specs: { caseDiameter: "42mm", thickness: "13.8mm", caseMaterial: "DLC Matte Black Steel", movement: "Calibre V-7750 Column-Wheel Chronograph", powerReserve: "62 Hours", crystal: "Domed Sapphire", waterResistance: "100m (10 ATM)", strapWidth: "22mm" }
  },

  // V-013: Orion Diver 300 Deep Blue
  {
    id: "v-013",
    ref: "V-013",
    name: "The Orion Diver 300 Deep Blue",
    gender: "Men",
    collection: "Sport",
    category: "Diver",
    price: 1480,
    priceFormatted: "$1,480",
    rating: 4.9,
    reviewsCount: 142,
    shortDesc: "Ceramic dive bezel, ocean sunburst dial, 300m helium-tested water resistance.",
    image: "/assets/watch-diver-side.jpg",
    gallery: [
      "/assets/watch-diver-side.jpg",
      "/assets/hero-watch.jpg",
      "/assets/watch-3d.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#1D3557", "#111215", "#2A4736"],
    straps: ["Steel", "Rubber"],
    inStock: true,
    specs: { caseDiameter: "41mm", thickness: "12.4mm", caseMaterial: "316L Marine Grade Steel", movement: "Calibre V-300 High-Beat Automatic", powerReserve: "70 Hours", crystal: "Beveled Sapphire Crystal", waterResistance: "300m (30 ATM)", strapWidth: "20mm" }
  },

  // V-017: Apex GMT Explorer Alpine Green
  {
    id: "v-017",
    ref: "V-017",
    name: "Apex GMT Explorer Alpine Green",
    gender: "Men",
    collection: "Sport",
    category: "Sport",
    price: 1620,
    priceFormatted: "$1,620",
    rating: 4.9,
    reviewsCount: 115,
    shortDesc: "Emerald green dial with dual-color 24-hour bezel and independent GMT hand.",
    image: "/assets/watch-3d.jpg",
    gallery: [
      "/assets/watch-3d.jpg",
      "/assets/hero-watch.jpg",
      "/assets/craft-crystal.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#234B36", "#1D3557", "#111215"],
    straps: ["Steel", "Leather"],
    inStock: true,
    specs: { caseDiameter: "40.5mm", thickness: "12.0mm", caseMaterial: "Brushed 316L Steel", movement: "Calibre V-240 True GMT Automatic", powerReserve: "65 Hours", crystal: "Flat Sapphire with Cyclops", waterResistance: "200m (20 ATM)", strapWidth: "20mm" }
  },

  // V-018: Royal Octo Integrated Steel
  {
    id: "v-018",
    ref: "V-018",
    name: "Royal Octo Integrated Steel",
    gender: "Men",
    collection: "Classic",
    category: "Sport",
    price: 1890,
    priceFormatted: "$1,890",
    rating: 5.0,
    reviewsCount: 167,
    shortDesc: "Geometric satin-finished octagonal bezel and seamless integrated steel bracelet.",
    image: "/assets/hero-watch.jpg",
    gallery: [
      "/assets/hero-watch.jpg",
      "/assets/collection-editorial.jpg",
      "/assets/craft-movement.jpg"
    ],
    dialColors: ["#1B2A4A", "#111215", "#C5C7CA"],
    straps: ["Steel", "Rubber"],
    inStock: true,
    specs: { caseDiameter: "41mm", thickness: "10.2mm", caseMaterial: "316L Stainless Steel", movement: "Calibre V-900 Micro-Rotor Automatic", powerReserve: "60 Hours", crystal: "Flat Sapphire", waterResistance: "120m (12 ATM)", strapWidth: "Integrated" }
  },

  // V-021: Aeterna Skeleton Open-Heart
  {
    id: "v-021",
    ref: "V-021",
    name: "Aeterna Skeleton Open-Heart",
    gender: "Men",
    collection: "Signature",
    category: "Skeleton",
    price: 2450,
    priceFormatted: "$2,450",
    rating: 5.0,
    reviewsCount: 52,
    shortDesc: "Intricate skeletonized mechanical caliber revealing hand-beveled anthracite bridges.",
    image: "/assets/craft-movement.jpg",
    gallery: [
      "/assets/craft-movement.jpg",
      "/assets/craft-crystal.jpg",
      "/assets/hero-watch.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#151719", "#3A3631"],
    straps: ["Leather", "Steel"],
    inStock: true,
    specs: { caseDiameter: "41.5mm", thickness: "11.0mm", caseMaterial: "Stainless Steel with Exhibition Back", movement: "Calibre V-SK01 Fully Skeletonized", powerReserve: "72 Hours", crystal: "Dual Sapphire Crystals", waterResistance: "50m (5 ATM)", strapWidth: "21mm" }
  },

  // V-024: Heritage Perpetual Moonphase
  {
    id: "v-024",
    ref: "V-024",
    name: "Heritage Perpetual Moonphase Limited",
    gender: "Men",
    collection: "Heritage",
    category: "Limited Edition",
    price: 2850,
    priceFormatted: "$2,850",
    rating: 5.0,
    reviewsCount: 89,
    shortDesc: "Solid 18k rose gold case, silver guilloché dial, triple calendar indicators and moonphase.",
    image: "/assets/watch-heritage-gold-front.jpg",
    gallery: [
      "/assets/watch-heritage-gold-front.jpg",
      "/assets/collection-heritage.jpg",
      "/assets/craft-movement.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#F4EFE6", "#121316", "#202F44"],
    straps: ["Leather"],
    inStock: true,
    specs: { caseDiameter: "40mm", thickness: "11.8mm", caseMaterial: "18k 5N Rose Gold Alloy", movement: "Calibre V-9500 Astronomical Complication", powerReserve: "68 Hours", crystal: "Double-Curved Sapphire", waterResistance: "50m (5 ATM)", strapWidth: "20mm" }
  },


  // =========================================================================
  // WOMEN'S COLLECTION (W-SERIES)
  // =========================================================================

  // W-001: Étoile Petite Champagne
  {
    id: "w-001",
    ref: "W-001",
    name: "Velara Étoile Petite Champagne",
    gender: "Women",
    collection: "Classic",
    category: "Classic",
    price: 1180,
    priceFormatted: "$1,180",
    rating: 4.9,
    reviewsCount: 94,
    shortDesc: "Slim 32mm polished case with shimmering champagne dial and Milanese mesh bracelet.",
    image: "/assets/watch-etoile-front.jpg",
    gallery: [
      "/assets/watch-etoile-front.jpg",
      "/assets/watch-etoile-wrist.jpg",
      "/assets/craft-crown.jpg",
      "/assets/craft-crystal.jpg"
    ],
    dialColors: ["#D6C5A9", "#E8E6E1", "#1B2A4A"],
    straps: ["Mesh", "Leather"],
    inStock: true,
    specs: { caseDiameter: "32mm", thickness: "7.8mm", caseMaterial: "316L Stainless Steel", movement: "Calibre W-100 Ultra-Slim", powerReserve: "45 Hours", crystal: "Curved Sapphire", waterResistance: "50m (5 ATM)", strapWidth: "14mm" }
  },

  // W-002: Étoile Mother-of-Pearl
  {
    id: "w-002",
    ref: "W-002",
    name: "Velara Étoile Mother-of-Pearl",
    gender: "Women",
    collection: "Classic",
    category: "Classic",
    price: 1320,
    priceFormatted: "$1,320",
    rating: 5.0,
    reviewsCount: 78,
    shortDesc: "Natural iridescent mother-of-pearl dial with diamond hour indices and rose gold casing.",
    image: "/assets/watch-celeste-diamond-side.jpg",
    gallery: [
      "/assets/watch-celeste-diamond-side.jpg",
      "/assets/watch-etoile-front.jpg",
      "/assets/watch-etoile-wrist.jpg"
    ],
    dialColors: ["#F2F4F7", "#D6C5A9"],
    straps: ["Leather", "Mesh"],
    inStock: true,
    specs: { caseDiameter: "33mm", thickness: "8.0mm", caseMaterial: "18k Rose Gold Plated Steel", movement: "Calibre W-102 Precision", powerReserve: "48 Hours", crystal: "Sapphire Crystal", waterResistance: "50m (5 ATM)", strapWidth: "16mm" }
  },

  // W-005: Celeste Pavé Diamond
  {
    id: "w-005",
    ref: "W-005",
    name: "Velara Celeste Pavé Diamond",
    gender: "Women",
    collection: "Signature",
    category: "Jewelry",
    price: 2150,
    priceFormatted: "$2,150",
    rating: 5.0,
    reviewsCount: 65,
    shortDesc: "Brilliant-cut diamond pavé bezel with cabochon sapphire crown and rose gold multi-link bracelet.",
    image: "/assets/watch-celeste-diamond-front.jpg",
    gallery: [
      "/assets/watch-celeste-diamond-front.jpg",
      "/assets/watch-celeste-diamond-side.jpg",
      "/assets/watch-etoile-wrist.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#D6C5A9", "#FFFFFF"],
    straps: ["Steel", "Leather"],
    inStock: true,
    specs: { caseDiameter: "31mm", thickness: "7.9mm", caseMaterial: "18k Rose Gold & Diamonds", movement: "Calibre W-200 Swiss Jewel", powerReserve: "46 Hours", crystal: "High-Purity Sapphire", waterResistance: "30m (3 ATM)", strapWidth: "14mm" }
  },

  // W-009: Pureza Minimalist White
  {
    id: "w-009",
    ref: "W-009",
    name: "Velara Pureza Minimalist White",
    gender: "Women",
    collection: "Classic",
    category: "Minimal",
    price: 990,
    priceFormatted: "$990",
    rating: 4.8,
    reviewsCount: 88,
    shortDesc: "Zero-clutter Scandinavian minimalist layout with ultra-fine needle hands.",
    image: "/assets/watch-etoile-front.jpg",
    gallery: [
      "/assets/watch-etoile-front.jpg",
      "/assets/watch-etoile-wrist.jpg",
      "/assets/craft-crystal.jpg"
    ],
    dialColors: ["#FAFAF9", "#111215"],
    straps: ["Leather", "Mesh"],
    inStock: true,
    specs: { caseDiameter: "34mm", thickness: "6.9mm", caseMaterial: "Brushed 316L Stainless Steel", movement: "Calibre W-090 Ultra-Thin", powerReserve: "Long-life Battery", crystal: "Anti-Scratch Flat Sapphire", waterResistance: "30m (3 ATM)", strapWidth: "16mm" }
  },

  // W-013: Aqua-Diva Ceramic Sport White
  {
    id: "w-013",
    ref: "W-013",
    name: "Aqua-Diva Ceramic Sport White",
    gender: "Women",
    collection: "Sport",
    category: "Sport",
    price: 1450,
    priceFormatted: "$1,450",
    rating: 4.9,
    reviewsCount: 59,
    shortDesc: "High-tech pure white ceramic case with rose gold accents and 100m water resistance.",
    image: "/assets/hero-watch.jpg",
    gallery: [
      "/assets/hero-watch.jpg",
      "/assets/watch-3d.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#FFFFFF", "#1E2A38"],
    straps: ["Rubber", "Steel"],
    inStock: true,
    specs: { caseDiameter: "36mm", thickness: "9.9mm", caseMaterial: "Zirconia White Ceramic & Steel", movement: "Calibre W-300 Sport Automatic", powerReserve: "50 Hours", crystal: "Domed Sapphire", waterResistance: "100m (10 ATM)", strapWidth: "18mm" }
  },

  // W-017: Verona Malachite Emerald
  {
    id: "w-017",
    ref: "W-017",
    name: "Velara Verona Malachite Emerald",
    gender: "Women",
    collection: "Heritage",
    category: "Fashion-Luxury",
    price: 1850,
    priceFormatted: "$1,850",
    rating: 5.0,
    reviewsCount: 73,
    shortDesc: "Genuine green malachite mineral dial encased in 18k yellow gold with emerald alligator strap.",
    image: "/assets/watch-malachite-front.jpg",
    gallery: [
      "/assets/watch-malachite-front.jpg",
      "/assets/watch-etoile-wrist.jpg",
      "/assets/craft-crown.jpg"
    ],
    dialColors: ["#1F422F", "#D6C5A9"],
    straps: ["Leather", "Mesh"],
    inStock: true,
    specs: { caseDiameter: "35mm", thickness: "8.4mm", caseMaterial: "18k Yellow Gold Plated Steel", movement: "Calibre W-400 Swiss Movement", powerReserve: "48 Hours", crystal: "Box Sapphire", waterResistance: "50m (5 ATM)", strapWidth: "16mm" }
  },

  // W-021: Lumina Skeleton Automatique
  {
    id: "w-021",
    ref: "W-021",
    name: "Velara Lumina Skeleton Automatique",
    gender: "Women",
    collection: "Signature",
    category: "Automatic",
    price: 2350,
    priceFormatted: "$2,350",
    rating: 5.0,
    reviewsCount: 37,
    shortDesc: "Delicate floral-skeletonized bridges with ruby jewel bearings and exhibition caseback.",
    image: "/assets/watch-skeleton-women-front.jpg",
    gallery: [
      "/assets/watch-skeleton-women-front.jpg",
      "/assets/craft-movement.jpg",
      "/assets/watch-etoile-wrist.jpg",
      "/assets/craft-crystal.jpg"
    ],
    dialColors: ["#D6C5A9", "#111215"],
    straps: ["Leather", "Steel"],
    inStock: true,
    specs: { caseDiameter: "36mm", thickness: "9.6mm", caseMaterial: "18k Rose Gold Plated Steel", movement: "Calibre W-SK02 Fine Automatic Skeleton", powerReserve: "60 Hours", crystal: "Double Sapphire Crystals", waterResistance: "50m (5 ATM)", strapWidth: "18mm" }
  }
];

export const sampleOrders = [
  {
    id: "ORD-1023",
    date: "12 May 2026",
    status: "Delivered",
    trackingId: "BD1234567890",
    courier: "Blue Dart Express",
    shippingAddress: {
      name: "Arjun Sharma",
      line1: "123, MG Road, Pune",
      cityStateZip: "Maharashtra - 411001",
      country: "India"
    },
    items: [
      {
        name: "Velara Classic Royale Blue",
        variant: "Steel / Royal Navy Dial",
        price: 1250,
        qty: 1,
        image: "/assets/watch-classic-blue-front.jpg"
      },
      {
        name: "The Orion Diver 300 Deep Blue",
        variant: "Steel Bracelet / Navy Dial",
        price: 1480,
        qty: 1,
        image: "/assets/watch-diver-side.jpg"
      }
    ],
    total: 2730,
    timeline: [
      { status: "Order Placed", time: "12 May 2026, 10:24 AM", done: true },
      { status: "Processing & Quality Check", time: "12 May 2026, 2:45 PM", done: true },
      { status: "Shipped & Dispatched", time: "13 May 2026, 9:20 AM", done: true },
      { status: "Out for Delivery", time: "14 May 2026, 11:32 AM", done: true },
      { status: "Delivered", time: "14 May 2026, 4:18 PM", done: true }
    ]
  },
  {
    id: "ORD-0987",
    date: "28 Apr 2026",
    status: "Delivered",
    trackingId: "EXP9988776655",
    courier: "DHL Express World",
    shippingAddress: {
      name: "Arjun Sharma",
      line1: "123, MG Road, Pune",
      cityStateZip: "Maharashtra - 411001",
      country: "India"
    },
    items: [
      {
        name: "Vanguard Chrono Stealth Black",
        variant: "Black DLC / Leather Strap",
        price: 1790,
        qty: 1,
        image: "/assets/watch-chrono-front.jpg"
      }
    ],
    total: 1790,
    timeline: [
      { status: "Order Placed", time: "28 Apr 2026", done: true },
      { status: "Delivered", time: "30 Apr 2026", done: true }
    ]
  }
];

export const faqCategories = [
  {
    category: "Orders & Shipping",
    faqs: [
      {
        q: "How long does global shipping take?",
        a: "All VELARA timepieces are dispatched via insured priority courier (DHL Express or FedEx Luxury Logistics). Delivery typically takes 2–4 business days within North America and Europe, and 3–6 business days internationally."
      },
      {
        q: "Do you offer international shipping and customs clearance?",
        a: "Yes, we provide complimentary worldwide white-glove shipping to over 120 countries with all duties and import taxes prepaid by VELARA at checkout."
      },
      {
        q: "How can I track my shipment?",
        a: "Once your timepiece is hand-assembled, tested, and dispatched, you will receive an email and SMS with a direct tracking link. You can also track your order directly on our Track Order page."
      }
    ]
  },
  {
    category: "Warranty & Care",
    faqs: [
      {
        q: "What does the 2-Year International Warranty cover?",
        a: "Our comprehensive 2-year warranty covers all mechanical defects, movement accuracy tolerances, water resistance integrity, and manufacturing defects. It also includes one complimentary service health check during the warranty period."
      },
      {
        q: "What is your return and exchange policy?",
        a: "We offer 30-day hassle-free returns on all unworn timepieces in their original packaging with security seals intact. Return shipping is fully covered by VELARA."
      },
      {
        q: "How often should my mechanical timepiece be serviced?",
        a: "We recommend a complete lubrication check and gasket pressure test every 3 to 5 years by an authorized VELARA master watchmaker to ensure lifetime chronometric precision."
      }
    ]
  }
];
