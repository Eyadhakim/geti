import Title from "@/components/global/Title";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function About() {
  const t = useTranslations("About");

  return (
    <div className="w-full flex flex-col items-center justify-center gap-20">
      <Title
        title={t("about")}
        pathes={["/about"]}
        pathesTitles={[t("about")]}
      />
      <div className="flex flex-col items-center justify-center px-10 w-full">
        <div className="flex flex-row-reverse items-start justify-center gap-10 w-full max-w-[1400px] min-h-96 h-fit flex-wrap rounded-md overflow-hidden my-20 hover:shadow-lg transition-all">
          <div className="min-w-96 grow h-96 relative">
            <Image
              src="/about/1.jpg"
              alt="about image"
              fill
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col items-start justify-center max-w-[700px] gap-5 m-10">
            <h1 className="text-5xl text-start font-bold">
              {t("who are we")}
            </h1>
            <p className="text-start text-lg">
              {t("geti abbreviation")}
            </p>
            <hr className="w-20 bg-main border-main border" />
            <p className="text-start text-lg">
              {t("our clients consider us")}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-center gap-10 w-full max-w-[1400px] min-h-96 h-fit flex-wrap rounded-md overflow-hidden my-20 bg-dark text-background hover:bg-dark/90 hover:shadow-lg transition-all">
          <div className="min-w-96 grow h-96 relative w-auto">
            <Image
              src="/about/3.jpg"
              alt="about image"
              fill
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col items-start justify-center max-w-[700px] gap-5 m-10">
            <h1 className="text-5xl text-start font-bold">
              {t("overview")}
            </h1>
            <p className="text-start text-lg">
              {t("golden east is llc")}
            </p>
            <hr className="w-20 bg-secondary border-secondary border" />
            <p className="text-start text-lg">
              {t("we offer a range")}
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center justify-center gap-10 w-full max-w-[1400px] min-h-96 h-fit flex-wrap rounded-md overflow-hidden my-20 hover:shadow-lg transition-all">
          <div className="min-w-96 grow min-h-96 relative w-auto">
            <Image
              src="/about/5.jpg"
              alt="about image"
              fill
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col items-start self-start justify-center max-w-[700px] w-3/5 gap-5 m-10">
            <details className="w-full">
              <summary className="border list-none shadow py-2 transition-all px-12 text-lg font-bold rounded-full cursor-pointer select-none relative text-start w-full">
              {t("our mission")}
              </summary>
              <p className="w-full text-start ms-2 mt-5 transition-all">
                {t("mission paragraph")}
              </p>
            </details>
            <details className="w-full">
              <summary className="border list-none shadow py-2 transition-all px-12 text-lg font-bold rounded-full cursor-pointer select-none relative text-start w-full">
                {t("our vision")}
              </summary>
              <p className="w-full text-start ms-2 mt-5 transition-all">
                {t("vision paragraph")}
              </p>
            </details>
            <details className="w-full">
              <summary className="border list-none shadow py-2 transition-all px-12 text-lg font-bold rounded-full cursor-pointer select-none relative text-start w-full">
              {t("our values")}
              </summary>
              <div className="w-full ms-2 mt-5 transition-all flex flex-col items-start justify-center gap-6">
                <article className="w-1/2">
                  <h2 className="text-start text-xl font-bold">{t("quality")}</h2>
                  <p className="text-start">{t("quality paragraph")}</p>
                </article>
                <article className="w-1/2">
                  <h2 className="text-start text-xl font-bold">{t("commitment and honesty")}</h2>
                  <p className="text-start">{t("commitment paragraph")}</p>
                </article>
                <article className="w-1/2">
                  <h2 className="text-start text-xl font-bold">{t("learning")}</h2>
                  <p className="text-start">{t("learning paragraph")}</p>
                </article>
                <article className="w-1/2">
                  <h2 className="text-start text-xl font-bold">{t("development")}</h2>
                  <p className="text-start">{t("development paragraph")}</p>
                </article>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
