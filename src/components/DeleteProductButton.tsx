'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?")
    if (!confirmed) return

    setLoading(true)
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      alert('Error deleting product: ' + error.message)
    } else {
      router.refresh() // Table එක අලුත් කරන්න
    }
    setLoading(false)
  }

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading} 
      className="text-red-500 hover:text-red-700 font-medium text-sm transition"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  )
}