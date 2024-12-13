'use client'

import { ProductGrid } from '@/components/ProductGrid/ProductGrid'
import { ProductGridWithInifinitScroll } from '@/components/ProductGrid/ProductGridWithInifinitScroll'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Challenge1() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductGridWithInifinitScroll />
    </QueryClientProvider>
  )
}
