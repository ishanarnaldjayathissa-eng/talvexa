import Link from 'next/link'

export default function ProductCard({ title, price, image }: { title: string, price: number, image: string }) {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group">
      <div className="h-56 bg-gray-100 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-navy mb-2 truncate">{title}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-extrabold text-gold-dark">${price.toFixed(2)}</span>
          <Link href="/cart" className="border border-navy text-navy px-4 py-2 rounded-sm text-sm font-bold hover:bg-navy hover:text-gold transition">
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}