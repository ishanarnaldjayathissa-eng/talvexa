'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function UpdateOrderStatus({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setLoading(true)

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)

    if (error) {
      alert('Error updating status: ' + error.message)
    } else {
      router.refresh() // ටේබල් එක අලුත් කරන්න
    }
    setLoading(false)
  }

  return (
    <select 
      value={currentStatus} 
      onChange={handleStatusChange} 
      disabled={loading}
      className="border border-gray-300 rounded p-1 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold"
    >
      <option value="Payment Pending">Payment Pending</option>
      <option value="Processing">Processing</option>
      <option value="Packed">Packed</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  )
}