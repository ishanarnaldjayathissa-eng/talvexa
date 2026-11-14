import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AddToCartBtn from '@/components/AddToCartBtn'

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15+ වල params එක await කරලා ගන්න ඕනේ
  const resolvedParams = await params;
  const supabase = await createClient()

  // Database එකෙන් අදාළ භාණ්ඩය විතරක් ගන්නවා
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', resolvedParams.id) // මෙතන resolvedParams.id දාන්න ඕනේ
    .single()

  if (error || !product) {
    notFound() 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            
            {/* වම් පැත්ත: පින්තූරය */}
            <div className="h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={product.image_url || 'https://via.placeholder.com/600x600?text=No+Image'} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* දකුණු පැත්ත: විස්තර */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-gold-dark tracking-wider uppercase mb-2">
                {product.category}
              </span>
              <h1 className="text-4xl font-extrabold text-navy mb-4">{product.name}</h1>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {product.description || 'No description available for this product.'}
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 font-medium">Price:</span>
                  <span className="text-2xl font-bold text-gold-dark">${product.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Minimum Order (MOQ):</span>
                  <span className="text-lg font-bold text-navy">{product.moq}</span>
                </div>
              </div>

              {/* Add to Cart බොත්තම */}
              <AddToCartBtn product={product} />
              
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}