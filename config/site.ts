/**
 * THE CONNOISSEUR'S ESTATE — MASTER CONFIGURATION
 * 
 * Central configuration for brand identity, editorial copy, services, 
 * curatorial studies, and contact settings.
 * 
 * TO CUSTOMIZE:
 * - Replace `personalName` with your own name (e.g., "Julian Vance" or "A. Moretti").
 * - When ready, place your personal portrait in `/public/images/director-portrait.jpg`
 *   and set `director.portraitImage` below.
 * - Set `contact.recipientEmail` if you configure a production mail transport.
 */

export interface HotspotItem {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  category: string;
  description: string;
  materials: string[];
}

export interface CuratorialDossier {
  studyNumber: string;
  headline: string;
  designer: string;
  collection: string;
  season: string;
  materialFocus: string;
  silhouette: string;
  historicalContext: string;
  imageCredit: string;
  notes: string;
  sourcingScope: string[];
}

export interface EditorialStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  image: string;
  detailImage?: string;
  aspectRatio: "portrait" | "landscape" | "square";
  palette: string[];
  materials: string[];
  essay: string[];
  provenanceNotes: string;
}

export interface CommissionStage {
  step: string;
  title: string;
  description: string;
  focus: string;
}

export interface AssetManifestItem {
  id: string;
  filename: string;
  title: string;
  role: string;
  aspectRatio: string;
  altText: string;
  attribution: string;
  curatorialNotes: string;
}

export const SITE_CONFIG = {
  // BRAND IDENTITY
  // Replace this single value with your personal name whenever you wish:
  personalName: "[YOUR NAME]",
  brandTitle: "THE CONNOISSEUR’S ESTATE",
  roleTitle: "Aesthetic Director",
  displayWordmark: "The Connoisseur’s Estate",

  // CORE POSITIONING
  corePositioning: "A considered world, from the rooms you inhabit to the pieces you wear.",
  tagline: "A life, considered.",
  subtagline: "Interiors, objects, and archival fashion, brought into one personal world.",
  bottomAnnotation: "THE ART OF LIVING · THE ARCHIVAL VAULT",

  // PHILOSOPHY / POINT OF VIEW
  philosophy: {
    headline: "Rooms. Objects. Dress.\nOne point of view.",
    body: "A home and a wardrobe tell the same story: what we value, what we notice, and what we choose to keep. My practice brings them into conversation, shaping a personal world through proportion, material, craftsmanship, and character.",
    supportingStatement: "Collected with intention. Lived with ease.",
  },

  // PILLAR I — THE ART OF LIVING
  artOfLiving: {
    pillarNumber: "I",
    sectionLabel: "I — THE ART OF LIVING",
    headline: "Rooms with memory.\nA life with character.",
    description:
      "Spatial curation for homes that feel collected over time. Antique pieces, exceptional textiles, art, and bespoke elements are brought together through a coherent and deeply personal vision.",
    services: [
      {
        letter: "A",
        title: "Spatial Direction",
        description:
          "Overall aesthetic vision, architectural dialogue, and material cohesion. Guiding proportion, light, and palette while coordinating respectfully with specialized architects, restoration artisans, and master makers.",
        details: [
          "Overall aesthetic vision & material palette",
          "Deep architectural reveals and plaster atmosphere",
          "Furniture and object composition",
          "Coordination with appropriate design specialists and craftspeople",
        ],
      },
      {
        letter: "B",
        title: "Art & Object Sourcing",
        description:
          "Rigorous acquisition of antique furniture, Old Master portraiture, 19th-century landscapes, and decorative objects. Sourced privately and at international auctions, with careful focus on condition, attribution, and documented provenance.",
        details: [
          "Antique walnut & rare timber furniture",
          "Old Master paintings & decorative European objects",
          "Hand-knotted silk rugs & historic textiles",
          "Private sourcing & discrete auction commissions",
          "Attention to condition, attribution, and documented provenance",
        ],
      },
      {
        letter: "C",
        title: "The Culture of Living",
        description:
          "Cultivating a lived-in connoisseurship. Guidance on the care of historic materials, placement of objects for natural conversation, and developing an enduring collection that matures gracefully across generations.",
        details: [
          "Guidance on craftsmanship, patinas, and collecting",
          "Understanding historic materials and their conservation",
          "Placing acquisitions naturally within the client’s wider environment",
          "Building a private collection with continuity and restraint",
        ],
      },
    ],
    businessModel:
      "Engagements may combine an advisory retainer with sourcing fees or acquisition commissions agreed in advance.",
    ctaPrimary: "Explore the Art of Living",
    ctaSecondary: "Discuss Your Residence",
    image: "/images/art-of-living-salon.jpg",
    hotspots: [
      {
        id: "portrait",
        x: 41,
        y: 28,
        title: "Italian Renaissance Portrait in Gilt Frame",
        category: "Fine Art & Provenance",
        description:
          "Old Master portraiture executed with dark chiaroscuro and authentic varnish craquelure. Framed in a hand-carved, softly patinated antique gilt moulding that breathes history into the salon.",
        materials: ["Oil on linen canvas", "Aged gold leaf", "Carved lime wood frame", "Natural dammar varnish"],
      },
      {
        id: "credenza",
        x: 39,
        y: 75,
        title: "Late 17th-Century Tuscan Walnut Credenza",
        category: "Antique Cabinetry",
        description:
          "Aged Italian walnut with wax-rubbed patina, hand-forged iron drop hardware, and deep architectural panelling. Displaying small bronze Renaissance bronzes and scholarly art monographs.",
        materials: ["Solid aged Italian walnut", "Hand-forged iron", "Beeswax finish", "Bronze statuary"],
      },
      {
        id: "armchair",
        x: 69,
        y: 74,
        title: "Patinated Cognac Leather Club Armchair",
        category: "Lived-In Seating",
        description:
          "Deep, hand-burnished cognac saddle leather with gentle natural surface creasing. Accented with a lightweight spun cashmere throw for effortless tactile warmth.",
        materials: ["Vegetable-tanned saddle leather", "Hand-tied coil springs", "Pure Mongolian cashmere"],
      },
      {
        id: "plaster",
        x: 66,
        y: 35,
        title: "Hand-Painted Lime Wash Plaster Walls",
        category: "Architectural Surface",
        description:
          "Multi-layered Italian lime wash applied with wide brushwork, reflecting shifting Mediterranean daylight with organic softness and acoustic dampening.",
        materials: ["Aged slaked lime", "Natural earth pigments", "Hand-trowelled plaster"],
      },
    ] as HotspotItem[],
  },

  // PILLAR II — THE ARCHIVAL VAULT
  archivalVault: {
    pillarNumber: "II",
    sectionLabel: "II — THE ARCHIVAL VAULT",
    headline: "Fashion worth finding.\nPieces worth keeping.",
    description:
      "Private sourcing for distinctive archival fashion, exceptional vintage accessories, and the foundations of an individual wardrobe.",
    paletteNotes: "Oxblood · Aged Walnut · Warm Charcoal · Parchment Labels · Pure Silk Velvet",
    dossier: {
      studyNumber: "CURATORIAL STUDY 001",
      headline: "Velvet, after dark.",
      designer: "Gucci by Tom Ford",
      collection: "Autumn / Winter 1996",
      season: "AW 1996 Ready-to-Wear (Proposed Editorial Reference)",
      materialFocus: "Deep Oxblood & Midnight Silk-Cotton Velvet",
      silhouette: "Sculpted peak lapel, sharp shoulder, elongated waistline",
      historicalContext:
        "The Autumn/Winter 1996 collection stands as a watershed moment in modern luxury—reintroducing tactile decadence, razor-sharp Florentine tailoring, and sensual confidence without superfluous ornament.",
      imageCredit: "Aesthetic Study & Archival Material Dossier, Studio Archive",
      notes:
        "Proposed curatorial focus used as an editorial and visual reference for velvet tailoring and confident, tactile glamour. Not confirmed inventory or official brand affiliation.",
      sourcingScope: [
        "Archival runway tailoring & eveningwear sourcing",
        "Exceptional vintage leather accessories & luggage",
        "Select vintage timepieces of documented provenance",
        "Bespoke wardrobe direction through specialized European master tailors",
      ],
    } as CuratorialDossier,
    businessModel:
      "Clients commission searches for particular pieces or a defined wardrobe direction. Fees and acquisition terms are agreed privately.",
    ctaPrimary: "Enter the Archival Vault",
    ctaSecondary: "Commission a Search",
    image: "/images/archival-vault-velvet.jpg",
  },

  // OBJECTS & STORIES
  objectsAndStories: {
    title: "Objects & Stories",
    introduction: "Notes on the details that give a personal world its character.",
    disclaimer:
      "Curatorial concept studies illustrating my methodology and taste. Realized without fabricated auction lots, client names, or artificial provenance.",
    studies: [
      {
        id: "collected-room",
        number: "01",
        title: "The Collected Room",
        subtitle: "A study in walnut, portraiture, patinated leather, and silk",
        category: "Interior Spatial Study",
        summary:
          "How an escrutoire, antique oil portrait, and booklined alcove form an intimate sanctuary for contemplation.",
        image: "/images/study-collected-room.jpg",
        aspectRatio: "landscape",
        palette: ["#35251F", "#E8DFCF", "#A58A58", "#4A1F29"],
        materials: ["Aged Walnut", "Saddle Leather", "Oil on Linen", "Brocade Silk"],
        provenanceNotes: "Illustrative aesthetic study on private estate library composition.",
        essay: [
          "A room that appears decorated all at once inevitably feels like a stage set. A room collected over decades possesses depth, shadow, and quiet intimacy.",
          "In this study, a late-17th-century walnut secretary serves as the emotional anchor. Its drop-front leather writing surface carries faint ink marks and wax seals from centuries of correspondence.",
          "Light is treated as a sculptural material: low amber glow from a banker's lamp grazing book spines and the craquelure of an antique oval portrait, drawing the eye inward.",
        ],
      },
      {
        id: "velvet-after-dark",
        number: "02",
        title: "Velvet, After Dark",
        subtitle: "An archival fashion study centred on the proposed Gucci Autumn/Winter 1996 reference",
        category: "Archival Fashion Dossier",
        summary:
          "The sensual power of deep oxblood velvet, sculpted Florentine tailoring, and tactile confidence.",
        image: "/images/archival-vault-velvet.jpg",
        aspectRatio: "landscape",
        palette: ["#4A1F29", "#211E1B", "#A58A58", "#F4EFE6"],
        materials: ["Silk-Cotton Velvet", "Hand-stitched Canvas", "Horn Buttons", "Archival Pins"],
        provenanceNotes:
          "Proposed curatorial focus reference. Demonstrates sourcing criteria and aesthetic analysis.",
        essay: [
          "Few textiles carry the emotional resonance of heavy Italian velvet. Unlike stiff modern synthetics, archival silk-blend velvet drinks the light, creating deep chiaroscuro folds that move with the wearer.",
          "The Autumn/Winter 1996 collection redefined evening luxury: precise peak lapels, narrow double-breasted stances, and a restrained palette of oxblood, petrol blue, and charcoal.",
          "Through private sourcing commissions, we identify well-preserved archival garments, evaluate condition and structure, and ensure correct historic preservation.",
        ],
      },
      {
        id: "detail-that-remains",
        number: "03",
        title: "The Detail That Remains",
        subtitle: "A study of a hand-stitched glove, an antique frame, and a carved signet-ring form",
        category: "Sartorial Object Study",
        summary:
          "Tactile discernment through hand-stitched peccary leather, antique carnelian intaglio, and heavy deckled paper.",
        image: "/images/study-detail-craft.jpg",
        aspectRatio: "landscape",
        palette: ["#8C593B", "#A58A58", "#E8DFCF", "#211E1B"],
        materials: ["Peccary Leather", "Carved Carnelian Intaglio", "Antique Patinated Brass", "Deckled Cotton Rag"],
        provenanceNotes: "Aesthetic study of tactile connoisseurship and enduring daily objects.",
        essay: [
          "The true measure of personal style is found not in overt heraldry, but in the private objects held in the hand. A pair of unlined peccary leather gloves stitched by a Florentine artisan conforms to the hand over decades.",
          "Beside it, a signet ring set with an antique Roman carnelian intaglio captures centuries of craftsmanship in a piece of carved stone no larger than a hazelnut.",
          "These pieces are not accessories in the commercial sense; they are touchstones of individual memory and personal continuity.",
        ],
      },
    ] as EditorialStudy[],
  },

  // THE DIRECTOR
  director: {
    sectionLabel: "THE DIRECTOR",
    headline: "A personal eye.\nA coherent world.",
    philosophy:
      "My interest lies in the connections: between a room and the person who inhabits it, between a garment and the life it becomes part of, between an object’s history and its place in the present.",
    practiceDescription:
      "As Aesthetic Director, I work with a small number of private clients each season to curate their living environments, build cohesive wardrobes of archival pieces and bespoke commissions, and source exceptional decorative arts with documented integrity.",
    stillLifeImage: "/images/director-still-life.jpg",
    // Replace with "/images/director-portrait.jpg" once you provide your personal portrait:
    portraitImage: null as string | null,
    directorNote:
      "To update with your own portrait and biography, simply edit `config/site.ts` and drop your portrait into `/public/images/`.",
  },

  // THE PRIVATE COMMISSION
  privateCommission: {
    sectionLabel: "ENGAGEMENT",
    headline: "The Private Commission",
    subheadline: "A disciplined, discreet four-stage methodology for comprehensive curation.",
    stages: [
      {
        step: "01",
        title: "A Conversation",
        description:
          "An introduction to your world, your interests, and the direction you want to explore.",
        focus: "Private dialogue, assessing spatial context, lifestyle rhythms, and personal collecting ambitions.",
      },
      {
        step: "02",
        title: "A Point of View",
        description:
          "A considered aesthetic direction that connects the spaces, objects, or wardrobe pieces involved.",
        focus: "Development of a unified curatorial dossier, material palette, architectural sketches, and sourcing roadmap.",
      },
      {
        step: "03",
        title: "The Search",
        description:
          "Focused research, sourcing, and assessment, with opportunities presented for your consideration.",
        focus: "Discrete international inquiries across private collections, specialized dealers, auctions, and master ateliers.",
      },
      {
        step: "04",
        title: "The Composition",
        description:
          "Selected elements brought together with care, followed by guidance on how they are placed, worn, or lived with.",
        focus: "Spatial installation, bespoke fittings, conservation protocols, and lifelong curation notes.",
      },
    ] as CommissionStage[],
    pricingNote:
      "Every engagement is shaped around its scope. Advisory fees, sourcing terms, and acquisition commissions are discussed before work begins.",
    cta: "Begin a Conversation",
  },

  // PRIVATE ENQUIRIES FORM
  enquiries: {
    headline: "Tell me about the world\nyou would like to create.",
    subheadline:
      "Inquiries are reviewed personally and held in strict commercial confidence. Please share only the information you are comfortable including in an initial enquiry.",
    areasOfInterest: [
      "Interiors & Living",
      "Archival Fashion",
      "A Complete Aesthetic Direction",
      "Collaboration or Press",
    ],
    disclaimer:
      "Engagements are strictly limited to ensure uncompromising attention. Responses are provided directly to qualified private inquiries.",
  },

  // CONTACT & DEMO MODE CONFIGURATION
  contact: {
    // If empty or null, the form will operate in an elegant demonstration mode,
    // providing a full copy-to-clipboard draft of the inquiry without failing silently.
    recipientEmail: "", // e.g. "curator@connoisseursestate.com"
    advisoryLocations: "Florence · London · Paris · Engagements Worldwide",
    notice: "Private advisory engagements worldwide. By introduction and private commission.",
  },

  // ASSET MANIFEST (Section 14 Compliance)
  assetManifest: [
    {
      id: "hero-estate-palazzo",
      filename: "/images/hero-estate-palazzo.jpg",
      title: "Tuscan Palazzo Grand Salon",
      role: "Hero Arrival Experience Background & Static Fallback",
      aspectRatio: "16:9",
      altText:
        "Tuscan palazzo salon with arched stone windows, hand-painted lime wash plaster walls, Murano chandelier, and aged walnut desk with open art catalogue.",
      attribution: "Studio Curatorial Archive — Aesthetic Direction",
      curatorialNotes:
        "Atmospheric study establishing the inhabited Italian palazzo architectural language.",
    },
    {
      id: "art-of-living-salon",
      filename: "/images/art-of-living-salon.jpg",
      title: "Palazzo Living Room with Old Master Portrait",
      role: "Pillar I: The Art of Living Interactive Hotspot Canvas",
      aspectRatio: "16:9",
      altText:
        "Cultured Italian palazzo salon with framed Old Master portrait on lime plaster wall, antique walnut credenza, and cognac leather armchair.",
      attribution: "Studio Curatorial Archive — Interior Curation",
      curatorialNotes:
        "Illustrative salon study highlighting spatial curation, antique timber, and lighting balance.",
    },
    {
      id: "archival-vault-velvet",
      filename: "/images/archival-vault-velvet.jpg",
      title: "Archival Oxblood Velvet Tailoring Study",
      role: "Pillar II: The Archival Vault Dossier & Texture Inspector",
      aspectRatio: "3:2",
      altText:
        "Close-up of deep oxblood velvet lapel on tailor mannequin with antique brass pins and dark walnut archival cabinetry in background.",
      attribution: "Studio Curatorial Archive — Fashion Sourcing",
      curatorialNotes:
        "Proposed curatorial reference for Tom Ford for Gucci AW 1996 sartorial study.",
    },
    {
      id: "study-collected-room",
      filename: "/images/study-collected-room.jpg",
      title: "The Collected Room — Private Library Study",
      role: "Objects & Stories: Study 01",
      aspectRatio: "4:3",
      altText:
        "Walnut escrutoire desk with leather writing pad, antique portrait, and leather-bound library books in an Italian estate.",
      attribution: "Studio Curatorial Archive — Spatial Studies",
      curatorialNotes: "Editorial study examining layered antiquities in a private library.",
    },
    {
      id: "study-detail-craft",
      filename: "/images/study-detail-craft.jpg",
      title: "Hand-Stitched Glove and Carnelian Signet Ring",
      role: "Objects & Stories: Study 03",
      aspectRatio: "4:3",
      altText:
        "Hand-stitched cognac peccary leather gloves and an antique carved carnelian signet ring in patinated brass on heavy deckled parchment.",
      attribution: "Studio Curatorial Archive — Craft Studies",
      curatorialNotes: "Material study on tactile discernment and artisanal daily objects.",
    },
    {
      id: "director-still-life",
      filename: "/images/director-still-life.jpg",
      title: "Aesthetic Director's Studio Work Table",
      role: "The Director Section Representation & Concept Table",
      aspectRatio: "4:3",
      altText:
        "Aesthetic Director's walnut table with architectural floor plan drawing, brass drafting calipers, inkwell, and linen journal.",
      attribution: "Studio Curatorial Archive — Practice Studies",
      curatorialNotes:
        "Tactile representation of the Director's hand and mind until a personal portrait is provided.",
    },
    {
      id: "master-portrait-canvas",
      filename: "/images/master-portrait-canvas.jpg",
      title: "Portrait of a Gentleman Connoisseur (Italian School)",
      role: "Signature 3D WebGL Floating Frame Canvas & Philosophy Feature",
      aspectRatio: "3:4",
      altText:
        "Italian Renaissance style oil portrait of a gentleman connoisseur in dark velvet doublet holding a book, with aged craquelure oil surface.",
      attribution: "Public Domain Style Curatorial Archive",
      curatorialNotes:
        "Used as the high-resolution texture map inside the 3D patinated antique gilt frame.",
    },
    {
      id: "philosophy-detail-closeup",
      filename: "/images/philosophy-detail-closeup.jpg",
      title: "Carved Walnut Cornice and Plaster Fresco",
      role: "A Singular Point of View — Architectural Close-up",
      aspectRatio: "3:4",
      altText:
        "Architectural close-up of hand-painted fresco plaster wall, carved walnut cornice moulding, and antique brass picture hanging rod.",
      attribution: "Studio Curatorial Archive — Architectural Studies",
      curatorialNotes:
        "Demonstrates architectural authenticity and material nuance in the philosophy section.",
    },
  ] as AssetManifestItem[],
};
