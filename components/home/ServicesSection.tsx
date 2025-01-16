import { useTranslations } from "next-intl"
import Image from "next/image"

export default function ServicesSection() {
  const t = useTranslations("Services section");

  return (
    <section className="flex items-center justify-center h-[500px] relative">
        <div className="w-[calc(100vw/6)] relative h-full">
          <Image
            src="/services/2a.png"
            alt="service image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-[calc(100vw/6)] relative h-full">
          <Image
            src="/services/2b.png"
            alt="service image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-[calc(100vw/6)] relative h-full">
          <Image
            src="/services/2c.png"
            alt="service image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-[calc(100vw/6)] relative h-full">
          <Image
            src="/services/2d.png"
            alt="service image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-[calc(100vw/6)] relative h-full">
          <Image
            src="/services/2e.png"
            alt="service image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="w-[calc(100vw/6)] relative h-full">
          <Image
            src="/services/2f.png"
            alt="service image"
            fill
            objectFit="cover"
          />
        </div>
      <div className="absolute w-full max-w-[600px] h-full bg-[#20b1ef80] flex flex-col items-center justify-center gap-5 text-background text-2xl font-semibold">
        <h1 className="text-6xl font-bold">{t("our services")}</h1>
        <div className="w-20 h-5 relative">
          <Image
            src="/icons/arrow-up.svg"
            alt="arrow"
            fill
            objectFit="cover"
          />
        </div>
        <p>{t("forming and machining")}</p>
        <p>{t("mechanical processing")}</p>
        <p>{t("chemical processing")}</p>
      </div>
    </section>
  )
}
