"use client"

import { MultiLangString } from "@/interfaces/MultiLangString";
import { Category } from "@prisma/client";
import { useTranslations } from "next-intl"
import Image from "next/image";
import {  useEffect, useState } from "react";

export default function CategoryForm({ categoryKey }: { categoryKey?: string }) {
  const t = useTranslations("Admin");
  const [ image, setImage ] = useState<File | null>(null);
  const [ imageSrc, setImageSrc ] = useState<string | null>(null);
  const [ uploadedImage, setUploadedImage ] = useState<string | null>(null);
  const [ name, setName ] = useState<MultiLangString>({ar: "", en: ""});
  const [ description, setDescription ] = useState<MultiLangString>({ar: "", en: ""});
  const [ loading, setLoading ] = useState<boolean>(false);
  const canSubmit = name.ar.trim().length !== 0 && name.en.trim().length !== 0 && description.ar.trim().length !== 0 && description.en.trim().length !== 0 && (image || uploadedImage);
  const submitValue = categoryKey? (loading? `${t("updating")}...`: `${t("update")}`): (loading? `${t("submitting")}...`: t("submit"))

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryKey) return;
      try {
        const res = await fetch(`/api/categories/${categoryKey}`);

        if (res.ok) {
          const categories: Category[] = await res.json();
          const arCategory = categories.find(category => category.lang === "ar");
          const enCategory = categories.find(category => category.lang === "en");
          if (!arCategory || !enCategory) return;
          setUploadedImage(arCategory.image);
          setName({ar: arCategory.name, en: enCategory.name});
          setDescription({ar: arCategory.description, en: enCategory.description});
        }
      } catch {
        return
      }
    }
    fetchCategory();
  }, [categoryKey])

  useEffect(() => {
    if (!image) return;
    const src = URL.createObjectURL(image);
    setImageSrc(src);
  }, [image])
  

  
  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.ar.trim().length === 0 || description.ar.trim().length === 0 || name.en.trim().length === 0 || description.en.trim().length === 0 || !image) return;

    try {
      setLoading(true);
      const data = new FormData();
      data.set("image", image);
      data.set("name", JSON.stringify(name));
      data.set("description", JSON.stringify(description));

      const res = await fetch("/api/categories", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        alert(t("successfully updated the data"));
        setImage(null);
        setImageSrc(null);
        setUploadedImage(null);
        setName({ar: "", en: ""});
        setDescription({ar: "", en: ""});
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
    if (name.ar.trim().length === 0 || description.ar.trim().length === 0 || name.en.trim().length === 0 || description.en.trim().length === 0 || (!image && !uploadedImage))
      return;

    try {
      setLoading(true)
      const data = new FormData();
      if (image) data.set("image", image);
      data.set("name", JSON.stringify(name));
      data.set("description", JSON.stringify(description));
  
      const res = await fetch(`/api/categories/${categoryKey}`, {
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
    <form className="flex flex-col items-center justify-center my-20 px-5 w-full max-w-96 gap-5" onSubmit={categoryKey? handleEditSubmit: handleAddSubmit}>
      <input 
        className="bg-gray-100 w-full p-4 text-start outline-none rounded-md" 
        type="text" 
        placeholder={`${t("category name")} (${t("english")})`}
        onChange={e => setName({ ar: name.ar, en: e.target.value })}
        value={name.en}
      />
      <input 
        className="bg-gray-100 w-full p-4 text-start outline-none rounded-md" 
        type="text" 
        placeholder={`${t("category name")} (${t("arabic")})`}
        onChange={e => setName({ ar: e.target.value, en: name.en })}
        value={name.ar}
      />
      <textarea 
        className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md" 
        placeholder={`${t("category description")} (${t("english")})`}  
        onChange={e => setDescription({ ar: description.ar, en: e.target.value })}
        value={description.en}
      />
      <textarea 
        className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md" 
        placeholder={`${t("category description")} (${t("arabic")})`}  
        onChange={e => setDescription({ ar: e.target.value, en: description.en })}
        value={description.ar}
      />
      <div className="w-full h-32 border-2 relative rounded-md border-dashed">
        <label className="absolute left-0 top-0 w-full h-full flex items-center justify-center cursor-pointer" htmlFor="file-upload">{t("category image")}</label>
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
            <div className="flex items-center text-center w-full h-20 gap-4 bg-gray-100 p-2 rounded-md relative">
              <div className="relative w-1/2 h-full rounded-md overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageSrc || "Category Image"}
                  fill
                  objectFit="cover"
                  onLoad={() => URL.revokeObjectURL(imageSrc)}
                />
              </div>
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
            </div>
        }
          {uploadedImage &&
            <div className="flex items-center text-center w-full h-20 gap-4 bg-gray-100 p-2 rounded-md relative">
              <div className="relative w-1/2 h-full rounded-md overflow-hidden">
                <Image
                  src={uploadedImage}
                  alt={"Category Image"}
                  fill
                  objectFit="cover"
                />
              </div>
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
