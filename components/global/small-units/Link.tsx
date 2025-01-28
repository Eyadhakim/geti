'use client';

import { Link as I18nLink, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

export default function Link({
  href,
  className,
  children,
}: React.ComponentProps<'a'>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultClassname = pathname === href? "text-main": "";

  const queryString = searchParams.toString();
  const querySuffix = queryString ? `?${queryString}` : '';

  const finalHref = `${href}${querySuffix}`;

  return <I18nLink className={!className? defaultClassname: className} href={finalHref}>{children}</I18nLink>;
}
