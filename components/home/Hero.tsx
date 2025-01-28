import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("Home")

  return (
    <main className="relative h-[80vh] my-12 text-center">
      <Image
        src="/hero/hero.jpg"
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
          <Link href="#services" className="w-40 bg-main rounded hover:bg-transparent border-4 border-main" style={{transition: "0.5s"}}>
            <button className="w-full h-full flex p-2 items-center justify-center">{t("services")}</button>
          </Link>
          <Link href="/products" className="w-40 rounded border-4 border-main hover:bg-main" style={{transition: "0.5s"}}>
            <button className="w-full h-full flex p-2 items-center justify-center">{t("products")}</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
