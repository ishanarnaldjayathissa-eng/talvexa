import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminEnquiriesPage() {
  const supabase = await createClient()
  
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy">Buyer Quote Requests</h2>
        <p className="text-gray-500">View and manage bulk quote requests from international buyers.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Buyer Details</th>
                <th className="p-4 font-bold">Product & Qty</th>
                <th className="p-4 font-bold">Destination</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes && quotes.length > 0 ? (
                quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50 transition align-top">
                    <td className="p-4 text-sm text-gray-500">{new Date(quote.created_at).toLocaleDateString()}</td>
                    
                    <td className="p-4">
                      <p className="font-medium text-navy">{quote.buyer_name}</p>
                      {quote.company_name && <p className="text-xs text-gray-500">{quote.company_name}</p>}
                      <p className="text-sm text-gray-600 mt-1">{quote.email}</p>
                      <p className="text-gray-400 text-xs">{quote.whatsapp}</p>
                    </td>

                    <td className="p-4">
                      <p className="text-sm font-semibold text-gray-700">{quote.product_name || 'N/A'}</p>
                      <p className="text-xs text-navy font-bold mt-1 bg-gold/10 inline-block px-2 py-1 rounded">Qty: {quote.required_quantity || 'N/A'}</p>
                    </td>

                    <td className="p-4 text-sm font-medium">{quote.country}</td>

                    <td className="p-4 text-center">
                      <Link href={`/admin/enquiries/${quote.id}`} className="bg-navy text-gold hover:bg-navy-light px-3 py-1.5 rounded text-xs font-bold transition inline-block">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No quote requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}