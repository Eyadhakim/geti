import Link from '@/components/global/small-units/Link';
import ProductsSection from '@/components/home/ProductsSection';
import ProductsCards from '@/components/products/ProductsCards';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function Procucts() {
  const t = useTranslations("Admin");
  
  return (
    <div className='w-full my-20 flex flex-col items-center gap-20'>
      <h1 className='text-5xl text-main'>
        {t("products management")}
      </h1>
      <div className='flex items-center justify-center flex-wrap gap-5 w-full'>
        <Link href='/admin/dashboard/products/add-product' className='min-w-40 p-4 bg-main text-background transition hover:opacity-70 rounded-lg shadow-lg text-lg font-bold text-center'>{t("add product")}</Link>
        <Link href='/admin/dashboard/products/add-category' className='min-w-40 p-4 bg-main text-background transition hover:opacity-70 rounded-lg shadow-lg text-lg font-bold text-center'>{t("add category")}</Link>
      </div>
      <div className='flex flex-col items-center gap-10 my-20'>
        <h2 className='text-2xl'>
          {t("categories")}
        </h2>
        <ProductsSection
          manage
        />
      </div>
      <div className='flex flex-col items-center gap-10 my-20'>
        <h2 className='text-2xl'>
          {t("products")}
        </h2>
        <ProductsCards
          manage
        />
      </div>
    </div>
  )
}