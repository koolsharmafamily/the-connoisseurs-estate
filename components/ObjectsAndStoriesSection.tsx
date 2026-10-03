"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { SITE_CONFIG, EditorialStudy } from "@/config/site";

interface ObjectsAndStoriesSectionProps {
  onSelectStudy: (study: EditorialStudy) => void;
}

export default function ObjectsAndStoriesSection({
  onSelectStudy,
}: ObjectsAndStoriesSectionProps) {
  const { objectsAndStories } = SITE_CONFIG;
  const studies = objectsAndStories.studies;

  return (
    <section
      id="objects-stories"
      className="relative w-full bg-parchment text-walnut py-28 md:py-36 border-t border-walnut/10"
      aria-label="Editorial Studies — Objects & Stories"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-walnut/15 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-walnut/40" />
              <p className="text-[11px] font-sans tracking-[0.28em] uppercase text-walnut/70 font-semibold">
                CURATORIAL ESSAYS
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-walnut font-light leading-[1.08] tracking-tight">
              {objectsAndStories.title}
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-serif text-lg md:text-xl text-walnut/80 leading-relaxed font-light mb-2">
              {objectsAndStories.introduction}
            </p>
            <p className="text-[11px] font-sans text-walnut/60 leading-normal italic">
              {objectsAndStories.disclaimer}
            </p>
          </div>
        </div>

        {/* ASYMMETRIC EDITORIAL ARRANGEMENT (Varied image proportions & alignments) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Study 01: The Collected Room (Takes 7 columns on top, landscape focus) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-ivory/80 border border-walnut/15 hover:border-brass/50 transition-all duration-300 group shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6 text-xs font-sans tracking-[0.2em] uppercase text-walnut/60">
                <span>Study {studies[0].number} — {studies[0].category}</span>
                <button
                  type="button"
                  onClick={() => onSelectStudy(studies[0])}
                  className="text-oxblood font-medium hover:text-brass transition-colors focus:outline-none"
                >
                  Read Dossier
                </button>
              </div>

              <div
                onClick={() => onSelectStudy(studies[0])}
                className="relative aspect-[16/10] w-full overflow-hidden bg-walnut-dark mb-6 cursor-pointer border border-walnut/10"
              >
                <Image
                  src={studies[0].image}
                  alt={studies[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-walnut/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-walnut mb-3 font-normal leading-tight group-hover:text-oxblood transition-colors">
                {studies[0].title}
              </h3>

              <p className="font-serif text-base sm:text-lg text-walnut/80 leading-relaxed mb-6 font-light">
                {studies[0].subtitle}. {studies[0].summary}
              </p>
            </div>

            <div className="pt-6 border-t border-walnut/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {studies[0].materials.map((mat) => (
                  <span
                    key={mat}
                    className="text-[10px] font-sans px-2.5 py-1 bg-parchment text-walnut/70 border border-walnut/10 uppercase tracking-wider"
                  >
                    {mat}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSelectStudy(studies[0])}
                className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-walnut font-medium group-hover:text-brass transition-colors"
                aria-label={`Open editorial study: ${studies[0].title}`}
              >
                <span className="hidden sm:inline">Examine Study</span>
                <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Studies 02 & 03 (Vertical Stack with varied proportions) */}
          <div className="lg:col-span-5 flex flex-col space-y-10 justify-between">
            {/* Study 02: Velvet, After Dark */}
            <div className="p-8 bg-ivory/80 border border-walnut/15 hover:border-brass/50 transition-all duration-300 group shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 text-xs font-sans tracking-[0.2em] uppercase text-walnut/60">
                  <span>Study {studies[1].number} — {studies[1].category}</span>
                  <BookOpen className="w-3.5 h-3.5 text-oxblood" />
                </div>

                <div
                  onClick={() => onSelectStudy(studies[1])}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-walnut-dark mb-5 cursor-pointer border border-walnut/10"
                >
                  <Image
                    src={studies[1].image}
                    alt={studies[1].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-walnut mb-2 font-normal group-hover:text-oxblood transition-colors">
                  {studies[1].title}
                </h3>

                <p className="font-serif text-sm sm:text-base text-walnut/75 leading-relaxed mb-4 font-light">
                  {studies[1].summary}
                </p>
              </div>

              <div className="pt-4 border-t border-walnut/10 flex items-center justify-between">
                <span className="text-[10px] font-sans tracking-widest uppercase text-walnut/50">
                  Curatorial Reference AW96
                </span>
                <button
                  type="button"
                  onClick={() => onSelectStudy(studies[1])}
                  className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-walnut font-medium group-hover:text-brass transition-colors"
                  aria-label={`Open editorial study: ${studies[1].title}`}
                >
                  <span>Examine</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Study 03: The Detail That Remains */}
            <div className="p-8 bg-ivory/80 border border-walnut/15 hover:border-brass/50 transition-all duration-300 group shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 text-xs font-sans tracking-[0.2em] uppercase text-walnut/60">
                  <span>Study {studies[2].number} — {studies[2].category}</span>
                  <BookOpen className="w-3.5 h-3.5 text-brass-dark" />
                </div>

                <div
                  onClick={() => onSelectStudy(studies[2])}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-walnut-dark mb-5 cursor-pointer border border-walnut/10"
                >
                  <Image
                    src={studies[2].image}
                    alt={studies[2].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-walnut mb-2 font-normal group-hover:text-oxblood transition-colors">
                  {studies[2].title}
                </h3>

                <p className="font-serif text-sm sm:text-base text-walnut/75 leading-relaxed mb-4 font-light">
                  {studies[2].summary}
                </p>
              </div>

              <div className="pt-4 border-t border-walnut/10 flex items-center justify-between">
                <span className="text-[10px] font-sans tracking-widest uppercase text-walnut/50">
                  Peccary & Antique Carnelian
                </span>
                <button
                  type="button"
                  onClick={() => onSelectStudy(studies[2])}
                  className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-walnut font-medium group-hover:text-brass transition-colors"
                  aria-label={`Open editorial study: ${studies[2].title}`}
                >
                  <span>Examine</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
