import AboutSection from '@/components/home/AboutSection';
import ClientsSection from '@/components/home/ClientsSection';
import Hero from '@/components/home/Hero';
import ProductsSection from '@/components/home/ProductsSection';
import ServicesSection from '@/components/home/ServicesSection';
import { useLocale } from 'next-intl';

export default function HomePage() {
  const locale = useLocale();

  return (
    <div>
      <Hero/>
      <AboutSection/>
      <ServicesSection/>
      <ProductsSection
        locale ={locale}
      />
      <ClientsSection/>
    </div>
  );
}