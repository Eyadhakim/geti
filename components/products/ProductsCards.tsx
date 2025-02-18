"use client"

import { useEffect, useState } from "react"
import ImagesSlider from "./small-units/ImagesSlider"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { Product, ProductImage } from "@prisma/client"
import Image from "next/image"
import DeleteModal from "../dashboard/DeleteModal"
import { useSearchParams } from "next/navigation"

function ProductCard({ product, images, manage }: {
  product: Product,
  images: ProductImage[],
  manage?: boolean
}) {
  const t = useTranslations("Admin");
  const tHome = useTranslations("Home");
  const [ deletionModal, setDeletionModal ] = useState<boolean>(false);
  const handleSubmitClick = async () => {
    const res = await fetch(`/api/products/${product.key}`, {
      method: "DELETE"
    });
    if (res.ok) {
      location.reload();
    }
    else {
      setDeletionModal(false);
      alert(t("server error"))
    }
  }
  return (
    <div className="w-80 h-[500px] flex flex-col items-center justify-center text-center shadow gap-5 px-2" id={product.key}>
      <ImagesSlider
        normalImages={images.map(image => image.url)}
        threeSixtyImage={product.image360}
      />
      <h1 className="text-xl text-main font-bold">{product.title}</h1>
      <p className="w-full h-28 text-sm">{product.description}</p>
      {manage? 
        <div className="flex items-center justify-between h-28">
          <button className="border-2 border-foreground px-5 py-2 m-5 rounded">
            <Link className="flex gap-2 items-center" href={`/admin/dashboard/products/edit-product/${product.key}`}>
              <p>{t("edit")}</p>
              <Image
                src="/icons/edit.svg"
                alt="edit"
                width={30}
                height={30}
              />
            </Link>
          </button>
          <button className="border-2 border-foreground px-5 py-2 m-5 rounded flex gap-2 items-center" onClick={() => setDeletionModal(true)}>
            <p>{t("delete")}</p>
            <Image
              src="/icons/delete.svg"
              alt="delete"
              width={30}
              height={30}
            />
          </button>
        </div>:
        <Link href={`/contact?subject=Inquery About ${product.key}&text=Hello, Please send me more informations about ${product.key}`}>
          <button className="border-2 border-main px-5 py-2 m-5 rounded text-dark">{tHome("read more")}</button>
        </Link>
      }
      {deletionModal && 
        <DeleteModal
          handleSubmitClick={handleSubmitClick}
          handleCancelClick={() => setDeletionModal(false)}
        />
      }
    </div>
  )
}

export default function ProductsCards({ manage }: { manage?: boolean }) {
  // const [ products, setProducts ] = useState<Product[]>([]);
  // const [ images, setImages ] = useState<ProductImage[]>([]);
  // const t = useTranslations("Admin");
  const category = useSearchParams().get("category");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/products${category? `?category=${category}`: ""}`);
      if (res.ok) {
        const data = await res.json();
        // setProducts(data.products);
        // setImages(data.images);
        console.log(data)
      } return
    }
    fetchData()
  }, [category]);
  

  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="w-1/2 min-w-fit flex flex-col items-center">
        <div className="w-full flex flex-wrap items-center justify-center gap-5 max-w-[1300px]">
            <ProductCard 
              product= {
                {id: 1,
                key: "Product",
                title: "Product",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat corporis, ipsum impedit sequi et nesciunt ea, cumque facere ratione modi provident velit saepe. At eaque repellat provident eveniet. Quis, ea?",
                image360: "/images/360.jpg",
                lang: "en",
                categoryId: 1}
              }
              images={[{id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}]}
              manage={manage? true: false}
            />
             <ProductCard 
              product= {
                {id: 1,
                key: "Product",
                title: "Product",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat corporis, ipsum impedit sequi et nesciunt ea, cumque facere ratione modi provident velit saepe. At eaque repellat provident eveniet. Quis, ea?",
                image360: "/images/360.jpg",
                lang: "en",
                categoryId: 1}
              }
              images={[{id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}]}
              manage={manage? true: false}
            />
             <ProductCard 
              product= {
                {id: 1,
                key: "Product",
                title: "Product",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat corporis, ipsum impedit sequi et nesciunt ea, cumque facere ratione modi provident velit saepe. At eaque repellat provident eveniet. Quis, ea?",
                image360: "/images/360.jpg",
                lang: "en",
                categoryId: 1}
              }
              images={[{id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}]}
              manage={manage? true: false}
            />
             <ProductCard 
              product= {
                {id: 1,
                key: "Product",
                title: "Product",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat corporis, ipsum impedit sequi et nesciunt ea, cumque facere ratione modi provident velit saepe. At eaque repellat provident eveniet. Quis, ea?",
                image360: "/images/360.jpg",
                lang: "en",
                categoryId: 1}
              }
              images={[{id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}]}
              manage={manage? true: false}
            />
             <ProductCard 
              product= {
                {id: 1,
                key: "Product",
                title: "Product",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat corporis, ipsum impedit sequi et nesciunt ea, cumque facere ratione modi provident velit saepe. At eaque repellat provident eveniet. Quis, ea?",
                image360: "/images/360.jpg",
                lang: "en",
                categoryId: 1}
              }
              images={[{id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}, {id: 1, url: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg", productId: 1}]}
              manage={manage? true: false}
            />
        </div>
      </div>
    </div>
  )
}