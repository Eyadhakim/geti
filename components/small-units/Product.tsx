import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Product({image, title, description}: 
  {
    image: string,
    title: string,
    description: string
  }
) {
  const t = useTranslations("Products section");

  return (
    <div className="w-80 h-[500px] shadow flex flex-col items-center text-center gap-5">
      <div className="relative w-full h-80">
        <Image
          src={image}
          alt="product image"
          fill
          objectFit="cover"
        />
      </div>
      <h2 className="text-xl text-main">{title}</h2>
      <p className="w-full h-28">{description}</p>
      <button className="border-2 border-main px-5 py-2 m-5 rounded text-dark">{t("read more")}</button>
    </div>
  )
}
