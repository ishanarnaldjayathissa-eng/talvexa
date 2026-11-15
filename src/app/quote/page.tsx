'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

// Next.js වල useSearchParams පාවිච්චි කරද්දී Suspense එකක් අවශ්‍ය වෙනවා
function QuoteForm() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const productParam = searchParams.get('product') || ''

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    country: '',
    product: productParam,
    quantity: '',
    packaging: '',
    message: ''
  })

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({ ...prev, product: productParam }))
    }
  }, [productParam])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // 1. Database එකට දත්ත යැවීම (ඔයාගේ Table එකේ නම් වලට හරියටම ගැලපුවා)
    const { error } = await supabase.from('quotes').insert([
      {
        buyer_name: formData.name,
        company_name: formData.company,
        email: formData.email,
        whatsapp: formData.whatsapp,
        country: formData.country,
        product_name: formData.product,
        required_quantity: formData.quantity,
        packaging_requirements: formData.packaging,
        additional_message: formData.message,
        status: 'Pending'
      }
    ])

    if (error) {
      alert('Database Error: ' + error.message)
      setLoading(false)
      return;
    } 

    // 2. ඊමේල් එක යවන්න අලුත් API එකට කතා කරනවා
    try {
      await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
    } catch (err) {
      console.log("Email failed to send", err)
    }

    alert('Thank you! Your bulk quote request has been submitted successfully. Our team will contact you soon.')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white p-8 md:p-12 rounded-xl shadow-xl border-t-8 border-[#D4AF37]">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-[#0A192F] tracking-tight">Request a Bulk Quote</h1>
            <p className="mt-3 text-gray-500 text-lg">Fill out the form below and our export team will get back to you within 24 hours with a customized quotation.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#0A192F] mb-2">Buyer Name *</label>
                <input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0A192F] mb-2">Company Name</label>
                <input type="text" name="company" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0A192F] mb-2">Email Address *</label>
                <input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0A192F] mb-2">WhatsApp Number *</label>
                <input type="text" name="whatsapp" required onChange={handleChange} placeholder="+1 234 567 8900" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0A192F] mb-2">Destination Country *</label>
                <input type="text" name="country" required onChange={handleChange} placeholder="e.g. United States, UK, Germany" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0A192F] mb-2">Product of Interest *</label>
                <input type="text" name="product" required value={formData.product} onChange={handleChange} placeholder="e.g. Ceylon Black Tea" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0A192F] mb-2">Required Quantity *</label>
                <input type="text" name="quantity" required onChange={handleChange} placeholder="e.g. 500 kg, 1x20ft Container" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0A192F] mb-2">Packaging Requirements</label>
                <input type="text" name="packaging" onChange={handleChange} placeholder="e.g. 50kg bags, Custom branded boxes" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0A192F] mb-2">Additional Message / Specifications</label>
              <textarea name="message" rows={4} onChange={handleChange} placeholder="Tell us more about your requirements..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none text-black bg-gray-50 focus:bg-white transition"></textarea>
            </div>

            <div className="pt-4">
              <button disabled={loading} type="submit" className="w-full bg-[#0A192F] text-[#D4AF37] font-bold text-lg py-4 px-4 rounded-lg hover:bg-gray-800 transition duration-300 disabled:opacity-70">
                {loading ? 'Submitting Enquiry...' : 'Submit Enquiry'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

// Next.js සඳහා Main Export එක (Suspense එක ඇතුළේ)
export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xl text-[#0A192F]">Loading Form...</div>}>
      <QuoteForm />
    </Suspense>
  )
}