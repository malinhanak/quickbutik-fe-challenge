import React from 'react'
import { type Product } from '@/utils/types'

interface RatingProps {
  product: Product
}

const Rating: React.FC<RatingProps> = ({ product }) => {
  return (
    <div className="mt-2 flex items-center">
      <span className="text-yellow-500">{'★'.repeat(product.rating)}</span>
      <span className="ml-2 text-sm text-gray-600">{product.rating} / 5</span>
    </div>
  )
}

export default Rating
