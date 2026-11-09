import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 tracking-wider">
                TALVEXA
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-3xl px-4 py-20">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl mb-6">
            Premium Exports from <span className="text-blue-600">Sri Lanka</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 mb-8">
            Discover high-quality products sourced directly from trusted suppliers. 
            TALVEXA brings the best of Sri Lanka to the global market.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Shop Now (Coming Soon)
            </button>
            <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
              Become a Supplier
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 TALVEXA. All rights reserved.
        </p>
      </footer>
    </div>
  )
}