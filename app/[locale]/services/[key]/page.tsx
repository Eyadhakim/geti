import ServicePage from "@/components/services/ServicePage";

export default async function Service({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  
  return (
    <section className="w-full flex flex-col items-center justify-center gap-10">
      <ServicePage
        serviceKey={key}
      />
    </section>
  )
}