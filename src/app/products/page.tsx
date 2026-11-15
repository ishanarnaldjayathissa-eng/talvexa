import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// අපේ B2B Categories ලිස්ට් එක
const CATEGORIES = [
  "All Products",
  "Ceylon Tea and Spices",
  "Gems and Jewellery",
  "Coconut Products",
  "Clothing and Textiles",
  "Handicrafts and Wooden Products",
  "Food and Agricultural Products",
  "Seafood",
  "Ceramics and Homeware",
  "Rubber Products",
  "Eco-friendly Products",
  "Other Sri Lankan Products"
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const supabase = await createClient()
  
  const params = await searchParams;
  const selectedCategory = params.category || "All Products";
  const searchQuery = params.search || "";

  let query = supabase.from('products').select('*').order('created_at', { ascending: false })

  if (selectedCategory !== "All Products") {
    query = query.eq('category', selectedCategory)
  }

  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`)
  }

  const { data: products, error } = await query;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-navy tracking-tight">Global Export Catalogue</h1>
            <p className="text-gray-500 mt-2 text-lg">Discover premium Sri Lankan products for bulk export.</p>
          </div>
          
          {/* Search Bar */}
          <form method="GET" action="/products" className="w-full md:w-auto flex gap-2">
            <input 
              type="text" 
              name="search" 
              defaultValue={searchQuery}
              placeholder="Search products..." 
              className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {selectedCategory !== "All Products" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            <button type="submit" className="bg-navy text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
              Search
            </button>
          </form>
        </div>
        
        {/* Categories Filter Bar */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-3 min-w-max">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}${searchQuery ? `&search=${searchQuery}` : ''}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  selectedCategory === cat 
                  ? 'bg-navy text-white border-navy shadow-md' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gold hover:text-navy'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Error එකක් ආවොත් පෙන්නන්න */}
        {error && (
          <p className="text-red-500 mb-4 bg-red-50 p-4 rounded-md">Error loading products: {error.message}</p>
        )}

        {/* භාණ්ඩ නැත්නම් පෙන්නන්න */}
        {!products || products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl mb-4">No products found matching your criteria.</p>
            <Link href="/products" className="text-gold font-medium hover:underline">
              Clear all filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id} 
                title={product.name} 
                price={product.price} 
                image={product.image_url || 'https://via.placeholder.com/300x300?text=No+Image'} 
                moq={product.moq} 
                category={product.category} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}