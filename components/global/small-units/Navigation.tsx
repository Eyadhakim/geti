"use client"

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import MenuModal from "./MenuModal";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Service } from "@prisma/client";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [ services, setServices ] = useState<Service[]>([
    {
      id: 1,
      title: "Service",
      key: "Service",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
      lang: "ar",
    },
    {
      id: 2,
      title: "Service",
      key: "Service",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
      lang: "ar",
    },
    {
      id: 3,
      title: "Service",
      key: "Service",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
      lang: "ar",
    }
  ]);
  const servicesPages = useRef<HTMLDivElement>(null);
  const [ isAdmin, setIsAdmin ] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          credentials: "include"
        });

        if (res.ok) setIsAdmin(true);
    }
    verifyToken()
  }, [pathname]);
  

  return (
    <>
      <nav className="xl:flex h-full items-center gap-5 hidden text-nowrap">
        <Link href="/" className={pathname === '/'? "text-main": "text-foreground"}>{t('home')}</Link>
        <Link href="/about" className={pathname === '/about'? "text-main": "text-foreground"}>{t('about')}</Link>
        <div className="relative overflow-visible h-full" onMouseOver={() => {
            servicesPages.current?.classList.add("flex");
            servicesPages.current?.classList.remove("hidden");
          }}
          onMouseLeave={() => {
            servicesPages.current?.classList.add("hidden");
            servicesPages.current?.classList.remove("flex");
          }}
        >
          <div 
            className="h-full flex items-center justify-between cursor-pointer" 
          >
            <p>
              {t('services')}
            </p>
            <Image
              src="/icons/arrow-down.svg"
              alt="arrow"
              width={25}
              height={25}
            />
          </div>
          <div 
            className="h-fit w-64 bg-background shadow-lg border absolute -start-5 top-20 hidden flex-col items-center justify-center transition duration-500 rounded-md py-4 font-semibold" 
            ref={servicesPages}
          >
            {services.map(service => (
              <Link key={service.id} href={`/services/${service.key}`} className="hover:text-main transition duration-500 w-full h-10 flex items-center justify-center">{service.title}</Link>
            ))}
          </div>
        </div>
        <Link href="/products" className={pathname === '/products'? "text-main": "text-foreground"}>{t('products')}</Link>
        <Link href="/clients" className={pathname === '/clients'? "text-main": "text-foreground"}>{t('clients')}</Link>
        <Link href="/blog" className={pathname.startsWith("/blog")? "text-main": "text-foreground"}>{t('blog')}</Link>
        <Link href="/certifications" className={pathname === '/certifications'? "text-main": "text-foreground"}>{t('certifications')}</Link>
        <Link href="/gallery" className={pathname === '/gallery'? "text-main": "text-foreground"}>{t('gallery')}</Link>
        <Link href="/contact" className={pathname === '/contact'? "text-main": "text-foreground"}>{t('contact')}</Link>
        {isAdmin &&
          <Link href="/admin/dashboard" className={pathname.startsWith("/admin/dashboard")? "text-main": "text-foreground"}>{t('dashboard')}</Link>
        }
      </nav>
      <MenuModal
        services={services}
        isAdmin={isAdmin}
      />
    </>
  )
}
