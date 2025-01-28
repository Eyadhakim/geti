import Image from 'next/image';
import Link from './small-units/Link';
import { useLocale, useTranslations } from 'next-intl';

function Arrow({locale}: {locale: string}) {
  return (locale === "ar"?
    <span className='mx-2'>&#8592;</span>:
    <span className='mx-2'>&#8594;</span>
  )
}

export default function Title({ title, pathes, pathesTitles, image }: { title: string, pathes: string[], pathesTitles: string[], image?: string }) {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  
  return (
    <div className={`h-96 w-full relative flex flex-col text-background items-center justify-center gap-4 bg-foreground`}>
      <Image
        src={image? image: "/heading-image.png"}
        alt='heading image'
        fill
        objectFit='cover'
      />
      <div className='w-full h-full absolute left-0 top-0 z-40 bg-foreground/30 flex flex-col items-center justify-center gap-4'>
          <h1 className='text-5xl font-bold'>
            {title}
          </h1>
          <h2 className='text-xl'>
            <Link href="/">{t("home")}</Link>
            {pathes.map((page, index) => (
              <Link className='text-capitalize' href={page} key={page}>
                <Arrow locale={locale}/>
                {pathesTitles[index]}
              </Link>
            ))}
          </h2>
      </div>
    </div>
  )
}