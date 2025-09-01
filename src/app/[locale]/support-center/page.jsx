"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import gsap from "gsap";
import FooterAry from "@/components/layout/FooterAry";
import {useTranslations} from 'next-intl';

import {
  RocketLaunchIcon,
  CodeBracketSquareIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
} from '@/components/ui/Icons';

// Componente FAQ item otimizado
const FaqItem = React.memo(({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef();

  useEffect(() => {
    if (!answerRef.current) return;
    if (isOpen) {
      gsap.to(answerRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        paddingTop: "1.5rem",
        paddingRight: "2rem",
      });
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        paddingTop: 0,
        paddingRight: 0,
      });
    }
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center text-left py-6"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-6 w-6 text-[#ff6d4d] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        ref={answerRef}
        style={{ height: 0, opacity: 0, overflow: "hidden", paddingRight: 0, paddingTop: 0 }}
        className="text-slate-300"
      >
        <p>{answer}</p>
      </div>
    </div>
  );
});

export default function SupportCenterPage() {
  const t = useTranslations('SupportCenterPage');
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const contactRef = useRef(null);
  const faqSectionRef = useRef(null);
  const emailIconRef = useRef(null);
  const phoneIconRef = useRef(null);

  // Dados memoizados das categorias, só recria se algo mudar
  const supportCategories = useMemo(
    () => [
      {
        Icon: RocketLaunchIcon,
        title: t("categories.process.title"),
        description: t("categories.process.description"),
      },
      {
        Icon: CodeBracketSquareIcon,
        title: t("categories.solutions.title"),
        description: t("categories.solutions.description"),
      },
      {
        Icon: WrenchScrewdriverIcon,
        title: t("categories.support.title"),
        description: t("categories.support.description"),
      },
      {
        Icon: UserCircleIcon,
        title: t("categories.partnership.title"),
        description: t("categories.partnership.description"),
      },
    ],
    [t]
  );

  const faqData = useMemo(
    () => [
      {
        question: t("faq.software.question"),
        answer: t("faq.software.answer"),
      },
      {
        question: t("faq.sites.question"),
        answer: t("faq.sites.answer"),
      },
      {
        question: t("faq.apps.question"),
        answer: t("faq.apps.answer"),
      },
      {
        question: t("faq.cost.question"),
        answer: t("faq.cost.answer"),
      },
      {
        question: t("faq.support.question"),
        answer: t("faq.support.answer"),
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

  // useEffect para animações - executa sempre que isLoaded muda
  useEffect(() => {
    if (!isLoaded) return;

    // Timeout para garantir que elementos estejam no DOM
    const animationTimer = setTimeout(() => {
      // Limpa animações anteriores
      gsap.killTweensOf("*");

      // Seleciona os cards diretamente do DOM
      const cards = document.querySelectorAll('[data-card]');
      const hero = heroRef.current;
      const contact = contactRef.current;
      const faqSection = faqSectionRef.current;
      const emailIcon = emailIconRef.current;
      const phoneIcon = phoneIconRef.current;

      // Reset inicial de todos os elementos
      if (hero) gsap.set(hero, { opacity: 1, y: 0 });
      if (cards.length > 0) gsap.set(cards, { opacity: 1, y: 0, rotationX: 0, rotationY: 0 });
      if (contact) gsap.set(contact, { opacity: 1, y: 0 });
      if (faqSection) gsap.set(faqSection, { opacity: 1, y: 0 });

      // Animação dos cards
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.2,
        });
      }

      // Animações dos ícones flutuantes
      if (emailIcon) {
        gsap.to(emailIcon, {
          y: -10,
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (phoneIcon) {
        gsap.to(phoneIcon, {
          y: -10,
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1,
        });
      }

      // Funções para efeito tilt nos cards
      const onMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        const deltaX = e.clientX - cardX;
        const deltaY = e.clientY - cardY;
        const rotateX = (-deltaY / rect.height) * 15;
        const rotateY = (deltaX / rect.width) * 15;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 500,
          transformOrigin: "center",
          ease: "power3.out",
          duration: 0.3,
        });
      };

      const onMouseLeave = (e) => {
        const card = e.currentTarget;
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          ease: "power3.out",
          duration: 0.5,
        });
      };

      // Adiciona event listeners para cada card
      cards.forEach((card) => {
        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);
      });

      // Cleanup function
      return () => {
        cards.forEach((card) => {
          card.removeEventListener("mousemove", onMouseMove);
          card.removeEventListener("mouseleave", onMouseLeave);
        });
      };
    }, 150); // Delay para garantir renderização

    return () => clearTimeout(animationTimer);
  }, [isLoaded]);

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
      {/* Hero Section */}
      <div className="relative isolate pt-14">
        <div className="py-24 sm:py-32">
          <div ref={heroRef} className="container mx-auto px-8 lg:px-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t('hero.title_support_center')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
              {t('hero.description_support_center')}
            </p>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="pb-24 sm:pb-32">
        <div className="container mx-auto px-8 lg:px-16">
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportCategories.map(({ Icon, title, description }, index) => (
              <div
                key={`category-${index}-${title.slice(0, 10)}`}
                data-card
                className="bg-slate-800/20 border border-white/10 p-8 rounded-xl text-center flex flex-col items-center"
                style={{ opacity: 1 }} // Força opacity inicial
              >
                <Icon className="h-10 w-10 text-[#ff6d4d] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div ref={faqSectionRef} className="py-24 sm:py-32 bg-slate-800/10" style={{ opacity: 1 }}>
        <div className="container mx-auto px-8 lg:px-16 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('faq_suport_center_title')}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {t('faq_suport_center_descrition')}
            </p>
          </div>
          <div className="space-y-4">
            {faqData.map(({ question, answer }, i) => (
              <FaqItem key={`faq-${i}-${question.slice(0, 20)}`} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </div>

      {/* Contato */}
      <div ref={contactRef} className="text-center py-24 sm:py-32" style={{ opacity: 1 }}>
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('contact.title_suport_center')}
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            {t('contact.description_suport_center')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-12">
            <a href="mailto:ayrcore@outlook.com" className="group flex flex-col items-center gap-2">
              <EnvelopeIconAnimated ref={emailIconRef} />
              <span className="text-lg text-white font-medium group-hover:text-[#ff6d4d] transition-colors">
                ayrcore@outlook.com
              </span>
            </a>

            <a href="https://shre.ink/telefone-ayrCore" className="group flex flex-col items-center gap-2">
              <PhoneIconAnimated ref={phoneIconRef} />
              <span className="text-lg text-white font-medium group-hover:text-[#ff6d4d] transition-colors">
                (13) 99785-2155
              </span>
            </a>
          </div>
        </div>
      </div>

      <FooterAry />
    </div>
  );
}

// Componentes dos ícones animados do contato, memoizados
const EnvelopeIconAnimated = React.memo(
  React.forwardRef((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-10 w-10 text-[#ff6d4d] group-hover:text-[#ff6d4d] transition-colors"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  ))
);

const PhoneIconAnimated = React.memo(
  React.forwardRef((props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-10 w-10 text-[#ff6d4d] group-hover:text-[#ff6d4d] transition-colors"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.998-.582-1.35L20.44 15.6a2.25 2.25 0 00-3.182 0l-1.933 1.933a11.25 11.25 0 01-5.34-5.34l1.933-1.933a2.25 2.25 0 000-3.182L6.45 3.322a2.25 2.25 0 00-1.35-.582H3.75A2.25 2.25 0 001.5 5.25v1.5z"
      />
    </svg>
  ))
);