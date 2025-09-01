"use client";

import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from 'next-intl';
import FooterAry from "@/components/layout/FooterAry";
import CTAButton from '@/components/ui/CTAButton';

gsap.registerPlugin(ScrollTrigger);

// Ícone memorizado
const ChevronDownIcon = memo((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
));

// Componente de item de FAQ memorizado
const FAQItem = memo(({ question, answer, isOpen, onClick, refEl }) => (
  <div ref={refEl} className="border-b border-white/10 py-6">
    <button className="w-full flex justify-between items-center text-left" onClick={onClick}>
      <span className="text-lg font-medium text-white">{question}</span>
      <ChevronDownIcon className={`w-6 h-6 text-[#ff6d4d] transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen mt-4" : "max-h-0"}`}>
      <p className="text-slate-300 leading-relaxed">{answer}</p>
    </div>
  </div>
));

export default function FAQPage() {
  const t = useTranslations('FAQPage');
  const heroRef = useRef(null);
  const faqItemsRef = useRef([]);
  const ctaRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  // Dados de FAQ com tradução memoizados
  const faqData = useMemo(() => [
    {
      question: t("faq.specialty.question"),
      answer: t("faq.specialty.answer")
    },
    {
      question: t("faq.process.question"),
      answer: t("faq.process.answer")
    },
    {
      question: t("faq.cost.question"),
      answer: t("faq.cost.answer")
    },
    {
      question: t("faq.tracking.question"),
      answer: t("faq.tracking.answer")
    },
    {
      question: t("faq.support.question"),
      answer: t("faq.support.answer")
    },
    {
      question: t("faq.technologies.question"),
      answer: t("faq.technologies.answer")
    }
  ], [t]);

  const handleItemClick = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    // Animação hero
    gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

    // Animação em lote para os itens de FAQ
    ScrollTrigger.batch(faqItemsRef.current, {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }),
      start: "top 90%"
    });

    // CTA
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current, { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%" }
      });

      gsap.to(ctaRef.current.querySelector("a"), {
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <div className="bg-[#000d2e] text-white">
      {/* HERO */}
      <div className="relative isolate pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] 
              -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#800080] to-[#4a00e0] 
              opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, ...)" }}
          />
        </div>
        <div className="py-24 sm:py-32">
          <div className="container mx-auto px-8 lg:px-16 text-center" ref={heroRef}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{t("hero.title")}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </div>

      {/* LISTA DE FAQ */}
      <div className="py-24 sm:pb-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {faqData.map((item, index) => (
              <FAQItem
                key={`faq-${index}-${item.question.slice(0, 20)}`}
                refEl={(el) => (faqItemsRef.current[index] = el)}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20" ref={ctaRef}>
            <h2 className="text-2xl font-bold tracking-tight">{t("cta.title")}</h2>
            <p className="mt-4 text-lg text-slate-300">
              {t("cta.description")}
            </p>
            <div className="mt-8">
              <CTAButton href="https://shre.ink/telefone-ayrCore">
                {t("cta.button")}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      <FooterAry />
    </div>
  );
}