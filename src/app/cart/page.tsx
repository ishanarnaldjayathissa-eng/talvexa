import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center bg-navy relative overflow-hidden">
        <div className="text-center max-w-4xl px-4 py-32 relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Premium Exports from <br />
            <span className="text-gold">Sri Lanka</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connecting global buyers with authentic Sri Lankan manufacturers. 
            Discover high-quality tea, spices, garments, and more.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/products" className="bg-gold text-navy px-8 py-3 rounded-sm text-lg font-bold hover:bg-gold-light transition uppercase tracking-wider">
              Explore Products
            </Link>
            <Link href="/register" className="bg-transparent border border-gold text-gold px-8 py-3 rounded-sm text-lg font-bold hover:bg-gold hover:text-navy transition uppercase tracking-wider">
              Become a Buyer
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-navy-dark border-t border-gold/20 py-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} TALVEXA - Global Exports. All rights reserved.
        </p>
      </footer>
    </div>
  )
}