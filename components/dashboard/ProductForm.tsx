"use client"

import { MultiLangString } from "@/interfaces/MultiLangString";
import { Category, Product, ProductImage } from "@prisma/client";
import { useTranslations } from "next-intl"
import Image from "next/image";
import {  FormEvent, useEffect, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import UploadedImages from "./small-units/UploadedImages";

export default function ProductForm({ productKey }: { productKey?: string }) {
  const t = useTranslations("Admin");

  const [ images, setImages ] = useState<File[]>([]);
  const [ imagesSources, setImageSources ] = useState<string[]>([]);
  const [ uploadedImages, setUploadedImages ] = useState<string[]>([]);

  const [ image360, setImage360 ] = useState<File | null>(null);
  const [ image360Src, setImage360Src ] = useState<string | null>(null);
  const [ uploadedImage360, setUploadedImage360 ] = useState<string | null>(null);

  const [ name, setName ] = useState<MultiLangString>({ar: "", en: ""});
  const [ description, setDescription ] = useState<MultiLangString>({ar: "", en: ""});

  const [ categories, setCategories ] = useState<Category[]>([]);
  const [ selectedCategory, setSelectedCategory ] = useState<Category | null>(null)
  
  const [ loading, setLoading ] = useState<boolean>(false);
  
  const canSubmit = name.ar.trim().length !== 0 && name.en.trim().length !== 0 && description.ar.trim().length !== 0 && description.en.trim().length !== 0 && (imagesSources.length !== 0 || uploadedImages.length !== 0) && selectedCategory !== null;
  const submitValue = productKey? (loading? `${t("updating")}...`: `${t("update")}`): (loading? `${t("submitting")}...`: t("submit"))

  useEffect(() => {
    if (!productKey) return;
    const fetchProducts = async () => {
      const res = await fetch(`/api/products/${productKey}`);
      if (res.ok) {
        const data = await res.json();
        const images:string[] = data.images.map((image:ProductImage) => image.url);
        const products:Product[] = data.products;
        const category:Category = data.category;
        const arProduct = products.find(product => product.lang === "ar");
        const enProduct = products.find(product => product.lang === "en");
        if (!arProduct || !enProduct || !category) return;
        setName({ ar: arProduct.title, en: enProduct.title });
        setDescription({ ar: arProduct.description, en: enProduct.description });
        setUploadedImages(images);
        setUploadedImage360(arProduct.image360);
        setSelectedCategory(category);
      } else {
        alert(t("invalid data"));
      }
    }
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productKey]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (res.ok) setCategories(data);
    }
    fetchCategories();
  }, [])

  useEffect(() => {
    if (images.length === 0) return;
    const sources:string[] = [];
    images.forEach(image => {
      const src = URL.createObjectURL(image);
      sources.push(src);
    });
    setImageSources(sources);
  }, [images]);

  useEffect(() => {
    if (!image360) return;
    const src = URL.createObjectURL(image360);
    setImage360Src(src);
  }, [image360])

  const handleAddSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true)
    const data = new FormData();
    data.set("title", JSON.stringify(name));
    data.set("description", JSON.stringify(description));
    if (image360) data.set("image360", image360);
    data.set("category", JSON.stringify(selectedCategory));
    images.forEach((image) => {
      data.append(`images`, image);
    });
    const res = await fetch("/api/products", {
      method: "POST",
      body: data
    });
    if (res.ok) { 
      setName({ ar: "", en: "" });
      setDescription({ ar: "", en: "" });
      setImages([]);
      setImageSources([]);
      setUploadedImages([]);
      setImage360(null);
      setImage360Src(null);
      setUploadedImage360(null);
      setSelectedCategory(null);
      setLoading(false);
      alert(t("successfully updated the data"));
    }
    else {
      alert(t("invalid data"));
      setLoading(false);
    };
  }

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (image360 && uploadedImage360) return alert(t("invalid data"));
    setLoading(true);

    const data = new FormData();
    images.forEach (image => {
      data.append("images", image);
    });
    uploadedImages.forEach(image => {
      data.append("uploadedImages", image);
    });
    data.set("title", JSON.stringify(name));
    data.set("description", JSON.stringify(description));
    data.set("category", JSON.stringify(selectedCategory));
    if (image360) data.set("image360", image360);
    if (uploadedImage360) data.set("uploadedImage360", uploadedImage360);

    const res = await fetch(`/api/products/${productKey}`, {
      method: "PATCH",
      body: data
    });

    if (res.ok) {
      setName({ ar: "", en: "" });
      setDescription({ ar: "", en: "" });
      setImages([]);
      setImageSources([]);
      setUploadedImages([]);
      setImage360(null);
      setImage360Src(null);
      setUploadedImage360(null);
      setSelectedCategory(null);
      alert(t("successfully updated the data"));
    } else {
      alert(t("invalid data"));
    }
    setLoading(false);
  }

  return (
    <form className="flex flex-col items-center justify-center my-20 px-5 w-full max-w-96 gap-5" onSubmit={productKey? handleEditSubmit: handleAddSubmit}>
      <div className="h-16 w-full flex flex-col gap-4 mb-10">
        <label htmlFor="categorySelect">{`${t("category")}:`}</label>
        <select 
          className="w-full rounded-md h-16 cursor-pointer p-4 bg-gray-100 text-start first:bg-main" id="categorySelect" 
          defaultValue={selectedCategory? selectedCategory.key: "Select"}
        >
          <option value="Select" onClick={() => setSelectedCategory(null)}>{t("select product category")}</option>
          {categories.map(category => (
            <option key={category.id} value={category.key} onClick={() => setSelectedCategory(category)}>{category.name}</option>
          ))}
        </select>
      </div>
      <input 
        className="bg-gray-100 w-full p-4 text-start outline-none rounded-md" 
        type="text" 
        placeholder={`${t("product name")} (${t("english")})`}
        onChange={e => setName({ ar: name.ar, en: e.target.value })}
        value={name.en}
      />
      <input 
        className="bg-gray-100 w-full p-4 text-start outline-none rounded-md" 
        type="text" 
        placeholder={`${t("product name")} (${t("arabic")})`}
        onChange={e => setName({ ar: e.target.value, en: name.en })}
        value={name.ar}
      />
      <textarea 
        className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md" 
        placeholder={`${t("product description")} (${t("english")})`}  
        onChange={e => setDescription({ ar: description.ar, en: e.target.value })}
        value={description.en}
      />
      <textarea 
        className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md" 
        placeholder={`${t("product description")} (${t("arabic")})`}  
        onChange={e => setDescription({ ar: e.target.value, en: description.en })}
        value={description.ar}
      />
      <div className="w-full h-32 border-2 border-dashed relative rounded-md">
        <label className="absolute left-0 top-0 w-full h-full flex items-center justify-center cursor-pointer" htmlFor="file-upload">{t("product images")}</label>
        <input 
          type="file"
          id="file-upload"
          accept="image/*"
          className="hidden"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files!);
            const filesSet = files.filter((file, index, self) =>
              index === self.findIndex((f) => f.name === file.name)
            );
            if (files.length !== filesSet.length) alert("some images are repeated")
            let isRepeated = false;
            images.forEach(image => {
              filesSet.forEach((file, index) => {
                if (image.name === file.name) {
                  isRepeated = true;
                  filesSet.splice(index, 1);
                }
              })
            })
            if (isRepeated) alert(t("some images are already uploaded"))
            setImages([...images, ...filesSet]);
          }}
        />
      </div>
      <UploadedImages
        images={images}
        imagesSources={imagesSources}
        uploadedImages={uploadedImages}
        setImages={setImages}
        setImagesSources={setImageSources}
        setUploadedImages={setUploadedImages}
      />
      <div className="w-full h-32 border-2 border-dashed relative rounded-md">
        <label className="absolute left-0 top-0 w-full h-full flex items-center justify-center cursor-pointer" htmlFor="360Image-upload">{t("product 360 degree image (optional)")}</label>
        <input 
          type="file"
          id="360Image-upload"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImage360(e.target.files![0])}
        />
      </div>
      {image360Src &&
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <h1>{image360?.name}</h1>
          <button
            onClick={() => {
              setImage360(null);
              setImage360Src(null);
              setUploadedImage360(null);
            }}
          >
            <Image
              src="/icons/cancel.svg"
              alt="cancel"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="w-full h-32">
          <ReactPhotoSphereViewer src={image360Src} width="100%" height="100%" />
        </div>
      </div>
      }
      {uploadedImage360 &&
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <h1>{uploadedImage360?.split("/")[uploadedImage360.split("/").length - 1]}</h1>
          <button
            onClick={() => {
              setImage360(null);
              setImage360Src(null);
              setUploadedImage360(null);
            }}
          >
            <Image
              src="/icons/cancel.svg"
              alt="cancel"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="w-full h-32">
          <ReactPhotoSphereViewer src={uploadedImage360} width="100%" height="100%" />
        </div>
      </div>
      }
      <input 
        type="submit" 
        value={submitValue}
        className="w-full bg-main text-background hover:bg-main/80 text-lg p-4 rounded-md cursor-pointer disabled:bg-main/60 disabled:cursor-not-allowed"
        disabled={loading || !canSubmit}
      />
    </form>
  )
}
