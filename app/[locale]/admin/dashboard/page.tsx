"use client"

import Link from "@/components/global/small-units/Link";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Dashboard() {
  const t = useTranslations("Admin");

  const pages = [
    "products",
    "services",
    "clients",
    "blog",
    "gallery",
    "certifications",
  ]

  return (
      <div className="w-full my-20 flex items-center justify-center gap-20 flex-col">
        <h1 className="text-5xl text-center">{t("content management for")}</h1>
        <div className="flex items-center justify-center flex-wrap gap-10 w-3/4">
          {pages.map(page => (
            <Link key={page} href={`/admin/dashboard/${page}`}>
              <div className={`w-80 h-80 relative rounded-xl flex items-center justify-center text-3xl overflow-hidden`}>
                  <Image 
                    src={`/dashboardCards/${page}.png`}
                    alt={page}
                    fill
                    objectFit="cover"
                    className="absolute left-0 top-0"
                  />
                  <h1 className="w-full h-full absolute flex items-center justify-center top-0 left-0 bg-[#0007] text-background">
                    {t(page)}
                  </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
  )
}
