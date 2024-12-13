'use client'

import { SDK } from '@/utils/sdk'
import { useQuery } from '@tanstack/react-query'
import { Grid, List } from 'lucide-react'
import Product from '@/components/Product/Product'
import { useState } from 'react'
import { type Product as ProductType } from '@/utils/types'

export function ProductGrid() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const { data, isLoading, isError, error } = useQuery<ProductType[], Error>({
    queryKey: ['products'],
    queryFn: () => SDK.getAllProducts({ limit: 10, offset: 0 }),
  })

  if (isLoading) return <div>Loading products...</div>
  if (isError) return <div>Error: {error?.message}</div>

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
          className="flex items-center px-4 py-2 border rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900"
        >
          {view === 'grid' ? (
            <List className="w-5 h-5 mr-2" />
          ) : (
            <Grid className="w-5 h-5 mr-2" />
          )}
          {view === 'grid' ? 'List View' : 'Grid View'}
        </button>
      </div>

      <div
        className={`${
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            : 'flex flex-col gap-6'
        }`}
      >
        {data?.map((product) => (
          <Product key={product.id} product={product} view={view} />
        ))}
      </div>
    </div>
  )
}

// This below can be removed
// {products && products.length > 0 && (
//   <div className="prose prose-pre:bg-green-100 dark:prose-pre:bg-green-900 prose-pre:text-green-900 dark:prose-pre:text-green-100 mt-8 border-t pt-4">
//     <h3 className="text-green-900 dark:text-green-100">
//       Data structure <i>(this can be removed)</i>
//     </h3>

//     <pre className="text-xs overflsow-x-auto whitespace-pre-wrap">
//       {JSON.stringify([products[0]], null, 2)}
//     </pre>
//   </div>
// )}
