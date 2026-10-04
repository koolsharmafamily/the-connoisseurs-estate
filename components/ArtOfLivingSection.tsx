"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, X, ArrowRight, Layers, Eye } from "lucide-react";
import { SITE_CONFIG, HotspotItem } from "@/config/site";

interface ArtOfLivingSectionProps {
  onOpenDossier?: () => void;
  onSelectService?: (serviceName: string) => void;
}

export default function ArtOfLivingSection({
  onOpenDossier,
  onSelectService,
}: ArtOfLivingSectionProps) {
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);
  const { artOfLiving } = SITE_CONFIG;

  const handleHotspotClick = (spot: HotspotItem) => {
    setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
  };

  return (
    <section
      id="art-of-living"
      className="relative w-full bg-ivory text-charcoal py-28 md:py-36 border-t border-walnut/10"
      aria-label="Pillar I — The Art of Living"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-walnut/15 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-brass" />
              <p className="text-[11px] font-sans tracking-[0.28em] uppercase text-brass-dark font-medium">
                {artOfLiving.sectionLabel}
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-walnut font-light leading-[1.08] tracking-tight">
              Rooms with memory.
              <br />
              <span className="italic font-normal text-oxblood">
                A life with character.
              </span>
            </h2>
          </div>

          <p className="font-serif text-lg md:text-xl text-walnut/80 max-w-md leading-relaxed font-light">
            {artOfLiving.description}
          </p>
        </div>

        {/* INTERACTIVE SALON CANVAS WITH HOTSPOTS */}
        <div className="relative mb-20">
          <div className="relative w-full aspect-[16/9] bg-walnut-dark overflow-hidden shadow-2xl border border-walnut/20">
            <Image
              src={artOfLiving.image}
              alt="Italian palazzo salon study illustrating spatial direction, antique gilt framing, and patinated leather"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center"
              priority
            />

            {/* Hotspot Markers */}
            {artOfLiving.hotspots.map((spot) => {
              const isActive = activeHotspot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <button
                    type="button"
                    onClick={() => handleHotspotClick(spot)}
                    className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brass ${
                      isActive
                        ? "bg-oxblood text-ivory scale-110 shadow-xl ring-2 ring-brass"
                        : "bg-walnut/80 backdrop-blur-sm text-ivory hover:bg-brass hover:text-estate-black shadow-lg"
                    }`}
                    aria-label={`Inspect detail: ${spot.title}`}
                    aria-expanded={isActive}
                  >
                    {isActive ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span className="absolute -inset-1 rounded-full bg-brass/30 animate-ping pointer-events-none" />
                      </>
                    )}
                  </button>

                  {/* Active Hotspot Popover Card */}
                  {isActive && (
                    <div
                      role="region"
                      aria-live="polite"
                      className="fixed bottom-4 left-4 right-4 z-50 md:absolute md:bottom-auto md:left-auto md:w-80 md:mt-3 md:-left-40 p-5 bg-estate-black/95 backdrop-blur-md text-ivory border border-brass/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brass-light font-medium">
                          {spot.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveHotspot(null)}
                          className="text-parchment/60 hover:text-ivory"
                          aria-label="Close detail window"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-serif text-lg text-ivory leading-snug mb-2 font-normal">
                        {spot.title}
                      </h4>
                      <p className="font-serif text-xs text-parchment/80 leading-relaxed mb-3">
                        {spot.description}
                      </p>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-[9px] font-sans tracking-widest uppercase text-parchment/50 block mb-1">
                          Material Notes:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {spot.materials.map((mat) => (
                            <span
                              key={mat}
                              className="text-[10px] font-sans px-2 py-0.5 bg-walnut/60 text-parchment/80 border border-white/5"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Caption / Mode Notice */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-sans text-walnut/60 tracking-wider">
            <div className="flex items-center space-x-2">
              <Eye className="w-3.5 h-3.5 text-brass" />
              <span>
                Interactive Room Study: Select markers to inspect material curation and provenance criteria.
              </span>
            </div>
            <span className="italic font-serif text-xs text-walnut/70">
              Illustrative Palazzo Aesthetic Study · Private Collection
            </span>
          </div>

          {/* ACCESSIBLE TEXT ALTERNATIVE LIST FOR HOTSPOTS (WCAG Compliance) */}
          <div className="mt-8 p-6 bg-parchment/50 border border-walnut/15 rounded-none">
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-walnut font-semibold mb-3">
              Room Curation Elements (Catalog Listing):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {artOfLiving.hotspots.map((spot) => (
                <div key={`text-${spot.id}`} className="space-y-1">
                  <span className="font-sans font-medium text-oxblood uppercase text-[10px] tracking-wider block">
                    {spot.category}
                  </span>
                  <p className="font-serif text-sm text-walnut font-medium">
                    {spot.title}
                  </p>
                  <p className="text-walnut/70 text-[11px] leading-relaxed">
                    {spot.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* THREE SERVICE PILLARS (A, B, C) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {artOfLiving.services.map((svc) => (
            <div
              key={svc.letter}
              className="p-8 bg-parchment/30 border border-walnut/15 flex flex-col justify-between hover:border-brass/50 transition-colors duration-300 group"
            >
              <div>
                <span className="font-serif text-3xl text-brass block mb-4">
                  {svc.letter}
                </span>
                <h3 className="font-serif text-2xl text-walnut mb-3 font-normal">
                  {svc.title}
                </h3>
                <p className="font-serif text-sm text-walnut/75 leading-relaxed mb-6">
                  {svc.description}
                </p>

                <ul className="space-y-2 border-t border-walnut/10 pt-4 mb-8">
                  {svc.details.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-sans text-walnut/80 flex items-start space-x-2"
                    >
                      <span className="text-brass font-bold mr-1">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#private-enquiries"
                onClick={() => onSelectService && onSelectService(svc.title)}
                className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-walnut group-hover:text-oxblood transition-colors pt-2 font-medium"
              >
                <span>Commission {svc.title}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        {/* Advisory Business Model Notice & Actions */}
        <div className="p-8 bg-walnut-dark text-ivory border border-brass/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-brass-light font-medium block mb-2">
              Private Engagement Structure
            </span>
            <p className="font-serif text-base sm:text-lg text-parchment/90 italic leading-relaxed">
              “{artOfLiving.businessModel}”
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
            {onOpenDossier && (
              <button
                type="button"
                onClick={onOpenDossier}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-ivory text-walnut font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-parchment transition-colors shadow"
              >
                <Layers className="w-4 h-4 mr-2 text-brass" />
                <span>{artOfLiving.ctaPrimary}</span>
              </button>
            )}

            <a
              href="#private-enquiries"
              onClick={() => onSelectService && onSelectService("Interiors & Living")}
              className="inline-flex items-center justify-center px-6 py-3.5 border border-brass text-brass-light font-sans text-xs tracking-[0.2em] uppercase hover:bg-brass hover:text-estate-black transition-colors"
            >
              <span>{artOfLiving.ctaSecondary}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
