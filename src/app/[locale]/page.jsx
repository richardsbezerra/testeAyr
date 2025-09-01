"use client";

import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

import Image from 'next/image';
import FooterAry from '@/components/layout/FooterAry';
import ServiceCard from '@/components/ui/ServiceCard';
import { supabase } from "@/lib/supabaseClient";



import { FaReact, FaDocker, FaNodeJs, FaPython, FaGitAlt, FaAws } from "react-icons/fa";
import { SiFigma, SiMongodb, SiTailwindcss, SiTypescript, SiNextdotjs, SiRedis, SiPostgresql, SiGithub, SiPrisma, SiJest, SiVercel, SiLinux, SiFirebase, SiRedux, SiGraphql, SiNginx, SiSupabase, SiFastapi, SiStripe, SiKubernetes, SiExpress } from "react-icons/si";

import {
  CodeBracketIcon,
  Squares2x2Icon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  BuildingOffice2Icon,
  CloudArrowUpIcon
} from '@/components/ui/Icons';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const t = useTranslations('HomePage');
  const boxRef = useRef(null);
  const footerRef = useRef(null);
  const heroRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  // Formulario
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const { error } = await supabase.from("leads").insert([{ email }]);

  if (error) {
    setMessage(t("hero.erroForm") + error.message);
  } else {
    setMessage (t("hero.posForm"))
    setEmail("");
  }

  setLoading(false);
};

  // Refs para controle das animações
  const floatingTween = useRef(null);
  const rotationTimeline = useRef(null);
  const mouseMoveTween = useRef(null);
  const isMouseMoveActive = useRef(false);

  const technologies = [
    { name: 'React', icon: FaReact, gradient: 'from-sky-500/30 to-sky-600/30' },
    { name: 'Next.js', icon: SiNextdotjs, gradient: 'from-gray-500/30 to-gray-600/30', iconColor: 'text-white group-hover:text-gray-300' },
    { name: 'TypeScript', icon: SiTypescript, gradient: 'from-blue-500/30 to-indigo-600/30' },
    { name: 'Node.js', icon: FaNodeJs, gradient: 'from-green-500/30 to-emerald-600/30' },
    { name: 'Python', icon: FaPython, gradient: 'from-yellow-500/30 to-blue-600/30' },
    { name: 'Docker', icon: FaDocker, gradient: 'from-blue-500/30 to-blue-600/30' },
    { name: 'PostgreSQL', icon: SiPostgresql, gradient: 'from-blue-500/30 to-indigo-600/30' },
    { name: 'MongoDB', icon: SiMongodb, gradient: 'from-emerald-500/30 to-green-600/30' },
    { name: 'Redis', icon: SiRedis, gradient: 'from-red-500/30 to-red-600/30' },
    { name: 'Tailwind', icon: SiTailwindcss, gradient: 'from-cyan-500/30 to-blue-600/30' },
    { name: 'Figma', icon: SiFigma, gradient: 'from-pink-500/30 to-purple-600/30' },
    { name: 'Git', icon: FaGitAlt, gradient: 'from-red-500/30 to-orange-600/30' },
    { name: 'Jest', icon: SiJest, gradient: 'from-red-500/30 to-orange-600/30' },
    { name: 'Github', icon: SiGithub, gradient: 'from-gray-500/30 to-gray-800/30' },
    { name: 'GraphQL', icon: SiGraphql, gradient: 'from-pink-500/30 to-purple-600/30' },
    { name: 'AWS', icon: FaAws, gradient: 'from-orange-500/30 to-yellow-600/30' },
    { name: 'Firebase', icon: SiFirebase, gradient: 'from-yellow-500/30 to-orange-600/30' },
    { name: 'Redux', icon: SiRedux, gradient: 'from-purple-500/30 to-indigo-600/30' },
  ];

  const TechnologyIcon = ({ name, icon: Icon, gradient }) => {
    return (
      <div className="group relative w-full h-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-lg sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110`}></div>
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-2xl p-2 sm:p-4 flex flex-col items-center justify-center hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:hover:-translate-y-2 sm:hover:scale-110 cursor-pointer w-full h-full">
          <Icon className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl transition-colors duration-300 mb-1 sm:mb-2`} />
          <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors duration-300 font-medium text-center">{name}</span>
        </div>
      </div>
    );
  };

  const servicesData = [
    {
      id: "mobile",
      href: '/mobile-application-creation',
      icon: <DevicePhoneMobileIcon className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.mobile.title'),
      description: t('services.mobile.description')
    },
    {
      id: "corporate",
      href: '/corporate-solutions',
      icon: <BuildingOffice2Icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.corporate.title'),
      description: t('services.corporate.description')
    },
    {
      id: "software",
      href: '/software-development',
      icon: <CpuChipIcon className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.software.title'),
      description: t('services.software.description')
    },
    {
      id: "saas",
      href: '/saas',
      icon: <CloudArrowUpIcon className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.saas.title'),
      description: t('services.saas.description')
    },
    {
      id: "web",
      href: '/web-development',
      icon: <CodeBracketIcon className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.web.title'),
      description: t('services.web.description')
    },
    {
      id: "automation",
      href: '/integrations-and-automations',
      icon: <Squares2x2Icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.automation.title'),
      description: t('services.automation.description')
    }
  ];



  // Função otimizada para movimento do mouse com throttle
  const handleMouseMove = useCallback((event) => {
    if (!isMouseMoveActive.current || !boxRef.current) return;

    const { clientY } = event;
    const { innerHeight } = window;
    const yPercent = (clientY / innerHeight - 0.5) * 8;

    if (mouseMoveTween.current) {
      mouseMoveTween.current.kill();
    }

    mouseMoveTween.current = gsap.to(boxRef.current, {
      yPercent: -50 + yPercent,
      duration: 1.2,
      ease: "power1.out",
      overwrite: "auto",
    });
  }, []);

  // Função para iniciar animação de flutuação
  const startFloatingAnimation = useCallback(() => {
    if (floatingTween.current) {
      floatingTween.current.kill();
    }

    floatingTween.current = gsap.to(boxRef.current, {
      y: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 2.5,
    });
  }, []);

  // Função para parar animação de flutuação
  const stopFloatingAnimation = useCallback(() => {
    if (floatingTween.current) {
      floatingTween.current.pause();
    }
  }, []);

  // Função para iniciar rotação contínua
  const startRotationAnimation = useCallback(() => {
    if (rotationTimeline.current) {
      rotationTimeline.current.kill();
    }

    rotationTimeline.current = gsap.timeline({
      repeat: -1,
      ease: "none"
    });

    rotationTimeline.current
      .to(boxRef.current, {
        rotation: "+=360",
        duration: 8,
        ease: "none"
      });
  }, []);

  // Função para parar rotação
  const stopRotationAnimation = useCallback(() => {
    if (rotationTimeline.current) {
      rotationTimeline.current.kill();
    }
  }, []);

  // Função para ativar movimento do mouse
  const activateMouseMove = useCallback(() => {
    isMouseMoveActive.current = true;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
  }, [handleMouseMove]);

  // Função para desativar movimento do mouse
  const deactivateMouseMove = useCallback(() => {
    isMouseMoveActive.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    if (mouseMoveTween.current) {
      mouseMoveTween.current.kill();
    }
  }, [handleMouseMove]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (boxRef.current && heroRef.current && footerRef.current && section4Ref.current) {
        // Configuração inicial da bola com will-change para otimização
        gsap.set(boxRef.current, {
          left: '50%',
          bottom: '-50%',
          xPercent: -50,
          yPercent: 0,
          opacity: 1,
          force3D: true,
        });

        // Aplicar will-change via CSS para otimização
        if (boxRef.current) {
          boxRef.current.style.willChange = 'transform, opacity';
        }

        // Animação inicial suave para subir até o centro
        gsap.fromTo(
          boxRef.current,
          { y: "50vh" },
          {
            y: "0vh",
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top bottom",
              end: "top center",
              scrub: 1,
            },
          }
        );

        // Iniciar animação de flutuação
        startFloatingAnimation();

        // Timeline principal otimizada
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            pin: boxRef.current,
            start: "bottom bottom",
            endTrigger: section4Ref.current,
            end: "+=2150",
            scrub: 2,
            anticipatePin: 1,
            onEnter: () => {
              stopFloatingAnimation();
              if (window.innerWidth > 768) { // Apenas ativar no desktop
                activateMouseMove();
              }
            },
            onLeave: () => {
              deactivateMouseMove();
            },
            onEnterBack: () => {
              stopFloatingAnimation();
              if (window.innerWidth > 768) { // Apenas ativar no desktop
                activateMouseMove();
              }
            },
            onLeaveBack: () => {
              startFloatingAnimation();
              deactivateMouseMove();
            },
          },
        });

        // Animação de escala e rotação mais suave
        mainTl.fromTo(
          boxRef.current,
          { scale: 3, rotation: 0 },
          {
            scale: 2,
            rotation: 270,
            ease: "power2.inOut",
            duration: 2,
            force3D: true
          }
        );

        // ScrollTrigger otimizado para seção 4 com transparência
        ScrollTrigger.create({
          trigger: section4Ref.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            deactivateMouseMove();
            startRotationAnimation();
            gsap.to(boxRef.current, {
              opacity: 0.56,
              duration: 1,
              ease: "power2.inOut"
            });
          },
          onLeave: () => {
            stopRotationAnimation();
            if (window.innerWidth > 768) {
              activateMouseMove();
            }
            gsap.to(boxRef.current, {
              opacity: 1,
              duration: 1,
              ease: "power2.inOut"
            });
          },
          onLeaveBack: () => {
            stopRotationAnimation();
            if (window.innerWidth > 768) {
              activateMouseMove();
            }
            gsap.to(boxRef.current, {
              opacity: 1,
              duration: 1,
              ease: "power2.inOut"
            });
          },
          onEnterBack: () => {
            deactivateMouseMove();
            startRotationAnimation();
            gsap.to(boxRef.current, {
              opacity: 0.56,
              duration: 1,
              ease: "power2.inOut"
            });
          }
        });

        // Throttle do ScrollTrigger para melhor performance
        ScrollTrigger.config({
          syncInterval: 5,
        });
      }
    });

    return () => {
      ctx.revert();

      // Cleanup otimizado
      if (floatingTween.current) {
        floatingTween.current.kill();
      }
      if (rotationTimeline.current) {
        rotationTimeline.current.kill();
      }
      if (mouseMoveTween.current) {
        mouseMoveTween.current.kill();
      }

      deactivateMouseMove();

      // Remover will-change para economia de memória
      if (boxRef.current) {
        boxRef.current.style.willChange = 'auto';
      }
    };
  }, [startFloatingAnimation, stopFloatingAnimation, startRotationAnimation, stopRotationAnimation, activateMouseMove, deactivateMouseMove]);

  return (
    <>
      <div className="text-white overflow-hidden">
        {/* HERO */}
        <main ref={heroRef} className="flex-grow flex items-center pt-42 sm:pt-40 md:pt-52 pb-16 sm:pb-24 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

              {/* A bola otimizada */}
              <div
                ref={boxRef}
                className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 z-0"
                id="capture"
                style={{
                  backfaceVisibility: 'hidden',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src="/img/bolaGrande.svg"
                  alt={t('hero.logoAlt')}
                  className="w-32 sm:w-48 md:w-56 lg:w-64 h-auto"
                  loading="eager"
                  style={{
                    backfaceVisibility: 'hidden'
                  }}
                />
              </div>

              <div className="relative z-10 text-white max-w-lg text-center lg:text-left -mt-16 sm:-mt-24 lg:-mt-39 ml-1 md:ml-24">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                  dangerouslySetInnerHTML={{ __html: t('hero.title') }}
                >
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
                  {t('hero.description')}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
                >
                  <input
                    type="email"
                    placeholder={t("hero.formPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full sm:w-auto flex-grow bg-white/10 border border-white/20 rounded-md py-3 px-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-white outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-white text-blue-900 font-semibold rounded-md py-3 px-6 flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5"
                  >
                    {loading ? t("hero.saveForm") : t("hero.formButton")}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                </form>

                {message && <p className="text-sm mt-2">{message}</p>}
              </div>

              {/* Coluna da direita - Versão Mobile-First */}
              <div className="relative z-20 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full">
                {/* Desktop Video */}
                <div className="absolute top-0 right-0 w-full sm:w-[450px] md:w-[550px] lg:w-[750px] lg:-right-76 h-auto z-10 rounded-xl shadow-2xl bg-slate-800/20 backdrop-blur-md border border-white/10 overflow-hidden">
                  <video
                    className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/video/0827.mp4" type="video/mp4" />
                    <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full flex items-center justify-center text-white/50 rounded-xl">
                      {t('hero.dashboardVideoFallback')}
                    </div>
                  </video>
                </div>

                {/* Mobile Video */}
                <div className="absolute bottom-0 left-0 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[280px] sm:bottom-10 md:bottom-20 lg:bottom-39 h-auto z-20 rounded-xl shadow-2xl bg-slate-800/20 backdrop-blur-md border border-white/10 overflow-hidden">
                  <video
                    className="h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] w-full object-cover rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/video/oo7.mp4" type="video/mp4" />
                    <div className="h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] w-full flex items-center justify-center text-white/50 rounded-xl">
                      {t('hero.mobileVideoFallback')}
                    </div>
                  </video>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* SECTION 1 */}
        <section ref={section1Ref} className="relative z-30 flex-grow flex items-center pb-16 sm:pb-24 lg:pb-32 pt-10 sm:pt-16 lg:pt-20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
              <Link key={servicesData[0].id} href={servicesData[0].href} className="group">
                <ServiceCard {...servicesData[0]} />
              </Link>
              <div className="hidden lg:block"></div>
              <Link key={servicesData[1].id} href={servicesData[1].href} className="group">
                <ServiceCard {...servicesData[1]} />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section ref={section2Ref} className="relative z-30 flex-grow flex items-center pb-16 sm:pb-24 lg:pb-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
              <Link key={servicesData[2].id} href={servicesData[2].href} className="group">
                <ServiceCard {...servicesData[2]} />
              </Link>
              <div className="hidden lg:block"></div>
              <Link key={servicesData[3].id} href={servicesData[3].href} className="group">
                <ServiceCard {...servicesData[3]} />
              </Link>
            </div>
          </div>
        </section>

        {/* FRASE */}
        <section>
          <div className="pb-16 sm:pb-24 lg:pb-32 relative z-30 px-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-center uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-800 leading-tight">
              {t('phrase')}
            </h1>
          </div>
        </section>

        {/* SECTION 3 */}
        <section ref={section3Ref} className="relative z-30 flex-grow flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
              <Link key={servicesData[4].id} href={servicesData[4].href} className="group">
                <ServiceCard {...servicesData[4]} />
              </Link>
              <div className="hidden lg:block"></div>
              <Link key={servicesData[5].id} href={servicesData[5].href} className="group">
                <ServiceCard {...servicesData[5]} />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4 - SERVIÇOS AVANÇADOS */}
        <section ref={section4Ref} className="relative z-30 flex flex-col py-16 sm:py-24 lg:py-32 pt-20 sm:pt-32 lg:pt-41">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 text-center md:text-left">

              {/* Blockchain */}
              <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
                <FaAws className="text-3xl sm:text-4xl text-teal-400 mb-2" />
                <h3 className="text-lg sm:text-xl font-bold text-white">{t('advancedServices.blockchain.title')}</h3>
                <p className="text-sm sm:text-base text-slate-300">
                  {t('advancedServices.blockchain.description')}
                </p>
              </div>

              {/* Artificial Intelligence */}
              <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
                <FaPython className="text-3xl sm:text-4xl text-teal-400 mb-2" />
                <h3 className="text-lg sm:text-xl font-bold text-white">{t('advancedServices.ai.title')}</h3>
                <p className="text-sm sm:text-base text-slate-300">
                  {t('advancedServices.ai.description')}
                </p>
              </div>

              {/* World Class Games */}
              <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
                <FaReact className="text-3xl sm:text-4xl text-teal-400 mb-2" />
                <h3 className="text-lg sm:text-xl font-bold text-white">{t('advancedServices.games.title')}</h3>
                <p className="text-sm sm:text-base text-slate-300">
                  {t('advancedServices.games.description')}
                </p>
              </div>

              {/* Native Applications */}
              <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4 mt-8 sm:mt-12">
                <SiFigma className="text-3xl sm:text-4xl text-teal-400 mb-2" />
                <h3 className="text-lg sm:text-xl font-bold text-white">{t('advancedServices.native.title')}</h3>
                <p className="text-sm sm:text-base text-slate-300">
                  {t('advancedServices.native.description')}
                </p>
              </div>

              {/* Elegant Modern Design */}
              <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4 mt-8 sm:mt-12">
                <SiTailwindcss className="text-3xl sm:text-4xl text-teal-400 mb-2" />
                <h3 className="text-lg sm:text-xl font-bold text-white">{t('advancedServices.design.title')}</h3>
                <p className="text-sm sm:text-base text-slate-300">
                  {t('advancedServices.design.description')}
                </p>
              </div>

              {/* Internal Systems */}
              <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4 mt-8 sm:mt-12">
                <SiGraphql className="text-3xl sm:text-4xl text-teal-400 mb-2" />
                <h3 className="text-lg sm:text-xl font-bold text-white">{t('advancedServices.systems.title')}</h3>
                <p className="text-sm sm:text-base text-slate-300">
                  {t('advancedServices.systems.description')}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SEÇÃO SENNA QUOTE COM TECNOLOGIAS */}
        <section className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center
                  tablet-portrait:grid-cols-1 tablet-landscape:grid-cols-2">

            {/* Painel de Tecnologias */}
            <div className="relative w-full px-4 sm:px-6 lg:px-0">
              <div className="relative z-10 h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] 
                      tablet-portrait:h-[380px] tablet-landscape:h-[480px]
                      rounded-xl lg:rounded-r-2xl shadow-2xl bg-slate-800/30 backdrop-blur-xl border border-white/20 lg:border-y lg:border-r overflow-hidden">
                <div className="flex items-center justify-center h-full p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full h-full">
                    {technologies.map((tech) => (
                      <TechnologyIcon key={tech.name} {...tech} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="relative z-20 flex flex-col justify-center items-center 
               px-4 sm:px-6 lg:px-0 mt-6 md:mt-8 lg:mt-0
               tablet-portrait:mt-6 tablet-landscape:mt-0 lg:ml-[-5rem]">
              <div className="max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-lg
                  tablet-portrait:max-w-[85%] tablet-landscape:max-w-[60%] text-center">
                <h5
                  className="text-[clamp(1.125rem,2vw,1.875rem)] sm:text-[clamp(1.25rem,2.5vw,2rem)] 
                 md:text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold text-white leading-snug
                 tablet-portrait:text-[1.5rem] tablet-landscape:text-[1.75rem]"
                  dangerouslySetInnerHTML={{ __html: t('quote.text') }}
                />
                <div className="mt-2 sm:mt-3">
                  <h5 className="text-[clamp(0.75rem,1.2vw,1rem)] sm:text-[clamp(0.875rem,1.3vw,1.125rem)] text-white font-medium">
                    {t('quote.author')}<br />
                    <span className="text-green-400">{t('quote.title')}</span>
                  </h5>
                </div>
              </div>
            </div>

          </div>

          {/* Background Effects */}
          <div className="absolute top-1/2 left-1/4 w-36 sm:w-52 md:w-64 lg:w-96 h-36 sm:h-52 md:h-64 lg:h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-100"></div>
          <div className="absolute top-10 sm:top-16 md:top-20 right-4 sm:right-6 md:right-10 w-28 sm:w-40 md:w-56 lg:w-64 h-28 sm:h-40 md:h-56 lg:h-64 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-200"></div>
        </section>

        <FooterAry ref={footerRef} />
      </div>
    </>
  );
}