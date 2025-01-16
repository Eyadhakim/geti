"use client"

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import MenuModal from "./MenuModal";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  return (
    <>
      <nav className="lg:flex h-full items-center gap-5 hidden">
        <Link href="/" className={pathname === '/'? "text-main": "text-foreground"}>{t('home')}</Link>
        <Link href="/about" className={pathname === '/about'? "text-main": "text-foreground"}>{t('about')}</Link>
        <Link href="/services" className={pathname === '/services'? "text-main": "text-foreground"}>{t('services')}</Link>
        <Link href="/products" className={pathname === '/products'? "text-main": "text-foreground"}>{t('products')}</Link>
        <Link href="/clients" className={pathname === '/clients'? "text-main": "text-foreground"}>{t('clients')}</Link>
        <Link href="/blog" className={pathname === '/blog'? "text-main": "text-foreground"}>{t('blog')}</Link>
        <Link href="/contact" className={pathname === '/contact'? "text-main": "text-foreground"}>{t('contact')}</Link>
      </nav>
      <MenuModal/>
    </>
  )
}
