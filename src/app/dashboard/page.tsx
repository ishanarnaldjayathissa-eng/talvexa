import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // මේ යූසර්ගේ ඇණවුම් ටික ගන්නවා
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Customer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold text-navy mt-2">{orders?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Pending Deliveries</h3>
          <p className="text-3xl font-bold text-navy mt-2">
            {orders?.filter(o => o.status !== 'Delivered').length || 0}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-navy mb-4">My Recent Orders</h2>
        {orders && orders.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-sm text-gray-500">Date</th>
                <th className="py-2 text-sm text-gray-500">Order ID</th>
                <th className="py-2 text-sm text-gray-500">Total</th>
                <th className="py-2 text-sm text-gray-500">Status</th>
                <th className="py-2 text-sm text-gray-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="py-3 text-sm font-mono text-gray-500">{order.id.slice(0, 8)}...</td>
                  <td className="py-3 text-sm font-bold">${order.total_amount}</td>
                  <td className="py-3 text-sm">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                      {order.status}
                    </span>
                  </td>
                   <td className="py-3 text-sm text-right">
                    <Link href={`/dashboard/orders/${order.id}/invoice`} className="text-blue-600 hover:underline font-bold text-xs">
                      View Invoice
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">ඔයාට තාම කිසිම ඇණවුමක් නෑ. <Link href="/products" className="text-gold font-bold">Products බලන්න.</Link></p>
        )}
      </div>
    </div>
  )
}