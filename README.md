# THE CONNOISSEUR’S ESTATE
### A Private Digital Residence for an Aesthetic Director

> “A considered world, from the rooms you inhabit to the pieces you wear.”

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Three.js / WebGL**. Designed to present a coherent luxury business serving ultra-high-net-worth clients across interiors, collecting, lifestyle, and archival fashion.

---

## 1. Quick Start

Run the development server:
```bash
pnpm dev
# or: npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
pnpm build
pnpm start
```

---

## 2. Personal Brand Customization (Single Configuration File)

All brand identity parameters, copy, services, and studies are centralized in:
📁 **[`config/site.ts`](file:///c:/Users/kulvi/Desktop/Websites/The%20Inherited%20Eye/config/site.ts)**

### To Replace Your Name & Title:
In [`config/site.ts`](file:///c:/Users/kulvi/Desktop/Websites/The%20Inherited%20Eye/config/site.ts#L60-L65):
```typescript
personalName: "YOUR FULL NAME", // e.g. "Julian Vance"
roleTitle: "Aesthetic Director",
displayWordmark: "The Connoisseur’s Estate", // or your bespoke personal wordmark
```

### To Replace Your Portrait & Biography:
In [`config/site.ts`](file:///c:/Users/kulvi/Desktop/Websites/The%20Inherited%20Eye/config/site.ts#L235-L250):
1. Place your portrait file in `/public/images/director-portrait.jpg`.
2. Update the `director` block:
```typescript
director: {
  headline: "A personal eye.\nA coherent world.",
  philosophy: "Your personal philosophy statement...",
  portraitImage: "/images/director-portrait.jpg", // enables your personal portrait
}
```
*(Until you provide your portrait, the website automatically displays an authentic, cultured still life of the Director’s studio work table with architectural room drawings, drafting calipers, and linen journal).*

---

## 3. How to Replace Imagery

All museum-grade imagery is stored locally in [`public/images/`](file:///c:/Users/kulvi/Desktop/Websites/The%20Inherited%20Eye/public/images/):

| Asset Path | Role | Resolution & Aspect |
| :--- | :--- | :--- |
| `/images/hero-estate-palazzo.jpg` | Hero Arrival Tuscan Palazzo Background | 16:9 Landscape |
| `/images/master-portrait-canvas.jpg` | 3D WebGL Signature Patinated Frame Texture | 3:4 Portrait |
| `/images/art-of-living-salon.jpg` | Pillar I Interactive Room Hotspot Canvas | 16:9 Landscape |
| `/images/archival-vault-velvet.jpg` | Pillar II Curatorial Study 001 & Loupe Inspector | 3:2 Landscape |
| `/images/study-collected-room.jpg` | Objects & Stories: Study 01 (The Collected Room) | 4:3 Landscape |
| `/images/study-detail-craft.jpg` | Objects & Stories: Study 03 (The Detail That Remains) | 4:3 Landscape |
| `/images/director-still-life.jpg` | Studio Table Placeholder for The Director | 4:3 Landscape |
| `/images/philosophy-detail-closeup.jpg`| Philosophy Section Architectural Close-up | 3:4 Portrait |

To swap any image, simply overwrite the file in `/public/images/` or point to a new path in [`config/site.ts`](file:///c:/Users/kulvi/Desktop/Websites/The%20Inherited%20Eye/config/site.ts).

---

## 4. How to Add Editorial Studies & Archival Objects

In [`config/site.ts`](file:///c:/Users/kulvi/Desktop/Websites/The%20Inherited%20Eye/config/site.ts#L160-L230), add or edit items in `objectsAndStories.studies`:

```typescript
{
  id: "your-study-id",
  number: "04",
  title: "Title of Study",
  subtitle: "One-sentence subtitle",
  category: "Curatorial Focus",
  summary: "Brief editorial summary...",
  image: "/images/your-image.jpg",
  aspectRatio: "landscape",
  palette: ["#35251F", "#E8DFCF", "#A58A58"],
  materials: ["Timber", "Bronze", "Silk"],
  provenanceNotes: "Ethical provenance notes...",
  essay: [
    "First paragraph of essay...",
    "Second paragraph of essay..."
  ]
}
```

The site will automatically render the study card, compute the palette swatches, and generate the full accessible editorial reader modal.

---

## 5. Connecting Real Private Enquiry Delivery

In [`config/site.ts`](file:///c:/Users/kulvi/Desktop/Websites/The%20Inherited%20Eye/config/site.ts#L290-L300):
```typescript
contact: {
  recipientEmail: "your-email@estate.com", // Set your confidential address
  advisoryLocations: "Florence · London · Paris · Engagements Worldwide",
}
```

### Demonstration Mode (Default):
When `recipientEmail` is left blank, the enquiry form safely operates in **Demonstration Mode**:
- Prevents silent data leakage to unconfigured third parties.
- Generates a structured **Private Enquiry Dossier**.
- Provides a one-click **"Copy Completed Enquiry"** button for clipboard transfer.
- Provides a preformatted **"Open in Email Client"** mailto action.

To connect a transactional service (e.g., Resend, SendGrid, or AWS SES), create an API route in `/app/api/enquiry/route.ts` and dispatch the payload securely.

---

## 6. Curatorial & Architectural Features

1. **3D WebGL Signature Scene (`components/SignatureScene3D.tsx`)**:
   - Patinated antique gilt moulding with authentic metallic roughness, dark walnut backing, and Old Master canvas texture.
   - Restrained mouse parallax tilt and scroll-driven perspective shift.
   - Resource-efficient: pauses rendering when offscreen (via `IntersectionObserver`) or when the tab is hidden.
   - High-fidelity static poster fallback when WebGL is unavailable or when the user has set `prefers-reduced-motion`.

2. **Pillar I — The Art of Living (`components/ArtOfLivingSection.tsx`)**:
   - Interactive hotspot salon canvas allowing close inspection of Old Master art provenance, Tuscan walnut cabinetry, patinated cognac leather, and fresco plaster walls.
   - WCAG-compliant text-list alternative for screen readers and keyboard users.
   - Detailed specification modal explaining the advisory retainer and acquisition commission architecture.

3. **Pillar II — The Archival Vault (`components/ArchivalVaultSection.tsx`)**:
   - Curatorial Study 001: *"Velvet, after dark"* (AW 1996 reference).
   - Interactive 2.5× magnifying loupe inspector with raking light angle sweep controls.
   - Archival dossier table with verified historical context and ethical sourcing scope.

4. **Curatorial Asset Manifest (`components/AssetManifestModal.tsx`)**:
   - Full Section 14 transparency audit detailing all local image records, semantic alt text, roles, and attributions.

5. **Audio Ambience**:
   - Synthetic Web Audio API ambient room tone (warm room acoustics and gentle crackle) that starts muted by default, with an accessible toggle in the header. Zero audio file bandwidth.
