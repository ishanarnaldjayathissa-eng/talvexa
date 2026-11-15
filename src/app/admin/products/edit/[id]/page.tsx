import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import EditProductForm from './EditProductForm' // අපි මේක පස්සේ හදමු

export const dynamic = 'force-dynamic'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Security Check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch Product Data
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <header className="bg-navy text-white shadow-lg mb-8">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-extrabold tracking-widest text-gold">TALVEXA</h1>
            <span className="text-gray-300 text-sm border-l border-gray-600 pl-4">Edit Product</span>
          </div>
          <Link href="/admin" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition border border-white/20">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-navy mb-6 border-b pb-4">Edit Product: {product.name}</h2>
          {/* මේ Form එකට අපි දත්ත යවනවා */}
          <EditProductForm product={product} />
        </div>
      </div>
    </div>
  )
}