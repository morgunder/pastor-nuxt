import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const requests = sqliteTable('requests', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(), // GitHub Id
  name: text('name').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  completed: integer('completed').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const prayers = sqliteTable('prayers', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(), // GitHub Id
  requestId: integer('id').notNull(), // link to prayer request
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
