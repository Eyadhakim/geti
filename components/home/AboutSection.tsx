import { useTranslations } from "next-intl"

function AboutSection() {
  const t = useTranslations("Home");

  return (
    <section className='text-lg text-center px-2 my-40'>
      <h1 className='text-5xl text-center text-main my-12 font-bold'>{t("about the company")}</h1>
      <p>{t("geti, short for golden east for trade & industry LLC")}</p>
      <p>{t("our clients consider us to be the leaders of the premium aluminum finishing industry in Egypt")}</p>
      <p>{t("this is due to geti's superior standards for quality and reliability")}</p>
      <p>{t("golden east is a limited liability company based in Cairo, Egypt")}</p>
      <p>{t("we offer a range of high-quality aluminum manufacturing and finishing solutions for house appliances, shower enclosures, LED lighting and much more")}</p>
      <p>{t("our products are all over the market and we're proud to be the leaders of the anodizing industry in Egypt")}</p>
    </section>
  )
}

export default AboutSection