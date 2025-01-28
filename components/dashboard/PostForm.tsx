"use client"

import { MultiLangString } from "@/interfaces/MultiLangString";
import { Post } from "@prisma/client";
import { useTranslations } from "next-intl"
import Image from "next/image";
import {  useEffect, useState } from "react";

export default function PostForm({ postKey }: { postKey?: string }) {
  const t = useTranslations("Admin");
  const [ image, setImage ] = useState<File | null>(null);
  const [ imageSrc, setImageSrc ] = useState<string | null>(null);
  const [ uploadedImage, setUploadedImage ] = useState<string | null>(null);
  const [ title, setTitle ] = useState<MultiLangString>({ar: "", en: ""});
  const [ content, setContent ] = useState<MultiLangString>({ar: "", en: ""});
  const [ loading, setLoading ] = useState<boolean>(false);
  const canSubmit = title.ar.trim().length !== 0 && title.en.trim().length !== 0 && content.ar.trim().length !== 0 && content.en.trim().length !== 0 && (image || uploadedImage);
  const submitValue = postKey? (loading? `${t("updating")}...`: `${t("update")}`): (loading? `${t("submitting")}...`: t("submit"))

  useEffect(() => {
    const fetchCategory = async () => {
      if (!postKey) return;
      try {
        const res = await fetch(`/api/posts/${postKey}`);

        if (res.ok) {
          const posts: Post[] = await res.json();
          const arPost = posts.find(post => post.lang === "ar");
          const enPost = posts.find(post => post.lang === "en");
          if (!arPost || !enPost) return;
          setUploadedImage(arPost.image);
          setTitle({ar: arPost.title, en: enPost.title});
          setContent({ar: arPost.content, en: enPost.content});
        }
      } catch {
        return
      }
    }
    fetchCategory();
  }, [postKey])

  useEffect(() => {
    if (!image) return;
    const src = URL.createObjectURL(image);
    setImageSrc(src);
  }, [image])
  

  
  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.ar.trim().length === 0 || content.ar.trim().length === 0 || title.en.trim().length === 0 || content.en.trim().length === 0 || !image) return;

    try {
      setLoading(true);
      const data = new FormData();
      data.set("image", image);
      data.set("title", JSON.stringify(title));
      data.set("content", JSON.stringify(content));

      const res = await fetch("/api/posts", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        alert(t("successfully updated the data"));
        setImage(null);
        setImageSrc(null);
        setUploadedImage(null);
        setTitle({ar: "", en: ""});
        setContent({ar: "", en: ""});
        setLoading(false);
      } else {
        alert (t("invalid data"));
        setLoading(false)
      }
    } catch {
      alert(t("server error"));
      setLoading(false);
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.ar.trim().length === 0 || content.ar.trim().length === 0 || title.en.trim().length === 0 || content.en.trim().length === 0 || (!image && !uploadedImage))
      return;

    try {
      setLoading(true)
      const data = new FormData();
      if (image) data.set("image", image);
      data.set("title", JSON.stringify(title));
      data.set("content", JSON.stringify(content));
  
      const res = await fetch(`/api/posts/${postKey}`, {
        method: "PATCH",
        body: data
      });

      if (res.ok) {
        alert(t("successfully updated the data"));
      } else {
        alert(t("invalid data"));
      }
      setLoading(false);
    } catch {
      setLoading(false);
      alert(t("server error"))
    }
  }

  return (
    <form className="flex flex-col items-center justify-center my-20 px-5 w-full max-w-[1300px] gap-5" onSubmit={postKey? handleEditSubmit: handleAddSubmit}>
      <input 
        className="bg-gray-100 w-full p-4 text-start outline-none rounded-md" 
        type="text" 
        placeholder={`${t("article title")} (${t("english")})`}
        onChange={e => setTitle({ ar: title.ar, en: e.target.value })}
        value={title.en}
      />
      <input 
        className="bg-gray-100 w-full p-4 text-start outline-none rounded-md" 
        type="text" 
        placeholder={`${t("article title")} (${t("arabic")})`}
        onChange={e => setTitle({ ar: e.target.value, en: title.en })}
        value={title.ar}
      />
      <textarea 
        className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md" 
        placeholder={`${t("article content")} (${t("english")})`}  
        onChange={e => setContent({ ar: content.ar, en: e.target.value })}
        value={content.en}
      />
      <textarea 
        className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md" 
        placeholder={`${t("article content")} (${t("arabic")})`}  
        onChange={e => setContent({ ar: e.target.value, en: content.en })}
        value={content.ar}
      />
      <div className="w-full h-32 border-2 relative rounded-md border-dashed">
        <label className="absolute left-0 top-0 w-full h-full flex items-center justify-center cursor-pointer" htmlFor="file-upload">{t("upload article image here")}</label>
        <input 
          type="file"
          id="file-upload"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImage(e.target.files![0])}
        />
      </div>
        
      <div className="flex flex-col items-center justify-center w-full gap-5">
        {imageSrc &&
            <div className="flex flex-col items-center text-center w-full h-96 gap-4 bg-gray-100 p-2 rounded-md relative max-w-96">
                <h1 className="w-1/2 overflow-hidden text-ellipsis text-nowrap">
                  {image? image.name: imageSrc.split("/")[imageSrc.split("/").length - 1]}
                </h1>
                <button 
                  type="button" 
                  onClick={() => {
                    setImage(null);
                    setImageSrc(null);
                  }}
                  className="end-1 top-1 absolute"
                >
                  <Image
                    src="/icons/cancel.svg"
                    alt="cancel"
                    width={20}
                    height={20}
                  />
                </button>
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageSrc || "Category Image"}
                  fill
                  objectFit="cover"
                  onLoad={() => URL.revokeObjectURL(imageSrc)}
                />
              </div>
            </div>
        }
          {uploadedImage &&
            <div className="flex flex-col items-center text-center w-full h-96 gap-4 bg-gray-100 p-2 rounded-md relative max-w-96">
                <h1 className="w-1/2 overflow-hidden text-ellipsis text-nowrap">
                  {uploadedImage.split("/")[uploadedImage.split("/").length - 1]}
                </h1>
                <button 
                  type="button" 
                  onClick={() => {
                    setUploadedImage(null)
                  }}
                  className="end-1 top-1 absolute"
                >
                  <Image
                    src="/icons/cancel.svg"
                    alt="cancel"
                    width={20}
                    height={20}
                  />
                </button>
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src={uploadedImage}
                  alt={"Category Image"}
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
          }
        </div>

      <input 
        type="submit" 
        value={submitValue}
        className="w-full bg-main text-background hover:bg-main/80 text-lg p-4 rounded-md cursor-pointer disabled:bg-main/60 disabled:cursor-not-allowed"
        disabled={loading || !canSubmit}
      />
    </form>
  )
}
