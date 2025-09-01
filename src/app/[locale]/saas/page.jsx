"use client";

import React, { useRef, useEffect, useMemo, useCallback, memo } from "react";
import { FaCode, FaServer, FaCloud, FaDatabase, FaMobileAlt, FaTools } from "react-icons/fa";
import ApproachSection from "@/components/ui/ApproachSection";
import FooterAry from '@/components/layout/FooterAry'
import CTAButton from '@/components/ui/CTAButton';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useTranslations} from 'next-intl';


gsap.registerPlugin(ScrollTrigger);

// --- ÍCONES PARA A PÁGINA ---


import {
  CloudArrowUpIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  LightBulbIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from '@/components/ui/Icons';


function SaasPage() {
  const t = useTranslations('saas');
  const mainRef = useRef(null);
  const iconsRef = useRef([]); // manter referência aos elementos (DOM nodes)

  // callback ref eficiente para registrar ícones (evita re-criação no render)
  const addToRefs = useCallback((el) => {
    if (!el) return;
    // Usamos dataset para evitar duplicates mais rápido do que includes()
    if (el.dataset?.registered === "true") return;
    el.dataset.registered = "true";
    iconsRef.current.push(el);
  }, []);

  // Memorizar dados para evitar recriação do array e dos objetos JSX
  const ourExpertise = useMemo(() => [
    { 
      Icon: <CloudArrowUpIcon className="h-8 w-8 text-[#ff6d4d]" />, 
      title: t("expertise.scalableArchitecture.title"), 
      description: t("expertise.scalableArchitecture.description")
    },
    { 
      Icon: <PaintBrushIcon className="h-8 w-8 text-[#ff6d4d]" />, 
      title: t("expertise.experienceDesign.title"), 
      description: t("expertise.experienceDesign.description")
    },
    { 
      Icon: <CreditCardIcon className="h-8 w-8 text-[#ff6d4d]" />, 
      title: t("expertise.monetizationStrategies.title"), 
      description: t("expertise.monetizationStrategies.description")
    },
    { 
      Icon: <ShieldCheckIcon className="h-8 w-8 text-[#ff6d4d]" />, 
      title: t("expertise.security.title"), 
      description: t("expertise.security.description")
    },
  ], [t]);

  const ourMethodology = useMemo(() => [
    { 
      Icon: LightBulbIcon, 
      title: t("methodology.immersionStrategy.title"), 
      description: t("methodology.immersionStrategy.description")
    },
    { 
      Icon: PaintBrushIcon, 
      title: t("methodology.designPrototyping.title"), 
      description: t("methodology.designPrototyping.description")
    },
    { 
      Icon: CodeBracketIcon, 
      title: t("methodology.agileDevelopment.title"), 
      description: t("methodology.agileDevelopment.description")
    },
    { 
      Icon: RocketLaunchIcon, 
      title: t("methodology.launchEvolution.title"), 
      description: t("methodology.launchEvolution.description")
    },
  ], [t]);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context((self) => {
      // Reduz a criação de muitos ScrollTriggers usando batch quando possível
      // 1) HERO animations (keeps simple)
      gsap.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-title",
          start: "top 80%",
          scrub: 0.5,
        },
      });

      gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: "power3.out" });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".hero-cta",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // 2) Use batch for sections/cards: cria menos triggers internamente
      ScrollTrigger.batch(".animated-section", {
        start: "top 80%",
        onEnter: (batch) => {
          // batch é um array de elementos que entraram na tela
          batch.forEach((section) => {
            const heading = section.querySelector("h2");
            const paragraph = section.querySelector("p");
            const cards = section.querySelectorAll(".gsap-card");

            const tl = gsap.timeline();
            if (heading) tl.from(heading, { opacity: 0, y: 50, duration: 0.6, ease: "power2.out" });
            if (paragraph) tl.from(paragraph, { opacity: 0, y: 40, duration: 0.6, ease: "power2.out" }, "-=0.4");
            if (cards.length) {
              tl.from(cards, {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.18,
              }, "-=0.3");
            }
          });
        },
        // opcional: limitar frequência para desempenho
        interval: 0.1,
        amount: 1,
      });

      // 3) Tech icons: animar entrada com um único trigger e depois floating com timelines leves
      if (iconsRef.current.length > 0) {
        gsap.from(iconsRef.current, {
          opacity: 0,
          scale: 0.5,
          y: 60,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".tech-section",
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            // Pequenas animações contínuas - uma timeline por ícone pode ser custosa.
            // Em vez disso, usamos uma timeline mestre com mods para cada ícone
            iconsRef.current.forEach((icon, i) => {
              // usar versões leves de repeat animations
              gsap.to(icon, {
                y: "-=8",
                x: "+=3",
                duration: 2 + (i * 0.1),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.15,
              });
            });
          },
        });
      }

      // 4) Background parallax - keep simple and scrub true
      gsap.to(".background-blur", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".background-blur",
          start: "top top",
          scrub: true,
        },
      });

      // Optionally: reduce animations on small screens to improve perf
      ScrollTrigger.matchMedia({
        // no animations on very small screens
        "(max-width: 480px)": function () {
          // kill heavy animations if necessary
          gsap.killTweensOf(iconsRef.current);
        },
      });
    }, mainRef);

    return () => {
      // limpa tudo (timelines, triggers) criado dentro do context
      ctx.revert();
      // também limpamos nosso registro de ícones para evitar memory leaks entre unmounts
      iconsRef.current = [];
    };
  }, [addToRefs]);

  return (
    <div className="bg-[#000d2e] text-white" ref={mainRef}>
      {/* HERO */}
      <div className="relative isolate pt-14 background-blur">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#800080] to-[#4a00e0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>
        <div className="py-24 sm:py-32">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl hero-title">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto hero-subtitle">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 hero-cta">
              <CTAButton href="https://shre.ink/telefone-ayrCore">
                {t("hero.cta")}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERTISE */}
      <ApproachSection
        id="abordagem-title"
        title={t("approach.title")}
        description={t("approach.description")}
        items={ourExpertise}
      />

      {/* METODOLOGIA */}
      <div className="py-24 sm:py-32 animated-section">
        <div className="container mx-auto px-8 lg:px-16 ">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("methodology.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {t("methodology.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {ourMethodology.map((step) => {
              const Icon = step.Icon;
              return (
                <div key={step.title} className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-800/20 border border-white/10 gsap-card transition-transform duration-300 hover:scale-105 hover:border-white/20">
                  <div className="mb-4">
                    <Icon className="h-10 w-10 text-[#ff6d4d]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TECNOLOGIAS */}
      <div className="py-24 sm:py-32 bg-slate-800/10 animated-section tech-section">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("technology.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
              {t("technology.description")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-4xl text-white">
            <FaCode ref={addToRefs} title={t("technology.icons.frontend")} />
            <FaServer ref={addToRefs} title={t("technology.icons.backend")} />
            <FaDatabase ref={addToRefs} title={t("technology.icons.database")} />
            <FaCloud ref={addToRefs} title={t("technology.icons.cloud")} />
            <FaMobileAlt ref={addToRefs} title={t("technology.icons.mobile")} />
            <FaTools ref={addToRefs} title={t("technology.icons.devops")} />
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="text-center py-24 sm:py-32 animated-section">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            {t("finalCta.description")}
          </p>
          <div className="mt-10">
            <CTAButton href="https://shre.ink/telefone-ayrCore">
              {t("finalCta.button")}
            </CTAButton>
          </div>
        </div>
      </div>

      <FooterAry />
    </div>
  );
}

// memoizar export ajuda se props forem passadas futuramente
export default memo(SaasPage);