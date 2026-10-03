"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Check, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ArchivalVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBeginSearchCommission: () => void;
}

export default function ArchivalVaultModal({
  isOpen,
  onClose,
  onBeginSearchCommission,
}: ArchivalVaultModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { archivalVault } = SITE_CONFIG;
  const dossier = archivalVault.dossier;

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
      aria-labelledby="vault-dossier-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-estate-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-estate-black text-ivory overflow-y-auto shadow-2xl border border-brass/40 animate-in zoom-in-95 duration-300"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-estate-black/95 backdrop-blur border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-lg text-brass-light font-medium">
              Pillar II Specification
            </span>
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-parchment/50">
              — Archival Fashion & Private Sourcing
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-parchment/70 hover:text-brass hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-brass"
            aria-label="Close Archival Vault Specification"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 space-y-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/80 border border-brass/30 text-[10px] font-sans tracking-[0.25em] uppercase text-ivory mb-4">
              <Tag className="w-3 h-3 text-brass" />
              <span>{dossier.studyNumber}</span>
            </div>

            <h2
              id="vault-dossier-title"
              className="font-serif text-4xl sm:text-5xl text-ivory font-light leading-tight mb-4"
            >
              The Archival Vault
            </h2>
            <p className="font-serif text-xl text-brass-light italic font-normal">
              {dossier.headline} — Proposed Curatorial Reference AW96
            </p>
          </div>

          <div className="relative aspect-[16/9] w-full bg-walnut-dark overflow-hidden shadow-xl border border-brass/25">
            <Image
              src="/images/archival-vault-velvet.jpg"
              alt="Archival velvet tailoring close-up in studio archive"
              fill
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>

          {/* Curatorial Dossier Table */}
          <div className="p-8 bg-walnut-dark/40 border border-white/10 space-y-6">
            <h3 className="font-serif text-2xl text-ivory pb-2 border-b border-white/10">
              Archival Sourcing Criteria
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-parchment/50 uppercase tracking-widest text-[10px]">
                    Curatorial Focus
                  </span>
                  <span className="font-serif text-lg text-ivory">
                    {dossier.designer}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-parchment/50 uppercase tracking-widest text-[10px]">
                    Historic Collection
                  </span>
                  <span className="font-serif text-base text-parchment/90">
                    {dossier.collection}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-parchment/50 uppercase tracking-widest text-[10px]">
                    Primary Fabric
                  </span>
                  <span className="font-serif text-base text-parchment/90">
                    {dossier.materialFocus}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-parchment/50 uppercase tracking-widest text-[10px]">
                    Silhouette Architecture
                  </span>
                  <span className="font-serif text-base text-parchment/90">
                    {dossier.silhouette}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-parchment/50 uppercase tracking-widest text-[10px]">
                    Historical Context
                  </span>
                  <span className="font-serif text-sm text-parchment/80 leading-relaxed italic">
                    {dossier.historicalContext}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-start space-x-2 text-[11px] text-parchment/65">
              <ShieldCheck className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
              <span>
                {dossier.notes} Every sourcing brief establishes verified condition reports, garment measurements, and authentication provenance before acquisition.
              </span>
            </div>
          </div>

          {/* Sourcing Disciplines */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-ivory">
              Archival Sourcing Scope
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dossier.sourcingScope.map((scope, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-walnut-dark/30 border border-white/5 flex items-start space-x-3 text-xs font-sans text-parchment/80"
                >
                  <Check className="w-4 h-4 text-brass mt-0.5 flex-shrink-0" />
                  <span>{scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Commission Terms */}
          <div className="p-8 bg-oxblood-dark/30 border border-oxblood/60 text-ivory space-y-2">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-brass-light font-semibold block">
              Private Commission Terms
            </span>
            <p className="font-serif text-lg text-parchment/95 italic leading-relaxed">
              “{archivalVault.businessModel}”
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
            <span className="text-xs font-sans text-parchment/60">
              Discreet searches conducted internationally through private networks.
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBeginSearchCommission();
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-brass text-estate-black font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-brass-light transition-colors shadow flex items-center justify-center"
            >
              <span>Commission an Archival Search</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
