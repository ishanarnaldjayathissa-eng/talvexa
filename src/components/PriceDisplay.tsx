'use client'

import { useCurrency } from '@/context/CurrencyContext'

export default function PriceDisplay({ price, className = "" }: { price: number, className?: string }) {
  const { formatPrice } = useCurrency()

  return (
    <span className={className}>
      {formatPrice(price)}
    </span>
  )
}