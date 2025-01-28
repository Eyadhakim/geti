//translations
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
//***************************************************************
//components
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
//***************************************************************
//styles
import localFont from 'next/font/local';
import "../globals.css"
//***************************************************************
//types
import { Metadata } from 'next';
//***************************************************************


export const metadata: Metadata = {
  title: "Golden east for trade and industry"
};

const urbanist = localFont({
  src: [
    {
      path: '../../public/fonts/Urbanist-Medium.woff',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Urbanist-Medium.woff2',
      style: 'normal'
    }
  ],
  variable: "--urbanist-font"
})

const notoSansArabic = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSansArabic.woff',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NotoSansArabic.woff2',
      style: 'normal'
    }
  ],
  variable: "--noto-sans-arabic-font"
})

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();
 
  return (
    <html lang={locale} dir={locale === 'ar'? "rtl": "ltr"}>
      <body className={locale === "en"? urbanist.variable: notoSansArabic.variable}>
        <NextIntlClientProvider messages={messages}>
          <Header/>
          {children}
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

