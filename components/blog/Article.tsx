"use client"

import Loading from "@/app/[locale]/loading";
import { Post } from "@prisma/client"
import { notFound } from "next/navigation";
import { useEffect, useState } from "react"
import Content from "./small-units/Content";

export default function Article({ postKey }: { postKey: string }) {
  const [article, setArticle] = useState<Post|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`/api/posts/${postKey}`);
      if (res.ok) setArticle(await res.json());
      setLoading(false);
    }
    fetchArticle();
  }, [postKey])
  
  if (loading) return <Loading/>
  else if (!article) return notFound();

  return (
    <div className="w-full">
      <Content
        title={article.title}
        content={article.content}
        articleKey={article.key}
        image={article.image}
      />
    </div>
  )
}
