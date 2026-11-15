import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: quotes } = await supabase.from('quotes').select('*')
  const { data: products } = await supabase.from('products').select('*')
  const { data: orders } = await supabase.from('orders').select('*')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back to TALVEXA Admin Panel.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-green-500"></div>
          <div className="bg-green-50 p-4 rounded-full text-green-600 text-3xl">🚚</div>
          <div>
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Orders</h3>
            <p className="text-4xl font-extrabold text-navy mt-1">{orders?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <h3 className="text-xl font-bold text-navy mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/products" className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gold hover:shadow-md transition group">
          <h4 className="text-lg font-bold text-navy group-hover:text-gold transition">Manage Products →</h4>
          <p className="text-gray-500 text-sm mt-2">Add new items or edit existing B2B catalogue.</p>
        </Link>
        <Link href="/admin/orders" className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gold hover:shadow-md transition group">
          <h4 className="text-lg font-bold text-navy group-hover:text-gold transition">Manage Orders →</h4>
          <p className="text-gray-500 text-sm mt-2">View recent orders and update delivery status.</p>
        </Link>
        <Link href="/admin/enquiries" className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gold hover:shadow-md transition group">
          <h4 className="text-lg font-bold text-navy group-hover:text-gold transition">Buyer Quotes →</h4>
          <p className="text-gray-500 text-sm mt-2">Check bulk quote requests from international buyers.</p>
        </Link>
      </div>
    </div>
  )
}