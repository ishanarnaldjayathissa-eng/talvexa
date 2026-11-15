'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function QuoteActions({ quoteId, currentStatus }: { quoteId: string, currentStatus: string }) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // කන්ෆර්ම් කරන ෆන්ක්ෂන් එක
  const handleConfirm = async () => {
    setLoading(true)
    
    const { error } = await supabase
      .from('quotes')
      .update({ status: 'Confirmed' })
      .eq('id', quoteId)
    
    setLoading(false)
    
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Quote marked as Confirmed!')
      router.refresh() // පේජ් එක රීෆ්‍රෙෂ් කරනවා
    }
  }

  // ඩිලීට් කරන ෆන්ක්ෂන් එක
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this quote request? This cannot be undone.")
    if (!isConfirmed) return

    setLoading(true)
    const { error } = await supabase.from('quotes').delete().eq('id', quoteId)
    setLoading(false)
    
    if (error) {
      alert('Error: ' + error.message)
    } else {
      router.push('/admin/enquiries') // ආයේ ලිස්ට් එකට යනවා
      router.refresh()
    }
  }

  return (
    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
      {currentStatus !== 'Confirmed' ? (
        <button 
          onClick={handleConfirm} 
          disabled={loading} 
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-sm disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Mark as Confirmed'}
        </button>
      ) : (
        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold flex items-center">
          ✓ Confirmed
        </span>
      )}
      
      <button 
        onClick={handleDelete} 
        disabled={loading} 
        className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-sm disabled:opacity-50"
      >
        {loading ? 'Deleting...' : 'Delete Quote'}
      </button>
    </div>
  )
}