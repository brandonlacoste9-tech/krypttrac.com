import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0B2E] via-purple-900 to-[#1A0B2E] flex items-center justify-center p-4">
      <div className="relative">
        {/* Decorative backdrop glow */}
        <div className="absolute -inset-4 bg-[#FFD76C]/10 blur-3xl rounded-full" />
        
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-slate-900/80 backdrop-blur-2xl border border-[#FFD76C]/20 shadow-2xl rounded-3xl overflow-hidden",
              headerTitle: "gold-text text-2xl font-black uppercase tracking-widest",
              headerSubtitle: "text-gray-400 font-medium",
              socialButtonsBlockButton: "bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all",
              formButtonPrimary: "bg-gradient-to-r from-[#FFD76C] to-[#C49A2B] text-[#1A0B2E] font-bold uppercase tracking-wider hover:opacity-90 transition-all",
              footerActionLink: "text-[#FFD76C] hover:text-[#C49A2B] transition-colors",
              formFieldInput: "bg-white/5 border border-white/10 text-white focus:ring-[#FFD76C] focus:border-[#FFD76C]",
              formFieldLabel: "text-gray-300 font-semibold",
              dividerLine: "bg-white/10",
              dividerText: "text-gray-500",
            },
          }}
        />
      </div>
    </div>
  )
}
