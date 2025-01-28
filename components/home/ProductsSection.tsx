"use client"

import { useLocale, useTranslations } from "next-intl";
import ProductCategory from "./small-units/ProductCategory";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";

const ProductsSection = ({ manage }: { manage?: boolean }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const t = useTranslations("Admin");

  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data)
      }
    }
    fetchData()
  }, [locale])
  return (
    <div className="flex items-center justify-center gap-8 flex-wrap max-w-[1500px]">
      {categories.length !== 0? 
        categories.map(category => (
          <ProductCategory 
            category={category}
            key={category.id}
            manage={manage}
          />
        )): <p className="text-mainGray text-xl">{t("no categories yet")}</p>
      }
    </div>
  )
}

export default ProductsSection;