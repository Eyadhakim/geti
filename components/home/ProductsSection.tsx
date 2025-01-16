import { useTranslations } from "next-intl";
import Product from "../small-units/Product";
import fs from 'fs';
import path from 'path';

async function getProducts(locale: string) {

  const productsDirectory = path.join(process.cwd(), 'public', 'products');
  const dirs = fs.readdirSync(productsDirectory);
  const products = dirs.map(dir => {
    return {
      image: `/products/${dir}/img.png`,
      title: locale === 'ar' ? 
        fs.readFileSync(path.join(process.cwd(), "public", "products", dir, "title.arabic.txt")).toString() :
        fs.readFileSync(path.join(process.cwd(), "public", "products", dir, "title.english.txt")).toString(),
      description: locale === 'ar' ? 
        fs.readFileSync(path.join(process.cwd(), "public", "products", dir, "desc.arabic.txt")).toString() :
        fs.readFileSync(path.join(process.cwd(), "public", "products", dir, "desc.english.txt")).toString(),
    }
  });

  return products;
}

const Title = () => {
  const t = useTranslations('Products section')
  return (
    <h1 className='text-5xl text-center text-main my-12 font-bold w-full'>
      {t("products & applications")}
    </h1>
  )
}


const ProductsSection = async ({locale}: {locale: string}) => {
  const products = await getProducts(locale);
  return (

    <section className="flex items-center justify-center gap-8 my-40 flex-wrap">
      <Title/>
      <div className="flex items-center justify-center gap-8 flex-wrap max-w-[1500px]">
        {products.map((product, index) => (
          <Product key={index} title={product.title} image={product.image} description={product.description}/>
        ))}
      </div>
    </section>
  )
}

export default ProductsSection;