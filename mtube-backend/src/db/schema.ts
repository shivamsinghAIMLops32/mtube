import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

//////////////////////////////////////////////////////////////////
// USERS
//////////////////////////////////////////////////////////////////

export const usersTable = pgTable(
  "users",
  {
    id: integer("id")
      .primaryKey()
      .generatedAlwaysAsIdentity(),

    name: varchar("name", { length: 255 }).notNull(),

    email: varchar("email", { length: 255 })
      .notNull()
      .unique(),

    password: varchar("password", { length: 255 }).notNull(),

    channelName: varchar("channel_name", {
      length: 255,
    })
      .notNull()
      .unique(),

    channelHandle: varchar("channel_handle", {
      length: 100,
    })
      .notNull()
      .unique(),

    channelDescription: text("channel_description"),

    profileImageUrl: text("profile_image_url").notNull(),

    bannerImageUrl: text("banner_image_url"),

    isVerified: boolean("is_verified")
      .default(false)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("users_email_idx").on(table.email),

    index("users_channel_handle_idx").on(
      table.channelHandle
    ),
  ]
);

//////////////////////////////////////////////////////////////////
// VIDEOS
//////////////////////////////////////////////////////////////////

export const videosTable = pgTable(
  "videos",
  {
    id: integer("id")
      .primaryKey()
      .generatedAlwaysAsIdentity(),

    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    title: varchar("title", {
      length: 255,
    }).notNull(),

    description: text("description"),

    videoUrl: text("video_url").notNull(),

    thumbnailUrl: text("thumbnail_url").notNull(),

    duration: integer("duration").notNull(), // seconds

    views: integer("views")
      .default(0)
      .notNull(),

    likesCount: integer("likes_count")
      .default(0)
      .notNull(),

    commentsCount: integer("comments_count")
      .default(0)
      .notNull(),

    visibility: varchar("visibility", {
      length: 20,
    })
      .$type<"public" | "private" | "unlisted">()
      .default("public")
      .notNull(),

    isPublished: boolean("is_published")
      .default(true)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("videos_user_id_idx").on(table.userId),

    index("videos_created_at_idx").on(
      table.createdAt
    ),

    index("videos_views_idx").on(table.views),
  ]
);

//////////////////////////////////////////////////////////////////
// VIDEO LIKES
//////////////////////////////////////////////////////////////////

export const videoLikesTable = pgTable(
  "video_likes",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    videoId: integer("video_id")
      .notNull()
      .references(() => videosTable.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.videoId],
    }),

    index("video_likes_video_id_idx").on(
      table.videoId
    ),
  ]
);

//////////////////////////////////////////////////////////////////
// SUBSCRIPTIONS
//////////////////////////////////////////////////////////////////

export const subscriptionsTable = pgTable(
  "subscriptions",
  {
    subscriberId: integer("subscriber_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    channelId: integer("channel_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.subscriberId, table.channelId],
    }),

    index("subscriptions_channel_id_idx").on(
      table.channelId
    ),
  ]
);

//////////////////////////////////////////////////////////////////
// COMMENTS
//////////////////////////////////////////////////////////////////

export const commentsTable = pgTable(
  "comments",
  {
    id: integer("id")
      .primaryKey()
      .generatedAlwaysAsIdentity(),

    videoId: integer("video_id")
      .notNull()
      .references(() => videosTable.id, {
        onDelete: "cascade",
      }),

    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    content: text("content").notNull(),

    likesCount: integer("likes_count")
      .default(0)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("comments_video_id_idx").on(
      table.videoId
    ),

    index("comments_user_id_idx").on(table.userId),
  ]
);

//////////////////////////////////////////////////////////////////
// COMMENT LIKES
//////////////////////////////////////////////////////////////////

export const commentLikesTable = pgTable(
  "comment_likes",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    commentId: integer("comment_id")
      .notNull()
      .references(() => commentsTable.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.commentId],
    }),
  ]
);

//////////////////////////////////////////////////////////////////
// WATCH HISTORY
//////////////////////////////////////////////////////////////////

export const watchHistoryTable = pgTable(
  "watch_history",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    videoId: integer("video_id")
      .notNull()
      .references(() => videosTable.id, {
        onDelete: "cascade",
      }),

    watchedAt: timestamp("watched_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.videoId],
    }),

    index("watch_history_user_id_idx").on(
      table.userId
    ),

    index("watch_history_video_id_idx").on(
      table.videoId
    ),
  ]
);