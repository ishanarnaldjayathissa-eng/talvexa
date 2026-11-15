'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order? This cannot be undone.")
    if (!confirmDelete) return

    setLoading(true)
    const { error } = await supabase.from('orders').delete().eq('id', orderId)
    setLoading(false)

    if (error) {
      alert('Error deleting order: ' + error.message)
    } else {
      router.refresh()
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="text-red-600 hover:text-red-800 font-bold text-xs bg-red-50 px-3 py-1.5 rounded transition ml-2"
    >
      {loading ? '...' : 'Delete'}
    </button>
  )
}