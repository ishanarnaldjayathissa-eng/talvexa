'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function InvoicePage() {
  const params = useParams()
  const orderId = params.id as string
  
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`*, order_items (quantity, price, products (name))`)
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

  if (loading) return <div className="p-10 text-center font-bold">Loading Invoice...</div>
  if (!order) return <div className="p-10 text-center text-red-500">Order not found!</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
      
      {/* Print Button (Print කරන විට පේන්නේ නෑ) */}
      <div className="mb-6 flex gap-4 print:hidden">
        <button onClick={handlePrint} className="bg-navy text-gold px-6 py-2 rounded-md font-bold shadow-md hover:bg-navy-light transition">
          🖨️ Download / Print Invoice
        </button>
        <Link href="/dashboard" className="bg-gray-300 text-navy px-6 py-2 rounded-md font-bold shadow-md hover:bg-gray-400 transition">
          Back to Dashboard
        </Link>
      </div>

      {/* Invoice Paper */}
      <div className="bg-white p-10 border border-gray-300 w-[800px] shadow-lg text-black">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-navy pb-6 mb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-widest text-navy">TALVEXA</h1>
            <p className="text-sm font-bold mt-1">Global Exports</p>
            <p className="text-xs mt-1">123 Main Street, Colombo, Sri Lanka</p>
            <p className="text-xs">Phone: +94 77 123 4567</p>
            <p className="text-xs">Email: info@talvexa.com</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-300 uppercase">Invoice</h2>
            <p className="text-sm font-bold mt-2">Order ID: {order.id.split('-')[0].toUpperCase()}</p>
            <p className="text-sm">Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p className="text-sm">Status: {order.status}</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Billed To:</h3>
          <p className="text-lg font-bold text-black">{order.customer_name}</p>
          <p className="text-sm">{order.shipping_address}</p>
          <p className="text-sm">{order.country} {order.zip_code}</p>
          <p className="text-sm mt-1">Phone: {order.customer_phone}</p>
          <p className="text-sm">Email: {order.customer_email}</p>
        </div>

        {/* Items Table */}
        <table className="w-full text-left mb-8">
          <thead>
            <tr className="bg-navy text-white text-sm">
              <th className="p-3 font-medium">Item Description</th>
              <th className="p-3 font-medium text-center">Qty</th>
              <th className="p-3 font-medium text-right">Unit Price</th>
              <th className="p-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items?.map((item: any, idx: number) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="p-3 text-sm font-medium">{item.products?.name}</td>
                <td className="p-3 text-sm text-center">{item.quantity}</td>
                <td className="p-3 text-sm text-right">${item.price.toFixed(2)}</td>
                <td className="p-3 text-sm font-bold text-right">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end border-t-2 border-navy pt-4">
          <div className="w-1/2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">Subtotal:</span>
              <span className="font-bold">${order.total_amount}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">Shipping:</span>
              <span className="font-bold">$0.00</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-300 pt-2 mt-2">
              <span className="text-lg font-bold text-navy">Total:</span>
              <span className="text-xl font-extrabold text-gold-dark">${order.total_amount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-200 pt-4">
          <p className="text-sm font-bold text-navy">Thank you for your business!</p>
          <p className="text-xs text-gray-500 mt-1">If you have any questions about this invoice, please contact us.</p>
        </div>

      </div>
    </div>
  )
}