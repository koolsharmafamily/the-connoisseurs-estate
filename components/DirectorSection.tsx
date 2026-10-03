"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Compass, Info } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function DirectorSection() {
  const { director, personalName, roleTitle } = SITE_CONFIG;

  // Use configured portrait if available, otherwise display the beautifully styled studio still life
  const displayImage = director.portraitImage || director.stillLifeImage;
  const isCustomPortrait = Boolean(director.portraitImage);

  return (
    <section
      id="the-director"
      className="relative w-full bg-walnut-dark text-ivory py-28 md:py-36 border-t border-brass/20 overflow-hidden"
      aria-label="The Aesthetic Director"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Styled Studio Still Life / Personal Portrait Placeholder */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full bg-estate-black shadow-2xl border border-brass/30 overflow-hidden group">
              <Image
                src={displayImage}
                alt={
                  isCustomPortrait
                    ? `Portrait of ${personalName}, ${roleTitle}`
                    : "The Aesthetic Director's work table with architectural room drawings, drafting calipers, and linen journal"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-estate-black/80 via-transparent to-transparent opacity-70" />

              {/* Discreet Caption Tag */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-estate-black/80 backdrop-blur-md border border-white/10 text-xs font-sans">
                <span className="text-[10px] tracking-[0.25em] uppercase text-brass-light block mb-0.5">
                  Studio Archive
                </span>
                <span className="font-serif text-sm text-parchment/90 italic">
                  {isCustomPortrait ? `${personalName}` : "The Work Table — Architectural & Textile Studies"}
                </span>
              </div>
            </div>

            {/* Developer/User Notice Note on Replacing Portrait */}
            {!isCustomPortrait && (
              <div className="mt-4 p-3 bg-estate-black/40 border border-white/5 text-[11px] font-sans text-parchment/50 flex items-start space-x-2">
                <Info className="w-3.5 h-3.5 text-brass/70 flex-shrink-0 mt-0.5" />
                <span>
                  Ready for your portrait: Save your image in <code className="text-brass-light">/public/images/director-portrait.jpg</code> and enable it in <code className="text-brass-light">config/site.ts</code>.
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Personal Authority & Core Ethos */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 lg:pl-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-8 h-[1px] bg-brass" />
                <p className="text-[11px] font-sans tracking-[0.28em] uppercase text-brass-light font-medium">
                  {director.sectionLabel}
                </p>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light leading-[1.08] tracking-tight mb-6">
                A personal eye.
                <br />
                <span className="italic font-normal text-brass-light">
                  A coherent world.
                </span>
              </h2>

              <p className="text-xs font-sans tracking-[0.25em] uppercase text-parchment/70 mb-8 font-medium">
                {personalName} — {roleTitle}
              </p>

              {/* Core Philosophy Quote */}
              <div className="border-l-2 border-brass pl-6 py-2 my-8 bg-estate-black/30">
                <p className="font-serif text-xl sm:text-2xl text-parchment leading-relaxed italic font-normal">
                  “{director.philosophy}”
                </p>
              </div>

              {/* Practice Description */}
              <p className="font-serif text-base sm:text-lg text-parchment/80 leading-relaxed font-light mb-8 max-w-xl">
                {director.practiceDescription}
              </p>
            </div>

            {/* Disciplines Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div className="space-y-1">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brass block">
                  Curation Scope
                </span>
                <p className="font-serif text-sm text-ivory font-light">
                  Interiors · Historic Furniture · Fine Art Provenance
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brass block">
                  Sartorial Scope
                </span>
                <p className="font-serif text-sm text-ivory font-light">
                  Archival Runway Pieces · Rare Vintage Objects
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4">
              <a
                href="#private-enquiries"
                className="inline-flex items-center px-8 py-4 bg-brass text-estate-black font-sans text-xs tracking-[0.22em] uppercase font-medium hover:bg-brass-light transition-colors shadow-lg"
              >
                <span>Initiate an Introduction</span>
                <ArrowRight className="w-4 h-4 ml-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
