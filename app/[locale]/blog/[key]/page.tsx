import Article from "@/components/blog/Article";

export default async function ArticlePage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;

  return (
    <div className="flex flex-col w-full items-center justify-center gap-20">
      <Article
        postKey={key}
      />
    </div>
  )
}
