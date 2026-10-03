"use client";

import React from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative w-full bg-parchment text-walnut py-28 md:py-40 overflow-hidden"
      aria-label="A Singular Point of View — Philosophy"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Subtle section label */}
        <div className="flex items-center space-x-3 mb-12">
          <span className="w-10 h-[1px] bg-walnut/30" />
          <p className="text-[11px] font-sans tracking-[0.28em] uppercase text-walnut/70 font-semibold">
            PHILOSOPHY & POINT OF VIEW
          </p>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Literary Editorial Text */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-12">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-walnut font-light leading-[1.1] tracking-tight mb-8">
                Rooms. Objects. Dress.
                <br />
                <span className="italic font-normal text-oxblood">
                  One point of view.
                </span>
              </h2>

              <p className="font-serif text-xl sm:text-2xl text-walnut/85 leading-relaxed font-light mb-8 max-w-xl">
                {SITE_CONFIG.philosophy.body}
              </p>

              {/* Supporting Blockquote Annotation */}
              <div className="border-l-2 border-brass pl-6 py-2 my-10 bg-ivory/40">
                <p className="font-serif text-2xl sm:text-3xl italic text-walnut font-normal leading-snug">
                  “{SITE_CONFIG.philosophy.supportingStatement}”
                </p>
                <span className="block mt-2 text-[10px] font-sans tracking-[0.25em] uppercase text-walnut/60">
                  {SITE_CONFIG.roleTitle} — Curatorial Thesis
                </span>
              </div>
            </div>

            {/* Smaller Close-up Image: Hand-Carved Escritoire & Books */}
            <div className="relative pt-6">
              <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden bg-walnut-dark shadow-xl border border-walnut/15 group">
                <Image
                  src="/images/study-collected-room.jpg"
                  alt="Walnut escrutoire with antique oil painting and leather-bound monographs in private library"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between max-w-md text-[10px] font-sans tracking-[0.2em] uppercase text-walnut/60">
                <span>Figure 01.1 — The Living Library</span>
                <span>Aged Walnut & Silk</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tall Architectural Photograph & Curatorial Margin */}
          <div className="lg:col-span-6 flex flex-col space-y-8 lg:pl-6">
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-walnut-dark shadow-2xl border border-walnut/20 group">
              <Image
                src="/images/philosophy-detail-closeup.jpg"
                alt="Architectural close-up of hand-painted fresco plaster wall and antique carved walnut cornice"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut-dark/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Fine Catalogue-Style Caption */}
            <div className="flex flex-col space-y-2 border-t border-walnut/15 pt-4">
              <div className="flex items-center justify-between text-[11px] font-sans tracking-[0.22em] uppercase text-walnut/80 font-medium">
                <span>Detail 01.2 — Architectural Reveal</span>
                <span>Tuscan Plaster & Carved Cornice</span>
              </div>
              <p className="font-serif text-sm text-walnut/70 leading-relaxed italic">
                Lime-washed plaster walls, meeting hand-carved Italian walnut moldings and patinated bronze fixtures. The dialogue between architectural permanence and tactile living.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
