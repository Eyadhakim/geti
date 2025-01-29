"use client";
import { Link } from '@/i18n/routing';
import { Category } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Categories() {
  const [ categories, setCategories ] = useState<Category[]>([]);
  const categoryQuery = useSearchParams().get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json()
      if (res.ok) setCategories(Array.from(data));
    }
    fetchCategories()
  }, [])
  

  return (
    <div>
      <ul className="flex gap-2 items-center justify-center flex-wrap my-10">
        {categories.map(category => (
          <li key={category.id} id={category.key}>
            <Link href={`/products?category=${category.key}`} className={`${categoryQuery === category.key ? 'text-main': 'text-foreground'} block p-3 rounded-full shadow-mainGray shadow`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}