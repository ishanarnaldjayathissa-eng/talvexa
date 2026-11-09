'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function QuotePage() {
  const supabase = createClient()  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    country: '',
    product: '',
    quantity: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Supabase Database එකට දත්ත යැවීම
    const { error } = await supabase.from('quotes').insert([
      {
        buyer_name: formData.name,
        company_name: formData.company,
        email: formData.email,
        whatsapp: formData.whatsapp,
        country: formData.country,
        product: formData.product,
        quantity: formData.quantity,
        message: formData.message,
      }
    ])

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Thank you! Your quote request has been submitted successfully.')
      // සාර්ථකව යැව්වට පස්සේ Form එක හිස් කිරීම
      setFormData({ name: '', company: '', email: '', whatsapp: '', country: '', product: '', quantity: '', message: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full bg-white p-8 md:p-12 rounded-lg shadow-lg border-t-4 border-gold">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-navy">Request a Bulk Quote</h1>
            <p className="mt-2 text-gray-600">Fill out the form below and our export team will get back to you within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buyer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Name *</label>
                <input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none text-black" />
              </div>
              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" name="company" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none text-black" />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none text-black" />
              </div>
              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
                <input type="text" name="whatsapp" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none text-black" />
              </div>
              {/* Destination Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country *</label>
                <input type="text" name="country" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none text-black" />
              </div>
              {/* Product */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product of Interest *</label>
                <input type="text" name="product" required onChange={handleChange} placeholder="e.g. Ceylon Black Tea" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none text-black" />
              </div>
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Quantity *</label>
                <input type="text" name="quantity" required onChange={handleChange} placeholder="e.g. 100 kg or 1 Container" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none text-black" />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements (Packaging, etc.)</label>
              <textarea name="message" rows={4} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none text-black"></textarea>
            </div>

            <div>
              <button type="submit" className="w-full bg-navy text-gold font-bold py-3 px-4 rounded-md hover:bg-navy-light transition duration-300">
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}