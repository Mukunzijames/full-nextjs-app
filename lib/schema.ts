import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex
} from 'drizzle-orm/pg-core';

export const dolist = pgTable(
  'dolist',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull()
  },
  dolist => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(dolist.id)
    };
  }
);
