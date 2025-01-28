import AboutSection from '@/components/home/AboutSection';
import ClientsSection from '@/components/home/ClientsSection';
import Hero from '@/components/home/Hero';
import ProductsSection from '@/components/home/ProductsSection';
import ServicesSection from '@/components/home/ServicesSection';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <div>
      <Hero/>
      <AboutSection/>
      <ServicesSection/>
      <div className='my-40 flex items-center justify-center flex-col'>
        <h1 className='text-5xl text-center text-main my-20 font-bold w-full'>
          {t("products & applications")}
        </h1>
        <ProductsSection/>
      </div>
      <ClientsSection/>
    </div>
  );
}