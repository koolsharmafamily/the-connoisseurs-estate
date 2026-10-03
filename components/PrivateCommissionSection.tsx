"use client";

import React from "react";
import { ArrowRight, Compass } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function PrivateCommissionSection() {
  const { privateCommission } = SITE_CONFIG;

  return (
    <section
      id="commission-process"
      className="relative w-full bg-ivory text-charcoal py-28 md:py-36 border-t border-walnut/10"
      aria-label="The Private Commission — Methodology"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-walnut/15 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-brass-dark" />
              <p className="text-[11px] font-sans tracking-[0.28em] uppercase text-brass-dark font-medium">
                {privateCommission.sectionLabel}
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-walnut font-light leading-[1.08] tracking-tight">
              {privateCommission.headline}
            </h2>
          </div>

          <p className="font-serif text-lg md:text-xl text-walnut/80 max-w-md leading-relaxed font-light">
            {privateCommission.subheadline}
          </p>
        </div>

        {/* STAGGERED EDITORIAL SEQUENCE (4 STAGES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {privateCommission.stages.map((stage, idx) => (
            <div
              key={stage.step}
              className={`p-8 bg-parchment/40 border border-walnut/15 flex flex-col justify-between hover:border-brass/50 transition-all duration-300 relative group ${
                idx % 2 === 1 ? "lg:translate-y-6" : ""
              }`}
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-baseline justify-between mb-8 border-b border-walnut/10 pb-4">
                  <span className="font-serif text-4xl text-brass group-hover:text-oxblood transition-colors">
                    {stage.step}
                  </span>
                  <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-walnut/50">
                    Phase {idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-walnut mb-3 font-normal leading-snug">
                  {stage.title}
                </h3>

                <p className="font-serif text-base text-walnut/85 leading-relaxed mb-6 font-light">
                  “{stage.description}”
                </p>
              </div>

              <div className="pt-4 border-t border-walnut/10">
                <span className="text-[9px] font-sans tracking-widest uppercase text-walnut/50 block mb-1">
                  Focus:
                </span>
                <p className="text-xs font-sans text-walnut/70 leading-normal">
                  {stage.focus}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ENGAGEMENT PRICING ARCHITECTURE & ACTION */}
        <div className="p-8 md:p-12 bg-walnut text-ivory border border-brass/30 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-brass-light font-medium block mb-2">
              Terms & Transparency
            </span>
            <p className="font-serif text-lg sm:text-xl text-parchment/95 italic leading-relaxed">
              “{privateCommission.pricingNote}”
            </p>
          </div>

          <a
            href="#private-enquiries"
            className="inline-flex items-center justify-center px-8 py-4 bg-brass text-estate-black font-sans text-xs tracking-[0.22em] uppercase font-medium hover:bg-brass-light transition-all duration-300 shadow-lg group flex-shrink-0"
          >
            <span>{privateCommission.cta}</span>
            <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
