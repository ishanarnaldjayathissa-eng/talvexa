import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import UpdateOrderStatus from '@/components/UpdateOrderStatus'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  // ඇණවුම්, ඒවායේ තියෙන භාණ්ඩ, ඒවායේ නම් සහ පින්තූර එකම පාරටම ගන්නවා
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        quantity,
        products (
          name,
          image_url
        )
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-navy">Manage Orders</h1>
          <Link href="/admin" className="bg-gray-300 text-navy px-4 py-2 rounded-md hover:bg-gray-400 font-medium transition">
            Back to Dashboard
          </Link>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Items (භාණ්ඩ)</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order: any) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      
                      <td className="p-4 font-mono text-sm text-gray-500">
                        {order.id.slice(0, 8)}...
                      </td>
                      
                      {/* භාණ්ඩ වල පින්තූර සහ නම් පෙන්නන තැන */}
                      <td className="p-4 text-sm">
                        {order.order_items?.map((item: any, index: number) => (
                          <div key={index} className="flex items-center gap-3 mb-2 last:mb-0">
                            <img 
                              src={item.products?.image_url || 'https://via.placeholder.com/40?text=No+Img'} 
                              alt={item.products?.name} 
                              className="w-40 h-40 object-cover rounded border border-gray-200" 
                            />
                            <span className="text-navy font-medium">
                              {item.products?.name} (x{item.quantity})
                            </span>
                          </div>
                        ))}
                      </td>

                      <td className="p-4 font-bold text-navy">
                        ${order.total_amount}
                      </td>
                      
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Payment Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      
                      <td className="p-4">
                        <UpdateOrderStatus orderId={order.id} currentStatus={order.status} />
                                               <div className="mt-2 text-center">
                          <Link href={`/admin/orders/${order.id}/label`} className="text-blue-600 hover:underline text-xs font-bold">
                            Print Label
                          </Link>
                        </div> 
                      </td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No orders found yet.
                    </td>
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