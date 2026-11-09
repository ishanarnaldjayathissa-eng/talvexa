import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-navy shadow-lg border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-bold text-gold tracking-widest">
              TALVEXA
            </Link>
          </div>
          <div className="flex space-x-6 items-center">
            <Link href="/products" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              Products
            </Link>
            <Link href="/cart" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              Cart
            </Link>
            <Link href="/quote" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              Get Quote
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              Login
            </Link>
            <Link href="/register" className="bg-gold text-navy hover:bg-gold-light transition px-5 py-2 rounded-sm text-sm font-bold tracking-wide">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}