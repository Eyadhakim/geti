import ProductForm from "@/components/dashboard/ProductForm";

export default async function EditProduct({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;

  return (
    <ProductForm
      productKey={key}
    />
  )
}
