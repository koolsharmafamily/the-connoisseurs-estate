"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, FileText, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface AssetManifestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssetManifestModal({
  isOpen,
  onClose,
}: AssetManifestModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { assetManifest } = SITE_CONFIG;

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
      aria-labelledby="manifest-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-estate-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[90vh] bg-ivory text-walnut overflow-y-auto shadow-2xl border border-brass/40 animate-in zoom-in-95 duration-300"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-ivory/95 backdrop-blur border-b border-walnut/15">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-brass" />
            <span className="font-serif text-xl text-walnut font-medium">
              Curatorial Asset Manifest
            </span>
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-walnut/50 hidden sm:inline">
              — Section 14 Integrity Audit
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-walnut/70 hover:text-oxblood hover:bg-walnut/10 transition-colors focus:outline-none focus:ring-1 focus:ring-brass"
            aria-label="Close Asset Manifest"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Manifest Content */}
        <div className="p-8 sm:p-12 space-y-8">
          <div>
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-brass-dark font-medium block mb-2">
              ASSET REGISTRY & ACCESSIBILITY AUDIT
            </span>
            <h2
              id="manifest-modal-title"
              className="font-serif text-3xl sm:text-4xl text-walnut font-light mb-4"
            >
              Estate Imagery & Provenance Records
            </h2>
            <p className="font-serif text-base text-walnut/80 leading-relaxed font-light max-w-2xl">
              All imagery utilized across The Connoisseur’s Estate is stored locally, optimized for high-density displays, and provided with explicit semantic alternative text and curatorial role definitions. No third-party hotlinking is employed.
            </p>
          </div>

          {/* Asset List Cards */}
          <div className="space-y-6">
            {assetManifest.map((asset, idx) => (
              <div
                key={asset.id}
                className="p-6 bg-parchment/40 border border-walnut/15 flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Thumbnail Preview */}
                <div className="relative w-full md:w-48 aspect-[4/3] bg-walnut-dark overflow-hidden flex-shrink-0 border border-walnut/20 shadow">
                  <Image
                    src={asset.filename}
                    alt={asset.altText}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-estate-black/80 text-parchment/90 text-[9px] font-mono uppercase">
                    {asset.aspectRatio}
                  </span>
                </div>

                {/* Metadata Column */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans tracking-widest uppercase text-brass-dark font-semibold">
                      Record 0{idx + 1} · {asset.id}
                    </span>
                    <span className="text-[10px] font-mono text-walnut/60 bg-ivory px-2 py-0.5 border border-walnut/10">
                      {asset.filename}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-walnut font-normal">
                    {asset.title}
                  </h3>

                  <p className="text-xs font-sans text-walnut/70">
                    <strong className="text-walnut font-semibold">Role:</strong> {asset.role}
                  </p>

                  <div className="p-3 bg-ivory/80 border border-walnut/10 text-xs font-serif italic text-walnut/80">
                    <strong className="font-sans not-italic text-[10px] tracking-wider uppercase text-walnut/60 block mb-1">
                      Accessible Alt Text:
                    </strong>
                    “{asset.altText}”
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-[11px] font-sans text-walnut/60 border-t border-walnut/10">
                    <span>
                      <strong className="text-walnut">Attribution:</strong> {asset.attribution}
                    </span>
                    <span>
                      <strong className="text-walnut">Curatorial Note:</strong> {asset.curatorialNotes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Close Action */}
          <div className="pt-6 border-t border-walnut/15 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-walnut text-ivory text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-oxblood transition-colors shadow"
            >
              Close Manifest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
