import CategoryForm from '@/components/dashboard/CategoryForm'
import React from 'react'

export default async function EditCategory({ params }: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;

  return (
    <CategoryForm
      categoryKey={category}
    />
  )
}
