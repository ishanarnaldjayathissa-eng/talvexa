'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Tea & Spices',
    price: '',
    image_url: '',
    moq: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const supabase = createClient()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('products').insert([
      {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        image_url: formData.image_url,
        moq: formData.moq
      }
    ])

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Product added successfully!')
      setTimeout(() => router.push('/admin'), 1500)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-navy">Add New Product</h1>
          <Link href="/admin" className="text-sm text-blue-600 hover:underline">Back to Admin</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input type="text" name="name" required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select name="category" onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black">
                <option value="Tea & Spices">Tea & Spices</option>
                <option value="Coconut Products">Coconut Products</option>
                <option value="Clothing & Textiles">Clothing & Textiles</option>
                <option value="Handicrafts">Handicrafts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (USD) *</label>
              <input type="number" step="0.01" name="price" required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">MOQ (Minimum Order Qty) *</label>
              <input type="text" name="moq" placeholder="e.g. 100 kg" required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL *</label>
              <input type="text" name="image_url" placeholder="https://..." required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" rows={3} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gold text-navy font-bold py-3 rounded-md hover:bg-gold-light transition mt-4">
            {loading ? 'Adding...' : 'Add Product'}
          </button>

          {message && <p className="text-center text-sm font-medium text-red-600 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  )
}