'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProductCard({ id, title, price, image }: { id: string, title: string, price: number, image: string }) {
  const router = useRouter()

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault() // මේකෙන් Link එකට යන එක නවත්තනවා
    
    const savedCart = localStorage.getItem('talvexa_cart')
    let cart = savedCart ? JSON.parse(savedCart) : []

    const existingItem = cart.find((item: any) => item.id === id)
    
    if (existingItem) {
      existingItem.qty += 1 
    } else {
      cart.push({ id, title, price, qty: 1 })
    }

    localStorage.setItem('talvexa_cart', JSON.stringify(cart))
    
    alert('Item added to cart!')
    router.push('/cart')
  }

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group flex flex-col">
      
      {/* පින්තූරය උඩ Click කරාම Details පිටුවට යනවා */}
      <Link href={`/products/${id}`} className="block h-56 bg-gray-100 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
      </Link>

      <div className="p-5 flex-grow flex flex-col justify-between">
        {/* අකුරු උඩ Click කරාමත් Details පිටුවට යනවා */}
        <Link href={`/products/${id}`}>
          <h3 className="text-lg font-bold text-navy mb-2 truncate hover:text-gold-dark transition">{title}</h3>
        </Link>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-extrabold text-gold-dark">${price.toFixed(2)}</span>
          <button onClick={addToCart} className="border border-navy text-navy px-4 py-2 rounded-sm text-sm font-bold hover:bg-navy hover:text-gold transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}