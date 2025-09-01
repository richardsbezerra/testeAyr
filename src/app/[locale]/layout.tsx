// app/[locale]/layout.tsx

import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '@/globals.css';

// 1. Importe o componente da Navbar
import NavibarAry from '@/components/layout/NavibarAry';
//import FooterAry from '@/components/layout/FooterAry'
// (Você pode criar e importar um Footer também)
// import Footer from '@/components/Footer';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params; // 👈 aqui sim, com await

  // Valida se o locale existe
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavibarAry />
          <main className='bg-gradient-to-br from-[#000d2e] via-[#0a1b3d] to-[#4a00e0]'>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}