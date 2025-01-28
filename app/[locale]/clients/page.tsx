"use client"

import Title from "@/components/global/Title";
import { Client } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react"

export default function Clients() {
  const [ images, setImages ] = useState<string[]>([]);
  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch("/api/clients");
      const data:Client[] = await res.json();
      if (res.ok) setImages(data.map(c => c.logo));
    }
    fetchClients();
  }, []);
  const t = useTranslations("Navigation")
  

  return (
    <section className="flex justify-center flex-wrap gap-5 min-h-screen">
      <Title
        title={t("clients")}
        pathes={["clients"]}
        pathesTitles={[t("clients")]}
      />
      <div className="w-full max-w-[1000px] flex items-center justify-center flex-wrap gap-10 my-20">
        {images.map((image, index) => (
          <div key={index} className="relative w-64 h-32 border-2 border-dark">
            <Image
              src={image}
              alt={index.toString()}
              fill
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}