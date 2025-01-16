import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ar"]

export default getRequestConfig(async ({locale}) => {
  if(!locales.includes(locale as "en"|"ar")) notFound();

  return {
    messages: (await import(`/messages/${locale}.json`))
  }
})