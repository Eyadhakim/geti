import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
 
export default function NotFound() {
  const t = useTranslations("Not Found");
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-5 absolute left-0 top-0 bg-background">
      <h2 className="text-8xl font-extrabold text-main">404</h2>
      <h2 className="text-3xl font-extrabold text-main">{t("this page is not found")}</h2>
      <Link href="/" className="underline">{t("return to the home page")}</Link>
    </div>
  )
}