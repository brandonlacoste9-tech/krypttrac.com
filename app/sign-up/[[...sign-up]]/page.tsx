import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0B2E] via-purple-900 to-[#1A0B2E] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-[#FFD76C]/20 shadow-2xl p-8 rounded-3xl text-center space-y-6">
        <h1 className="text-3xl font-black gold-text uppercase tracking-widest">Access Reserved</h1>
        <p className="text-gray-300">Authentication is temporarily undergoing royal maintenance. Please return to the Command Center.</p>
        <Link 
          href="/dashboard"
          className="block w-full py-4 rounded-full font-bold uppercase tracking-wide bg-gradient-to-r from-[#FFD76C] to-[#C49A2B] text-[#1A0B2E] transition hover:scale-105"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
