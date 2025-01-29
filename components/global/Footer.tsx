import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");

  return (
    <footer className="bg-dark text-background h-fit min-h-[500px] flex justify-center items-start flex-wrap">
      <div className="flex flex-col items-start justify-center p-5 gap-3">
        <Image
          src={locale === "ar"? "/logo/arabic_logo_white.png": "/logo/latin_logo_white.png"}
          alt="Logo"
          width={160}
          height={50}
          className={locale === "ar" ? "ml-auto" : "mr-auto"}
        />
        <p className="text-start font-bold text-2xl">{t("golden east for trade & industry")}</p>
        <p className="text-start ">{t("manufacturing & polishing of aluminum profiles")}</p>
        <div className="flex gap-2">
          <Image 
            src="/social-icons/facebook.svg"
            alt="Facebook"
            width={40}
            height={40}
          />
          <Image 
            src="/social-icons/instagram.svg"
            alt="Instagram"
            width={40}
            height={40}
          />
          <Image 
            src="/social-icons/x.svg"
            alt="X"
            width={40}
            height={40}
          />
          <Image 
            src="/social-icons/linkedin.svg"
            alt="Linkedin"
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-5 gap-3">
        <p className="text-start text-3xl font-extrabold text-light">{t("pages")}</p>
        <nav className="flex flex-col leading-8 uppercase font-semibold text">
          <Link href="/">
            <p className="text-start">{t("home")}</p>
          </Link>
          <Link href="/about">
            <p className="text-start">{t("about")}</p>
          </Link>
          <Link href="/services">
            <p className="text-start">{t("services")}</p>
          </Link>
          <Link href="/products">
            <p className="text-start">{t("products")}</p>
          </Link>
          <Link href="/clients">
            <p className="text-start">{t("clients")}</p>
          </Link>
          <Link href="/blog">
            <p className="text-start">{t("blog")}</p>
          </Link>
          <Link href="/contact">
            <p className="text-start">{t("contact")}</p>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col items-start justify-center p-5 gap-3">
        <p className="text-start text-3xl font-extrabold text-light">{t("our services")}</p>
        <div>
          <p className="text-start text-xl font-bold">{t("forming and machining")}</p>
          <div>
            <p className="text-start text-lg">{t("forming")}</p>
            <p className="text-start text-lg">{t("perforation")}</p>
            <p className="text-start text-lg">{t("threading")}</p>
          </div>
        </div>
        <div>
          <p className="text-start text-xl font-bold">{t("mechanical processing")}</p>
          <div>
            <p className="text-start text-lg">{t("mechanical finishing")}</p>
            <p className="text-start text-lg">{t("sanding and polishing")}</p>
            <p className="text-start text-lg">{t("brushed finish")}</p>
          </div>
        </div>
        <div>
          <p className="text-start text-xl font-bold">{t("chemical processing")}</p>
          <div>
            <p className="text-start text-lg">{t("anodizing")}</p>
            <p className="text-start text-lg">{t("matte finish")}</p>
            <p className="text-start text-lg">{t("colored anodizing")}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-5 gap-3">
        <p className="text-start text-3xl font-extrabold text-light">{t("location")}</p>
        <div>
          <p className="text-start text-xl font-bold">{t("head office address")}</p>
          <div>
            <p className="text-start w-64 text-lg">{t("2176 Zahraa Madinat Nasr Behind El-Sallab warehouses Nasr city - apartment no 4")}</p>
          </div>
        </div>
        <div>
          <p className="text-start text-xl font-bold">{t("factory")}</p>
          <div>
            <p className="text-start w-64 text-lg">{t("El-Shorouk industrial city El-Salam Al-Khanka desert road next to the security forces training center")}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-5 gap-3">
        <p className="text-start text-3xl font-extrabold text-light">{t("contact info")}</p>
        <div>
          <p className="text-start text-xl font-bold">{t("phone")}</p>
          <div>
            <Link href="tel:+20224489321">
              <p className="text-start text-lg">+20 2 2448 9321</p>
            </Link>
            <Link href="tel:+20244564066">
              <p className="text-start text-lg">+20 2 4456 4066</p>
            </Link>
            <Link href="tel:+201112220385">
              <p className="text-start text-lg">+20 111 222 0385</p>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-start text-xl font-bold">{t("email")}</p>
          <div>
            <Link href="mailto:info@geti-alu.com">
              <p className="text-start text-lg">info@geti-alu.com</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full min-h-20 p-2 max-sm:text-xs bg-light flex items-center font-bold justify-evenly">
        <p>
          {t("social media icons by")} <Link target="_blank" href="https://icons8.com">Icons8</Link>
        </p>
        <p>
          &#169;2025 {t("all right reserved")}
        </p>
      </div>
    </footer>
  )
}