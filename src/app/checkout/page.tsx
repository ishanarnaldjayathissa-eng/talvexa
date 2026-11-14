'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const supabase = createClient()
  const router = useRouter()

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)

   useEffect(() => {
    const savedCart = localStorage.getItem('talvexa_cart')
 
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])
  const handlePlaceOrder = async () => {
    setLoading(true)
    setMessage('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ user_id: user.id, total_amount: total }])
      .select()
      .single()

    if (orderError) {
      setMessage('Error placing order: ' + orderError.message)
      setLoading(false)
      return
    }

    const orderItemsData = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.qty,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData)

    if (itemsError) {
      setMessage('Error saving items: ' + itemsError.message)
    } else {
      localStorage.removeItem('talvexa_cart')
      setMessage('Order Placed Successfully!')
      setTimeout(() => router.push('/dashboard'), 2000)
    }
    setLoading(false)
  }

  // දත්ත ලෝඩ් වෙනකන් මොනවත් පෙන්නන්නේ නෑ
  if (!isLoaded) return null

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-500">Your cart is empty.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full">
        <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gold">
          <h1 className="text-3xl font-bold text-navy mb-6">Checkout</h1>
          
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2 text-sm">
                <span>{item.title} (x{item.qty})</span>
                <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-gold-dark">${total.toFixed(2)}</span>
          </div>

          <button 
            onClick={handlePlaceOrder} 
            disabled={loading}
            className="w-full bg-navy text-gold font-bold py-3 rounded-md hover:bg-navy-light transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Place Order (Cash on Delivery)'}
          </button>

          {message && <p className="text-center mt-4 font-medium text-green-600">{message}</p>}
        </div>
      </main>
    </div>
  )
}