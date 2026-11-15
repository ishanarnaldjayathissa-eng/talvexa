'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Currency = 'USD' | 'LKR' | 'EUR' | 'GBP'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (priceInUSD: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const EXCHANGE_RATES = {
  USD: 1,
  LKR: 300,
  EUR: 0.92,
  GBP: 0.79,
}

const SYMBOLS = {
  USD: '$',
  LKR: 'Rs.',
  EUR: '€',
  GBP: '£',
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  // Local Storage එකෙන් දත්ත ගන්නවා (මේකෙන් Error එකක් එන්නේ නෑ)
  useEffect(() => {
    const savedCurrency = localStorage.getItem('talvexa_currency') as Currency
    if (savedCurrency && ['USD', 'LKR', 'EUR', 'GBP'].includes(savedCurrency)) {
      setCurrency(savedCurrency)
    }
  }, [])

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem('talvexa_currency', newCurrency)
  }

  const formatPrice = (priceInUSD: number) => {
    const convertedPrice = priceInUSD * EXCHANGE_RATES[currency]
    
    if (currency === 'LKR') {
      return `${SYMBOLS[currency]}${convertedPrice.toLocaleString('en-LK', { maximumFractionDigits: 0 })}`
    }
    
    return `${SYMBOLS[currency]}${convertedPrice.toFixed(2)}`
  }

  // 👇 මෙන්න මේකයි වෙනස් වුනේ. දැන් මේක හැමවෙලේම දරුවො එක්ක වැඩ කරනවා 👇
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}