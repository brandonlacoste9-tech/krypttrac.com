import Image from 'next/image'
import Link from 'next/link'

export default function SplashScreen() {
  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <Image
          src="/kk-logo.png"
          alt="Krypto Kings Logo"
          width={150}
          height={150}
          priority
        />
      </div>
      
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', background: 'linear-gradient(to right, #FFD76C, #C49A2B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        KRYPTO KINGS
      </h1>
      
      <p style={{ fontSize: '1.5rem', opacity: 0.8, marginBottom: '40px' }}>
        Rule Your Portfolio.
      </p>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/dashboard" style={{ padding: '15px 30px', background: '#FFD76C', color: '#1A0B2E', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none' }}>
          Enter the Realm
        </Link>
        <Link href="/markets" style={{ padding: '15px 30px', border: '2px solid #FFD76C', color: '#FFD76C', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none' }}>
          Markets
        </Link>
      </div>
    </main>
  )
}
