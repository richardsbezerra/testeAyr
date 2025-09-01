"use client";

import React, { useEffect, useRef, useCallback, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterAry from "@/components/layout/FooterAry";
import { useTranslations } from "next-intl";

import {
  LightBulbIcon,
  HandshakeIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";

gsap.registerPlugin(ScrollTrigger);

export default function CareersPage() {
  const t = useTranslations("CareersPage");
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const cultureItemsRef = useRef([]);
  const ctaRef = useRef(null);
  
  const jobOpenings = [];

  // Dados memoizados das culturas, só recria se algo mudar
  const cultureData = useMemo(
    () => [
      {
        icon: <LightBulbIcon className="h-12 w-12 text-[#ff6d4d]" />,
        title: t("culture.innovation.title"),
        desc: t("culture.innovation.description"),
      },
      {
        icon: <HandshakeIcon className="h-12 w-12 text-[#ff6d4d]" />,
        title: t("culture.collaboration.title"),
        desc: t("culture.collaboration.description"),
      },
      {
        icon: <ShieldCheckIcon className="h-12 w-12 text-[#ff6d4d]" />,
        title: t("culture.impact.title"),
        desc: t("culture.impact.description"),
      },
    ],
    [t]
  );

  // useEffect para detectar mudanças de idioma e resetar estado
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [t]);

  const setupHoverAnimations = useCallback(() => {
    cultureItemsRef.current.forEach((el) => {
      if (!el) return;
      
      const onMouseEnter = () =>
        gsap.to(el, { y: -5, duration: 0.3, ease: "power2.out" });
      
      const onMouseLeave = () =>
        gsap.to(el, { y: 0, duration: 0.3, ease: "power2.in" });
      
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      
      // Armazena as funções para cleanup
      el._hoverListeners = { onMouseEnter, onMouseLeave };
    });
  }, []);

  const cleanupHoverAnimations = useCallback(() => {
    cultureItemsRef.current.forEach((el) => {
      if (!el || !el._hoverListeners) return;
      
      el.removeEventListener("mouseenter", el._hoverListeners.onMouseEnter);
      el.removeEventListener("mouseleave", el._hoverListeners.onMouseLeave);
      delete el._hoverListeners;
    });
  }, []);

  // useEffect principal para animações - executa sempre que isLoaded muda
  useEffect(() => {
    if (!isLoaded) return;

    // Timeout para garantir que elementos estejam no DOM
    const animationTimer = setTimeout(() => {
      // Limpa animações e triggers anteriores
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      cleanupHoverAnimations();

      const hero = heroRef.current;
      const cta = ctaRef.current;
      const cultureItems = cultureItemsRef.current.filter(el => el);

      // Reset inicial de todos os elementos
      if (hero) gsap.set(hero, { opacity: 1, y: 0 });
      if (cultureItems.length > 0) gsap.set(cultureItems, { opacity: 1, y: 0 });
      if (cta) gsap.set(cta, { opacity: 1, y: 0 });

      // Animação do hero
      if (hero) {
        gsap.from(hero, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      // Animações dos itens de cultura com ScrollTrigger
      cultureItems.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { 
            trigger: el, 
            start: "top 80%",
            toggleActions: "play none none none"
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power2.out",
        });
      });

      // Animação do CTA
      if (cta) {
        gsap.from(cta, {
          scrollTrigger: {
            trigger: cta,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          opacity: 0,
          y: 60,
          duration: 1.1,
          ease: "power3.out",
        });
      }

      // Setup das animações de hover
      setupHoverAnimations();

    }, 150); // Delay para garantir renderização

    return () => {
      clearTimeout(animationTimer);
      cleanupHoverAnimations();
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded, setupHoverAnimations, cleanupHoverAnimations]);

  // Se não carregou ainda, mostra um placeholder invisível para manter layout
  if (!isLoaded) {
    return (
      <div className="bg-[#000d2e] text-white min-h-screen">
        <div className="relative isolate pt-14">
          <div className="py-24 sm:py-32">
            <div className="container mx-auto px-8 lg:px-16 text-center opacity-0">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000d2e] text-white">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative isolate pt-14" style={{ opacity: 1 }}>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background: "linear-gradient(to top right, #800080, #4a00e0)",
            opacity: 0.3,
            left: "calc(50% - 11rem)",
            width: "36.125rem",
            aspectRatio: "1155 / 678",
            transform: "translateX(-50%) rotate(30deg)",
          }}
        />
        <div className="py-24 sm:py-32 container mx-auto px-8 lg:px-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* CULTURE SECTION */}
      <section className="py-24 sm:py-32 container mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("culture.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            {t("culture.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {cultureData.map((item, i) => (
            <div
              key={`culture-${i}-${item.title.slice(0, 10)}`}
              ref={(el) => (cultureItemsRef.current[i] = el)}
              className="flex flex-col items-center"
              style={{ opacity: 1 }} // Força opacity inicial
            >
              {item.icon}
              <h3 className="mt-4 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOB OPENINGS */}
      <section id="vagas" className="py-24 sm:py-32 bg-slate-800/10">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("jobs.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {jobOpenings.length > 0
                ? t("jobs.available")
                : t("jobs.noOpenings")}
            </p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {jobOpenings.length > 0 ? (
              jobOpenings.map((job) => (
                <article
                  key={job.title}
                  className="bg-slate-800/20 border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/10"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-orange-400">
                        <span>{job.location}</span>
                        <span className="text-white/20">•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <button className="mt-4 sm:mt-0 bg-white text-blue-900 font-semibold rounded-md py-2 px-6 hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5 whitespace-nowrap">
                      {t("jobs.apply")}
                    </button>
                  </div>
                  <p className="mt-4 text-slate-300 border-t border-white/10 pt-4">
                    {job.description}
                  </p>
                </article>
              ))
            ) : (
              <div className="bg-slate-800/20 border border-white/10 rounded-xl p-8 text-center">
                <h3 className="text-xl font-semibold text-white">
                  {t("jobs.noOpeningsTitle")}
                </h3>
                <p className="mt-2 text-slate-400">
                  {t("jobs.talentPoolMessage")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section ref={ctaRef} className="text-center py-24 sm:py-32" style={{ opacity: 1 }}>
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm text-slate-400">
              <span className="font-medium text-slate-300">
                {t("cta.emailLabel")}
              </span>
            </p>
            <a
              href="mailto:ayrcore@outlook.com"
              className="bg-white text-blue-900 font-semibold rounded-md py-3 px-8 hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5"
            >
              ayrcore@outlook.com
            </a>
          </div>
        </div>
      </section>

      <FooterAry />
    </div>
  );
}