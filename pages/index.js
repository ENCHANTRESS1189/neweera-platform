import { useState, useEffect } from 'react'
import { useAuth } from './_app'
import { createClient } from '@supabase/supabase-js'
import { loadStripe } from '@stripe/stripe-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Home() {
  const { user, signIn, signUp, signOut } = useAuth()
  const [assistants, setAssistants] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetchAssistants()
  }, [])

  async function fetchAssistants() {
    const { data, error } = await supabase
      .from('ai_assistants')
      .select('*')
      .eq('is_active', true)
    
    if (data) setAssistants(data)
  }

  async function handleSubscribe(assistant) {
    if (!user) {
      alert('Please sign in first')
      return
    }

    const stripe = await stripePromise
    console.log('Subscribing to:', assistant.name)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2563eb', fontSize: '3rem' }}>
          NEWEeRAS Design & Technology
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          The World's Most Advanced AI Assistant Marketplace
        </p>
      </header>

      {!user ? (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2>Sign In / Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
          />
          <button
            onClick={() => signIn({ email, password })}
            style={{ width: '48%', padding: '10px', margin: '5px 1%', backgroundColor: '#2563eb', color: 'white', border: 'none' }}
          >
            Sign In
          </button>
          <button
            onClick={() => signUp({ email, password })}
            style={{ width: '48%', padding: '10px', margin: '5px 1%', backgroundColor: '#059669', color: 'white', border: 'none' }}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p>Welcome, {user.email}!</p>
            <button onClick={signOut} style={{ padding: '10px 20px' }}>
              Sign Out
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {assistants.map((assistant) => (
              <div key={assistant.id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '10px', 
                padding: '20px',
                backgroundColor: '#f9f9f9'
              }}>
                <h3 style={{ color: '#2563eb' }}>{assistant.name}</h3>
                <p style={{ color: '#666' }}>{assistant.role}</p>
                <p>{assistant.description}</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                  ${assistant.price}/month
                </p>
                <button
                  onClick={() => handleSubscribe(assistant)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1rem'
                  }}
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
