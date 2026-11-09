'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('සාර්ථකව ලොග් වුණා!')
      setTimeout(() => router.push('dashboard'), 1500) 
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">TALVEXA පිවිසුම</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'රැඳී සිටින්න...' : 'ලොග් වෙන්න'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          ගිණුමක් නැද්ද?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            මෙතනින් ලියාපදිංචි වෙන්න
          </Link>
        </p>
      </div>
    </div>
  )
}