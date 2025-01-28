'use client';

import { useRouter, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const params = useSearchParams();
  const query = Object.fromEntries(params.entries());

  const changeLanguage = (locale: string) => {
    router.push({
      pathname,
      query
    }, {locale})
  };

  return (
    <div className='flex items-center w-14 h-14 relative'>
      <select onChange={(e) => changeLanguage(e.target.value)} className="language-switcher" value={currentLocale}>
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
      <Image
        src="/icons/lang.svg"
        alt="Language Switcher"
        fill
        objectFit='cover'
      />
    </div>
  );
}

