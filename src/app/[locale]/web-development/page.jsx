"use client";

import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import FooterAry from "@/components/layout/FooterAry";
import Image from "next/image";
import ApproachSection from "@/components/ui/ApproachSection";
import CTAButton from '@/components/ui/CTAButton';
import { useTranslations } from 'next-intl';

import gsap from "gsap";
import { useRef } from "react";

// --- ÍCONES PARA A PÁGINA ---

import {
  PaintBrushIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  CheckBadgeIcon,
  QuoteIcon,
} from '@/components/ui/Icons';

export default function WebDevelopmentPage() {
  const t = useTranslations('webDevelopment');

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const cardRefs = useRef([]);
  cardRefs.current = [];
  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    // checa inicialmente e adiciona listener para mudança de tamanho
    const mq = window.matchMedia("(min-width: 1024px)");

    const handle = (e) => setIsLargeScreen(e.matches);
    // set inicial
    setIsLargeScreen(mq.matches);

    // adiciona listener (forma compatível)
    if (mq.addEventListener) {
      mq.addEventListener("change", handle);
    } else {
      mq.addListener(handle);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handle);
      } else {
        mq.removeListener(handle);
      }
    };
  }, []);

  const corePillars = [
    {
      icon: <PaintBrushIcon className="h-8 w-8 text-[#ff6d4d]" />,
      title: t("pillars.design.title"),
      description: t("pillars.design.description")
    },
    {
      icon: <MagnifyingGlassIcon className="h-8 w-8 text-[#ff6d4d]" />,
      title: t("pillars.seo.title"),
      description: t("pillars.seo.description")
    },
    {
      icon: <RocketLaunchIcon className="h-8 w-8 text-[#ff6d4d]" />,
      title: t("pillars.performance.title"),
      description: t("pillars.performance.description")
    },
    {
      icon: <DevicePhoneMobileIcon className="h-8 w-8 text-[#ff6d4d]" />,
      title: t("pillars.responsive.title"),
      description: t("pillars.responsive.description")
    }
  ];

  return (
    <div className="bg-[#000d2e] text-white">
      {/* HERO SECTION */}
      <div className="relative isolate pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#800080] to-[#4a00e0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>

        <div className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl leading-7 text-slate-300 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8">
              <CTAButton href="https://shre.ink/telefone-ayrCore" >
                {t("hero.cta")}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* PILARES */}
      <ApproachSection
        id="abordagem-title"
        title={t("pillars.sectionTitle")}
        description=""
        items={corePillars}
      />

      {/* TIPOS DE SOLUÇÃO */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">{t("solutions.title")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/20 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 h-full flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white">{t("solutions.institutional.title")}</h3>
              <p className="mt-2 text-[#ff6d4d]">{t("solutions.institutional.subtitle")}</p>
              <p className="mt-4 text-slate-300 flex-grow text-sm sm:text-base">{t("solutions.institutional.description")}</p>
              <ul className="mt-6 space-y-3 text-slate-300 text-sm sm:text-base">
                <li className="flex items-center gap-x-3"><CheckBadgeIcon className="h-5 w-5 text-[#ff6d4d]" /><span>{t("solutions.institutional.features.0")}</span></li>
                <li className="flex items-center gap-x-3"><CheckBadgeIcon className="h-5 w-5 text-[#ff6d4d]" /><span>{t("solutions.institutional.features.1")}</span></li>
                <li className="flex items-center gap-x-3"><CheckBadgeIcon className="h-5 w-5 text-[#ff6d4d]" /><span>{t("solutions.institutional.features.2")}</span></li>
              </ul>
            </div>

            <div className="bg-slate-800/20 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 h-full flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white">{t("solutions.ecommerce.title")}</h3>
              <p className="mt-2 text-[#ff6d4d]">{t("solutions.ecommerce.subtitle")}</p>
              <p className="mt-4 text-slate-300 flex-grow text-sm sm:text-base">{t("solutions.ecommerce.description")}</p>
              <ul className="mt-6 space-y-3 text-slate-300 text-sm sm:text-base">
                <li className="flex items-center gap-x-3"><CheckBadgeIcon className="h-5 w-5 text-[#ff6d4d]" /><span>{t("solutions.ecommerce.features.0")}</span></li>
                <li className="flex items-center gap-x-3"><CheckBadgeIcon className="h-5 w-5 text-[#ff6d4d]" /><span>{t("solutions.ecommerce.features.1")}</span></li>
                <li className="flex items-center gap-x-3"><CheckBadgeIcon className="h-5 w-5 text-[#ff6d4d]" /><span>{t("solutions.ecommerce.features.2")}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* DEMONSTRAÇÃO VISUAL DOS PROJETOS */}
      {/* DEMONSTRAÇÃO VISUAL DOS PROJETOS - VERSÃO MELHORADA */}
      <section className="py-12 sm:py-20 bg-slate-800/10 relative overflow-hidden">
        {/* Elementos de fundo decorativos */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {t("showcase.title")}
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
              {t("showcase.subtitle")}
            </p>
          </div>

          {/* Container responsivo dos vídeos */}
          <div className="relative mx-auto max-w-7xl">
            {/* Layout para desktop (lg+) */}
            <div className="hidden lg:block relative h-[600px]">
              {/* Vídeo Desktop */}
              <div className="absolute top-0 right-0 w-[700px] xl:w-[800px] h-auto z-10">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-start px-4 py-3 bg-slate-800/50">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                      </div>
                      <div className="ml-4 text-xs text-slate-400">www.site.com</div>
                    </div>
                    <video
                      className="w-full h-[400px] object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src="/video/w2.mp4" type="video/mp4" />
                      <div className="h-[400px] w-full flex items-center justify-center text-white/50 bg-slate-800">
                        Desktop Preview
                      </div>
                    </video>
                  </div>
                </div>
              </div>

              {/* Vídeo Mobile */}
              <div className="absolute bottom-0 left-10 xl:left-20 w-[220px] h-auto z-20">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="flex justify-center py-2 bg-slate-800/50">
                      <div className="w-10 h-1 bg-slate-600 rounded-full" />
                    </div>
                    <video
                      className="w-full h-[400px] object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src="/video/m2.mp4" type="video/mp4" />
                      <div className="h-[400px] w-full flex items-center justify-center text-white/50 bg-slate-800">
                        Mobile Preview
                      </div>
                    </video>
                    <div className="h-8 bg-slate-800/50" />
                  </div>
                </div>
              </div>

              {/* Linhas conectoras animadas */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <svg className="w-full h-full opacity-30">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M200 300 Q400 250 600 300"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>

            {/* Layout para mobile/tablet */}
            <div className="lg:hidden space-y-8">
              {/* Desktop Preview */}
              <div className="relative group mx-auto max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-start px-4 py-3 bg-slate-800/50">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    <div className="ml-3 text-xs text-slate-400">Desktop</div>
                  </div>
                  <video
                    className="w-full h-[250px] sm:h-[300px] object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/video/w2.mp4" type="video/mp4" />
                    <div className="h-[250px] sm:h-[300px] w-full flex items-center justify-center text-white/50 bg-slate-800">
                      Desktop Preview
                    </div>
                  </video>
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="relative group mx-auto max-w-[200px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex justify-center py-2 bg-slate-800/50">
                    <div className="w-8 h-1 bg-slate-600 rounded-full" />
                  </div>
                  <video
                    className="w-full h-[350px] object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/video/m2.mp4" type="video/mp4" />
                    <div className="h-[350px] w-full flex items-center justify-center text-white/50 bg-slate-800">
                      Mobile Preview
                    </div>
                  </video>
                  <div className="h-6 bg-slate-800/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores melhorados */}
          <div className="flex flex-wrap justify-center mt-12 gap-6">
            <div className="flex items-center text-sm text-slate-400 bg-slate-800/30 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              <span className="font-medium">Live Preview</span>
            </div>
            <div className="flex items-center text-sm text-slate-400 bg-slate-800/30 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
              <span className="font-medium">Responsive Design</span>
            </div>
            <div className="flex items-center text-sm text-slate-400 bg-slate-800/30 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
              <span className="font-medium">Cross-Platform</span>
            </div>
          </div>

          {/* Estatísticas opcionais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              { number: "99%", label: "Uptime" },
              { number: "<2s", label: "Load Time" },
              { number: "100", label: "PageSpeed" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      < section className="text-center py-12 sm:py-20" >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {t("finalCta.title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            {t("finalCta.subtitle")}
          </p>
          <div className="mt-8">
            <CTAButton href="https://shre.ink/telefone-ayrCore" >
              {t("finalCta.cta")}
            </CTAButton>
          </div>
        </div>
      </section >

      <FooterAry />
    </div >
  );
}