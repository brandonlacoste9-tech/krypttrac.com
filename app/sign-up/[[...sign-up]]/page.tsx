import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="relative">
        {/* Background glow */}
        <div className="absolute -inset-4 bg-purple-500/20 rounded-3xl blur-2xl" />
        <div className="relative">
          <SignUp 
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'bg-[#1a1a2e]/90 backdrop-blur-xl border border-white/10',
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
