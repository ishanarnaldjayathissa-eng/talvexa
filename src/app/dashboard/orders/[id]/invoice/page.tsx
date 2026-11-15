import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PrintButton from "./PrintButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Order එක සහ ඒකට අදාළ Items ටික ගන්නවා
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        quantity,
        price,
        products (
          name,
          image_url
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !order) {
    console.log(error);
    notFound();
  }

  const orderItems = order.order_items || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-[#D4AF37] tracking-wider mb-2">
              TALVEXA
            </h1>
            <p className="text-gray-300">Premium E-Commerce</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold mb-1">INVOICE</h2>
            <p className="text-gray-300 text-sm">Order ID: #{order.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-gray-300 text-sm">
              Date: {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-bold text-[#0A192F] mb-3">Billed To:</h3>
            <p className="font-medium text-gray-800">{order.customer_name}</p>
            {/* මෙතන අපි shipping_address ලෙස වෙනස් කළා */}
            <p className="text-gray-600">{order.shipping_address}</p>
            <p className="text-gray-600">{order.country} - {order.zip_code}</p>
            {/* මෙතන අපි customer_phone ලෙස වෙනස් කළා */}
            <p className="text-gray-600 mt-2">Phone: {order.customer_phone}</p>
            <p className="text-gray-600">Email: {order.customer_email}</p>
          </div>
          <div className="md:text-right">
            <h3 className="text-lg font-bold text-[#0A192F] mb-3">Payment Status:</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
              order.status === 'Pending' || order.status === 'Payment Pending' ? 'bg-yellow-100 text-yellow-700' : 
              order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
              'bg-blue-100 text-blue-700'
            }`}>
              {order.status || "Pending"}
            </span>
            <p className="text-gray-600 mt-4 text-sm">Thank you for shopping with TALVEXA!</p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="p-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-[#0A192F]">
                <th className="p-3 font-semibold border-b-2 border-gray-300">Item</th>
                <th className="p-3 font-semibold border-b-2 border-gray-300 text-center">Qty</th>
                <th className="p-3 font-semibold border-b-2 border-gray-300 text-right">Price</th>
                <th className="p-3 font-semibold border-b-2 border-gray-300 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item: any, index: number) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 text-gray-800 flex items-center gap-3">
                    {item.products?.image_url && (
                      <img src={item.products.image_url} alt={item.products?.name} className="w-10 h-10 object-cover rounded" />
                    )}
                    {item.products?.name || "Product Name"}
                  </td>
                  <td className="p-3 text-center text-gray-800">{item.quantity || 1}</td>
                  <td className="p-3 text-right text-gray-800">${item.price}</td>
                  <td className="p-3 text-right text-gray-800 font-medium">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
              
              {orderItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No items found in this order.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Total */}
          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Subtotal:</span>
                <span className="text-gray-800">${order.total_amount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Shipping:</span>
                <span className="text-gray-800">$0.00</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between items-center">
                <span className="text-lg font-bold text-[#0A192F]">Grand Total:</span>
                <span className="text-xl font-bold text-[#D4AF37]">${order.total_amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-6 flex justify-between items-center border-t border-gray-200 print:hidden">
          <Link 
            href="/dashboard" 
            className="text-[#0A192F] font-medium hover:underline"
          >
            ← Back to Dashboard
          </Link>
          <PrintButton />
        </div>

      </div>
    </div>
  );
}