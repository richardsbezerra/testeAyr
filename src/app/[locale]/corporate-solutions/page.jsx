"use client";

import React, { useEffect, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Power3 } from 'gsap';
import FooterAry from '@/components/layout/FooterAry';
import ThreeModelViewer from '@/app/[locale]/corporate-solutions/ThreeModelViewer';
import ApproachSection from "@/components/ui/ApproachSection";
import CTAButton from '@/components/ui/CTAButton';
import {useTranslations} from 'next-intl';

// Registra o plugin ScrollTrigger apenas uma vez no client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Componente de ícone memoizado para evitar recriação desnecessária
const IconWrapper = React.memo(({ icon: Icon, className }) => (
  <Icon className={className} />
));

// Ícones pré-definidos
import { building, arrows, bolt, chart,} from '@/components/ui/Icons';

const ICONS = {
  building,
  arrows,
  bolt,
  chart,
};

const CorporateSolutionsPage = () => {
  const t = useTranslations('CorporateSolutionsPage');
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const differentialsRef = useRef([]);
  const pillarsRef = useRef([]);
  const animationsRef = useRef([]);
  const scrollTriggersRef = useRef([]);

  // Dados dinâmicos com traduções
  const CORE_PILLARS = useMemo(() => [
    { 
      icon: 'arrows', 
      title: t('pillars.systemIntegration.title'), 
      description: t('pillars.systemIntegration.description')
    },
    { 
      icon: 'bolt', 
      title: t('pillars.processAutomation.title'), 
      description: t('pillars.processAutomation.description')
    },
    { 
      icon: 'chart', 
      title: t('pillars.dataIntelligence.title'), 
      description: t('pillars.dataIntelligence.description')
    },
    { 
      icon: 'building', 
      title: t('pillars.customPlatforms.title'), 
      description: t('pillars.customPlatforms.description')
    }
  ], [t]);

  const DIFFERENTIALS = useMemo(() => [
    {
      title: t('differentials.seniorEngineering.title'),
      description: t('differentials.seniorEngineering.description')
    },
    {
      title: t('differentials.transparency.title'),
      description: t('differentials.transparency.description')
    },
    {
      title: t('differentials.roiFocus.title'),
      description: t('differentials.roiFocus.description')
    },
    {
      title: t('differentials.userCenteredDesign.title'),
      description: t('differentials.userCenteredDesign.description')
    },
    {
      title: t('differentials.agilityQuality.title'),
      description: t('differentials.agilityQuality.description')
    },
    {
      title: t('differentials.innovation.title'),
      description: t('differentials.innovation.description')
    }
  ], [t]);

  const PROCESS_ITEMS = useMemo(() => [
    {
      num: "1.",
      title: t('process.diagnosis.title'),
      desc: t('process.diagnosis.description')
    },
    {
      num: "2.",
      title: t('process.architecture.title'),
      desc: t('process.architecture.description')
    },
    {
      num: "3.",
      title: t('process.implementation.title'),
      desc: t('process.implementation.description')
    },
    {
      num: "4.",
      title: t('process.support.title'),
      desc: t('process.support.description')
    }
  ], [t]);

  // Função para limpar todas as animações
  const cleanupAnimations = useCallback(() => {
    // Kill todas as animações GSAP
    animationsRef.current.forEach(animation => {
      if (animation && animation.kill) {
        animation.kill();
      }
    });
    animationsRef.current = [];

    // Kill todos os ScrollTriggers
    scrollTriggersRef.current.forEach(trigger => {
      if (trigger && trigger.kill) {
        trigger.kill();
      }
    });
    scrollTriggersRef.current = [];

    // Reset manual de estilos para elementos que podem estar ocultos
    const resetElements = [
      ...heroRef.current?.querySelectorAll('h1, p') || [],
      ...differentialsRef.current.filter(el => el) || [],
      ...pillarsRef.current.filter(el => el) || []
    ];

    resetElements.forEach(el => {
      if (el) {
        gsap.set(el, { clearProps: "all" });
      }
    });
  }, []);

  // Função para inicializar animações
  const initAnimations = useCallback(() => {
    // Limpa animações anteriores primeiro
    cleanupAnimations();

    // Aguarda um frame para garantir que o DOM foi atualizado
    requestAnimationFrame(() => {
      // Animação do Hero
      const heroElements = heroRef.current?.querySelectorAll('h1, p');
      if (heroElements && heroElements.length > 0) {
        // Reset inicial para garantir visibilidade
        gsap.set(heroElements, { opacity: 1, y: 0 });
        
        const heroAnimation = gsap.from(heroElements, {
          duration: 1,
          y: 50,
          opacity: 0,
          stagger: 0.2,
          ease: Power3.easeOut
        });
        animationsRef.current.push(heroAnimation);
      }

      // Animação para pilares
      pillarsRef.current.forEach((el, i) => {
        if (el) {
          // Reset inicial
          gsap.set(el, { opacity: 1, y: 0 });
          
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            onEnter: () => {
              const animation = gsap.from(el, {
                y: 50, 
                opacity: 0, 
                duration: 0.8, 
                delay: i * 0.1
              });
              animationsRef.current.push(animation);
            },
            once: true
          });
          scrollTriggersRef.current.push(trigger);
        }
      });

      // Animação para diferenciais
      differentialsRef.current.forEach((el, i) => {
        if (el) {
          // Reset inicial
          gsap.set(el, { opacity: 1, y: 0 });
          
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            onEnter: () => {
              const animation = gsap.from(el, {
                y: 50, 
                opacity: 0, 
                duration: 0.8, 
                delay: i * 0.1
              });
              animationsRef.current.push(animation);
            },
            once: true
          });
          scrollTriggersRef.current.push(trigger);
        }
      });

      // Refresh ScrollTrigger após todas as animações serem configuradas
      ScrollTrigger.refresh();
    });
  }, [cleanupAnimations]);

  // Efeito principal que re-executa quando as traduções mudam
  useLayoutEffect(() => {
    // Aguarda o próximo tick para garantir que o DOM foi atualizado com as novas traduções
    const timer = setTimeout(() => {
      initAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupAnimations();
    };
  }, [CORE_PILLARS, DIFFERENTIALS, PROCESS_ITEMS, initAnimations, cleanupAnimations]);

  // Cleanup final no unmount
  useEffect(() => {
    return () => {
      cleanupAnimations();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [cleanupAnimations]);

  // Processa os pilares com ícones
  const processedPillars = useMemo(() =>
    CORE_PILLARS.map(pillar => ({
      ...pillar,
      icon: <IconWrapper icon={ICONS[pillar.icon]} className="h-8 w-8 text-[#ff6d4d]" />
    })),
    [CORE_PILLARS]);

  return (
    <div className="bg-[#000d2e] text-white">
      {/* HERO SECTION */}
      <section className="relative isolate pt-14" ref={heroRef}>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#800080] to-[#4a00e0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>

        <div className="py-24 sm:py-32">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10">
              <CTAButton href="https://shre.ink/telefone-ayrCore">
                {t('hero.ctaButton')}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES DA TRANSFORMAÇÃO */}
      <ApproachSection
        id="abordagem-title"
        title={t('pillars.sectionTitle')}
        description={t('pillars.sectionDescription')}
        items={processedPillars}
        ref={pillarsRef}
      />

      {/* PROCESSO END-TO-END */}
      <section className="py-24 sm:py-32" ref={processRef}>
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('process.sectionTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <ThreeModelViewer />
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-300">
                {t('process.sectionDescription')}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-300 lg:max-w-none">
                {PROCESS_ITEMS.map((item) => (
                  <ProcessItem key={item.num} {...item} />
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS ESTRATÉGICOS */}
      <section className="py-24 sm:py-32 bg-slate-800/10">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('differentials.sectionTitle')}
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
              {t('differentials.sectionDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {DIFFERENTIALS.map((item, index) => (
              <DifferentialCard
                key={`${item.title}-${index}`} // Key mais estável
                ref={el => differentialsRef.current[index] = el}
                {...item}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center py-24 sm:py-32">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('finalCta.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            {t('finalCta.subtitle')}
          </p>
          <div className="mt-10">
            <CTAButton href="https://shre.ink/telefone-ayrCore">
              {t('finalCta.button')}
            </CTAButton>
          </div>
        </div>
      </section>

      <FooterAry />
    </div>
  );
};

// Componentes auxiliares
const ProcessItem = React.memo(({ num, title, desc }) => (
  <div className="relative pl-9">
    <dt className="inline font-semibold text-white">
      <span className="absolute left-1 top-1 h-5 w-5 text-[#ff6d4d]">{num}</span> {title}
    </dt>
    <dd className="inline ml-2">{desc}</dd>
  </div>
));

const DifferentialCard = React.forwardRef(({ title, description }, ref) => (
  <div
    ref={ref}
    className="hover-card bg-slate-900/30 p-6 rounded-xl border border-white/10 transition-all"
  >
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
));

DifferentialCard.displayName = 'DifferentialCard';

export default CorporateSolutionsPage;