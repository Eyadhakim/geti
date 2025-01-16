import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("Hero")

  return (
    <section className="relative h-[80vh] my-28 bg-slate-500 text-center">
      <Image
        src="/hero.jpg"
        alt="hero image"
        fill
        objectFit="cover"
      />
      <div
        className="w-full h-full absolute left-0 top-0 z-10 bg-[#0004] flex flex-col items-center justify-center text-background gap-24"
      >
        <div className="flex flex-col items-center gap-5 mx-2">
          <h1 className="text-6xl font-bold">{t("golden east for trade & industry")}</h1>
          <p className="text-xl">{t("manufacturing & polishing of aluminum profiles")}</p>
        </div>
        <div className="max-w-96 gap-10 flex flex-wrap justify-center text-lg mx-2">
          <button className="w-40 p-2 bg-main rounded hover:bg-transparent border-4 border-main" style={{transition: "0.5s"}}>
            <Link href="/services" className="w-full h-full flex items-center justify-center">{t("services")}</Link>
          </button>
          <button className="w-40 p-2 rounded border-4 border-main hover:bg-main" style={{transition: "0.5s"}}>
            <Link href="/products" className="w-full h-full flex items-center justify-center">{t("products")}</Link>
          </button>
        </div>
      </div>
    </section>
  )
}
