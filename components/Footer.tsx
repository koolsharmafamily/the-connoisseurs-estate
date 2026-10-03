"use client";

import React from "react";
import Link from "next/link";
import { Compass, FileText, ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface FooterProps {
  onOpenAssetManifest?: () => void;
  onOpenArtDossier?: () => void;
  onOpenVaultDossier?: () => void;
}

export default function Footer({
  onOpenAssetManifest,
  onOpenArtDossier,
  onOpenVaultDossier,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full bg-estate-black text-ivory border-t border-brass/25 pt-20 pb-12 font-sans"
      aria-label="Discreet Footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Wordmark & Core Ethos */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <Link
                href="/"
                className="font-serif text-2xl text-ivory tracking-widest uppercase hover:text-brass transition-colors"
              >
                {SITE_CONFIG.displayWordmark}
              </Link>
              <p className="text-[11px] font-sans tracking-[0.25em] text-brass-light uppercase mt-1">
                {SITE_CONFIG.roleTitle}
              </p>
              <p className="font-serif text-base text-parchment/70 italic leading-relaxed mt-4 max-w-sm">
                “{SITE_CONFIG.corePositioning}”
              </p>
            </div>

            <div className="text-xs text-parchment/50 tracking-wider">
              {SITE_CONFIG.contact.advisoryLocations}
            </div>
          </div>

          {/* Column 2: Navigation Pillars */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[11px] font-sans tracking-[0.25em] uppercase text-brass-light font-semibold">
              The Estate
            </h4>
            <ul className="space-y-2.5 text-xs text-parchment/75">
              <li>
                <a href="#philosophy" className="hover:text-ivory transition-colors">
                  Philosophy & Point of View
                </a>
              </li>
              <li>
                <a href="#art-of-living" className="hover:text-ivory transition-colors">
                  I — The Art of Living
                </a>
              </li>
              <li>
                <a href="#archival-vault" className="hover:text-ivory transition-colors">
                  II — The Archival Vault
                </a>
              </li>
              <li>
                <a href="#objects-stories" className="hover:text-ivory transition-colors">
                  Objects & Stories
                </a>
              </li>
              <li>
                <a href="#the-director" className="hover:text-ivory transition-colors">
                  The Director
                </a>
              </li>
              <li>
                <a href="#commission-process" className="hover:text-ivory transition-colors">
                  The Private Commission
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Curatorial Dossiers & Manifest */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] font-sans tracking-[0.25em] uppercase text-brass-light font-semibold">
              Documentation & Manifests
            </h4>
            <ul className="space-y-2.5 text-xs text-parchment/75">
              {onOpenArtDossier && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenArtDossier}
                    className="hover:text-brass text-left transition-colors"
                  >
                    Spatial Direction Specification
                  </button>
                </li>
              )}
              {onOpenVaultDossier && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenVaultDossier}
                    className="hover:text-brass text-left transition-colors"
                  >
                    Curatorial Study 001 Dossier (Gucci AW96)
                  </button>
                </li>
              )}
              {onOpenAssetManifest && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenAssetManifest}
                    className="inline-flex items-center text-brass hover:text-brass-light transition-colors font-medium"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5" />
                    <span>Curatorial Asset Manifest & Credits</span>
                  </button>
                </li>
              )}
              <li className="pt-2">
                <a
                  href="#private-enquiries"
                  className="inline-block text-[11px] uppercase tracking-[0.2em] px-4 py-2 border border-brass text-brass-light hover:bg-brass hover:text-estate-black transition-colors"
                >
                  Initiate Commission
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Ethics Disclaimer, Copyright, Back to top */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-parchment/50">
          <p className="max-w-2xl leading-relaxed">
            Authenticity and Provenance: All editorial references are presented as curatorial studies. Private advisory engagements do not claim official affiliations with referenced historical fashion houses unless documented in specific commission provenance agreements.
          </p>

          <div className="flex items-center space-x-6 flex-shrink-0">
            <span>
              © {new Date().getFullYear()} {SITE_CONFIG.brandTitle}.
            </span>
            <button
              onClick={scrollToTop}
              type="button"
              className="p-2 border border-white/10 hover:border-brass hover:text-brass transition-colors rounded-none"
              aria-label="Return to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
