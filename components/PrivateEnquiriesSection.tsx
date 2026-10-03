"use client";

import React, { useState } from "react";
import { Check, Copy, AlertCircle, Send, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface FormState {
  name: string;
  email: string;
  location: string;
  areaOfInterest: string;
  description: string;
  preferredTiming: string;
  honeypot: string; // anti-spam bot trap
}

interface FormErrors {
  name?: string;
  email?: string;
  areaOfInterest?: string;
  description?: string;
}

export default function PrivateEnquiriesSection({
  selectedArea,
}: {
  selectedArea?: string;
}) {
  const { enquiries, contact } = SITE_CONFIG;

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    location: "",
    areaOfInterest: selectedArea || "Interiors & Living",
    description: "",
    preferredTiming: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionDossier, setSubmissionDossier] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please provide your name or title.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please provide your confidential email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please ensure the email address is formatted correctly.";
    }

    if (!formData.areaOfInterest) {
      newErrors.areaOfInterest = "Please choose a primary area of interest.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please provide a brief description of your commission or inquiry.";
    } else if (formData.description.trim().length < 15) {
      newErrors.description = "Please provide at least a sentence describing your inquiry.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare formal inquiry dossier
    const dossierText = `--- PRIVATE ENQUIRY DOSSIER ---
To: ${SITE_CONFIG.personalName} — Aesthetic Director
Title: ${SITE_CONFIG.brandTitle}

APPLICANT DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Location: ${formData.location || "Not specified"}

COMMISSION SCOPE:
Area of Interest: ${formData.areaOfInterest}
Preferred Timing: ${formData.preferredTiming || "Flexible"}

DESCRIPTION OF COMMISSION:
${formData.description}
--------------------------------`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionDossier(dossierText);
    }, 400);
  };

  const copyToClipboard = () => {
    if (!submissionDossier) return;
    navigator.clipboard.writeText(submissionDossier).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const hasConfiguredBackend = Boolean(contact.recipientEmail && contact.recipientEmail.trim() !== "");

  return (
    <section
      id="private-enquiries"
      className="relative w-full bg-estate-black text-ivory py-28 md:py-36 border-t border-brass/20 overflow-hidden"
      aria-label="Private Enquiries"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-brass" />
            <p className="text-[11px] font-sans tracking-[0.28em] uppercase text-brass-light font-medium">
              PRIVATE ENQUIRIES
            </p>
            <span className="w-8 h-[1px] bg-brass" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light leading-[1.1] tracking-tight mb-6">
            Tell me about the world
            <br />
            <span className="italic font-normal text-brass-light">
              you would like to create.
            </span>
          </h2>

          <p className="font-serif text-lg text-parchment/80 max-w-xl mx-auto leading-relaxed font-light">
            {enquiries.subheadline}
          </p>
        </div>

        {/* DEMONSTRATION MODE NOTICE OR ACTIVE BACKEND NOTICE */}
        {!hasConfiguredBackend && !submissionDossier && (
          <div className="mb-10 p-4 bg-walnut-dark/80 border border-brass/30 text-xs font-sans text-parchment/70 flex items-start space-x-3">
            <AlertCircle className="w-4 h-4 text-brass-light flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-brass-light font-medium uppercase tracking-wider block mb-1">
                Demonstration Mode Active
              </span>
              <span>
                To preserve private confidentiality during initial review, no external mail server is currently connected. Completing the form allows you to inspect your generated enquiry dossier and copy the formatted brief directly to your clipboard or private email client.
              </span>
            </div>
          </div>
        )}

        {/* FORM OR COMPLETED SUBMISSION DOSSIER */}
        {submissionDossier ? (
          <div
            role="region"
            aria-live="polite"
            className="p-8 md:p-12 bg-walnut-dark/90 border border-brass shadow-2xl animate-in fade-in duration-500"
          >
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-brass/30">
              <span className="w-3 h-3 rounded-full bg-brass animate-pulse" />
              <h3 className="font-serif text-2xl text-ivory">
                Enquiry Dossier Prepared
              </h3>
            </div>

            <p className="font-serif text-base text-parchment/85 leading-relaxed mb-6">
              {!hasConfiguredBackend
                ? "Your enquiry has been formatted into a private curatorial dossier below. Because this concept is operating in demonstration mode, you can copy the brief or open it directly in your email client to reach out."
                : "Thank you for reaching out. Your private inquiry has been transmitted securely."}
            </p>

            {/* Dossier Code Block */}
            <div className="p-6 bg-estate-black/90 border border-white/10 rounded-none font-mono text-xs text-parchment leading-relaxed whitespace-pre-wrap mb-8 shadow-inner overflow-x-auto">
              {submissionDossier}
            </div>

            {/* Actions: Copy to clipboard & Mailto */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-brass text-estate-black font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-brass-light transition-colors shadow"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    <span>Copy Completed Enquiry</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${contact.recipientEmail || "curator@connoisseursestate.com"}?subject=${encodeURIComponent(
                  `Private Enquiry: ${formData.areaOfInterest} — ${formData.name}`
                )}&body=${encodeURIComponent(submissionDossier)}`}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-parchment/40 text-ivory font-sans text-xs tracking-[0.2em] uppercase hover:border-brass hover:text-brass-light transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span>Open in Email Client</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmissionDossier(null)}
                className="text-xs font-sans uppercase tracking-widest text-parchment/50 hover:text-ivory py-2 transition-colors sm:ml-auto"
              >
                Edit Enquiry
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-8 md:p-12 bg-walnut-dark/60 border border-white/10 shadow-2xl space-y-8"
          >
            {/* Honeypot hidden input for spam bots */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website_url">Do not fill this</label>
              <input
                id="website_url"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) =>
                  setFormData({ ...formData, honeypot: e.target.value })
                }
              />
            </div>

            {/* Row 1: Name & Confidential Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="client-name"
                  className="block text-xs font-sans uppercase tracking-[0.2em] text-parchment/80 mb-2 font-medium"
                >
                  Name / Title <span className="text-brass">*</span>
                </label>
                <input
                  id="client-name"
                  type="text"
                  required
                  placeholder="e.g. Julian Vance"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full px-4 py-3 bg-estate-black/80 border text-ivory font-serif text-base placeholder:text-parchment/30 transition-colors focus:outline-none ${
                    errors.name ? "border-oxblood ring-1 ring-oxblood" : "border-white/15 focus:border-brass"
                  }`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-300 font-sans">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="client-email"
                  className="block text-xs font-sans uppercase tracking-[0.2em] text-parchment/80 mb-2 font-medium"
                >
                  Confidential Email <span className="text-brass">*</span>
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  placeholder="name@private.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full px-4 py-3 bg-estate-black/80 border text-ivory font-serif text-base placeholder:text-parchment/30 transition-colors focus:outline-none ${
                    errors.email ? "border-oxblood ring-1 ring-oxblood" : "border-white/15 focus:border-brass"
                  }`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-300 font-sans">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Location (Optional) & Preferred Timing (Optional) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="client-location"
                  className="block text-xs font-sans uppercase tracking-[0.2em] text-parchment/60 mb-2"
                >
                  Primary Location / Residence <span className="text-parchment/40">(Optional)</span>
                </label>
                <input
                  id="client-location"
                  type="text"
                  placeholder="e.g. Florence · London · Zurich"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-estate-black/80 border border-white/15 text-ivory font-serif text-base placeholder:text-parchment/30 focus:border-brass focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="client-timing"
                  className="block text-xs font-sans uppercase tracking-[0.2em] text-parchment/60 mb-2"
                >
                  Preferred Timing <span className="text-parchment/40">(Optional)</span>
                </label>
                <input
                  id="client-timing"
                  type="text"
                  placeholder="e.g. Next Quarter · Autumn 2026"
                  value={formData.preferredTiming}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredTiming: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-estate-black/80 border border-white/15 text-ivory font-serif text-base placeholder:text-parchment/30 focus:border-brass focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Area of Interest (Required Selection) */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.2em] text-parchment/80 mb-3 font-medium">
                Area of Interest <span className="text-brass">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {enquiries.areasOfInterest.map((area) => {
                  const isSelected = formData.areaOfInterest === area;
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, areaOfInterest: area });
                        if (errors.areaOfInterest) {
                          setErrors({ ...errors, areaOfInterest: undefined });
                        }
                      }}
                      className={`px-4 py-3 text-left text-xs font-sans uppercase tracking-wider border transition-all ${
                        isSelected
                          ? "bg-brass text-estate-black border-brass font-medium shadow-md"
                          : "bg-estate-black/60 border-white/15 text-parchment/70 hover:border-brass/50 hover:text-ivory"
                      }`}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
              {errors.areaOfInterest && (
                <p className="mt-1.5 text-xs text-red-300 font-sans">
                  {errors.areaOfInterest}
                </p>
              )}
            </div>

            {/* Row 4: Description of the Commission (Required) */}
            <div>
              <label
                htmlFor="commission-description"
                className="block text-xs font-sans uppercase tracking-[0.2em] text-parchment/80 mb-2 font-medium"
              >
                Description of the Commission <span className="text-brass">*</span>
              </label>
              <textarea
                id="commission-description"
                rows={5}
                required
                placeholder="Share the nature of your inquiry, spatial aspirations, specific archival pieces of interest, or broader aesthetic ambitions..."
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) {
                    setErrors({ ...errors, description: undefined });
                  }
                }}
                className={`w-full px-4 py-3 bg-estate-black/80 border text-ivory font-serif text-base placeholder:text-parchment/30 transition-colors focus:outline-none ${
                  errors.description
                    ? "border-oxblood ring-1 ring-oxblood"
                    : "border-white/15 focus:border-brass"
                }`}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? "desc-error" : undefined}
              />
              {errors.description && (
                <p id="desc-error" className="mt-1.5 text-xs text-red-300 font-sans">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Submit Button & Sub-notice */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <p className="text-xs font-serif italic text-parchment/60 max-w-sm">
                “Please share only the information you are comfortable including in an initial enquiry.”
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 bg-brass text-estate-black font-sans text-xs tracking-[0.22em] uppercase font-medium hover:bg-brass-light transition-all duration-300 shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Preparing Dossier...</span>
                ) : (
                  <>
                    <span>Send Private Enquiry</span>
                    <Send className="w-3.5 h-3.5 ml-2.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
