import { DashboardHeader } from '@/components/DashboardHeader'
import { TreasuryCard } from '@/components/TreasuryCard'
import { QuickActions } from '@/components/QuickActions'
import { RoyalAssets } from '@/components/RoyalAssets'
import { BottomNav } from '@/components/BottomNav'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export default function DashboardPage() {
  return (
    <div className="min-h-screen pb-24 relative">
      <ThemeSwitcher />
      <DashboardHeader />
      <TreasuryCard />
      <QuickActions />
      <RoyalAssets />
      <BottomNav />
    </div>
  )
}
