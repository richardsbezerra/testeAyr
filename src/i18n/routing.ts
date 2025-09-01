import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['de-DE', 'en-US', 'es-ES', 'fr-FR','pt-BR', 'zh-CN', 'ja-JP', 'ru-RU'],
 
  // Used when no locale matches
  defaultLocale: 'en-US'

  
});