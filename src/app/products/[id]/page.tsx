import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AddToCartBtn from '@/components/AddToCartBtn'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15+ වල params එක await කරලා ගන්න ඕනේ
  const resolvedParams = await params;
  const supabase = await createClient()

  // Database එකෙන් අදාළ භාණ්ඩය විතරක් ගන්නවා
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !product) {
    notFound() 
  }

  // අපි කලින් හදපු gallery_images (JSON array) එකෙන් පින්තූර ටික ගන්නවා
  const gallery = Array.isArray(product.gallery_images) ? product.gallery_images : [];
  const mainImage = product.image_url || 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-navy">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-navy font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            
            {/* වම් පැත්ත: පින්තූර (Main Image + Gallery) */}
            <div className="flex flex-col gap-4">
              <div className="h-[400px] lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Gallery පින්තූර තියෙනවා නම් විතරක් පෙන්නන්න */}
              {gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {gallery.map((img: string, idx: number) => (
                    <div key={idx} className="h-24 bg-gray-100 rounded-md overflow-hidden border border-gray-200 cursor-pointer hover:border-gold transition">
                      <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* දකුණු පැත්ත: විස්තර */}
            <div className="flex flex-col justify-start">
              <span className="text-sm font-bold text-gold-dark tracking-wider uppercase mb-2">
                {product.category || 'Export Product'}
              </span>
              <h1 className="text-4xl font-extrabold text-navy mb-4">{product.name}</h1>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.description || 'No description available for this product.'}
              </p>

              {/* B2B විස්තර Grid එක */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="block text-sm text-gray-500 mb-1">Origin</span>
                  <span className="font-bold text-navy">{product.origin || 'Sri Lanka'}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="block text-sm text-gray-500 mb-1">MOQ (Minimum Order)</span>
                  <span className="font-bold text-navy">{product.moq || 'Contact Us'}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="block text-sm text-gray-500 mb-1">Available Quantities</span>
                  <span className="font-bold text-navy">{product.available_quantities || 'Custom Bulk'}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="block text-sm text-gray-500 mb-1">Packaging Options</span>
                  <span className="font-bold text-navy">{product.packaging_options || 'Standard Export'}</span>
                </div>
              </div>

              {/* මිල */}
              <div className="mb-8 border-t border-gray-200 pt-6">
                <span className="text-sm text-gray-500 block mb-1">Estimated Price (per unit)</span>
                <span className="text-4xl font-extrabold text-gold-dark">${product.price}</span>
              </div>

              {/* ක්‍රියාකාරකම් (Actions) */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {/* 1. Add to cart (B2C විදියට sample ගන්න) */}
                <div className="flex-1">
                  <AddToCartBtn product={product} />
                </div>
                
                {/* 2. Request a Quote (B2B ලොකු ඕඩර් වලට) */}
                <Link 
                  href={`/quote?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 bg-navy text-white text-center py-3 px-6 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  Request Bulk Quote
                </Link>
              </div>
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                * Prices are estimates and subject to change based on order volume and shipping.
              </p>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}