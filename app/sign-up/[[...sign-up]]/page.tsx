import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#1A0B2E] flex items-center justify-center p-4">
      {/* Simplified wrapper to ensure visibility */}
      <SignUp routing="path" path="/sign-up" />
    </div>
  )
}
