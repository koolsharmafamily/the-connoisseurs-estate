"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Check, ArrowRight, Shield, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ArtOfLivingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBeginResidenceCommission: () => void;
}

export default function ArtOfLivingModal({
  isOpen,
  onClose,
  onBeginResidenceCommission,
}: ArtOfLivingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { artOfLiving } = SITE_CONFIG;

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="art-living-dossier-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-estate-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-ivory text-walnut overflow-y-auto shadow-2xl border border-brass/40 animate-in zoom-in-95 duration-300"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-ivory/95 backdrop-blur border-b border-walnut/15">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-lg text-brass font-medium">
              Pillar I Specification
            </span>
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-walnut/50">
              — Spatial & Cultural Curation
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-walnut/70 hover:text-oxblood hover:bg-walnut/10 transition-colors focus:outline-none focus:ring-1 focus:ring-brass"
            aria-label="Close Art of Living Specification"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 space-y-10">
          <div>
            <span className="text-xs font-sans tracking-[0.28em] uppercase text-brass-dark font-medium block mb-2">
              CURATORIAL SPECIFICATION
            </span>
            <h2
              id="art-living-dossier-title"
              className="font-serif text-4xl sm:text-5xl text-walnut font-light leading-tight mb-4"
            >
              The Art of Living
            </h2>
            <p className="font-serif text-xl text-oxblood italic font-normal">
              Spatial direction for residences that feel collected over time.
            </p>
          </div>

          <div className="relative aspect-[16/9] w-full bg-walnut-dark overflow-hidden shadow-xl border border-walnut/20">
            <Image
              src="/images/art-of-living-salon.jpg"
              alt="Italian palazzo salon interior study"
              fill
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>

          {/* Three Disciplines Detailed */}
          <div className="space-y-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-walnut border-b border-walnut/15 pb-3">
              Curation Disciplines
            </h3>

            {artOfLiving.services.map((svc) => (
              <div
                key={svc.letter}
                className="p-6 bg-parchment/40 border border-walnut/15 space-y-4"
              >
                <div className="flex items-baseline space-x-3">
                  <span className="font-serif text-2xl text-brass font-normal">
                    {svc.letter}.
                  </span>
                  <h4 className="font-serif text-2xl text-walnut">
                    {svc.title}
                  </h4>
                </div>
                <p className="font-serif text-base text-walnut/80 leading-relaxed">
                  {svc.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {svc.details.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2 text-xs font-sans text-walnut/75"
                    >
                      <Check className="w-3.5 h-3.5 text-brass mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Retainer & Engagement Terms */}
          <div className="p-8 bg-walnut-dark text-ivory border-l-4 border-brass space-y-3">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-brass-light font-semibold block">
              Engagement Architecture
            </span>
            <p className="font-serif text-lg text-parchment/95 italic leading-relaxed">
              “{artOfLiving.businessModel}”
            </p>
            <p className="text-xs font-sans text-parchment/70 leading-relaxed pt-2">
              Every residence represents an independent spatial narrative. Engagements commence with a discrete dialogue and on-site aesthetic audit, establishing the curatorial scope before any acquisition commitments are made.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-walnut/15">
            <span className="text-xs font-sans text-walnut/60">
              Private commissions accepted for villas, townhouses, and estates.
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBeginResidenceCommission();
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-brass text-estate-black font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-brass-light transition-colors shadow flex items-center justify-center"
            >
              <span>Discuss Your Residence</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
