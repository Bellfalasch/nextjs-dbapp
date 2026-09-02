import { sql } from "drizzle-orm";
import {
  check,
  foreignKey,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const eventStatus = pgEnum("event_status", [
  "draft",
  "live",
  "finished",
]);

export const sessionKind = pgEnum("session_kind", [
  "organizer",
  "participant",
]);

export const events = pgTable("events_v2", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: timestamp("event_date", { withTimezone: true }),
  currency: varchar("currency", { length: 3 }).notNull().default("NOK"),
  status: eventStatus("status").notNull().default("draft"),
  currentPosition: integer("current_position"),
  resultsRevealedAt: timestamp("results_revealed_at", { withTimezone: true }),
  startedAt: timestamp("started_at", { withTimezone: true }),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const beers = pgTable(
  "beers_v2",
  {
    id: serial("id").primaryKey(),
    legacyId: integer("legacy_id"),
    name: varchar("name", { length: 255 }).notNull(),
    brewery: varchar("brewery", { length: 255 }),
    description: text("description"),
    alcohol: numeric("alcohol", { precision: 4, scale: 2, mode: "number" }),
    price: numeric("price", { precision: 10, scale: 2, mode: "number" }),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("beers_v2_legacy_id_unique").on(table.legacyId),
    check("beers_v2_alcohol_range", sql`${table.alcohol} between 0 and 100`),
    check("beers_v2_price_nonnegative", sql`${table.price} >= 0`),
  ],
);

export const eventBeers = pgTable(
  "event_beers",
  {
    id: serial("id").primaryKey(),
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    beerId: integer("beer_id")
      .notNull()
      .references(() => beers.id, { onDelete: "restrict" }),
    position: integer("position").notNull(),
    lockedAt: timestamp("locked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("event_beers_event_position_unique").on(
      table.eventId,
      table.position,
    ),
    uniqueIndex("event_beers_event_beer_unique").on(
      table.eventId,
      table.beerId,
    ),
    uniqueIndex("event_beers_event_id_id_unique").on(table.eventId, table.id),
    check("event_beers_position_positive", sql`${table.position} > 0`),
  ],
);

export const participants = pgTable(
  "participants",
  {
    id: serial("id").primaryKey(),
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    legacyUserId: integer("legacy_user_id"),
    displayName: varchar("display_name", { length: 80 }).notNull(),
    normalizedName: varchar("normalized_name", { length: 80 }).notNull(),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("participants_event_name_unique").on(
      table.eventId,
      table.normalizedName,
    ),
    uniqueIndex("participants_event_id_id_unique").on(table.eventId, table.id),
    uniqueIndex("participants_legacy_user_event_unique").on(
      table.eventId,
      table.legacyUserId,
    ),
  ],
);

export const votes = pgTable(
  "votes_v2",
  {
    id: serial("id").primaryKey(),
    legacyId: integer("legacy_id"),
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    eventBeerId: integer("event_beer_id").notNull(),
    participantId: integer("participant_id").notNull(),
    taste: numeric("taste", { precision: 2, scale: 1, mode: "number" }).notNull(),
    design: numeric("design", { precision: 2, scale: 1, mode: "number" }).notNull(),
    bonus: numeric("bonus", { precision: 2, scale: 1, mode: "number" }).notNull(),
    note: text("note"),
    submittedAt: timestamp("submitted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.eventId, table.eventBeerId],
      foreignColumns: [eventBeers.eventId, eventBeers.id],
      name: "votes_v2_event_beer_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.eventId, table.participantId],
      foreignColumns: [participants.eventId, participants.id],
      name: "votes_v2_participant_fk",
    }).onDelete("cascade"),
    uniqueIndex("votes_v2_participant_beer_unique").on(
      table.participantId,
      table.eventBeerId,
    ),
    uniqueIndex("votes_v2_legacy_id_unique").on(table.legacyId),
    check(
      "votes_v2_taste_range_step",
      sql`${table.taste} between 0 and 6 and mod(${table.taste}, 0.5) = 0`,
    ),
    check(
      "votes_v2_design_range_step",
      sql`${table.design} between 0 and 6 and mod(${table.design}, 0.5) = 0`,
    ),
    check(
      "votes_v2_bonus_range_step",
      sql`${table.bonus} between 0 and 3 and mod(${table.bonus}, 0.5) = 0`,
    ),
  ],
);

export const eventInvites = pgTable(
  "event_invites",
  {
    id: serial("id").primaryKey(),
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 64 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("event_invites_token_hash_unique").on(table.tokenHash),
    index("event_invites_event_idx").on(table.eventId),
  ],
);

export const sessions = pgTable(
  "sessions",
  {
    id: serial("id").primaryKey(),
    tokenHash: varchar("token_hash", { length: 64 }).notNull(),
    kind: sessionKind("kind").notNull(),
    eventId: integer("event_id").references(() => events.id, {
      onDelete: "cascade",
    }),
    participantId: integer("participant_id").references(() => participants.id, {
      onDelete: "cascade",
    }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("sessions_token_hash_unique").on(table.tokenHash),
    index("sessions_participant_idx").on(table.participantId),
    check(
      "sessions_scope_matches_kind",
      sql`(${table.kind} = 'organizer' and ${table.eventId} is null and ${table.participantId} is null) or (${table.kind} = 'participant' and ${table.eventId} is not null and ${table.participantId} is not null)`,
    ),
  ],
);

export const legacyVoteImports = pgTable("legacy_vote_imports", {
  id: serial("id").primaryKey(),
  legacyVoteId: integer("legacy_vote_id"),
  reason: varchar("reason", { length: 120 }).notNull(),
  source: jsonb("source").notNull(),
  importedAt: timestamp("imported_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const organizerAuditLog = pgTable(
  "organizer_audit_log",
  {
    id: serial("id").primaryKey(),
    eventId: integer("event_id").references(() => events.id, {
      onDelete: "set null",
    }),
    action: varchar("action", { length: 80 }).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("organizer_audit_event_idx").on(table.eventId)],
);