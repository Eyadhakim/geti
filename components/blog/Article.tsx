"use client"

import Loading from "@/app/[locale]/loading";
import { Post } from "@prisma/client"
import { notFound } from "next/navigation";
import { useEffect, useState } from "react"
import Content from "./small-units/Content";

export default function Article() {
  const [article, setArticle] = useState<Post|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="w-full">
      <Content
        title={"Post"}
        content={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, placeat. Error nihil soluta nostrum ad animi assumenda veniam dignissimos, neque unde minus modi cupiditate ipsum est doloribus voluptatibus, a sunt Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, placeat. Error nihil soluta nostrum ad animi assumenda veniam dignissimos, neque unde minus modi cupiditate ipsum est doloribus voluptatibus, a sunt Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, placeat. Error nihil soluta nostrum ad animi assumenda veniam dignissimos, neque unde minus modi cupiditate ipsum est doloribus voluptatibus, a sunt."}
        articleKey={"Post"}
        image={"/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg"}
      />
    </div>
  )
}
