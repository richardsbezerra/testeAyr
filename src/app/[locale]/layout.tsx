import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/globals.css';

import NavibarAry from '@/components/layout/NavibarAry';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: 'ayrCore',
    description: 'Site corporativo multilíngue',
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // ✅ CORREÇÃO: Converta para string ou use includes com type assertion
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavibarAry />
          <main className="bg-gradient-to-br from-[#000d2e] via-[#0a1b3d] to-[#4a00e0]">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}