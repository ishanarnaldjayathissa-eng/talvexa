import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteProductButton from '@/components/DeleteProductButton'
export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
export default async function AdminDashboard() {
  const supabase = await createClient()
  // 1. ලොග් වෙලා ඉන්න කෙනාව හොයාගන්න
  const { data: { user } } = await supabase.auth.getUser()

  // 2. ලොග් වෙලා නැත්නම් ලොගින් පිටුවට හරවා යවන්න
  if (!user) {
    redirect('/login')
  }

  // 3. ඔහු ඇඩ්මින් කෙනෙක්ද කියලා බලන්න
    const { data: userRole, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (roleError) {
    console.log("Role Error:", roleError.message)
  }

  // 4. ඇඩ්මින් කෙනෙක් නෙවෙයි නම් වෙනත් තැනකට යවන්න (හෝ අවහිර කරන්න)
  if (userRole?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">ඔයාට මේ පිටුවට එන්න අවසර නෑ. මේක ඇඩ්මින් ට විතරයි.</p>
        </div>
      </div>
    )
  }
  // Quotes ලබා ගැනීම
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  // Products ලබා ගැනීම
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header and Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/admin/products/new" className="bg-gold text-navy px-4 py-2 rounded-md hover:bg-gold-light font-bold shadow-sm transition">
              + Add New Product
            </Link>
            <Link href="/" className="bg-gray-300 text-navy px-4 py-2 rounded-md hover:bg-gray-400 font-medium transition">
              Back to Website
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold">
            <h3 className="text-gray-500 text-sm font-medium">Total Quote Requests</h3>
            <p className="text-3xl font-bold text-navy mt-2">{quotes?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-navy">
            <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
            <p className="text-3xl font-bold text-navy mt-2">{products?.length || 0}</p>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-10">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-navy">Buyer Quote Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Buyer Name</th>
                  <th className="p-4 font-medium">Product & Qty</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Destination</th>
                </tr>
              </thead>
              <tbody>
                {quotes && quotes.length > 0 ? (
                  quotes.map((quote) => (
                    <tr key={quote.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-500">{new Date(quote.created_at).toLocaleDateString()}</td>
                      <td className="p-4 font-medium text-navy">{quote.buyer_name}</td>
                      <td className="p-4 text-sm">{quote.product} (Qty: {quote.quantity})</td>
                      <td className="p-4 text-sm">{quote.email} <br/> {quote.whatsapp}</td>
                      <td className="p-4 text-sm font-medium">{quote.country}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No quote requests found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-navy">Manage Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                  <th className="p-4 font-medium">Product Name</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">MOQ</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-navy">{product.name}</td>
                      <td className="p-4 text-sm">{product.category}</td>
                      <td className="p-4 text-sm font-bold text-gold-dark">${product.price}</td>
                      <td className="p-4 text-sm">{product.moq}</td>
                      <td className="p-4">
                        <DeleteProductButton id={product.id} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No products found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
          
         </div>
      </div> 
  )
}