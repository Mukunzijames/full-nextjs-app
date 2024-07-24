import '@/lib/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { dolist } from './schema';
import * as schema from './schema';

export const db = drizzle(sql, { schema });

export const getUsers = async () => {
  const selectResult = await db.select().from(dolist);
  console.log('Results', selectResult);
  return selectResult;
};

export type NewUser = typeof dolist.$inferInsert;

export const insertUser = async (user: NewUser) => {
  return db.insert(dolist).values(user).returning();
};

export const getUsers2 = async () => {
  const result = await db.query.dolist.findMany();
  return result;
};
