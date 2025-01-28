import Title from "@/components/global/Title";
import { useTranslations } from "next-intl";

export default function Content({ title, content, articleKey, image }: { title: string, content: string, articleKey: string, image: string }) {
  const t = useTranslations("Navigation");
  
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <Title
        title={title}
        pathes={["/blog",`/blog/${articleKey}`]}
        pathesTitles={[t("blog"), title]}
        image={image}
      />
      <p className="text-xl w-full max-w-[1300px] my-20">
        {content}
      </p>
    </div>
  );
}
