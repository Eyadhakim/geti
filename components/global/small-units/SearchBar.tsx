"use client"

import { Link } from '@/i18n/routing';
import { Card, Category, Post, Product, Service } from '@prisma/client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const t = useTranslations('SearchBar');
  const [searchModal, setSearchModal] = useState(false);
  const [text, setText] = useState("");
  const [results, setResults] = useState<{text: string, link: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    if (text.trim().length === 0) return;
    const fetchResults = async () => {
      setLoading(true);
      const productsRes = await fetch("/api/products");
      const categoriesRes = await fetch("/api/categories");
      const postsRes = await fetch("/api/posts");
      const servicesRes = await fetch("/api/services");
      const products:Product[] = await productsRes.json();
      const categories:Category[] = await categoriesRes.json();
      const posts:Post[] = await postsRes.json();
      const services:({cards: Card[]} & Service)[] = await servicesRes.json();
      const newResults:{text: string, link: string}[] = [];
      Array.from(products).forEach(product => {
        if (product.lang === locale) {
          if (product.description.toLowerCase().includes(text.toLowerCase())) 
            newResults.push({text: product.description, link: `/products#${product.key}`});
          
          if (product.title.toLowerCase().includes(text.toLowerCase())) 
            newResults.push({text: product.title, link: `/products#${product.key}`});
        }
      });
      Array.from(services).forEach(service => {
        if (service.lang === locale) {
          if (service.description.toLowerCase().includes(text.toLowerCase()))
            newResults.push({text: service.description, link: `/services/${service.key}`});
          
          if (service.title.toLowerCase().includes(text.toLowerCase()))
            newResults.push({text: service.title, link: `/services/${service.key}`});

          service.cards.forEach(card => {
            if (card.title.toLowerCase().includes(text.toLowerCase()))
              newResults.push({text: card.title, link: `/services/${service.key}`});
            
            if (card.description.toLowerCase().includes(text.toLowerCase()))
              newResults.push({text: card.description, link: `/services/${service.key}`});
          });
          setLoading(false)
        }
      });
      Array.from(categories).forEach(category => {
        if (category.lang === locale) {
          if (category.name.toLowerCase().includes(text.toLowerCase()))
            newResults.push({text: category.name, link: `/#${category.key}`});

          if (category.description.toLowerCase().includes(text.toLowerCase()))
            newResults.push({text: category.description, link: `/#${category.key}`});
        }
      });
      Array.from(posts).forEach(post => {
        if (post.lang === locale) {
          if (post.title.toLowerCase().includes(text.toLowerCase()))
            newResults.push({text: post.title, link: `/blog/${post.key}`});

          if (post.content.toLowerCase().includes(text.toLowerCase()))
            newResults.push({text: post.content, link: `/blog/${post.key}`});
        }
      });
      setResults(newResults);
    }
    fetchResults();
  }, [text, locale]);

  const handleCancel = () => {
    setSearchModal(false);
    setText("");
    setResults([]);
  }
  

  return (
    <>
    <div className="flex sm:border border-main h-10 sm:w-40 rounded-full sm:ps-4" onClick={() => setSearchModal(true)}>
      <input 
        type="text"
        placeholder={t('placeholder')}
        className='w-full text-start border-none outline-none bg-transparent placeholder:text-mainGray sm:block hidden'
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        width={40}
        height={40}
      />
    </div>
      { searchModal &&
        <div className='w-screen h-screen absolute z-[1000] left-0 top-0 bg-foreground/30 flex items-center justify-center' onClick={(e) => {
          if (e.target === e.currentTarget) handleCancel();
        }}>
          <div className='w-full max-w-[1000px] h-96 flex flex-col items-center justify-start bg-background relative p-10'>
            <button className='absolute start-2 top-2' onClick={handleCancel}>
              <Image
                src="/icons/cancel.svg"
                alt='cancel'
                width={25}
                height={25}
              />
            </button>
            <search className='w-full h-10'>
              <input className='w-full h-full text-start border border-mainGray outline-none p-3 rounded-md' placeholder={t("placeholder")} type="search" onChange={(e) => setText(e.target.value)} value={text}/>
            </search>
            { loading? <div className="w-full h-full flex items-center justify-center gap-2">
        <div className="loading-animation"></div>
        <div className="loading-animation" style={{ animationDelay: "0.3s" }}></div>
        <div className="loading-animation" style={{ animationDelay: "0.6s" }}></div>
      </div>:
              <div className='overflow-auto w-full flex flex-col items-center justify-start gap-2 mt-5'>
                { results.length !== 0?
                  results.map((result, index) => (
                    <Link
                      href={result.link}
                      onClick={handleCancel}
                      key={index} className='w-full p-6 text-ellipsis text-nowrap overflow-hidden h-20 bg-gray-100 flex items-center justify-center rounded-md'>
                      {result.text}
                    </Link>
                  )):
                  <p>{t("no results")}</p>
                }
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}
