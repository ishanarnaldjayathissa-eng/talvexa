import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function CartPage() {
  const cartItems = [
    { id: 1, title: 'Ceylon Black Tea', price: 15.50, qty: 1 }
  ]

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-bold text-navy mb-8">Your Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b border-gray-100 py-4 last:border-0">
              <div>
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gold-dark">${item.price.toFixed(2)}</p>
                <button className="text-red-500 text-sm hover:underline mt-1">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-center">
          <div>
            <span className="text-gray-500">Total Amount:</span>
            <span className="text-2xl font-bold text-navy ml-4">${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout" className="bg-gold text-navy px-8 py-3 rounded-sm font-bold hover:bg-gold-light transition">
            Proceed to Checkout
          </Link>
        </div>
      </main>
    </div>
  )
}