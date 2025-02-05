"use client"

import { useLocale } from "next-intl";
import ProductCategory from "./small-units/ProductCategory";
import { useEffect } from "react";
// import { Category } from "@prisma/client";

const ProductsSection = ({ manage }: { manage?: boolean }) => {
  // const [categories, setCategories] = useState<Category[]>([]);
  // const t = useTranslations("Admin");

  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        // const data = await res.json();
        // setCategories(data)
      }
    }
    fetchData()
  }, [locale])
  return (
    <div className="flex items-center justify-center gap-8 flex-wrap max-w-[1500px]">
          <ProductCategory 
            category={{
              id: 1,
              key: "Category",
              name: "Category",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis earum deleniti laborum, officiis ullam expedita in molestias nulla ad dignissimos rem numquam maiores ducimus vitae sequi asperiores, esse illo doloremque?",
              image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
              lang: "ar"
            }}
            manage={manage}
          />
          <ProductCategory 
            category={{
              id: 1,
              key: "Category",
              name: "Category",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis earum deleniti laborum, officiis ullam expedita in molestias nulla ad dignissimos rem numquam maiores ducimus vitae sequi asperiores, esse illo doloremque?",
              image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
              lang: "ar"
            }}
            manage={manage}
          />
          <ProductCategory 
            category={{
              id: 1,
              key: "Category",
              name: "Category",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis earum deleniti laborum, officiis ullam expedita in molestias nulla ad dignissimos rem numquam maiores ducimus vitae sequi asperiores, esse illo doloremque?",
              image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
              lang: "ar"
            }}
            manage={manage}
          />
          <ProductCategory 
            category={{
              id: 1,
              key: "Category",
              name: "Category",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis earum deleniti laborum, officiis ullam expedita in molestias nulla ad dignissimos rem numquam maiores ducimus vitae sequi asperiores, esse illo doloremque?",
              image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
              lang: "ar"
            }}
            manage={manage}
          />
    </div>
  )
}

export default ProductsSection;