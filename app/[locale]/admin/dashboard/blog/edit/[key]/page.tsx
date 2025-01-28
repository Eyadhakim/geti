import PostForm from "@/components/dashboard/PostForm"

export default async function Edit({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;

  return (
    <PostForm
      postKey={key}
    />
  )
}
