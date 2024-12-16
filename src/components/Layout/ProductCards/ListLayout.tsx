import React from 'react'
import Image from 'next/image'
import { type Product } from '@/utils/types'
import Rating from '@/components/Product/Rating'

interface ProductListLayoutProps {
  product: Product
}

const ProductListLayout: React.FC<ProductListLayoutProps> = ({ product }) => {
  return (
    <div className="flex items-center p-4 rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      <div className="relative w-24 h-24 mr-4">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.shortDescription}
        </p>
      </div>
      <div className="flex flex-col items-end ml-4">
        <span className="text-xl font-bold text-gray-800">
          ${product.price}
        </span>
        <span className="text-sm text-gray-500">{product.stock} in stock</span>
        <Rating product={product} />
      </div>
    </div>
  )
}

export default ProductListLayout
