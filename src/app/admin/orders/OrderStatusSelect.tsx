'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function OrderStatusSelect({ 
  orderId, 
  currentStatus 
}: { 
  orderId: string
  currentStatus: string 
}) {
  const supabase = createClient()
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setIsUpdating(true)

    // Database එකේ Status එක Update කරනවා
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)

    setIsUpdating(false)

    if (error) {
      alert('Error updating status: ' + error.message)
    } else {
      router.refresh() // පේජ් එක රීෆ්‍රෙෂ් කරලා අලුත් Status එක පෙන්නනවා
    }
  }

  return (
    <select
      value={currentStatus || 'Payment Pending'}
      onChange={handleStatusChange}
      disabled={isUpdating}
      className={`px-3 py-1.5 rounded-md text-sm font-semibold border outline-none cursor-pointer transition ${
        currentStatus === 'Payment Pending' || currentStatus === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
        currentStatus === 'Processing' || currentStatus === 'Packed' ? 'bg-blue-50 text-blue-700 border-blue-300' :
        currentStatus === 'Shipped' ? 'bg-indigo-50 text-indigo-700 border-indigo-300' :
        currentStatus === 'Delivered' ? 'bg-green-50 text-green-700 border-green-300' :
        currentStatus === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-300' :
        'bg-gray-50 text-gray-700 border-gray-300'
      }`}
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