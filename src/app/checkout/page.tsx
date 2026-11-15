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
  
  // Shipping Details State
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('') // අලුත් Email එක
  const [shippingAddress, setShippingAddress] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [country, setCountry] = useState('Sri Lanka')
  const [zipCode, setZipCode] = useState('')

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
    // සියලුම විස්තර දීලා තියෙනවද බලනවා
    if (!customerName || !customerEmail || !shippingAddress || !customerPhone || !country) {
      setMessage('Please fill all required shipping details.')
      return
    }

    setLoading(true)
    setMessage('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ 
        user_id: user.id, 
        total_amount: total,
        customer_name: customerName,       
        customer_email: customerEmail,     // අලුත්
        shipping_address: shippingAddress, 
        customer_phone: customerPhone,
        country: country,
        zip_code: zipCode
      }])
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
         // බඩු ටිකත් සාර්ථකව save වුනා නම් විතරක් Email එක යවන්න
    if (order && !itemsError) {
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: customerEmail,
            customerName: customerName,
            orderId: order.id,
            totalAmount: total,
          }),
        });
      } catch (err) {
        console.log("Email sending failed:", err);
      }
    } 

    if (itemsError) {
      setMessage('Error saving items: ' + itemsError.message)
    } else {
      localStorage.removeItem('talvexa_cart')
      setMessage('Order Placed Successfully!')
      setTimeout(() => router.push('/dashboard'), 2000)
    }
    setLoading(false)
  }

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
          
          {/* Shipping Details Form */}
          <div className="mb-8 space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-navy mb-2">Shipping Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input type="email" required value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-black" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
              <textarea required value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-black" rows={2}></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number * (with country code)</label>
                <input type="text" required placeholder="+94 77 123 4567" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-black">
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Spain">Spain</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Other">Other Country</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip / Postal Code</label>
              <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-black" />
            </div>
          </div>

          {/* Order Summary */}
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

          {message && <p className="text-center mt-4 font-medium text-red-600">{message}</p>}
        </div>
      </main>
    </div>
  )
}