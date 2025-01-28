import Posts from "@/components/blog/Posts";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Blog() {
  const t = useTranslations("Admin");

  return (
    <div className="w-full flex flex-col gap-20 py-20">
      <h1 className="text-5xl text-main">
        {t("blog management")}
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-5 w-full">
        <Link
          href="/admin/dashboard/blog/add"
          className="min-w-40 p-4 bg-main text-background transition hover:opacity-70 rounded-lg shadow-lg text-xl font-bold text-center"
        >
          {t("add article")}
        </Link>
      </div>
      <Posts manage />
    </div>
  );
}

//contact & about
//search bar
//social media: linkedin, instagram, facebook, x
