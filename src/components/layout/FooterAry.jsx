"use client";

import React, { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import ReactCountryFlag from "react-country-flag";
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const FooterAry = forwardRef(({ companyName }, ref) => {
  const t = useTranslations('FooterAry');
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'de-DE', country: 'DE' },
    { code: 'en-US', country: 'US' },
    { code: 'es-ES', country: 'ES' },
    { code: 'fr-FR', country: 'FR' },
    { code: 'pt-BR', country: 'BR' },
    { code: 'zh-CN', country: 'CN' },
    { code: 'ja-JP', country: 'JP' },
    { code: 'ru-RU', country: 'RU' },
  ];

  const footerLinks = {
    solucoes: [
      { name: t('solutions.saas'), href: '/saas' },
      { name: t('solutions.mobileApps'), href: '/mobile-application-creation' },
      { name: t('solutions.softwareDevelopment'), href: '/software-development' },
      { name: t('solutions.corporateSolutions'), href: '/corporate-solutions' },
      { name: t('solutions.webEcommerce'), href: '/web-development' },
      { name: t('solutions.integrationsAutomations'), href: '/integrations-and-automations' },
    ],
    empresa: [
      { name: t('company.aboutUs'), href: '/about-us' },
      { name: t('company.supportCenter'), href: '/support-center' },
      { name: t('company.vacancies'), href: '/vacancies' },
      { name: t('company.becomePartner'), href: '/become-a-partner' },
      { name: t('company.blog'), href: '/blog' },
      { name: t('company.faq'), href: '/faq' },
    ],
  };

  return (
    <footer
      ref={ref}
      className="bg-gradient-to-t from-slate-900/95 to-slate-900/70 backdrop-blur-sm border-t border-slate-700 mt-32 text-slate-300"
    >
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          
          {/* Logo / Idiomas / Descrição */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start">
            
            {/* Bandeiras diretas (sem nome) */}
            <div className="mt-2 flex flex-wrap gap-3">
              {languages.map((lang) => (
            <button
              key={lang.code}
              className="p-1 rounded-md hover:bg-slate-700 transition-colors"
              onClick={() => {
                // 🚀 Aqui troca o idioma
                router.replace(pathname, { locale: lang.code });
              }}
                >
                  <ReactCountryFlag
                    countryCode={lang.country}
                    svg
                    style={{ width: "2em", height: "2em" }}
                  />
                </button>
              ))}
            </div>

            {/* Descrição */}
            <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-md">
              {t('description')}
            </p>

            {/* Contato */}
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-white">{t('contact.email')}:</span>{' '}
                <a href="mailto:ayrcore@outlook.com" className="hover:text-white transition-colors">
                  ayrcore@outlook.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">{t('contact.phone')}:</span>{' '}
                <a href="tel:+5513997852155" className="hover:text-white transition-colors">
                  (13) 99785-2155
                </a>
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-1 lg:col-span-3 flex justify-end gap-12">
            <nav aria-label={t('sections.solutions')} className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide border-b border-slate-700 pb-2">
                {t('sections.solutions')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.solucoes.map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} className="text-sm hover:text-white transition-colors block" aria-label={name}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={t('sections.company')} className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide border-b border-slate-700 pb-2">
                {t('sections.company')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.empresa.map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} className="text-sm hover:text-white transition-colors block" aria-label={name}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-10 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 select-none">
            &copy; {new Date().getFullYear()} {companyName || 'ayrCore'}. {t('copyright')}
          </p>
          <div className="flex space-x-6">
            <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

FooterAry.displayName = 'FooterAry';
export default FooterAry;
