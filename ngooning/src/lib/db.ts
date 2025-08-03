import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Export types
export type {
  User,
  Account,
  Session,
  Subscription,
  Friendship,
  Group,
  GroupMember,
  Post,
  Comment,
  Like,
  Event,
  EventRSVP,
  CalendarSync,
  Habit,
  HabitEntry,
  Goal,
  Trip,
  TripMember,
  ChatSession,
  ChatMessage,
  AILog,
  Notification,
  File,
  // Enums
  Privacy,
  SubscriptionStatus,
  FriendshipStatus,
  GroupCategory,
  GroupRole,
  EventCategory,
  RSVPStatus,
  CalendarProvider,
  HabitCategory,
  Frequency,
  GoalCategory,
  TripStatus,
  TripRole,
  MessageRole,
  NotificationType,
} from '@prisma/client'

export default db