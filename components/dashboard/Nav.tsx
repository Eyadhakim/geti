import { useTranslations } from "next-intl";
import Link from "../global/small-units/Link";

export default function Nav() {
  const t = useTranslations("Navigation");
  const links = [
    "services",
    "products",
    "clients",
    "blog",
    "certifications",
    "gallery"
  ];

  return (
    <div className="w-full max-sm:text-xs text-nowrap overflow-auto bg-mainGray flex items-center justify-center">
      <nav className='w-fit px-2 h-20 flex items-center justify-center font-semibold'>
        <ul className="w-full h-full flex items-center justify-center gap-5">
          <li>
            <Link href="/admin/dashboard">{t("dashboard")}</Link>
          </li>
          {links.map(link => (
            <li key={link}>
              <Link href={`/admin/dashboard/${link}`}>{t(link)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
