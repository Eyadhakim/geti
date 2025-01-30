"use client"

import { Link, usePathname } from "@/i18n/routing";
import { Service } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";

export default function MenuModal({ services, isAdmin }: { services: Service[], isAdmin: boolean }) {
  const menuRef = useRef<HTMLElement>(null);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const [menuModal, setMenuModal] = useState(false);

  const linkStyle = "flex h-12 w-full items-center justify-center border"

  return (
    <>
      <button 
        className="rounded w-14 h-14 border-none bg-transparent relative block xl:hidden"
        onClick={() => setMenuModal(menuModal === true? false: true)}
      >
        <Image
          src="/icons/menu.svg"
          alt="menu button"
          fill
        />
      </button>

      { menuModal &&

      <aside ref={menuRef} className={`w-60 shadow hidden fixed h-full top-20 bg-background flex-col z-50 ${locale === "ar"? "left-0": "right-0"}`}>
        <nav className="flex flex-col">
          <Link onClick={() => setMenuModal(false)} href="/" className={`${pathname === '/'? "text-main": "text-foreground"} ${linkStyle}`}>{t('home')}</Link>
          { isAdmin &&
            <Link onClick={() => setMenuModal(false)} href="/admin/dashboard" className={`${pathname.startsWith('/admin/dashboard')? "text-main": "text-foreground"} ${linkStyle}`}>{t('dashboard')}</Link>
          }
          <Link onClick={() => setMenuModal(false)} href="/about" className={`${pathname === '/about'? "text-main": "text-foreground"} ${linkStyle}`}>{t('about')}</Link>
          <Link onClick={() => setMenuModal(false)} href="/products" className={`${pathname === '/products'? "text-main": "text-foreground"} ${linkStyle}`}>{t('products')}</Link>
          <Link onClick={() => setMenuModal(false)} href="/clients" className={`${pathname === '/clients'? "text-main": "text-foreground"} ${linkStyle}`}>{t('clients')}</Link>
          <Link onClick={() => setMenuModal(false)} href="/blog" className={`${pathname === '/blog'? "text-main": "text-foreground"} ${linkStyle}`}>{t('blog')}</Link>
          <Link onClick={() => setMenuModal(false)} href="/contact" className={`${pathname === '/contact'? "text-main": "text-foreground"} ${linkStyle}`}>{t('contact')}</Link>
          <Link onClick={() => setMenuModal(false)} href="/gallery" className={`${pathname === '/gallery'? "text-main": "text-foreground"} ${linkStyle}`}>{t('gallery')}</Link>
          <Link onClick={() => setMenuModal(false)} href="/certifications" className={`${pathname === '/certifications'? "text-main": "text-foreground"} ${linkStyle}`}>{t('certifications')}</Link>
        </nav>
        <h2 className="my-3">{t("services")}</h2>
        {services.map(service => (
          <Link onClick={() => setMenuModal(false)} key={service.id} href={`/services/${service.key}`} className={`${pathname === `/services/${service.key}`? "text-main": "text-foreground"} ${linkStyle}`}>{service.title}</Link>
        ))}
      </aside>
      }

    </>
  )
}
