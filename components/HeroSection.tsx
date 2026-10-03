"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, Compass } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import SignatureScene3D from "./SignatureScene3D";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onEnquireClick?: () => void;
}

export default function HeroSection({
  onExploreClick,
  onEnquireClick,
}: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="arrival"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-estate-black pt-28 pb-12"
      aria-label="The Arrival — Estate Entrance"
    >
      {/* LAYER 1: BACKGROUND ARCHITECTURAL IMAGE (Warm Tuscan Palazzo Salon) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.18}px) scale(${1 + scrollY * 0.0003})`,
        }}
      >
        <Image
          src="/images/hero-estate-palazzo.jpg"
          alt="Atmospheric Tuscan palazzo grand salon with arched windows, hand-painted lime wash walls, and aged walnut table"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.72] contrast-[1.08] filter"
        />
        {/* Shadow Vignette & Editorial Scrim Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-estate-black/95 via-estate-black/65 to-estate-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-estate-black via-transparent to-estate-black/50" />
        {/* Subtle Film Grain Texture */}
        <div className="absolute inset-0 film-grain opacity-40 mix-blend-overlay" />
      </div>

      {/* LAYER 2: SIGNATURE 3D WEBGL PATINATED FRAME (Midground / Right) */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 z-10 pointer-events-none flex items-center justify-center lg:justify-end pr-0 lg:pr-12 opacity-90">
        <SignatureScene3D className="w-full h-full max-h-[85vh]" />
      </div>

      {/* LAYER 3: FOREGROUND EDITORIAL CONTENT (Left Column) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto py-12">
        <div className="max-w-2xl">
          {/* Personal Brand Label */}
          <div className="inline-flex items-center space-x-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="w-8 h-[1px] bg-brass/80" />
            <p className="text-[11px] sm:text-xs font-sans tracking-[0.28em] uppercase text-brass-light font-medium">
              {SITE_CONFIG.personalName} — {SITE_CONFIG.roleTitle.toUpperCase()}
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory leading-[1.04] tracking-tight font-light mb-8 animate-in fade-in slide-in-from-bottom-3 duration-1000">
            A life,
            <br />
            <span className="italic font-normal text-brass-light">considered.</span>
          </h1>

          {/* Supporting Statement */}
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-parchment/85 leading-relaxed font-light mb-10 max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            {SITE_CONFIG.subtagline}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            <a
              href="#philosophy"
              onClick={onExploreClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-brass text-estate-black font-sans text-xs tracking-[0.22em] uppercase font-medium hover:bg-brass-light transition-all duration-300 shadow-lg group"
            >
              <span>Explore the Estate</span>
              <Compass className="w-4 h-4 ml-3 transition-transform duration-300 group-hover:rotate-45" />
            </a>

            <a
              href="#private-enquiries"
              onClick={onEnquireClick}
              className="inline-flex items-center justify-center px-8 py-4 border border-parchment/30 text-ivory font-sans text-xs tracking-[0.22em] uppercase font-normal hover:border-brass hover:text-brass-light transition-all duration-300"
            >
              Discuss a Private Commission
            </a>
          </div>
        </div>
      </div>

      {/* LAYER 4: BOTTOM ANNOTATION & SCROLL INDICATOR */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 text-parchment/60 text-[10px] md:text-xs font-sans tracking-[0.25em] uppercase">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <span className="w-2 h-2 rounded-full bg-brass/80 animate-ping inline-block" />
          <span>{SITE_CONFIG.bottomAnnotation}</span>
        </div>

        <a
          href="#philosophy"
          className="flex items-center space-x-2 text-parchment/50 hover:text-brass transition-colors py-1 group"
          aria-label="Scroll down to Philosophy"
        >
          <span>Descend</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-brass" />
        </a>
      </div>
    </section>
  );
}
