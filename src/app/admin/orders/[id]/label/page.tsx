'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Barcode from 'react-barcode'
import Link from 'next/link'

export default function ShippingLabelPage() {
  const params = useParams()
  const orderId = params.id as string
  
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`*, order_items (quantity, products (name))`)
        .eq('id', orderId)
        .single()

      if (!error && data) {
        setOrder(data)
      }
      setLoading(false)
    }
    fetchOrder()
  }, [orderId, supabase])

  const handlePrint = () => {
    window.print()
  }

  if (loading) return <div className="p-10 text-center font-bold">Loading Label...</div>
  if (!order) return <div className="p-10 text-center text-red-500">Order not found!</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
      
      {/* Print කරන විට මේ බොත්තම් පේන්නේ නෑ */}
      <div className="mb-6 flex gap-4 print:hidden">
        <button onClick={handlePrint} className="bg-navy text-gold px-6 py-2 rounded-md font-bold shadow-md hover:bg-navy-light transition">
          🖨️ Print Label
        </button>
        <Link href="/admin/orders" className="bg-gray-300 text-navy px-6 py-2 rounded-md font-bold shadow-md hover:bg-gray-400 transition">
          Back to Orders
        </Link>
      </div>

      {/* මේක තමයි Print වෙන කොටස */}
      <div className="bg-white p-8 border-4 border-black w-[450px] shadow-lg text-black">
        
        {/* Company Details */}
        <div className="text-center border-b-2 border-black pb-4 mb-4">
          <h1 className="text-4xl font-extrabold tracking-widest text-black">TALVEXA</h1>
          <p className="text-sm font-bold mt-1">Global Exports</p>
          <p className="text-xs mt-1">123 Main Street, Colombo, Sri Lanka</p>
          <p className="text-xs">Phone: +94 77 123 4567</p>
        </div>

        {/* Barcode */}
        <div className="flex flex-col items-center justify-center mb-6">
          <Barcode value={order.id.slice(0, 12)} width={2} height={60} fontSize={16} />
          <p className="text-sm font-bold mt-2">Order ID: {order.id.split('-')[0].toUpperCase()}</p>
        </div>

        {/* Customer Details */}
        <div className="border-t-2 border-black pt-4">
          <h2 className="text-sm font-bold uppercase text-gray-600 mb-1">Deliver To:</h2>
          <h3 className="text-xl font-bold text-black">{order.customer_name || 'Customer Name'}</h3>
          <p className="text-sm font-medium mt-1">{order.shipping_address || 'Address not provided'}</p>
          <p className="text-sm font-bold mt-2">Phone: {order.customer_phone || 'N/A'}</p>
          <p className="text-sm font-medium">Email: {order.customer_email || 'N/A'}</p>
        </div>

        {/* Order Summary */}
        <div className="border-t-2 border-black mt-4 pt-4">
          <h2 className="text-sm font-bold uppercase text-gray-600 mb-2">Items:</h2>
          {order.order_items?.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between text-sm font-bold mb-1">
              <span>{item.products?.name}</span>
              <span>x{item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-black mt-4 pt-2 text-center">
          <p className="text-sm font-extrabold">Cash on Delivery (COD)</p>
        </div>
      </div>
    </div>
  )
}