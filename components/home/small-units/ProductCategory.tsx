"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Category } from "@prisma/client";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useState } from "react";

export default function Product({ category, manage }: { category: Category, manage?: boolean }) {
  const t = useTranslations("Admin");
  const tHome = useTranslations("Home");
  const [ deletionModal, setDeletionModal ] = useState<boolean>(false);

  const handleSubmitClick = async () => {
    const res = await fetch(`/api/categories/${category.key}`, {
      method: "DELETE"
    });
    if (res.ok) {
      setDeletionModal(false);
      location.reload();
    } else {
      alert(t("server error"))
    }
  }

  if (category.image && category.name && category.description) {
    return (
      <div className="w-80 h-[500px] shadow flex flex-col items-center text-center gap-5 px-2">
        <div className="relative w-full h-80">
          <Image
            src={category.image}
            alt="product image"
            fill
            objectFit="cover"
          />
        </div>
        <h2 className="text-xl text-main font-bold">{category.name}</h2>
        <p className="w-full h-28 text-sm">{category.description}</p>
        {manage? 
          <div className="flex items-center justify-between h-28">
            <button className="border-2 border-foreground px-5 py-2 m-5 rounded">
              <Link className="flex gap-2 items-center" href={`/admin/dashboard/products/edit-category/${category.key}`}>
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
          <Link href={`/products?category=${category.key}`}>
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

}
