"use client";

import React, { useEffect } from "react";

import FooterAry from "@/components/layout/FooterAry";
import CTAButton from "@/components/ui/CTAButton";
import PainPointsSection from "@/components/ui/PainPointsSection";
import {useTranslations} from 'next-intl';

// --- ÍCONES MEMORIZADOS ---
import {
  BoltIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  ArrowsRightLeftIcon
} from '@/components/ui/Icons';

// Hook para animação on-scroll (Intersection Observer)
function useScrollAnimate(className = "scroll-animate", visibleClass = "is-visible", threshold = 0.1) {
  const observer = React.useRef(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(`.${className}`).forEach((el) => el.classList.add(visibleClass));
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
            observer.current.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((el) => observer.current.observe(el));

    return () => {
      if (observer.current) {
        elements.forEach((el) => observer.current.unobserve(el));
        observer.current.disconnect();
      }
    };
  }, [className, visibleClass, threshold]);
}

export default function AutomationPage() {
  useScrollAnimate();
  const t = useTranslations('AutomationPage');

  // --- Dados para Pain Points com traduções ---
  const painPointsData = React.useMemo(
    () => [
      {
        icon: DocumentDuplicateIcon,
        title: t("painPoints.dataReentry.title"),
        description: t("painPoints.dataReentry.description"),
      },
      {
        icon: ExclamationTriangleIcon,
        title: t("painPoints.bottleneckProcesses.title"),
        description: t("painPoints.bottleneckProcesses.description"),
      },
      {
        icon: ArrowsRightLeftIcon,
        title: t("painPoints.disconnectedTools.title"),
        description: t("painPoints.disconnectedTools.description"),
      },
      {
        icon: BoltIcon,
        title: t("painPoints.lackOfAgility.title"),
        description: t("painPoints.lackOfAgility.description"),
      },
    ],
    [t]
  );

  const stats = React.useMemo(
    () => [
      { value: "+200h", label: t("stats.hoursFreed") },
      { value: "-90%", label: t("stats.errorReduction") },
      { value: "+5x", label: t("stats.deliverySpeed") },
      { value: "24/7", label: t("stats.alwaysActive") },
    ],
    [t]
  );

  return (
    <div className="bg-[#000d2e] text-white font-sans">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;900&display=swap");
        body {
          font-family: "Exo 2", sans-serif;
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* HERO SECTION */}
      <div className="relative isolate pt-14 overflow-hidden">
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
        <div className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10">
            <CTAButton href="https://shre.ink/telefone-ayrCore">{t("hero.ctaButton")}</CTAButton>
          </div>
        </div>
      </div>

      {/* PAIN POINTS */}
      <PainPointsSection
        painPoints={painPointsData}
        sectionTitle={t("painPointsSection.title")}
        sectionSubtitle={t("painPointsSection.subtitle")}
      />

      {/* ANTES E DEPOIS */}
      <div className="py-20 sm:py-28 bg-[#000d2e] px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t("beforeAfter.title")}
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg">
            {t("beforeAfter.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center">
          {/* COLUNA ANTES */}
          <div className="scroll-animate lg:col-span-5 bg-slate-900/90 p-6 sm:p-10 rounded-3xl shadow-lg border border-red-600/60 flex flex-col">
            <h3
              className="text-2xl sm:text-3xl font-semibold text-red-400 mb-6 text-center"
              style={{ textShadow: "0 0 12px rgba(239, 68, 68, 0.7)" }}
            >
              {t("beforeAfter.before.title")}
            </h3>
            <div className="flex flex-wrap justify-around items-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="bg-slate-800 text-white font-semibold px-5 sm:px-8 py-3 sm:py-5 rounded-xl shadow-md transition-transform hover:scale-105">
                  CRM
                </div>
                <span className="text-xs sm:text-sm text-slate-400 mt-2 block">{t("beforeAfter.before.sales")}</span>
              </div>
              <div className="text-center font-mono text-red-400 text-sm sm:text-base leading-relaxed select-none">
                ✖
                <br />
                {t("beforeAfter.before.manual")}
                <br />
                {t("beforeAfter.before.errors")}
              </div>
              <div className="text-center">
                <div className="bg-slate-800 text-white font-semibold px-5 sm:px-8 py-3 sm:py-5 rounded-xl shadow-md transition-transform hover:scale-105">
                  ERP
                </div>
                <span className="text-xs sm:text-sm text-slate-400 mt-2 block">{t("beforeAfter.before.financial")}</span>
              </div>
            </div>
          </div>

          {/* CONECTOR CENTRAL */}
          <div
            className="scroll-animate lg:col-span-1 hidden lg:flex justify-center items-center"
            style={{ transitionDelay: "200ms" }}
          >
            <svg
              width="24"
              height="120"
              viewBox="0 0 24 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0V120" stroke="url(#paint0_linear_101_2)" strokeWidth="2" />
              <path d="M24 60L0 60" stroke="url(#paint1_linear_101_2)" strokeWidth="2" />
              <defs>
                <linearGradient
                  id="paint0_linear_101_2"
                  x1="12.5"
                  y1="0"
                  x2="12.5"
                  y2="120"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ef4444" />
                  <stop offset="1" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_101_2"
                  x1="24"
                  y1="60.5"
                  x2="0"
                  y2="60.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ef4444" />
                  <stop offset="1" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* COLUNA DEPOIS */}
          <div
            className="scroll-animate lg:col-span-5 bg-slate-900/90 p-6 sm:p-10 rounded-3xl shadow-lg border border-green-600/60 flex flex-col"
            style={{ transitionDelay: "100ms" }}
          >
            <h3
              className="text-2xl sm:text-3xl font-semibold text-green-400 mb-6 text-center"
              style={{ textShadow: "0 0 12px rgba(34, 197, 94, 0.7)" }}
            >
              {t("beforeAfter.after.title")}
            </h3>
            <div className="flex flex-wrap justify-around items-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="bg-slate-800 text-white font-semibold px-5 sm:px-8 py-3 sm:py-5 rounded-xl shadow-md transition-transform hover:scale-105">
                  CRM
                </div>
              </div>
              <div className="text-center text-green-400 font-mono text-sm sm:text-base leading-relaxed select-none">
                ⚡
                <br />
                {t("beforeAfter.after.api")}
                <br />
                {t("beforeAfter.after.automation")}
              </div>
              <div className="text-center">
                <div className="bg-slate-800 text-white font-semibold px-5 sm:px-8 py-3 sm:py-5 rounded-xl shadow-md transition-transform hover:scale-105">
                  ERP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO DE RESULTADOS */}
      <div className="py-20 sm:py-28 bg-slate-800/10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {t("results.title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t("results.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className="scroll-animate p-6 sm:p-8 bg-slate-900/50 border border-orange-500/10 rounded-xl hover:border-[#ff6d4d]/30 transition-colors duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p
                className="text-4xl sm:text-5xl font-black text-[#ff6d4d]"
                style={{ textShadow: "0 0 10px rgba(255, 109, 77, 0.3)" }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-slate-300 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="text-center py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-3xl mx-auto">
        <div className="scroll-animate">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {t("finalCta.title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t("finalCta.subtitle")}
          </p>
          <div className="mt-10">
            <CTAButton href="https://shre.ink/telefone-ayrCore">
              {t("finalCta.ctaButton")}
            </CTAButton>
          </div>
        </div>
      </div>

      <FooterAry />
    </div>
  );
}