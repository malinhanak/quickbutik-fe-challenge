'use client'

import { SDK } from '@/utils/sdk'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Grid, List } from 'lucide-react'
import Product from '@/components/Product/Product'
import { useState, useEffect, useRef } from 'react'
import { type Product as ProductType } from '@/utils/types'

export function ProductGridWithInifinitScroll() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery<ProductType[], Error>({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) =>
      SDK.getAllProducts({
        limit: 100,
        offset: pageParam as unknown as number,
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length * 10 : undefined
    },
    initialPageParam: 0,
  })

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    if (loadMoreRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = loadMoreRef.current
      if (
        scrollHeight - scrollTop === clientHeight &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }
  }

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current
    if (loadMoreElement) {
      loadMoreElement.addEventListener('scroll', handleScroll)
      return () => {
        loadMoreElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [hasNextPage, isFetchingNextPage])

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
        ref={loadMoreRef}
        aria-live="polite"
      >
        {data?.pages.map((page) =>
          page.map((product: ProductType) => (
            <Product key={product.id} product={product} view={view} />
          )),
        )}

        {isFetchingNextPage && <div>Loading more...</div>}
        {!hasNextPage && <div>No more products to load</div>}
      </div>
    </div>
  )
}
