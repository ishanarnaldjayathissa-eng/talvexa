import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteProductButton from '@/components/DeleteProductButton'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-navy">Manage Products</h2>
          <p className="text-gray-500">Add, edit, or remove items from your catalogue.</p>
        </div>
        <Link href="/admin/products/new" className="bg-gold text-navy px-6 py-3 rounded-lg hover:bg-gold-light font-bold shadow-md transition flex items-center gap-2">
          <span>+</span> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                      <div className="flex items-center justify-center gap-3">
                        <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 px-3 py-1 rounded transition">
                          Edit
                        </Link>
                        <DeleteProductButton id={product.id} />
                      </div>
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
  )
}