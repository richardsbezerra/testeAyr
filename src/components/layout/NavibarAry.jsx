"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import DropdownLink from "../layout/DropdownLink";
import LanguageSwitcher from '../languages/LanguageSwitcher';

import {
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineLightBulb,
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlineCog,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineChevronRight,
  HiOutlineHome,
} from 'react-icons/hi2';

const icons = {
  'blog': HiOutlineNewspaper,
  'faq': HiOutlineQuestionMarkCircle,
  'support-center': HiOutlineLightBulb,
  'customer-story': HiOutlineDocumentText,
  'vacancies': HiOutlineBriefcase,
  'become-a-partner': HiOutlineUsers,
  'saas': HiOutlineSparkles,
  'software-development': HiOutlineLightBulb,
  'corporate-solutions': HiOutlineUserGroup,
  'web-development': HiOutlineGlobeAlt,
  'integrations-and-automations': HiOutlineCog,
  'mobile-application-creation': HiOutlineDevicePhoneMobile,
  'home': HiOutlineHome,
};

const getIconByHref = (href = '') => {
  const key = href.startsWith('/') ? href.slice(1) : href;
  return icons[key] || HiOutlineChevronRight;
};

const MobileMenuIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 transition-transform duration-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    )}
  </svg>
);

export default function NavibarAry() {
  const t = useTranslations('Navbar');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 50;
    const hideThreshold = 200;

    setIsScrolled(currentScrollY > scrollThreshold);
    setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < hideThreshold);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    {
      label: t('features'),
      items: [
        { href: '/support-center', label: t('dropdown.support_center.title'), description: t('dropdown.support_center.desc') },
        { href: '/vacancies', label: t('dropdown.vacancies.title'), description: t('dropdown.vacancies.desc') },
        { href: '/become-a-partner', label: t('dropdown.become_a_partner.title'), description: t('dropdown.become_a_partner.desc') },
        { href: '/blog', label: t('dropdown.blog.title'), description: t('dropdown.blog.desc') },
        { href: '/faq', label: t('dropdown.faq.title'), description: t('dropdown.faq.desc') },
      ]
    },
    {
      label: t('solutions'),
      items: [
        { href: '/saas', label: t('dropdown.saas.title'), description: t('dropdown.saas.desc') },
        { href: '/mobile-application-creation', label: t('dropdown.mobile_application_creation.title'), description: t('dropdown.mobile_application_creation.desc') },
        { href: '/software-development', label: t('dropdown.software_development.title'), description: t('dropdown.software_development.desc') },
        { href: '/corporate-solutions', label: t('dropdown.corporate_solutions.title'), description: t('dropdown.corporate_solutions.desc') },
        { href: '/web-development', label: t('dropdown.web_development.title'), description: t('dropdown.web_development.desc') },
        { href: '/integrations-and-automations', label: t('dropdown.integrations.title'), description: t('dropdown.integrations.desc') },
      ]
    },
    { href: '/about-us', label: t('about') },
    { href: '/', label: t('home') }, // Added Home link
  ];

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, []);

  const toggleMobileDropdown = useCallback((label) => {
    setOpenMobileDropdown(current => current === label ? null : label);
  }, []);

  const navContainerClasses = clsx(
    'fixed top-0 left-0 w-full z-50 transition-transform duration-300 px-4',
    {
      'translate-y-0': isVisible,
      '-translate-y-full': !isVisible
    }
  );

  const navInnerClasses = clsx(
    'relative w-full max-w-[1600px] mx-auto flex items-center justify-between transition-all duration-300 mt-7',
    'h-16 sm:h-18 lg:h-20',
    'px-3 sm:px-6 lg:px-8 xl:px-[28px]',
    // Glassmorphism effect similar to ServiceCard
    'rounded-xl shadow-2xl bg-slate-800/20 backdrop-blur-md border border-white/10',
    {
      'bg-slate-800/30 backdrop-blur-lg border-white/20': isScrolled,
    }
  );

  const renderNavLink = (link) => {
    if (link.items) {
      return (
        <DropdownLink
          key={link.label}
          link={link}
          getIcon={getIconByHref}
        />
      );
    }

    const Icon = getIconByHref(link.href);
    return (
      <Link
        key={link.label}
        href={link.href}
        className="text-white font-medium relative group transition-all duration-300 flex items-center gap-2 hover:text-white
                   text-sm lg:text-base xl:text-lg"
      >
        <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-[#ff6d4d] group-hover:scale-110 transition-transform duration-200" />
        <span>{link.label}</span>
        <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff6d4d] to-[#ff4d88] transition-all duration-300 group-hover:w-full"></span>
      </Link>
    );
  };

  const renderMobileNavLink = (link) => {
    if (link.items) {
      const isDropdownOpen = openMobileDropdown === link.label;
      return (
        <div key={link.label} className="w-full">
          {/* Botão principal do dropdown */}
          <button
            onClick={() => toggleMobileDropdown(link.label)}
            className="text-white font-semibold flex items-center justify-center gap-2 w-full hover:text-[#ff6d4d] transition-colors duration-200 border-b border-slate-700/50
                       text-lg sm:text-xl py-2.5 sm:py-3"
            aria-expanded={isDropdownOpen}
          >
            {link.label}
            <svg
              className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown expandido */}
          <div className={`overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col gap-1 sm:gap-2 mt-2 px-2 sm:px-4 pb-3 sm:pb-4 bg-slate-800/30 rounded-lg mx-1 sm:mx-2">
              {link.items.map(item => {
                const Icon = getIconByHref(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 rounded-lg group
                               py-2 sm:py-3 px-2 sm:px-3"
                    onClick={closeMobileMenu}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6d4d] mt-0.5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-white text-sm sm:text-base">{item.label}</span>
                      {item.description && (
                        <span className="text-xs sm:text-sm text-slate-400 mt-1 leading-tight line-clamp-2">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // Links simples (sem dropdown)
    const Icon = getIconByHref(link.href);
    return (
      <Link
        key={link.label}
        href={link.href}
        className="flex items-center gap-3 text-white font-medium hover:text-[#ff6d4d] transition-colors duration-200 border-b border-slate-700/50 w-full justify-center
                   text-lg sm:text-xl py-2.5 sm:py-3"
        onClick={closeMobileMenu}
      >
        <Icon className="w-5 h-5 text-[#ff6d4d]" />
        <span>{link.label}</span>
      </Link>
    );
  };

  return (
    <nav className={navContainerClasses}>
      <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-between h-[78px]">
        {/* Navbar principal com fundo glassmorphism */}
        <div className={navInnerClasses}>
          {/* Logo */}
          <div className="h-50 ml-[-5rem] sm:ml-[-6.9rem]">
            <Link href="/" aria-label="Página Inicial">
              <Image
                src="/img/logoMeio4-80x40.svg"
                alt="ayrCore Logo"
                width={80}
                height={40}
                className="h-[14rem] w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Oculto até lg (1024px+) */}
          <div className="hidden lg:flex flex-1 gap-6 xl:gap-10 sm:ml-[-2rem]">
            {navLinks.slice(0, -1).map(renderNavLink)} {/* Exclude Home from desktop menu */}
          </div>

          {/* Language Switcher dentro do navbar */}
          <div className="hidden lg:flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button - Visível até lg */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white z-50 p-2 hover:text-[#ff6d4d] transition-colors duration-200 flex-shrink-0"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <MobileMenuIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>

        {/* Botão separado fora do navbar glassmorphism */}
        <div className="hidden lg:flex items-center ml-4">
          <button
            className="
              relative rounded-xl font-semibold shadow-2xl
              bg-[#ff6d4d]/20 backdrop-blur-md border border-[#ff6d4d]/30
              text-white hover:shadow-xl
              hover:bg-[#ff6d4d]/30 hover:border-[#ff6d4d]/60
              active:scale-95
              transition-all duration-300
              group
              px-4 py-2 text-sm xl:px-9 xl:py-[15px] xl:text-base
              before:absolute before:inset-0 before:rounded-xl
              before:bg-gradient-to-r before:from-[#ff6d4d]/20 before:to-[#ff4d88]/20
              before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-100 mt-7
            "
          >
            <span className="relative z-10 group-hover:text-[#ff6d4d] transition-colors duration-300">
              {t('contact_button')}
            </span>
          </button>
        </div>
      </div>

      {/* Menu Mobile - Melhorado para tablets portrait */}
      <div
        className={clsx(
          "lg:hidden fixed inset-0 h-screen w-screen bg-slate-900/95 backdrop-blur-md z-40 flex flex-col items-center justify-start overflow-y-auto transform transition-all duration-500 ease-in-out",
          // Padding top responsivo para diferentes tamanhos
          "pt-20 sm:pt-24",
          // Padding horizontal responsivo
          "px-4 sm:px-6",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-full pointer-events-none"
        )}
        id="mobile-menu"
        onClick={closeMobileMenu}
      >
        <div
          className="flex flex-col gap-2 sm:gap-4 w-full mx-auto pb-20 sm:pb-32
                     max-w-sm sm:max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map(renderMobileNavLink)}

          {/* Seção de ações do mobile */}
          <div className="border-t border-slate-700 w-full flex flex-col items-center gap-3 sm:gap-4 
                          pt-4 sm:pt-6 mt-3 sm:mt-4">
            <button
              className="relative rounded-xl font-semibold shadow-2xl
                        bg-slate-800/20 backdrop-blur-md border border-white/10
                        text-white hover:shadow-xl
                        hover:bg-slate-800/30 hover:border-[#ff6d4d]/50
                        hover:scale-105 transition-all duration-300 active:scale-95
                        group
                        px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base
                        before:absolute before:inset-0 before:rounded-xl
                        before:bg-gradient-to-r before:from-[#ff6d4d]/10 before:to-[#ff4d88]/10
                        before:opacity-0 before:transition-opacity before:duration-300
                        hover:before:opacity-100"
              onClick={closeMobileMenu}
            >
              <span className="relative z-10 group-hover:text-[#ff6d4d] transition-colors duration-300">
                {t('contact_button')}
              </span>
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}