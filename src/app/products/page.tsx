import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import { createClient } from '@/lib/supabase/server'

export default async function ProductsPage() {
  const supabase = await createClient()

  // Database එකෙන් භාණ්ඩ ගන්නවා
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10 border-b border-gray-200 pb-4">
          <h1 className="text-4xl font-extrabold text-navy tracking-tight">Our Product Catalogue</h1>
          <p className="text-gray-500 mt-2 text-lg">Browse our premium selection of Sri Lankan exports.</p>
        </div>
        
        {/* Error එකක් ආවොත් පෙන්නන්න */}
        {error && (
          <p className="text-red-500 mb-4">Error loading products: {error.message}</p>
        )}

        {/* භාණ්ඩ නැත්නම් පෙන්නන්න */}
        {!products || products.length === 0 ? (
          <p className="text-gray-500 text-lg">No products found in the database.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                title={product.name} 
                price={product.price} 
                image={product.image_url || 'https://via.placeholder.com/300x300?text=No+Image'} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}