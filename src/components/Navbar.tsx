'use client' // 👈 මේක අනිවාර්යයි

import Link from 'next/link'
import { useCurrency } from '@/context/CurrencyContext' // 👈 අලුත් එක

export default function Navbar() {
  const { currency, setCurrency } = useCurrency() // 👈 මේකෙන් තමයි මුදල් ඒකකය ගන්නේ

  return (
    <nav className="bg-navy shadow-lg border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-bold text-gold tracking-widest">
              TALVEXA
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 items-center">
            <Link href="/products" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              Products
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              Contact
            </Link>
            <Link href="/cart" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              Cart
            </Link>
            <Link href="/quote" className="text-gray-300 hover:text-gold transition px-3 py-2 text-sm font-medium tracking-wide">
              Get Quote
            </Link>

            {/* 👇 මෙන්න මේක තමයි අපිට අඩු වෙලා තිබ්බ Currency Dropdown එක 👇 */}
            <div className="relative inline-block text-left mr-2 border-l border-gray-600 pl-4">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-gold font-bold outline-none cursor-pointer hover:text-gold-light transition appearance-none"
              >
                <option value="USD" className="text-black">USD ($)</option>
                <option value="LKR" className="text-black">LKR (Rs.)</option>
                <option value="EUR" className="text-black">EUR (€)</option>
                <option value="GBP" className="text-black">GBP (£)</option>
              </select>
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-gold transition text-sm font-medium tracking-wide">
                Login
              </Link>
              <Link href="/register" className="bg-gold text-navy hover:bg-gold-light transition px-5 py-2 rounded-sm text-sm font-bold tracking-wide">
                Register
              </Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}