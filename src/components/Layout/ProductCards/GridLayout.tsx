import React from 'react'
import Image from 'next/image'
import { type Product } from '@/utils/types'

interface ProductGridLayoutProps {
  product: Product
}

const ProductGridLayout: React.FC<ProductGridLayoutProps> = ({ product }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
        </div>
        <div className="mt-2 flex items-center">
          <span className="text-yellow-500">{'★'.repeat(product.rating)}</span>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} / 5
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductGridLayout
