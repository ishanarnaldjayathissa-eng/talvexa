import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import QuoteActions from './QuoteActions' // අලුත් බොත්තම් ටික Import කරගන්නවා

export const dynamic = 'force-dynamic'

export default async function EnquiryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Security Check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // දත්ත ලබා ගැනීම
  const { data: quote, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !quote) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg mb-8">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-extrabold tracking-widest text-gold">TALVEXA</h1>
            <span className="text-gray-300 text-sm border-l border-gray-600 pl-4">Quote Details</span>
          </div>
          <Link href="/admin/enquiries" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition border border-white/20">
            ← Back to Quotes
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-navy">Bulk Quote Request</h2>
            <p className="text-gray-500 text-sm mt-1">Received on: {new Date(quote.created_at).toLocaleString()}</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Buyer Info */}
            <div>
              <h3 className="text-lg font-bold text-gold-dark border-b pb-2 mb-4">Buyer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-navy">{quote.buyer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-semibold text-navy">{quote.company_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-navy">{quote.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="font-semibold text-navy">{quote.whatsapp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Destination Country</p>
                  <p className="font-semibold text-navy">{quote.country}</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-bold text-gold-dark border-b pb-2 mb-4">Product & Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Product Name</p>
                  <p className="font-semibold text-navy text-lg">{quote.product_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Required Quantity</p>
                  <p className="font-semibold text-navy text-lg bg-gold/10 inline-block px-3 py-1 rounded">{quote.required_quantity || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Packaging Requirements</p>
                  <p className="font-semibold text-navy">{quote.packaging_requirements || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Message (මේක එක පාරයි තියෙන්නේ) */}
            <div>
              <h3 className="text-lg font-bold text-gold-dark border-b pb-2 mb-4">Additional Message</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {quote.additional_message || 'No additional message provided.'}
                </p>
              </div>
            </div>

            {/* Action Buttons (Confirm / Delete) */}
            <QuoteActions quoteId={quote.id} currentStatus={quote.status} />

          </div>
        </div>
      </div>
    </div>
  )
}