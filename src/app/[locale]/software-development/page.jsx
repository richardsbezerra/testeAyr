"use client";

import React, { useLayoutEffect, useRef, memo } from "react";
import dynamic from "next/dynamic";
import FooterAry from "@/components/layout/FooterAry";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "@/components/ui/CTAButton";
// A importação agora funcionará corretamente
import PainPointsSection from "@/components/ui/PainPointsSection";
import {useTranslations} from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

// Lazy load
const SoftwareMockup = dynamic(() => import("@/app/[locale]/software-development/SoftwareMockup"), { ssr: false });

import {
  CodeBracketIconSoftDev,
  CubeIcon,
  Cog6ToothIcon,
  CircleStackIcon,
} from '@/components/ui/Icons';

function SoftwareDevelopmentPage() {
  const t = useTranslations('SoftwareDevelopmentPage');
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const parceriaTextRef = useRef(null);
  const parceriaImgRef = useRef(null);

  // Dados que dependem de tradução - movidos para dentro do componente
  const painPointsData = [
    {
      icon: CodeBracketIconSoftDev,
      title: t("painPoints.legacy.title"),
      description: t("painPoints.legacy.description"),
    },
    {
      icon: CubeIcon,
      title: t("painPoints.disconnected.title"),
      description: t("painPoints.disconnected.description"),
    },
    {
      icon: Cog6ToothIcon,
      title: t("painPoints.manual.title"),
      description: t("painPoints.manual.description"),
    },
    {
      icon: CircleStackIcon,
      title: t("painPoints.data.title"),
      description: t("painPoints.data.description"),
    },
  ];

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Animação Hero
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animação pain points
      const painEls = gsap.utils.toArray("[data-anim='pain-point-card']"); // Mudei o seletor para ser mais específico
      if (painEls.length) {
        gsap.from(painEls, {
          scrollTrigger: {
            trigger: painEls[0].parentElement, // O trigger pode ser o container dos cards
            start: "top 80%",
          },
          opacity: 0,
          y: 40,
          stagger: 0.18,
          duration: 0.8,
          ease: "power3.out",
        });
      }

       // Animação parceria texto/imagem
       if (parceriaTextRef.current) {
         gsap.from(parceriaTextRef.current, {
           scrollTrigger: {
             trigger: parceriaTextRef.current,
             start: "top 80%",
           },
           opacity: 0,
           x: -50,
           duration: 0.9,
           ease: "power3.out",
         });
       }
       if (parceriaImgRef.current) {
         gsap.from(parceriaImgRef.current, {
           scrollTrigger: {
             trigger: parceriaImgRef.current,
             start: "top 80%",
           },
           opacity: 0,
           x: 50,
           duration: 0.9,
           ease: "power3.out",
         });
       }

      // Animação valores
      const valorEls = gsap.utils.toArray("[data-anim='valor']");
      if (valorEls.length) {
        gsap.from(valorEls, {
          scrollTrigger: {
            trigger: valorEls[0],
            start: "top 85%",
          },
          opacity: 0,
          scale: 0.88,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-[#000d2e] text-white">
      {/* HERO */}
      <section ref={heroRef} className="relative isolate pt-14">
         <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#800080] to-[#4a00e0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="py-24 sm:py-32">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
            <div className="mt-10">
              <CTAButton href="https://shre.ink/telefone-ayrCore">
                {t("hero.cta")}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <PainPointsSection
        painPoints={painPointsData}
        sectionTitle={t("painPoints.sectionTitle")}
        sectionSubtitle={t("painPoints.sectionSubtitle")}
      />
      
      {/* PARCERIA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto px-8 lg:px-16 max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={parceriaTextRef}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("partnership.title")}
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                {t("partnership.description")}
              </p>
              <ul className="mt-8 space-y-4 text-slate-300">
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-[#ff6d4d]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>{t("partnership.features.analysis.strong")}</strong> {t("partnership.features.analysis.text")}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-[#ff6d4d]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>{t("partnership.features.roi.strong")}</strong> {t("partnership.features.roi.text")}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-[#ff6d4d]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>{t("partnership.features.methodology.strong")}</strong> {t("partnership.features.methodology.text")}
                  </span>
                </li>
              </ul>
            </div>

            <div ref={parceriaImgRef} className="w-full aspect-[16/9] w-4/5">
              <SoftwareMockup />
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-24 sm:py-32 bg-slate-800/10">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("values.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
              {t("values.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div data-anim="valor">
              <CodeBracketIconSoftDev className="mx-auto h-12 w-12 text-[#ff6d4d]" />
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t("values.items.innovation.title")}
              </h3>
              <p className="mt-2 text-slate-300">
                {t("values.items.innovation.description")}
              </p>
            </div>
            <div data-anim="valor">
              <CubeIcon className="mx-auto h-12 w-12 text-[#ff6d4d]" />
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t("values.items.personalization.title")}
              </h3>
              <p className="mt-2 text-slate-300">
                {t("values.items.personalization.description")}
              </p>
            </div>
            <div data-anim="valor">
              <Cog6ToothIcon className="mx-auto h-12 w-12 text-[#ff6d4d]" />
              <h3 className="mt-4 text-xl font-semibold text-white">
                {t("values.items.commitment.title")}
              </h3>
              <p className="mt-2 text-slate-300">
                {t("values.items.commitment.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center py-24 sm:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            {t("finalCta.description")}
          </p>
          <div className="mt-10">
            <CTAButton href="https://shre.ink/telefone-ayrCore">
              {t("finalCta.cta")}
            </CTAButton>
          </div>
        </div>
      </section>

      <FooterAry />
    </div>
  );
}

export default memo(SoftwareDevelopmentPage);