import Image from 'next/image'
import Link from 'next/link'

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L20 25 L25 25 L25 35 L35 35 L35 25 L40 25 Z' fill='%23FFD76C' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-md">
        {/* 3D Crown Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div
              className="absolute inset-0 gold-pulse"
              style={{
                filter: 'blur(60px)',
                background: 'radial-gradient(circle, rgba(255, 215, 108, 0.4) 0%, transparent 70%)',
              }}
            />

            <div
              className="relative w-64 h-64 rounded-[3rem] p-2"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 21, 128, 0.5), rgba(26, 11, 46, 0.7))',
                backdropFilter: 'blur(20px)',
                border: '4px solid transparent',
                backgroundClip: 'padding-box',
              }}
            >
              <div
                className="absolute inset-0 rounded-[3rem] -z-10"
                style={{
                  background: 'linear-gradient(135deg, #FFD76C, #F4C430, #C49A2B)',
                  padding: '4px',
                }}
              />

              <div
                className="w-full h-full rounded-[2.5rem] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 11, 46, 0.9), rgba(0, 0, 0, 0.9))',
                }}
              >
                <Image
                  src="/kk-logo.png"
                  alt="Krypto Kings Crown"
                  width={200}
                  height={200}
                  priority
                  className="drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(255, 215, 108, 0.5))',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1
            className="text-5xl md:text-6xl font-black tracking-wider gold-text"
            style={{
              textShadow: '0 0 40px rgba(255, 215, 108, 0.6), 0 4px 12px rgba(0, 0, 0, 0.9)',
              letterSpacing: '0.1em',
            }}
          >
            KRYPTO KINGS
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="text-xl font-light text-gray-200"
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          Rule Your Portfolio.
        </p>

        {/* CTA Button */}
        <div className="pt-8">
          <Link href="/dashboard">
            <button
              className="px-12 py-4 rounded-full font-bold text-lg tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FFD76C, #C49A2B)',
                color: '#1A0B2E',
                boxShadow: '0 8px 32px rgba(255, 215, 108, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              Enter the Realm
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
