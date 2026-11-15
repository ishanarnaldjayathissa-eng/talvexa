import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function AdminEnquiriesPage() {
  const supabase = await createClient()

  // 1. Admin ද කියලා චෙක් කරන්න (Security)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return notFound()
  }

  // 2. Quotes ටික Database එකෙන් ගන්නවා
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  // 3. Quote එකක Status එක වෙනස් කරන Function එක (Server Action)
  async function updateQuoteStatus(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const newStatus = formData.get('status') as string

    const supabaseServer = await createClient()
    await supabaseServer.from('quotes').update({ status: newStatus }).eq('id', id)
    
    // පේජ් එක අලුත් කරන්න
    revalidatePath('/admin/enquiries')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-navy">Manage Enquiries (Quotes)</h1>
            <p className="text-gray-500 mt-1">View and respond to bulk order requests from international buyers.</p>
          </div>
          <Link href="/admin" className="bg-gray-200 text-navy px-4 py-2 rounded-md hover:bg-gray-300 transition font-medium">
            ← Back to Dashboard
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4 bg-red-50 p-4 rounded-md">Error: {error.message}</p>}

        {!quotes || quotes.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-lg">No enquiries found yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A192F] text-white">
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Buyer / Company</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Product & Qty</th>
                    <th className="p-4 font-semibold">Message</th>
                    <th className="p-4 font-semibold">Status & Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-[#0A192F]">{quote.buyer_name}</div>
                        <div className="text-sm text-gray-500">{quote.company_name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{quote.country}</div>
                      </td>
                      <td className="p-4 text-sm">
                        <div className="text-gray-700">{quote.email}</div>
                        {quote.whatsapp && (
                          <div className="text-green-600 font-medium mt-1">
                            <a href={`https://wa.me/${quote.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                              WhatsApp: {quote.whatsapp}
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-800">{quote.product_name || 'N/A'}</div>
                        <div className="text-sm text-gray-600">Qty: {quote.required_quantity || 'N/A'}</div>
                        <div className="text-sm text-gray-600">Pack: {quote.packaging_requirements || 'Standard'}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={quote.additional_message}>
                        {quote.additional_message || '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-center ${
                            quote.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                            quote.status === 'Replied' ? 'bg-blue-100 text-blue-700' : 
                            'bg-green-100 text-green-700'
                          }`}>
                            {quote.status || 'Pending'}
                          </span>
                          
                          {/* Status එක වෙනස් කරන Form එක */}
                          <form action={updateQuoteStatus} className="flex gap-1">
                            <input type="hidden" name="id" value={quote.id} />
                            <select 
                              name="status" 
                              defaultValue={quote.status || 'Pending'}
                              className="text-xs border rounded p-1 bg-white text-black"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Replied">Replied</option>
                              <option value="Closed">Closed</option>
                            </select>
                            <button type="submit" className="bg-[#D4AF37] text-[#0A192F] text-xs font-bold px-2 py-1 rounded hover:bg-yellow-500 transition">
                              Save
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}