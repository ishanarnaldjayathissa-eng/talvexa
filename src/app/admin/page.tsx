import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DeleteProductButton from '@/components/DeleteProductButton'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Security Check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (userRole?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-red-500">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">ඔයාට මේ පිටුවට එන්න අවසර නෑ. මේක ඇඩ්මින් ට විතරයි.</p>
        </div>
      </div>
    )
  }

  // Fetch Data
  const { data: quotes } = await supabase.from('quotes').select('*').order('created_at', { ascending: false })
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      
      {/* Top Navbar Style Header */}
      <header className="bg-navy text-white shadow-lg mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-extrabold tracking-widest text-gold">TALVEXA</h1>
            <span className="text-gray-300 text-sm border-l border-gray-600 pl-4">Admin Portal</span>
          </div>
          <Link href="/" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition border border-white/20">
            Back to Website
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Actions Bar */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link href="/admin/products/new" className="bg-gold text-navy px-6 py-3 rounded-lg hover:bg-gold-light font-bold shadow-md transition flex items-center gap-2">
            <span>+</span> Add New Product
          </Link>
          <Link href="/admin/orders" className="bg-navy text-gold px-6 py-3 rounded-lg hover:bg-navy-light font-bold shadow-md transition flex items-center gap-2">
            <span>📦</span> Manage Orders
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold"></div>
            <div className="bg-gold/10 p-4 rounded-full text-gold text-3xl">📩</div>
            <div>
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Quote Requests</h3>
              <p className="text-4xl font-extrabold text-navy mt-1">{quotes?.length || 0}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-navy"></div>
            <div className="bg-navy/10 p-4 rounded-full text-navy text-3xl">📦</div>
            <div>
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Products</h3>
              <p className="text-4xl font-extrabold text-navy mt-1">{products?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-10">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">📩 Buyer Quote Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Buyer Details</th>
                  <th className="p-4 font-bold">Product & Qty</th>
                  <th className="p-4 font-bold">Requirements</th>
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

                      <td className="p-4 text-sm text-gray-600 max-w-xs">
                        {quote.packaging_requirements && (
                          <p><span className="font-semibold text-gray-800">Packaging:</span> {quote.packaging_requirements}</p>
                        )}
                        {quote.additional_message && (
                          <p className="mt-1 text-xs italic text-gray-500 line-clamp-2">"{quote.additional_message}"</p>
                        )}
                      </td>

                      <td className="p-4 text-sm font-medium">{quote.country}</td>

                      {/* අලුත් View බොත්තම මෙතන තමයි */}
                      <td className="p-4 text-center">
                        <Link href={`/admin/enquiries/${quote.id}`} className="bg-navy text-gold hover:bg-navy-light px-4 py-2 rounded text-xs font-bold transition inline-block shadow-sm">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-400">No quote requests found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">📦 Manage Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 font-bold">Product Name</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">MOQ</th>
                  <th className="p-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-bold text-navy">{product.name}</td>
                      <td className="p-4 text-sm text-gray-600"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{product.category}</span></td>
                      <td className="p-4 text-sm font-extrabold text-gold-dark">${product.price}</td>
                      <td className="p-4 text-sm text-gray-600">{product.moq}</td>
                      <td className="p-4 text-center">
                        <DeleteProductButton id={product.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-400">No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}