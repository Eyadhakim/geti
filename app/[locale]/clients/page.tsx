"use client"

import Title from "@/components/global/Title";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Clients() {
  const images = [
    "/images/ideal.png",
    "/images/kiriazi.png",
    "/images/ideal.png",
    "/images/kiriazi.png",
    "/images/ideal.png",
    "/images/kiriazi.png",
    "/images/ideal.png",
    "/images/kiriazi.png",
    "/images/ideal.png",
    "/images/kiriazi.png",
  ];
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