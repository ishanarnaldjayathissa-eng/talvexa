import Link from 'next/link'
import Image from 'next/image'
import PriceDisplay from './PriceDisplay' // 👈 අලුතෙන් එකතු කළා

// අපිට අලුතෙන් moq එකයි category එකයි එනවා
interface ProductCardProps {
  id: string
  title: string
  price: number
  image: string
  moq?: string
  category?: string
}

export default function ProductCard({ id, title, price, image, moq, category }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
      
      {/* Image */}
      <Link href={`/products/${id}`} className="relative h-56 w-full bg-gray-100 block overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Category */}
        {category && (
          <span className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
            {category}
          </span>
        )}

        {/* Title */}
        <Link href={`/products/${id}`}>
          <h3 className="text-lg font-bold text-navy leading-tight mb-2 hover:text-gold transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Bottom Area (Price & MOQ) */}
        <div className="mt-auto pt-4 flex justify-between items-end border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Est. Price</p>
            {/* 👇 මෙතන අපි අලුත් PriceDisplay එක දැම්මා 👇 */}
            <PriceDisplay price={price} className="text-xl font-extrabold text-navy" />
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-0.5">MOQ</p>
            <p className="text-sm font-semibold text-gray-700">{moq || "Contact Us"}</p>
          </div>
        </div>
      </div>

    </div>
  )
}