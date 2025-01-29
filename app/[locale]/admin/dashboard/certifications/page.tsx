import Certifications from '@/components/certificates/Certifications'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function CertificationsPage() {
  const t = useTranslations("Admin");
  return (
    <div className='w-full flex flex-col gap-20 items-center justify-center my-20'>
      <h1 className="text-5xl text-main">
              {t("certifications management")}
            </h1>
            <Link
              href="/admin/dashboard/certifications/add"
              className="min-w-40 w-fit p-4 bg-main text-background transition hover:opacity-70 rounded-lg shadow-lg text-lg font-bold text-center"
            >
              {t("add certification")}
            </Link>
      <Certifications
        manage
      />
    </div>
  )
}