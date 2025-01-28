import Image from "next/image";
import Link from "next/link";
import { useLocale } from 'next-intl';
import SearchBar from "./small-units/SearchBar";
import LanguageSwitcher from "./small-units/LanguageSwitcher";
import Navigation from "./small-units/Navigation";

export default function Header() {
  const locale = useLocale();
  
  return (
    <header className="shadow flex h-20 items-center justify-between lg:justify-evenly fixed top-0 w-full bg-background z-50">
      <div className="flex items-center h-full">
        <Link href="/" className="block relative h-1/2 w-44">
          <Image
            src={locale === "ar"? "/logo/arabic_logo_black.png": "/logo/latin_logo_black.png"}
            alt="Logo"
            fill
            objectFit="cover"
          />
        </Link>
        <SearchBar/>
        <LanguageSwitcher/>
      </div>
      <Navigation/>
    </header>
  )
}
