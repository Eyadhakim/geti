import ServiceEditForm from "@/components/dashboard/ServiceEditForm";

export default async function Edit({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  
  return (
    <section className='w-full flex flex-col items-center justify-center'>
      <ServiceEditForm
        serviceKey={key}
      />
    </section>
  )
}
