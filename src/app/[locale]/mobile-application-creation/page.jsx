"use client";

import FooterAry from '@/components/layout/FooterAry'
import ApproachSection from "@/components/ui/ApproachSection";
import CTAButton from '@/components/ui/CTAButton';

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import AppMockup from '@/app/[locale]/mobile-application-creation/AppMockup';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import {useTranslations} from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

// --- SEUS ÍCONES (mantidos como estão) ---
import {
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  ServerStackIcon,
  QuoteIcon,
  CheckCircleIcon
} from '@/components/ui/Icons';

export default function AppDevelopmentPage() {
  const t = useTranslations('AppDevelopmentPage');
  const main = useRef(null);
  const cardRefs = useRef([]);
  
  // Dados estruturados para melhor manutenção - agora com traduções
  const ourApproach = useMemo(() => [
    { 
      icon: <PaintBrushIcon className="h-8 w-8 text-[#ff6d4d]" />, 
      title: t('approach.items.design.title'), 
      description: t('approach.items.design.description')
    },
    { 
      icon: <DevicePhoneMobileIcon className="h-8 w-8 text-[#ff6d4d]" />, 
      title: t('approach.items.development.title'), 
      description: t('approach.items.development.description')
    },
    { 
      icon: <RocketLaunchIcon className="h-8 w-8 text-[#ff6d4d]" />, 
      title: t('approach.items.performance.title'), 
      description: t('approach.items.performance.description')
    },
    { 
      icon: <ServerStackIcon className="h-8 w-8 text-[#ff6d4d]" />, 
      title: t('approach.items.integration.title'), 
      description: t('approach.items.integration.description')
    }
  ], [t]);

  const processSteps = useMemo(() => [
    { number: "1", title: t('process.steps.strategy.title'), description: t('process.steps.strategy.description') },
    { number: "2", title: t('process.steps.design.title'), description: t('process.steps.design.description') },
    { number: "3", title: t('process.steps.development.title'), description: t('process.steps.development.description') },
    { number: "4", title: t('process.steps.launch.title'), description: t('process.steps.launch.description') }
  ], [t]);

  const conceptCommitments = useMemo(() => [
    { 
      title: t('concept.commitments.userCentered.title'), 
      description: t('concept.commitments.userCentered.description')
    },
    { 
      title: t('concept.commitments.cleanCode.title'), 
      description: t('concept.commitments.cleanCode.description')
    },
    { 
      title: t('concept.commitments.communication.title'), 
      description: t('concept.commitments.communication.description')
    }
  ], [t]);

  // Funções de animação memoizadas
  const animateFromElements = useCallback((selector, vars) => {
    gsap.from(selector, { 
      opacity: 0, 
      y: 50, 
      duration: 0.8, 
      ease: "power3.out", 
      stagger: 0.2,
      ...vars
    });
  }, []);

  const animateTimelineWithScroll = useCallback((trigger, animations, start = "top 80%", toggleActions = "play none none reverse") => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger, start, toggleActions }
    });
    animations.forEach(({selector, fromVars, position}) => {
      tl.from(selector, fromVars, position);
    });
    return tl;
  }, []);

  // Efeito principal otimizado
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Seção Hero
      gsap.from("#hero-gradient", { opacity: 0, scale: 0.8, duration: 1.5, ease: "power3.out", delay: 0.1 });
      animateFromElements("#hero-title", { delay: 0.2 });
      animateFromElements("#hero-p", { delay: 0.4 });
      animateFromElements("#hero-button", { delay: 0.6 });

      // Seção Nossa Abordagem
      animateTimelineWithScroll("#abordagem-section", [
        { selector: "#abordagem-title, #abordagem-p", fromVars: { opacity: 0, y: 50 } },
        { selector: ".abordagem-card", fromVars: { opacity: 0, y: 40, duration: 0.6, ease: "power2.out" }, position: "-=0.4" }
      ]);

      // Seção Processo
      animateTimelineWithScroll("#processo-section", [
        { selector: "#processo-title, #processo-p", fromVars: { opacity: 0, y: 50 } },
        { selector: ".processo-step", fromVars: { opacity: 0, y: 50, scale: 0.9, duration: 0.6, ease: "power2.out" }, position: "-=0.4" }
      ]);

      // Seção Conceito
      animateTimelineWithScroll("#conceito-section", [
        { selector: "#conceito-title, #conceito-p", fromVars: { opacity: 0, y: 50 } },
        { selector: "#conceito-mockup", fromVars: { opacity: 0, x: -80, duration: 1, ease: "power3.out" }, position: "-=0.5" },
        { selector: "#conceito-text", fromVars: { opacity: 0, x: 80, duration: 1, ease: "power3.out" }, position: "<" },
        { selector: ".conceito-list-item", fromVars: { opacity: 0, y: 30, duration: 0.5, ease: "power2.out" }, position: "-=0.5" }
      ], "top 70%");

      // Seção CTA Final
      animateTimelineWithScroll("#cta-section", [
        { selector: ".cta-item", fromVars: { opacity: 0, scale: 0.8, duration: 0.8, ease: "power3.out" } }
      ], "top 85%");

      // Animação para cardRefs
      if (cardRefs.current.length) {
        gsap.from(cardRefs.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
    }, main);

    return () => ctx.revert();
  }, [animateFromElements, animateTimelineWithScroll]);

  return (
    <div ref={main} className="bg-[#000d2e] text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="relative isolate pt-14">
        <div id="hero-gradient" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#800080] to-[#4a00e0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
            style={{ 
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' 
            }} 
          />
        </div>
        <div className="py-24 sm:py-32">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <h1 id="hero-title" className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t('hero.title')}
            </h1>
            <p id="hero-p" className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div id="hero-button" className="mt-10">
              <CTAButton href="https://shre.ink/telefone-ayrCore">
                {t('hero.cta')}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* NOSSA ABORDAGEM */}
      <ApproachSection
        id="abordagem-title"
        title={t('approach.title')}
        description={t('approach.description')}
        items={ourApproach}
      />

      {/* PROCESSO DE DESENVOLVIMENTO */}
      <div id="processo-section" className="py-24 sm:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 id="processo-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('process.title')}
            </h2>
            <p id="processo-p" className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              {t('process.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center processo-step">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-purple-500/10 border-2 border-[#ff6d4d] text-[#ff6d4d] text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEÇÃO DE PROJETO CONCEITUAL */}
      <div id="conceito-section" className="py-24 sm:py-32 bg-slate-800/10">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 id="conceito-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('concept.title')}
            </h2>
            <p id="conceito-p" className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
              {t('concept.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div id="conceito-mockup" className="flex justify-center">
              <AppMockup />
            </div>
            <div id="conceito-text">
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                {t('concept.commitmentTitle')}
              </h3>
              <p className="mt-4 text-lg text-slate-300">
                {t('concept.commitmentDescription')}
              </p>
              <ul className="mt-8 space-y-6">
                {conceptCommitments.map((item) => (
                  <li key={item.title} className="flex items-start gap-4 conceito-list-item">
                    <CheckCircleIcon className="h-7 w-7 flex-shrink-0 text-[#ff6d4d] mt-1" />
                    <div>
                      <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <a 
                  href="https://shre.ink/telefone-ayrCore" 
                  className="text-base font-semibold text-white hover:text-[#ff6d4d] transition-colors"
                >
                  {t('concept.contactLink')} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div id="cta-section" className="text-center py-24 sm:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl cta-item">
            {t('finalCta.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto cta-item">
            {t('finalCta.description')}
          </p>
          <div className="mt-10 cta-item">
            <CTAButton href="https://shre.ink/telefone-ayrCore">
              {t('finalCta.cta')}
            </CTAButton>
          </div>
        </div>
      </div>
      <FooterAry />
    </div>
  );
}