import { date, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  // channel_name: varchar({ length: 255 }).notNull().unique(),
  // channel_banner_url: varchar({ length: 255 }).notNull(),
  // channel_description: varchar({ length: 255 }).notNull(),
  // password: varchar({ length: 255 }).notNull(),
  // createdAt: timestamp('created_at').defaultNow().notNull(),
});

// export const videosTable = pgTable("videos",{
//   id : integer().primaryKey().generatedAlwaysAsIdentity(),
//   title : varchar({ length: 255 }).notNull(),
//   description : varchar({ length: 255 }).notNull(),
//   video_url : varchar({ length: 255 }).notNull(),
//   thumbnail_url : varchar({ length: 255 }).notNull(),
//   video_length : integer().notNull(),
//   uploaded_at : timestamp('uploaded_at').defaultNow().notNull(),
// });
