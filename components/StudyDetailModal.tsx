"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowRight, Palette, Layers, Compass } from "lucide-react";
import { EditorialStudy } from "@/config/site";

interface StudyDetailModalProps {
  study: EditorialStudy | null;
  onClose: () => void;
  onCommissionRelated?: (studyTitle: string) => void;
}

export default function StudyDetailModal({
  study,
  onClose,
  onCommissionRelated,
}: StudyDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!study) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-estate-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-ivory text-walnut overflow-y-auto shadow-2xl border border-brass/40 animate-in zoom-in-95 duration-300"
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-ivory/95 backdrop-blur border-b border-walnut/15">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-lg text-brass font-medium">
              Study {study.number}
            </span>
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-walnut/50">
              — {study.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-walnut/70 hover:text-oxblood hover:bg-walnut/10 transition-colors rounded-none focus:outline-none focus:ring-1 focus:ring-brass"
            aria-label="Close study dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 sm:p-12 space-y-10">
          {/* Study Title & Subtitle */}
          <div>
            <h2
              id="modal-study-title"
              className="font-serif text-4xl sm:text-5xl text-walnut font-light leading-tight mb-4"
            >
              {study.title}
            </h2>
            <p className="font-serif text-xl sm:text-2xl text-oxblood italic font-normal">
              {study.subtitle}
            </p>
          </div>

          {/* Full Resolution Editorial Image */}
          <div className="relative aspect-[16/10] w-full bg-walnut-dark overflow-hidden shadow-xl border border-walnut/20">
            <Image
              src={study.image}
              alt={study.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>

          {/* Materials & Palette Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-parchment/50 border border-walnut/15">
            <div>
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-walnut/60 font-semibold block mb-2">
                Material Focus
              </span>
              <div className="flex flex-wrap gap-2">
                {study.materials.map((mat) => (
                  <span
                    key={mat}
                    className="text-xs font-sans px-3 py-1 bg-ivory text-walnut border border-walnut/15 font-medium"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-walnut/60 font-semibold block mb-2">
                Atmospheric Palette
              </span>
              <div className="flex items-center space-x-3">
                {study.palette.map((color, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <span
                      className="w-5 h-5 rounded-full border border-walnut/20 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] font-mono text-walnut/70">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Curatorial Essay */}
          <div className="space-y-6 font-serif text-lg sm:text-xl text-walnut/90 leading-relaxed font-light">
            {study.essay.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Provenance & Methodology Note */}
          <div className="p-6 bg-walnut-dark text-ivory border-l-4 border-brass">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-brass-light font-semibold block mb-1">
              Curatorial Protocol
            </span>
            <p className="font-serif text-sm text-parchment/80 italic leading-relaxed">
              {study.provenanceNotes}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-walnut/15">
            <span className="text-xs font-sans text-walnut/60">
              Inquiries regarding private curation or acquisition:
            </span>

            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-walnut/30 text-xs font-sans uppercase tracking-[0.2em] text-walnut hover:border-walnut transition-colors"
              >
                Close Study
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onCommissionRelated) onCommissionRelated(study.title);
                }}
                className="px-6 py-3 bg-brass text-estate-black text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-brass-light transition-colors shadow flex items-center"
              >
                <span>Discuss Similar Commission</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
