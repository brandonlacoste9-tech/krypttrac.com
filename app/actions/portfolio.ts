'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function linkWalletConnection(address: string) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Unauthorized: No user signed in')
    }

    // 1. Ensure the user has a Portfolio
    let portfolio = await prisma.portfolio.findFirst({
      where: { userId }
    })

    if (!portfolio) {
      portfolio = await prisma.portfolio.create({
        data: {
          userId,
          name: 'My Kingdom'
        }
      })
    }

    // 2. Check if this specific address is already linked
    const existingConnection = await prisma.connection.findFirst({
      where: {
        portfolioId: portfolio.id,
        identifier: address,
        type: 'wallet'
      }
    })

    // 3. Keep it idempotent; if it exists, just return it
    if (existingConnection) {
      return { success: true, message: 'Wallet already linked.', connection: existingConnection }
    }

    // 4. Create the new connection
    const newConnection = await prisma.connection.create({
      data: {
        portfolioId: portfolio.id,
        type: 'wallet',
        name: 'Web3 Wallet',
        identifier: address
      }
    })

    // Return success message
    return { success: true, message: 'Wallet synced to your kingdom.', connection: newConnection }

  } catch (error: unknown) {
    console.error('[LINK_WALLET_ERROR]', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to link wallet' }
  }
}
