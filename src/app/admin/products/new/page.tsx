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
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md border-t-4 border-gold">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-navy">Add New Product</h1>
          <Link href="/admin" className="text-sm text-blue-600 hover:underline">Back to Admin</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input type="text" name="name" required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select name="category" onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black">
                <option value="Tea & Spices">Tea & Spices (තේ සහ කුළුබඩු)</option>
                <option value="Gems & Jewellery">Gems & Jewellery (මැණික් සහ ආභරණ)</option>
                <option value="Coconut Products">Coconut Products (පොල් නිෂ්පාදන)</option>
                <option value="Clothing & Textiles">Clothing & Textiles (ඇඳුම් සහ රෙදිපිළි)</option>
                <option value="Handicrafts & Wooden">Handicrafts & Wooden (අත්කම් සහ ලී භාණ්ඩ)</option>
                <option value="Food & Agriculture">Food & Agriculture (ආහාර සහ කෘෂිකර්ම)</option>
                <option value="Seafood">Seafood (මුහුදු ආහාර)</option>
                <option value="Ceramics & Homeware">Ceramics & Homeware (සෙරමික් සහ ගෘහ භාණ්ඩ)</option>
                <option value="Rubber Products">Rubber Products (රබර් නිෂ්පාදන)</option>
                <option value="Eco-friendly Products">Eco-friendly Products (පරිසර හිතකාමී)</option>
                <option value="Electronics & Electrical">Electronics & Electrical (ඉලෙක්ට්‍රොනික උපකරණ)</option>
                <option value="Plastic & Packaging">Plastic & Packaging (ප්ලාස්ටික් සහ ඇසුරුම්)</option>
                <option value="Other">Other (වෙනත්)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (USD) *</label>
              <input type="number" step="0.01" name="price" required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {/* මෙතන තමයි MOQ උදාහරණය දාලා තියෙන්නේ */}
              <label className="block text-sm font-medium text-gray-700">MOQ (උදා: 50 kg, 500 pieces, 1 container) *</label>
              <input type="text" name="moq" placeholder="e.g. 100 kg / 500 units" required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black" />
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