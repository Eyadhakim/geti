"use client";
import { Link } from '@/i18n/routing';
// import { Category } from '@prisma/client';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

export default function Categories() {
  // const [ categories, setCategories ] = useState<Category[]>([]);
  // const categoryQuery = useSearchParams().get("category");

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const res = await fetch("/api/categories");
  //     const data = await res.json()
  //     // if (res.ok) setCategories(Array.from(data));
  //   }
  //   fetchCategories()
  // }, [])
  

  return (
    <div>
      <ul className="flex gap-2 items-center justify-center flex-wrap my-10">
          <li key={1}>
            <Link href={`/products`} className={` block p-3 rounded-full shadow-mainGray shadow`}>
              Category
            </Link>
          </li>
          <li key={2}>
            <Link href={`/products`} className={` block p-3 rounded-full shadow-mainGray shadow`}>
              Category
            </Link>
          </li>
          <li key={3}>
            <Link href={`/products`} className={` block p-3 rounded-full shadow-mainGray shadow`}>
              Category
            </Link>
          </li>
          <li key={4}>
            <Link href={`/products`} className={` block p-3 rounded-full shadow-mainGray shadow`}>
              Category
            </Link>
          </li>
      </ul>
    </div>
  );
}