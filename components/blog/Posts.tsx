"use client";

import Title from "@/components/global/Title";
import { Link } from "@/i18n/routing";
import { Post } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import DeleteModal from "../dashboard/DeleteModal";

export default function Posts({ manage }: { manage?: boolean }) {
  const t = useTranslations("Navigation");
  const tAdmin = useTranslations("Admin");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deletionModal, setDeletionModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      if (res.ok) setPosts(await res.json());
    };
    fetchPosts();
  }, []);

  const handleDeleteSubmit = async () => {
    if (!selectedPost) return;
    const res = await fetch(`/api/posts/${selectedPost.key}`, {
      method: "DELETE"
    });
    if (res.ok) location.reload();
    else alert(tAdmin("server error"));
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-20">
      {!manage &&
        <Title
          title={t("blog")}
          pathes={["/blog"]}
          pathesTitles={[t("blog")]}
        />}
        { manage?
        <div className="w-full max-w-[1300px] flex items-center justify-center flex-wrap my-20 gap-5">
          {posts.length !== 0
            ? Array.from(posts).map(post =>
                <div
                  key={post.id}
                  className="w-full max-w-96 h-96 flex flex-col justify-between border shadow rounded-md overflow-hidden"
                >
                  <div className="w-full h-1/2 relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold h-1/2 flex items-center justify-center">
                    {post.title}
                  </h3>
                    <div className="flex items-center justify-center gap-5 h-28">
                      <button className="border-2 border-foreground px-5 py-2 m-5 rounded">
                        <Link
                          className="flex gap-2 items-center"
                          href={`/admin/dashboard/blog/edit/${post.key}`}
                        >
                          <p>
                            {tAdmin("edit")}
                          </p>
                          <Image
                            src="/icons/edit.svg"
                            alt="edit"
                            width={30}
                            height={30}
                          />
                        </Link>
                      </button>
                      <button
                        className="border-2 border-foreground px-5 py-2 m-5 rounded flex gap-2 items-center"
                        onClick={() => {
                          setDeletionModal(true);
                          setSelectedPost(post);
                        }}
                      >
                        <p>
                          {tAdmin("delete")}
                        </p>
                        <Image
                          src="/icons/delete.svg"
                          alt="delete"
                          width={30}
                          height={30}
                        />
                      </button>
                    </div>
                </div>
              )
            : <p className="text-mainGray text-xl">
                {tAdmin("no posts yet")}
              </p>}
        </div>:
        <div className="w-full max-w-[1300px] flex items-center justify-center flex-wrap my-20 gap-5">
        {posts.length !== 0
          ? Array.from(posts).map(post =>
              <Link
                key={post.id}
                href={`/blog/${post.key}`}
                className="w-full max-w-96 h-96 flex flex-col justify-between border shadow rounded-md overflow-hidden"
              >
                <div className="w-full h-1/2 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-2xl font-bold h-1/2 flex items-center justify-center">
                  {post.title}
                </h3>
              </Link>
            )
          : <p className="text-mainGray text-xl">
              {tAdmin("no posts yet")}
            </p>}
      </div>
        }
      {deletionModal &&
        <DeleteModal
          handleSubmitClick={handleDeleteSubmit}
          handleCancelClick={() => {
            setDeletionModal(false);
            setSelectedPost(null);
          }}
        />}
    </div>
  );
}

//contact & about
//search bar
//social media: linkedin, instagram, facebook, x
