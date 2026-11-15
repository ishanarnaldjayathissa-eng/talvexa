import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import OrderStatusSelect from './OrderStatusSelect'
import DeleteOrderButton from './DeleteOrderButton'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const supabase = await createClient()
  const { status } = await searchParams // URL එකෙන් filter එක ගන්නවා
  
  // Query එක හදමු
  let query = supabase.from('orders').select('*, order_items(*, products(*))').order('created_at', { ascending: false })

  // Filter එකක් තියෙනවා නම් ඒක එකතු කරනවා
  if (status && status !== 'All') {
    if (status === 'Confirmed') {
      // Confirmed කියන්නේ Payment Pending නැති ඒවා
      query = query.neq('status', 'Payment Pending').neq('status', 'Pending').neq('status', 'Cancelled')
    } else {
      query = query.eq('status', status)
    }
  }

  const { data: orders } = await query

  // Tabs සඳහා ලිස්ට් එක
  const tabs = [
    { name: 'All', label: 'All Orders' },
    { name: 'Payment Pending', label: 'Pending' },
    { name: 'Confirmed', label: 'Confirmed / Shipped' },
    { name: 'Delivered', label: 'Delivered' },
  ]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-navy">Orders & Delivery</h2>
        <p className="text-gray-500">Manage customer orders and update delivery statuses.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={`/admin/orders?status=${tab.name}`}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap ${
              (status || 'All') === tab.name 
                ? 'bg-navy text-gold' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Order ID</th>
                <th className="p-4 font-bold">Items</th>
                <th className="p-4 font-bold">Total</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-sm font-bold text-navy">#{order.id.slice(0, 8).toUpperCase()}</td>
                    
                    <td className="p-4 text-sm">
                      {order.order_items?.map((item: any, idx: number) => (
                        <div key={idx} className="mb-2">
                          <p className="font-medium text-gray-700">{item.products?.name} (x{item.quantity})</p>
                        </div>
                      ))}
                    </td>
                    
                    <td className="p-4 font-extrabold text-gold-dark">${order.total_amount}</td>
                    
                    <td className="p-4">
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </td>
                    
                    <td className="p-4 text-center flex items-center justify-center">
                      <Link href={`/admin/orders/${order.id}/label`} className="bg-navy text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-navy-light transition">
                        Print Label
                      </Link>
                      <DeleteOrderButton orderId={order.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400">No orders found for this category.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}