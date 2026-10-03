"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ZoomIn, Sparkles, ArrowRight, ShieldCheck, BookOpen, Layers } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ArchivalVaultSectionProps {
  onOpenVaultDossier?: () => void;
  onCommissionSearch?: () => void;
}

export default function ArchivalVaultSection({
  onOpenVaultDossier,
  onCommissionSearch,
}: ArchivalVaultSectionProps) {
  const { archivalVault } = SITE_CONFIG;
  const dossier = archivalVault.dossier;

  // Interactive Inspection Tool State
  const [isInspecting, setIsInspecting] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [lightAngle, setLightAngle] = useState(35); // degrees
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  return (
    <section
      id="archival-vault"
      className="relative w-full bg-estate-black text-ivory py-28 md:py-36 border-t border-brass/20 overflow-hidden"
      aria-label="Pillar II — The Archival Vault"
    >
      {/* Background glow and subtle oxblood architectural mood */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-oxblood/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-walnut/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-oxblood" />
              <p className="text-[11px] font-sans tracking-[0.28em] uppercase text-brass-light font-medium">
                {archivalVault.sectionLabel}
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light leading-[1.08] tracking-tight">
              Fashion worth finding.
              <br />
              <span className="italic font-normal text-brass-light">
                Pieces worth keeping.
              </span>
            </h2>
          </div>

          <p className="font-serif text-lg md:text-xl text-parchment/80 max-w-md leading-relaxed font-light">
            {archivalVault.description}
          </p>
        </div>

        {/* CURATORIAL STUDY 001: VELVET, AFTER DARK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Interactive Archival Fabric / Garment Inspector */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center justify-between text-[11px] font-sans tracking-[0.2em] uppercase text-brass-light">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-oxblood inline-block" />
                <span>{dossier.studyNumber}</span>
              </span>
              <span>Archival Inspection Module</span>
            </div>

            {/* Image Container with Loupe Inspection */}
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsInspecting(true)}
              onMouseLeave={() => setIsInspecting(false)}
              className="relative w-full aspect-[3/2] bg-walnut-dark overflow-hidden shadow-2xl border border-brass/30 cursor-crosshair group"
            >
              <Image
                src={archivalVault.image}
                alt="Archival study of deep oxblood velvet tailoring with hand-rolled peak lapels and tailor pins"
                fill
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover object-center transition-transform duration-700"
                priority
              />

              {/* Raking Light Simulator Overlay */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-opacity duration-300"
                style={{
                  background: `linear-gradient(${lightAngle}deg, rgba(244,239,230,0.15) 0%, transparent 60%, rgba(33,30,27,0.4) 100%)`,
                }}
              />

              {/* Interactive Magnifying Loupe Overlay */}
              {isInspecting && (
                <div
                  className="hidden md:block absolute w-48 h-48 rounded-full border-2 border-brass shadow-2xl pointer-events-none overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-estate-black ring-8 ring-estate-black/40"
                  style={{
                    left: `${loupePos.x}%`,
                    top: `${loupePos.y}%`,
                  }}
                >
                  <div
                    className="absolute w-[300%] h-[300%] max-w-none"
                    style={{
                      left: `-${loupePos.x * 2}%`,
                      top: `-${loupePos.y * 2}%`,
                    }}
                  >
                    <Image
                      src={archivalVault.image}
                      alt="Magnified archival velvet weave view"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Loupe reticle crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className="w-full h-[1px] bg-brass" />
                    <div className="h-full w-[1px] bg-brass absolute" />
                  </div>
                </div>
              )}

              {/* Mobile / Screen Prompt */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 bg-estate-black/85 backdrop-blur-md border border-white/10 text-[10px] font-sans tracking-widest uppercase text-parchment/80">
                <span className="flex items-center space-x-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-brass" />
                  <span>Hover to magnify velvet pile & lapel construction</span>
                </span>
                <span className="text-brass hidden sm:inline">2.5× Loupe</span>
              </div>
            </div>

            {/* Inspection Controls & Material Context */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-sans text-parchment/60">
              <div className="flex items-center space-x-3">
                <span className="text-[10px] uppercase tracking-wider text-parchment/50">
                  Light Angle:
                </span>
                <div className="flex items-center space-x-1">
                  {[15, 35, 65].map((angle) => (
                    <button
                      key={angle}
                      type="button"
                      onClick={() => setLightAngle(angle)}
                      className={`px-2.5 py-1 text-[10px] font-sans border transition-colors ${
                        lightAngle === angle
                          ? "border-brass text-brass bg-brass/10"
                          : "border-white/10 text-parchment/60 hover:border-white/20"
                      }`}
                    >
                      {angle}° Rake
                    </button>
                  ))}
                </div>
              </div>

              <span className="italic font-serif text-xs text-parchment/70">
                Studio Archival Dossier · Reference AW 1996
              </span>
            </div>
          </div>

          {/* Right Column: Curatorial Dossier Breakdown */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:pl-4">
            <div className="border border-brass/25 p-8 bg-walnut-dark/40 backdrop-blur-sm relative">
              {/* Discreet Archival Stamp Label */}
              <div className="absolute -top-3 right-6 px-3 py-0.5 bg-oxblood text-ivory text-[9px] font-sans tracking-[0.25em] uppercase border border-brass/40 shadow">
                Archival Dossier
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light mb-2">
                “{dossier.headline}”
              </h3>
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-brass-light mb-6">
                Proposed Curatorial Reference
              </p>

              {/* Dossier Structured Metadata Table */}
              <dl className="space-y-4 text-xs font-sans border-t border-white/10 pt-5 mb-6">
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-parchment/50 uppercase tracking-wider">Designer:</dt>
                  <dd className="col-span-2 text-ivory font-serif text-sm">
                    {dossier.designer}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-parchment/50 uppercase tracking-wider">Collection:</dt>
                  <dd className="col-span-2 text-ivory font-serif text-sm">
                    {dossier.collection} ({dossier.season})
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-parchment/50 uppercase tracking-wider">Material:</dt>
                  <dd className="col-span-2 text-ivory font-serif text-sm">
                    {dossier.materialFocus}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-parchment/50 uppercase tracking-wider">Silhouette:</dt>
                  <dd className="col-span-2 text-parchment/90 font-serif text-sm">
                    {dossier.silhouette}
                  </dd>
                </div>
              </dl>

              {/* Verified Historical Context */}
              <div className="border-t border-white/10 pt-4 mb-6">
                <p className="font-serif text-sm text-parchment/80 leading-relaxed italic">
                  {dossier.historicalContext}
                </p>
              </div>

              {/* Clear Curatorial Reference Notice */}
              <div className="p-3 bg-estate-black/70 border border-white/10 text-[11px] font-sans text-parchment/65 leading-normal mb-6 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                <span>{dossier.notes}</span>
              </div>

              {/* Sourcing Scope Checklist */}
              <div className="space-y-2 border-t border-white/10 pt-4 mb-6">
                <span className="text-[10px] font-sans tracking-widest uppercase text-brass block mb-1">
                  Private Sourcing Disciplines:
                </span>
                {dossier.sourcingScope.map((scope, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-parchment/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass/60" />
                    <span>{scope}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {onOpenVaultDossier && (
                  <button
                    type="button"
                    onClick={onOpenVaultDossier}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-brass text-estate-black font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-brass-light transition-colors"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{archivalVault.ctaPrimary}</span>
                  </button>
                )}
                <a
                  href="#private-enquiries"
                  onClick={onCommissionSearch}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-parchment/30 text-ivory font-sans text-xs tracking-[0.2em] uppercase hover:border-brass hover:text-brass-light transition-colors"
                >
                  <span>{archivalVault.ctaSecondary}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SOURCING TERMS & ETHOS */}
        <div className="p-8 bg-oxblood-dark/30 border border-oxblood/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-brass-light font-medium block mb-2">
              Commission Architecture
            </span>
            <p className="font-serif text-base sm:text-lg text-parchment/90 italic leading-relaxed">
              “{archivalVault.businessModel}”
            </p>
          </div>

          <a
            href="#private-enquiries"
            onClick={onCommissionSearch}
            className="inline-flex items-center px-6 py-3.5 bg-oxblood text-ivory font-sans text-xs tracking-[0.2em] uppercase hover:bg-oxblood/80 transition-colors border border-brass/30 shadow-lg"
          >
            <span>Commission a Sourcing Search</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 text-brass" />
          </a>
        </div>
      </div>
    </section>
  );
}
