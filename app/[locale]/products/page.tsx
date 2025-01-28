import Categories from "@/components/products/Categories"
import Title from "@/components/global/Title"
import ProductsCards from "@/components/products/ProductsCards";
import { useTranslations } from "next-intl"

function Products() {
  const t = useTranslations("Navigation");

  return (
    <section>
      <Title 
        title={t("products")}
        pathes={["products"]}
        pathesTitles={[t("products")]}
      />
      <Categories/>
      <ProductsCards/>
    </section>
  )
}

export default Products