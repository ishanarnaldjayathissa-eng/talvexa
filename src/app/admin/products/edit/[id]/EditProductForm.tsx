'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function EditProductForm({ product }: { product: any }) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // දැනට තියෙන දත්ත ටික Form එකට දාගන්නවා
  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    price: product.price || 0,
    image_url: product.image_url || '',
    category: product.category || '',
    origin: product.origin || 'Sri Lanka',
    moq: product.moq || '',
    available_quantities: product.available_quantities || '',
    packaging_options: product.packaging_options || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Database එකේ අදාළ Product එක Update කරනවා
    const { error } = await supabase
      .from('products')
      .update({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price.toString()), // මිල අංකයක් විදියට යවනවා
        image_url: formData.image_url,
        category: formData.category,
        origin: formData.origin,
        moq: formData.moq,
        available_quantities: formData.available_quantities,
        packaging_options: formData.packaging_options
      })
      .eq('id', product.id)

    if (error) {
      alert('Error updating product: ' + error.message)
      setLoading(false)
    } else {
      alert('Product updated successfully!')
      router.push('/admin') // ඉවර වුනාම Admin Dashboard එකට යනවා
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-navy mb-2">Product Name *</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-2">Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-2">Price ($) *</label>
          <input type="number" step="0.01" name="price" required value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-2">Image URL</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-2">Origin</label>
          <input type="text" name="origin" value={formData.origin} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-2">MOQ (Minimum Order)</label>
          <input type="text" name="moq" value={formData.moq} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-2">Available Quantities</label>
          <input type="text" name="available_quantities" value={formData.available_quantities} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-2">Packaging Options</label>
          <input type="text" name="packaging_options" value={formData.packaging_options} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-navy mb-2">Description</label>
        <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"></textarea>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <button disabled={loading} type="submit" className="bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-gold-light transition">
          {loading ? 'Updating...' : 'Update Product'}
        </button>
        <button type="button" onClick={() => router.push('/admin')} className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-300 transition">
          Cancel
        </button>
      </div>
    </form>
  )
}