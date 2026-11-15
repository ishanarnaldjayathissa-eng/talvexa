import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // ලොග් වෙලා නැත්නම් ලොගින් පේජ් එකට යවන්න
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar (වම් පැත්තේ මෙනුව) */}
      <aside className="w-full md:w-64 bg-navy text-white flex flex-col shadow-lg">
        <div className="p-6 text-center border-b border-gray-700">
          <h1 className="text-3xl font-extrabold tracking-widest text-gold">TALVEXA</h1>
          <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium">
            📊 Dashboard
          </Link>
          <Link href="/admin/products" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium">
            📦 Manage Products
          </Link>
          <Link href="/admin/orders" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium">
            🚚 Orders & Delivery
          </Link>
          <Link href="/admin/enquiries" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium">
            📩 Buyer Quotes
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Link href="/" className="block text-center bg-gold text-navy px-4 py-2 rounded-md font-bold hover:bg-gold-light transition">
            View Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      
    </div>
  )
}