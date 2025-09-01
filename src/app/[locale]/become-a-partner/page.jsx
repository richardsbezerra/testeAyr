"use client";

import React, { useEffect, useRef, forwardRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from 'next-intl';
import CTAButton from "@/components/ui/CTAButton";
import FooterAry from "@/components/layout/FooterAry";

gsap.registerPlugin(ScrollTrigger);

const PRIMARY_COLOR = "#ff6d4d";

// --- ÍCONES EM OBJETO (Fácil Reuso) ---

import { BuildingStorefront, CodeBracketSquare, UserGroup, CurrencyDollar, WrenchScrewdriver, Megaphone} from '@/components/ui/Icons';

const Icons = {
  BuildingStorefront,
  CodeBracketSquare,
  UserGroup,
  CurrencyDollar,
  WrenchScrewdriver,
  Megaphone
};

// --- COMPONENTES ---
const SectionTitle = memo(({ children, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl sm:text-4xl font-bold text-white">{children}</h2>
    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
));

const PartnerCard = forwardRef(({ icon: Icon, title, description }, ref) => (
  <div ref={ref} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-orange-500/20 hover:-translate-y-2">
    <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-orange-500/10 border border-orange-500/20">
      <Icon className="h-8 w-8" style={{ color: PRIMARY_COLOR }} />
    </div>
    <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
    <p className="mt-2 text-slate-400">{description}</p>
  </div>
));

PartnerCard.displayName = "PartnerCard";

// --- PÁGINA ---
export default function PartnersPage() {
  const t = useTranslations('PartnersPage');
  const cardsRef = useRef([]);

  // --- DADOS COM TRADUÇÃO ---
  const partnerTypes = [
    { icon: Icons.BuildingStorefront, title: t("partnerTypes.agencies.title"), description: t("partnerTypes.agencies.description") },
    { icon: Icons.CodeBracketSquare, title: t("partnerTypes.developers.title"), description: t("partnerTypes.developers.description") },
    { icon: Icons.UserGroup, title: t("partnerTypes.techCompanies.title"), description: t("partnerTypes.techCompanies.description") }
  ];

  const partnershipBenefits = [
    { icon: Icons.CurrencyDollar, title: t("benefits.commissions.title"), description: t("benefits.commissions.description") },
    { icon: Icons.WrenchScrewdriver, title: t("benefits.support.title"), description: t("benefits.support.description") },
    { icon: Icons.Megaphone, title: t("benefits.comarketing.title"), description: t("benefits.comarketing.description") }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(cardsRef.current).forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#000d2e] text-white selection:bg-orange-500/30">
      {/* HERO */}
      <section className="relative isolate pt-14 overflow-hidden">
        <div className="py-24 sm:py-32 text-center container mx-auto px-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white text-transparent bg-clip-text">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
            {t("hero.description")}
          </p>
          <div className="mt-10">
            <CTAButton href="https://shre.ink/telefone-ayrCore">{t("hero.ctaButton")}</CTAButton>
          </div>
        </div>
      </section>

      {/* TIPOS DE PARCEIROS */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle={t("partnerTypesSection.subtitle")}>{t("partnerTypesSection.title")}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTypes.map((partner, i) => (
              <PartnerCard key={partner.title} ref={(el) => cardsRef.current[i] = el} {...partner} />
            ))}
          </div>
        </div>
      </section>

      {/* VANTAGENS */}
      <section className="py-24 sm:py-32 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle={t("benefitsSection.subtitle")}>{t("benefitsSection.title")}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipBenefits.map((benefit, i) => (
              <PartnerCard key={benefit.title} ref={(el) => cardsRef.current[i + partnerTypes.length] = el} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <FooterAry />
    </div>
  );
}