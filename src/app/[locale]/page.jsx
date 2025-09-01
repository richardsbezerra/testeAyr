"use client";

import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Image from 'next/image';
import FooterAry from '@/components/layout/FooterAry';
import ServiceCard from '@/components/ui/ServiceCard';

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
  
  // Refs para controle das animações
  const floatingTween = useRef(null);
  const rotationTimeline = useRef(null);
  const mouseMoveTween = useRef(null);
  const isMouseMoveActive = useRef(false);

  const technologies = [
    { name: 'React', icon: FaReact, color: 'sky', gradient: 'from-sky-500/30 to-sky-600/30' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'gray', gradient: 'from-gray-500/30 to-gray-600/30', iconColor: 'text-white group-hover:text-gray-300' },
    { name: 'TypeScript', icon: SiTypescript, color: 'blue', gradient: 'from-blue-500/30 to-indigo-600/30' },
    { name: 'Node.js', icon: FaNodeJs, color: 'green', gradient: 'from-green-500/30 to-emerald-600/30' },
    { name: 'Python', icon: FaPython, color: 'yellow', gradient: 'from-yellow-500/30 to-blue-600/30' },
    { name: 'Docker', icon: FaDocker, color: 'blue', gradient: 'from-blue-500/30 to-blue-600/30' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'blue', gradient: 'from-blue-500/30 to-indigo-600/30' },
    { name: 'MongoDB', icon: SiMongodb, color: 'emerald', gradient: 'from-emerald-500/30 to-green-600/30' },
    { name: 'Redis', icon: SiRedis, color: 'red', gradient: 'from-red-500/30 to-red-600/30' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'cyan', gradient: 'from-cyan-500/30 to-blue-600/30' },
    { name: 'Figma', icon: SiFigma, color: 'pink', gradient: 'from-pink-500/30 to-purple-600/30' },
    { name: 'Git', icon: FaGitAlt, color: 'red', gradient: 'from-red-500/30 to-orange-600/30' },
    { name: 'Jest', icon: SiJest, gradient: 'from-red-500/30 to-orange-600/30', iconColor: 'text-[#C2132B] group-hover:text-[#E34C5D]' },
    { name: 'Github', icon: SiGithub, gradient: 'from-gray-500/30 to-gray-800/30', iconColor: 'text-black dark:text-white group-hover:text-gray-400' },
    { name: 'GraphQL', icon: SiGraphql, color: 'pink', gradient: 'from-pink-500/30 to-purple-600/30' },
    { name: 'AWS', icon: FaAws, color: 'orange', gradient: 'from-orange-500/30 to-yellow-600/30' },
    { name: 'Firebase', icon: SiFirebase, color: 'yellow', gradient: 'from-yellow-500/30 to-orange-600/30' },
    { name: 'Redux', icon: SiRedux, color: 'purple', gradient: 'from-purple-500/30 to-indigo-600/30' },
  ];

  const TechnologyIcon = ({ name, icon: Icon, color, gradient, iconColor }) => {
    const iconColorClass = iconColor ? iconColor : `text-${color}-400 group-hover:text-${color}-300`;

    return (
      <div className="group relative w-full h-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110`}></div>
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer w-full h-full">
          <Icon className={`text-5xl sm:text-6xl ${iconColorClass} transition-colors duration-300 mb-2`} />
          <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors duration-300 font-medium text-center">{name}</span>
        </div>
      </div>
    );
  };

  const servicesData = [
    {
      id: "mobile",
      icon: <DevicePhoneMobileIcon className="w-16 h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.mobile.title'),
      description: t('services.mobile.description')
    },
    {
      id: "corporate",
      icon: <BuildingOffice2Icon className="w-16 h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.corporate.title'),
      description: t('services.corporate.description')
    },
    {
      id: "software",
      icon: <CpuChipIcon className="w-16 h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.software.title'),
      description: t('services.software.description')
    },
    {
      id: "saas",
      icon: <CloudArrowUpIcon className="w-16 h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.saas.title'),
      description: t('services.saas.description')
    },
    {
      id: "web",
      icon: <CodeBracketIcon className="w-16 h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.web.title'),
      description: t('services.web.description')
    },
    {
      id: "automation",
      icon: <Squares2x2Icon className="w-16 h-16 text-[#ff6d4d] transition-all duration-300 group-hover:scale-110" />,
      title: t('services.automation.title'),
      description: t('services.automation.description')
    }
  ];

  // Função otimizada para movimento do mouse com throttle
  const handleMouseMove = useCallback((event) => {
    if (!isMouseMoveActive.current || !boxRef.current) return;
    
    const { clientY } = event;
    const { innerHeight } = window;
    const yPercent = (clientY / innerHeight - 0.5) * 8; // Reduzido para movimento mais sutil
    
    // Usar RAF para melhor performance
    if (mouseMoveTween.current) {
      mouseMoveTween.current.kill();
    }
    
    mouseMoveTween.current = gsap.to(boxRef.current, {
      yPercent: -50 + yPercent,
      duration: 1.2, // Aumentado para suavidade
      ease: "power1.out", // Ease mais suave
      overwrite: "auto",
    });
  }, []);

  // Função para iniciar animação de flutuação
  const startFloatingAnimation = useCallback(() => {
    if (floatingTween.current) {
      floatingTween.current.kill();
    }
    
    floatingTween.current = gsap.to(boxRef.current, {
      y: 15, // Reduzido para movimento mais sutil
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 2.5, // Aumentado para movimento mais lento e suave
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
      ease: "none" // Remove easing para rotação mais constante
    });
    
    rotationTimeline.current
      .to(boxRef.current, {
        rotation: "+=360",
        duration: 8, // Rotação mais lenta para suavidade
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
          opacity: 1, // Definir opacidade inicial
          force3D: true, // Força aceleração por GPU
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
              scrub: 1, // Mais suave
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
            scrub: 2, // Mais suave
            anticipatePin: 1, // Melhora performance do pin
            onEnter: () => {
              stopFloatingAnimation();
              activateMouseMove();
            },
            onLeave: () => {
              deactivateMouseMove();
            },
            onEnterBack: () => {
              stopFloatingAnimation();
              activateMouseMove();
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
            rotation: 270, // Reduzido para menos rotação
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
            // Animar transparência para 44% (opacity 0.56)
            gsap.to(boxRef.current, {
              opacity: 0.56,
              duration: 1,
              ease: "power2.inOut"
            });
          },
          onLeave: () => {
            stopRotationAnimation();
            activateMouseMove();
            // Restaurar opacidade total
            gsap.to(boxRef.current, {
              opacity: 1,
              duration: 1,
              ease: "power2.inOut"
            });
          },
          onLeaveBack: () => {
            stopRotationAnimation();
            activateMouseMove();
            // Restaurar opacidade total
            gsap.to(boxRef.current, {
              opacity: 1,
              duration: 1,
              ease: "power2.inOut"
            });
          },
          onEnterBack: () => {
            deactivateMouseMove();
            startRotationAnimation();
            // Animar transparência para 44% (opacity 0.56)
            gsap.to(boxRef.current, {
              opacity: 0.56,
              duration: 1,
              ease: "power2.inOut"
            });
          }
        });

        // Throttle do ScrollTrigger para melhor performance
        ScrollTrigger.config({
          syncInterval: 5, // Reduz frequência de atualização
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
        <main ref={heroRef} className="flex-grow flex items-center pt-52 pb-32">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

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
                  className="w-64 h-auto"
                  loading="eager"
                  style={{
                    backfaceVisibility: 'hidden'
                  }}
                />
              </div>

              <div className="relative z-10 text-white max-w-lg text-center lg:text-left -mt-39 ml-1">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
                  dangerouslySetInnerHTML={{ __html: t('hero.title') }}
                >
                </h1>
                <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                  {t('hero.description')}
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                  <input
                    type="email"
                    placeholder={t('hero.formPlaceholder')}
                    className="w-full sm:w-auto flex-grow bg-white/10 border border-white/20 rounded-md py-3 px-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-white outline-none transition-all"
                  />
                  <button
                    className="w-full sm:w-auto bg-white text-blue-900 font-semibold rounded-md py-3 px-6 flex items-center justify-center gap-2
                 hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5"
                  >
                    {t('hero.formButton')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Coluna da direita - Versão Ampliada */}
              <div className="relative z-20 h-[700px] w-full">
                <div
                  className="
      absolute top-0 -right-76 w-[750px] h-auto
      z-10 rounded-xl shadow-2xl 
      bg-slate-800/20 backdrop-blur-md border border-white/10
      overflow-hidden
    "
                >
                  <video
                    className="h-[500px] w-full object-cover rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/video/0827.mp4" type="video/mp4" />
                    <div className="h-[500px] w-full flex items-center justify-center text-white/50 rounded-xl">
                      {t('hero.dashboardVideoFallback')}
                    </div>
                  </video>
                </div>

                <div
                  className="
      absolute bottom-39 left-0 w-[280px] h-auto
      z-20 rounded-xl shadow-2xl
      bg-slate-800/20 backdrop-blur-md border border-white/10
      overflow-hidden
    "
                >
                  <video
                    className="h-[480px] w-full object-cover rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/video/oo7.mp4" type="video/mp4" />
                    <div className="h-[480px] w-full flex items-center justify-center text-white/50 rounded-xl">
                      {t('hero.mobileVideoFallback')}
                    </div>
                  </video>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* SECTION 1 */}
        <section ref={section1Ref} className="relative z-30 flex-grow flex items-center pb-32 pt-20 ">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-center">
              <ServiceCard key={servicesData[0].id} {...servicesData[0]} />
              <div></div>
              <ServiceCard key={servicesData[1].id} {...servicesData[1]} />
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section ref={section2Ref} className="relative z-30 flex-grow flex items-center pb-32 ">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-center">
              <ServiceCard key={servicesData[2].id} {...servicesData[2]} />
              <div></div>
              <ServiceCard key={servicesData[3].id} {...servicesData[3]} />
            </div>
          </div>
        </section>

        {/* FRASE */}
        <section>
          <div className="pb-32 relative z-30">
            <h1 className="text-9xl text-center uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-800 ">
              {t('phrase')}
            </h1>
          </div>
        </section>

        {/* SECTION 3 */}
        <section ref={section3Ref} className=" relative z-30 flex-grow flex items-center">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-center">
              <ServiceCard key={servicesData[4].id} {...servicesData[4]} />
              <div></div>
              <ServiceCard key={servicesData[5].id} {...servicesData[5]} />
            </div>
          </div>
        </section>

        {/* SECTION 4 - SERVIÇOS AVANÇADOS */}
        <section ref={section4Ref} className="relative z-30 flex flex-col py-32 pt-41">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12 text-center md:text-left">

              {/* Blockchain */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <FaAws className="text-4xl text-teal-400 mb-2" />
                <h3 className="text-xl font-bold text-white">{t('advancedServices.blockchain.title')}</h3>
                <p className="text-slate-300">
                  {t('advancedServices.blockchain.description')}
                </p>
              </div>

              {/* Artificial Intelligence */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <FaPython className="text-4xl text-teal-400 mb-2" />
                <h3 className="text-xl font-bold text-white">{t('advancedServices.ai.title')}</h3>
                <p className="text-slate-300">
                  {t('advancedServices.ai.description')}
                </p>
              </div>

              {/* World Class Games */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <FaReact className="text-4xl text-teal-400 mb-2" />
                <h3 className="text-xl font-bold text-white">{t('advancedServices.games.title')}</h3>
                <p className="text-slate-300">
                  {t('advancedServices.games.description')}
                </p>
              </div>

              {/* Native Applications */}
              <div className="flex flex-col items-center md:items-start gap-4 mt-12">
                <SiFigma className="text-4xl text-teal-400 mb-2" />
                <h3 className="text-xl font-bold text-white">{t('advancedServices.native.title')}</h3>
                <p className="text-slate-300">
                  {t('advancedServices.native.description')}
                </p>
              </div>

              {/* Elegant Modern Design */}
              <div className="flex flex-col items-center md:items-start gap-4 mt-12">
                <SiTailwindcss className="text-4xl text-teal-400 mb-2" />
                <h3 className="text-xl font-bold text-white">{t('advancedServices.design.title')}</h3>
                <p className="text-slate-300">
                  {t('advancedServices.design.description')}
                </p>
              </div>

              {/* Internal Systems */}
              <div className="flex flex-col items-center md:items-start gap-4 mt-12">
                <SiGraphql className="text-4xl text-teal-400 mb-2" />
                <h3 className="text-xl font-bold text-white">{t('advancedServices.systems.title')}</h3>
                <p className="text-slate-300">
                  {t('advancedServices.systems.description')}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SEÇÃO SENNA QUOTE COM TECNOLOGIAS */}
        <section className="relative z-10 py-24 md:py-32 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

            <div className="relative w-[1200px]">
              <div className="relative z-10 h-[550px] rounded-r-2xl shadow-2xl bg-slate-800/30 backdrop-blur-xl border-y border-r border-white/20 overflow-hidden">
                <div className="flex items-center h-full">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 sm:gap-6 p-4 sm:p-6 w-full h-full">
                    {technologies.map((tech) => (
                      <TechnologyIcon key={tech.name} {...tech} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-20 flex flex-col justify-center items-start lg:items-end px-4 sm:px-6 lg:px-0 lg:mr-64">
              <div className="max-w-md lg:max-w-lg text-left lg:text-right">
                <h5 className="text-3xl sm:text-3xl md:text-3xl font-bold text-white leading-snug"
                 dangerouslySetInnerHTML={{ __html: t('quote.text') }}>
                </h5>
                <div className="mt-4">
                  <h5 className="text-white font-medium">
                    {t('quote.author')}<br /><span className="text-green-400">{t('quote.title')}</span>
                  </h5>
                </div>
              </div>
            </div>

          </div>

          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-100"></div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-200"></div>
        </section>

        <FooterAry ref={footerRef} />
      </div>
    </>
  );
}