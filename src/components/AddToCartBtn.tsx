'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddToCartBtn({ product }: { product: any }) {
  const [qty, setQty] = useState(1) // මුලින්ම තියෙන්නේ 1
  const router = useRouter()

  const addToCart = () => {
    const savedCart = localStorage.getItem('talvexa_cart')
    let cart = savedCart ? JSON.parse(savedCart) : []

    const existingItem = cart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      existingItem.qty += Number(qty)
    } else {
      cart.push({ id: product.id, title: product.name, price: Number(product.price), qty: Number(qty) })
    }

    localStorage.setItem('talvexa_cart', JSON.stringify(cart))
    
    alert(`${qty} item(s) added to cart!`)
    router.push('/cart')
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* ගාණ තෝරන කොටුව */}
      <div className="flex items-center gap-4">
        <label className="font-bold text-navy">Quantity:</label>
        <input 
          type="number" 
          min="1" 
          value={qty} 
          onChange={(e) => setQty(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 w-24 text-center text-black font-bold focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      <button 
        onClick={addToCart} 
        className="w-full bg-navy text-gold font-bold py-4 rounded-lg hover:bg-navy-light transition text-lg shadow-md"
      >
        Add to Cart
      </button>
    </div>
  )
}