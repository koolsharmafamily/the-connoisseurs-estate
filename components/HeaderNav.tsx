"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface HeaderNavProps {
  onOpenAssetManifest?: () => void;
}

export default function HeaderNav({ onOpenAssetManifest }: HeaderNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);

  // Monitor scroll for header background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trap focus and handle Escape in mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Optional subtle estate ambiance (Web Audio API synthetic warm fireplace/rain crackle)
  const toggleEstateAmbiance = () => {
    if (isAudioPlaying) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.5);
        setTimeout(() => {
          audioContextRef.current?.suspend();
          setIsAudioPlaying(false);
        }, 500);
      }
    } else {
      try {
        if (!audioContextRef.current) {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;

          // Generate synthetic warm ambient room tone with gentle pink filter
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.015;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(420, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.001, ctx.currentTime);

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          whiteNoise.start();

          gainNodeRef.current = gain;
        }

        if (audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume();
        }

        if (gainNodeRef.current && audioContextRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0.07, audioContextRef.current.currentTime, 0.8);
        }
        setIsAudioPlaying(true);
      } catch {
        // Audio policy or unsupported browser
      }
    }
  };

  const navLinks = [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Art of Living", href: "#art-of-living" },
    { label: "Archival Vault", href: "#archival-vault" },
    { label: "The Director", href: "#the-director" },
    { label: "Private Enquiries", href: "#private-enquiries" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-estate-black/92 backdrop-blur-md py-4 border-b border-brass/20 shadow-xl"
            : "bg-gradient-to-b from-estate-black/70 via-estate-black/30 to-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Discreet Wordmark */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-none"
            aria-label={`${SITE_CONFIG.brandTitle} — Home`}
          >
            <span className="font-serif text-lg md:text-xl text-ivory tracking-widest uppercase transition-colors duration-300 group-hover:text-brass-light">
              {SITE_CONFIG.displayWordmark}
            </span>
            <span className="text-[10px] font-sans tracking-[0.28em] text-parchment/60 uppercase -mt-0.5">
              {SITE_CONFIG.roleTitle}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-10"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-xs font-sans uppercase tracking-[0.22em] text-ivory/80 hover:text-ivory transition-colors duration-300 py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brass transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Header Controls: Audio & Commission CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-5">
            {/* Subtle Estate Ambiance Sound Toggle */}
            <button
              onClick={toggleEstateAmbiance}
              type="button"
              className="hidden sm:flex items-center space-x-2 text-[11px] tracking-widest uppercase font-sans text-parchment/70 hover:text-brass transition-colors py-1.5 px-2.5 border border-white/10 hover:border-brass/40 rounded-sm"
              title={isAudioPlaying ? "Mute Estate Ambiance" : "Listen to Estate Ambiance"}
              aria-label={isAudioPlaying ? "Mute Estate Room Tone" : "Play Estate Room Tone"}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-brass animate-pulse" />
                  <span className="hidden md:inline">Ambiance On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-parchment/60" />
                  <span className="hidden md:inline">Ambiance</span>
                </>
              )}
            </button>

            {/* Quick Enquiry CTA */}
            <a
              href="#private-enquiries"
              className="hidden sm:inline-block text-[11px] tracking-[0.2em] uppercase font-sans px-4 py-2 border border-brass/60 text-ivory hover:bg-brass hover:text-estate-black transition-all duration-300"
            >
              Enquire
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              type="button"
              className="lg:hidden p-2 text-ivory/80 hover:text-ivory focus:outline-none focus:ring-1 focus:ring-brass"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE EDITORIAL DRAWER */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 bg-estate-black/98 backdrop-blur-lg flex flex-col justify-between p-8 md:p-14 animate-in fade-in duration-300"
        >
          {/* Top Bar with Wordmark and Close Button */}
          <div className="flex items-center justify-between border-b border-brass/20 pb-6">
            <div className="flex flex-col">
              <span className="font-serif text-xl text-ivory tracking-widest uppercase">
                {SITE_CONFIG.displayWordmark}
              </span>
              <span className="text-[10px] font-sans tracking-[0.25em] text-parchment/60 uppercase">
                {SITE_CONFIG.roleTitle}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              type="button"
              className="p-3 text-ivory/80 hover:text-brass transition-colors focus:outline-none focus:ring-1 focus:ring-brass"
              aria-label="Close Navigation Menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Large Editorial Nav Links */}
          <nav className="flex flex-col space-y-6 my-auto" aria-label="Mobile Links">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-brass/40 transition-colors"
              >
                <span className="font-serif text-3xl sm:text-4xl text-ivory group-hover:text-brass transition-colors">
                  {link.label}
                </span>
                <span className="text-xs font-sans text-parchment/40 tracking-widest">
                  0{idx + 1}
                </span>
              </a>
            ))}

            {onOpenAssetManifest && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssetManifest();
                }}
                className="text-left text-xs uppercase tracking-[0.25em] text-parchment/60 hover:text-brass pt-4 transition-colors"
              >
                Curatorial Asset Manifest
              </button>
            )}
          </nav>

          {/* Drawer Footer */}
          <div className="border-t border-brass/20 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-parchment/60 tracking-wider">
            <p className="italic font-serif text-sm text-ivory/80">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-parchment/50">
              {SITE_CONFIG.contact.advisoryLocations}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
