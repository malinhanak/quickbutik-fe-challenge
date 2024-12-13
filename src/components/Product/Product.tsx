import React from 'react'
import ListLayout from '@/components/Layout/ProductCards/ListLayout'
import GridLayout from '@/components/Layout/ProductCards/GridLayout'
import { type Product } from '@/utils/types'

interface ProductCardProps {
  product: Product
  view: 'grid' | 'list'
}

const ProductCard: React.FC<ProductCardProps> = ({ product, view }) => {
  return view === 'grid' ? (
    <GridLayout product={product} />
  ) : (
    <ListLayout product={product} />
  )
}

export default ProductCard
