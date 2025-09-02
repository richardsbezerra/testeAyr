"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FooterAry from '@/components/layout/FooterAry';
import { FaLightbulb, FaHandshake, FaShieldAlt } from "react-icons/fa";
import CTAButton from '@/components/ui/CTAButton';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

// Registrar plugins GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Componente para os cartões de valores
const ValueCard = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    // Animação inicial
    gsap.fromTo(card,
      {
        opacity: 0,
        x: -50,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div ref={cardRef} className="flex gap-6 items-start group cursor-pointer">
      <div className="flex-shrink-0">
        <div className="h-12 w-12 bg-[#ff6d4d] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#ff6d4d]/30">
          <Icon className="text-white text-xl" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function AboutUsPage() {
  const t = useTranslations('AboutUsPage');
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const missionRef = useRef(null);
  const manifestoRef = useRef(null);
  const principlesRef = useRef(null);
  const ctaRef = useRef(null);

  // Dados estruturados para facilitar manutenção - agora usando traduções
  const VALUES_DATA = [
    {
      id: 'innovation',
      icon: FaLightbulb,
      title: t('values.innovation.title'),
      description: t('values.innovation.description')
    },
    {
      id: 'partnership',
      icon: FaHandshake,
      title: t('values.partnership.title'),
      description: t('values.partnership.description')
    },
    {
      id: 'quality',
      icon: FaShieldAlt,
      title: t('values.quality.title'),
      description: t('values.quality.description')
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero Section Animation
    tl.fromTo(titleRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    )
      .fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.5");

    // Mission Section Animation
    gsap.fromTo(missionRef.current,
      {
        opacity: 0,
        x: -100
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Manifesto Section Animation
    const manifestoElements = manifestoRef.current.querySelectorAll('.manifesto-card');
    gsap.fromTo(manifestoElements,
      {
        opacity: 0,
        y: 80,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Principles Animation
    const principleCards = principlesRef.current.querySelectorAll('.principle-card');
    gsap.fromTo(principleCards,
      {
        opacity: 0,
        y: 60,
        rotationY: 45
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: principlesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // CTA Animation
    gsap.fromTo(ctaRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating animation for background elements
    gsap.to(".floating-element", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(4, 6)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    // Parallax effect for gradient background
    gsap.to(".gradient-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".gradient-bg",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

    // Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "AyrCore",
      "description": t('hero.subtitle'),
      "url": "https://ayrcore.com",
      "sameAs": [
        "https://shre.ink/telefone-ayrCore"
      ],
      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Equipe AyrCore"
      },
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços de Tecnologia",
        "itemListElement": VALUES_DATA.map((value, index) => ({
          "@type": "Offer",
          "name": value.title,
          "description": value.description,
          "position": index + 1
        }))
      }
    }
  };

  return (
    <>
      <Head>
        <title>{t('hero.title')} | AyrCore - Tecnologia e Inovação</title>
        <meta name="description" content={t('hero.subtitle')} />
        <meta name="keywords" content="AyrCore, tecnologia, inovação, desenvolvimento, parceria, qualidade, soluções digitais" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AyrCore" />
        <link rel="canonical" href="https://ayrcore.com/about" />

        {/* Open Graph */}
        <meta property="og:title" content={`${t('hero.title')} | AyrCore`} />
        <meta property="og:description" content={t('hero.subtitle')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ayrcore.com/about" />
        <meta property="og:site_name" content="AyrCore" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('hero.title')} | AyrCore`} />
        <meta name="twitter:description" content={t('hero.subtitle')} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="bg-[#000d2e] text-white overflow-x-hidden">
        {/* Hero Section */}
        <header ref={heroRef} className="relative isolate pt-14">
          {/* Background Gradient */}
          <div
            className="gradient-bg absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="floating-element relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#800080] to-[#4a00e0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
              }}
            />
          </div>

          <div className="py-24 sm:py-32 text-center px-6">
            <h1 ref={titleRef} className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              {t('hero.title')}
            </h1>
            <p ref={subtitleRef} className="text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </header>

        {/* Mission and Values Section */}
        <section className="py-24 sm:py-32" aria-labelledby="mission-title">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Mission */}
              <div ref={missionRef} className="space-y-6">
                <h2 id="mission-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {t('mission.title')}
                </h2>
                <div className="space-y-4 text-lg leading-8 text-slate-300">
                  <p>
                    {t('mission.paragraph1')}
                  </p>
                  <p>
                    {t('mission.paragraph2')}
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white sr-only">
                  {t('values.title')}
                </h3>
                {VALUES_DATA.map((value, index) => (
                  <ValueCard
                    key={value.id}
                    icon={value.icon}
                    title={value.title}
                    description={value.description}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Manifesto Section */}
        <section
          className="min-h-screen bg-gradient-to-br from-[#000d2e] via-[#0a1b3d] to-[#4a00e0] py-24 sm:py-32"
          aria-labelledby="manifesto-title"
        >
          <div className="container mx-auto px-8 lg:px-16 max-w-6xl">
            <div className="text-center mb-16">
              <h2 id="manifesto-title" className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                {t('manifesto.mainTitle.part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6d4d] to-[#ff9500]">{t('manifesto.mainTitle.part2')}</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {t('manifesto.subtitle')}
              </p>
            </div>

            <div ref={manifestoRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Manifesto Principal */}
              <div className="space-y-8">
                <div className="manifesto-card backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-[#ff6d4d] mb-4 flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#ff6d4d] rounded-full"></div>
                    {t('manifesto.beliefs.technology.title')}
                  </h3>
                  <p className="text-slate-200 leading-relaxed text-lg">
                    {t('manifesto.beliefs.technology.description')}
                  </p>
                </div>

                <div className="manifesto-card backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-[#ff6d4d] mb-4 flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#ff6d4d] rounded-full"></div>
                    {t('manifesto.beliefs.simplicity.title')}
                  </h3>
                  <p className="text-slate-200 leading-relaxed text-lg">
                    {t('manifesto.beliefs.simplicity.description')}
                  </p>
                </div>
              </div>

              {/* Citação Destaque */}
              <div className="relative">
                <div className="manifesto-card backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-12 shadow-2xl">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#ff6d4d] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">"</span>
                  </div>
                  <blockquote className="text-2xl sm:text-3xl font-medium text-white leading-relaxed mb-6">
                    {t('manifesto.quote.text')}
                  </blockquote>
                  <cite className="text-[#ff6d4d] text-lg font-semibold">
                    {t('manifesto.quote.author')}
                  </cite>
                </div>
              </div>
            </div>

            {/* Princípios em Grid */}
            <div ref={principlesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="principle-card text-center group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ff6d4d] to-[#ff9500] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-white text-3xl font-bold">∞</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{t('principles.evolution.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('principles.evolution.description')}
                </p>
              </div>

              <div className="principle-card text-center group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4a00e0] to-[#8000ff] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-white text-3xl font-bold">⚡</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{t('principles.impact.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('principles.impact.description')}
                </p>
              </div>

              <div className="principle-card text-center group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-white text-3xl font-bold">🤝</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{t('principles.partnership.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('principles.partnership.description')}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-20">
              <div ref={ctaRef} className="inline-block backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('cta.title')}
                </h3>
                <p className="text-slate-300 mb-6 text-lg">
                  {t('cta.description')}
                </p>
                <CTAButton href="https://shre.ink/telefone-ayrCore">
                  {t('cta.button')}
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        <FooterAry />
      </div>
    </>
  );
}