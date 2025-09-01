"use client";

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '../../i18n/routing';
import ReactCountryFlag from "react-country-flag";


const languages = {
  'pt-BR': { nativeName: 'Português', countryCode: 'BR' },
  'en-US': { nativeName: 'English', countryCode: 'US' },
  'es-ES': { nativeName: 'Español', countryCode: 'ES' },
  'zh-CN': { nativeName: '中文', countryCode: 'CN' },
  'fr-FR': { nativeName: 'Français', countryCode: 'FR' },
  'de-DE': { nativeName: 'Deutsch', countryCode: 'DE' },
  'ja-JP': { nativeName: '日本語', countryCode: 'JP' },
  'ru-RU': { nativeName: 'Русский', countryCode: 'RU' }
};

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale();
  const dropdownRef = useRef(null); // 2. Ref para o container do dropdown

  const currentLanguageName = languages[currentLocale]?.nativeName || languages[routing.defaultLocale].nativeName;

  // 3. Efeito para fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  // 4. Efeito para fechar o menu com a tecla "Escape"
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    // 5. Adicione a ref ao div principal
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white font-medium"
      >
        <ReactCountryFlag
          countryCode={languages[currentLocale]?.countryCode}
          svg
          style={{
            width: "1.2em",
            height: "1.2em",
            borderRadius: "2px",
          }}
        />
        {currentLanguageName}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-slate-800/70 backdrop-blur-md border border-white/10 rounded-lg shadow-lg">
          <ul className="py-1">
            {routing.locales.map((locale) => {
              if (locale === currentLocale) return null;

              return (
                <li key={locale}>
                  <button
                    onClick={() => {
                      router.push(pathName, { locale: locale });
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10"
                  >
                    <ReactCountryFlag
                      countryCode={languages[locale]?.countryCode}
                      svg
                      style={{
                        width: "1.2em",
                        height: "1.2em",
                        borderRadius: "2px",
                      }}
                    />
                    {languages[locale]?.nativeName}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}