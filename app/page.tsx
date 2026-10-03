"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SITE_CONFIG, EditorialStudy } from "@/config/site";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import ArtOfLivingSection from "@/components/ArtOfLivingSection";
import ArchivalVaultSection from "@/components/ArchivalVaultSection";
import ObjectsAndStoriesSection from "@/components/ObjectsAndStoriesSection";
import DirectorSection from "@/components/DirectorSection";
import PrivateCommissionSection from "@/components/PrivateCommissionSection";
import PrivateEnquiriesSection from "@/components/PrivateEnquiriesSection";
import Footer from "@/components/Footer";
import StudyDetailModal from "@/components/StudyDetailModal";
import ArtOfLivingModal from "@/components/ArtOfLivingModal";
import ArchivalVaultModal from "@/components/ArchivalVaultModal";
import AssetManifestModal from "@/components/AssetManifestModal";

function EstateContent() {
  const searchParams = useSearchParams();

  // Modal Dialog States
  const [activeStudy, setActiveStudy] = useState<EditorialStudy | null>(null);
  const [artDossierOpen, setArtDossierOpen] = useState(false);
  const [vaultDossierOpen, setVaultDossierOpen] = useState(false);
  const [manifestOpen, setManifestOpen] = useState(false);

  // Form State
  const [selectedEnquiryArea, setSelectedEnquiryArea] = useState<string>("Interiors & Living");

  // Deep linking support via search params
  useEffect(() => {
    const view = searchParams.get("view");
    const studyId = searchParams.get("study");

    if (view === "art-of-living") {
      setArtDossierOpen(true);
    } else if (view === "archival-vault") {
      setVaultDossierOpen(true);
    } else if (view === "manifest") {
      setManifestOpen(true);
    }

    if (studyId) {
      const found = SITE_CONFIG.objectsAndStories.studies.find((s) => s.id === studyId);
      if (found) {
        setActiveStudy(found);
      }
    }
  }, [searchParams]);

  // Handlers for cross-section actions
  const handleSelectService = (serviceName: string) => {
    setSelectedEnquiryArea("Interiors & Living");
    const el = document.getElementById("private-enquiries");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCommissionSearch = () => {
    setSelectedEnquiryArea("Archival Fashion");
    const el = document.getElementById("private-enquiries");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCommissionRelated = (studyTitle: string) => {
    if (studyTitle.toLowerCase().includes("velvet") || studyTitle.toLowerCase().includes("archival")) {
      setSelectedEnquiryArea("Archival Fashion");
    } else {
      setSelectedEnquiryArea("Interiors & Living");
    }
    const el = document.getElementById("private-enquiries");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-estate-black text-ivory flex flex-col font-sans selection:bg-oxblood selection:text-ivory">
      {/* Header Navigation */}
      <HeaderNav onOpenAssetManifest={() => setManifestOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 flex flex-col">
        {/* Section 1: The Arrival — Cinematic Hero */}
        <HeroSection />

        {/* Section 2: A Singular Point of View — Philosophy */}
        <PhilosophySection />

        {/* Section 3: Pillar I — The Art of Living */}
        <ArtOfLivingSection
          onOpenDossier={() => setArtDossierOpen(true)}
          onSelectService={handleSelectService}
        />

        {/* Section 4: Pillar II — The Archival Vault */}
        <ArchivalVaultSection
          onOpenVaultDossier={() => setVaultDossierOpen(true)}
          onCommissionSearch={handleCommissionSearch}
        />

        {/* Section 5: Objects & Stories — Editorial Studies */}
        <ObjectsAndStoriesSection
          onSelectStudy={(study) => setActiveStudy(study)}
        />

        {/* Section 6: The Director — Personal Introduction */}
        <DirectorSection />

        {/* Section 7: The Private Commission — Engagement Methodology */}
        <PrivateCommissionSection />

        {/* Section 8: Private Enquiries — Functional Inquiry Experience */}
        <PrivateEnquiriesSection selectedArea={selectedEnquiryArea} />
      </main>

      {/* Discreet Footer */}
      <Footer
        onOpenAssetManifest={() => setManifestOpen(true)}
        onOpenArtDossier={() => setArtDossierOpen(true)}
        onOpenVaultDossier={() => setVaultDossierOpen(true)}
      />

      {/* DEDICATED DETAIL MODALS & ACCESSIBLE DIALOGS */}
      {/* 1. Study Reader Modal */}
      <StudyDetailModal
        study={activeStudy}
        onClose={() => setActiveStudy(null)}
        onCommissionRelated={handleCommissionRelated}
      />

      {/* 2. Art of Living Specification Modal */}
      <ArtOfLivingModal
        isOpen={artDossierOpen}
        onClose={() => setArtDossierOpen(false)}
        onBeginResidenceCommission={() => {
          setSelectedEnquiryArea("Interiors & Living");
          const el = document.getElementById("private-enquiries");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 3. Archival Vault Specification Modal */}
      <ArchivalVaultModal
        isOpen={vaultDossierOpen}
        onClose={() => setVaultDossierOpen(false)}
        onBeginSearchCommission={() => {
          setSelectedEnquiryArea("Archival Fashion");
          const el = document.getElementById("private-enquiries");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 4. Curatorial Asset Manifest Modal */}
      <AssetManifestModal
        isOpen={manifestOpen}
        onClose={() => setManifestOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-estate-black flex items-center justify-center text-parchment/60 font-serif text-lg">
          Entering The Connoisseur’s Estate...
        </div>
      }
    >
      <EstateContent />
    </Suspense>
  );
}
