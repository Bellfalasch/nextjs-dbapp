CREATE TYPE "public"."event_status" AS ENUM('draft', 'live', 'finished');--> statement-breakpoint
CREATE TYPE "public"."session_kind" AS ENUM('organizer', 'participant');--> statement-breakpoint
CREATE TABLE "beers_v2" (
	"id" serial PRIMARY KEY NOT NULL,
	"legacy_id" integer,
	"name" varchar(255) NOT NULL,
	"brewery" varchar(255),
	"description" text,
	"alcohol" numeric(4, 2),
	"price" numeric(10, 2),
	"image_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "beers_v2_alcohol_range" CHECK ("beers_v2"."alcohol" between 0 and 100),
	CONSTRAINT "beers_v2_price_nonnegative" CHECK ("beers_v2"."price" >= 0)
);
--> statement-breakpoint
CREATE TABLE "event_beers" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"beer_id" integer NOT NULL,
	"position" integer NOT NULL,
	"locked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "event_beers_position_positive" CHECK ("event_beers"."position" > 0)
);
--> statement-breakpoint
CREATE TABLE "event_invites" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"expires_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events_v2" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"event_date" timestamp with time zone,
	"currency" varchar(3) DEFAULT 'NOK' NOT NULL,
	"status" "event_status" DEFAULT 'draft' NOT NULL,
	"current_position" integer,
	"results_revealed_at" timestamp with time zone,
	"started_at" timestamp with time zone,
	"finished_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "legacy_vote_imports" (
	"id" serial PRIMARY KEY NOT NULL,
	"legacy_vote_id" integer,
	"reason" varchar(120) NOT NULL,
	"source" jsonb NOT NULL,
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizer_audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer,
	"action" varchar(80) NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "participants" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"legacy_user_id" integer,
	"display_name" varchar(80) NOT NULL,
	"normalized_name" varchar(80) NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"kind" "session_kind" NOT NULL,
	"event_id" integer,
	"participant_id" integer,
	"expires_at" timestamp with time zone NOT NULL,
	"revoked_at" timestamp with time zone,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_scope_matches_kind" CHECK (("sessions"."kind" = 'organizer' and "sessions"."event_id" is null and "sessions"."participant_id" is null) or ("sessions"."kind" = 'participant' and "sessions"."event_id" is not null and "sessions"."participant_id" is not null))
);
--> statement-breakpoint
CREATE TABLE "votes_v2" (
	"id" serial PRIMARY KEY NOT NULL,
	"legacy_id" integer,
	"event_id" integer NOT NULL,
	"event_beer_id" integer NOT NULL,
	"participant_id" integer NOT NULL,
	"taste" numeric(2, 1) NOT NULL,
	"design" numeric(2, 1) NOT NULL,
	"bonus" numeric(2, 1) NOT NULL,
	"note" text,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "votes_v2_taste_range_step" CHECK ("votes_v2"."taste" between 0 and 6 and mod("votes_v2"."taste", 0.5) = 0),
	CONSTRAINT "votes_v2_design_range_step" CHECK ("votes_v2"."design" between 0 and 6 and mod("votes_v2"."design", 0.5) = 0),
	CONSTRAINT "votes_v2_bonus_range_step" CHECK ("votes_v2"."bonus" between 0 and 3 and mod("votes_v2"."bonus", 0.5) = 0)
);
--> statement-breakpoint
ALTER TABLE "event_beers" ADD CONSTRAINT "event_beers_event_id_events_v2_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_v2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_beers" ADD CONSTRAINT "event_beers_beer_id_beers_v2_id_fk" FOREIGN KEY ("beer_id") REFERENCES "public"."beers_v2"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_invites" ADD CONSTRAINT "event_invites_event_id_events_v2_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_v2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizer_audit_log" ADD CONSTRAINT "organizer_audit_log_event_id_events_v2_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_v2"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_event_id_events_v2_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_v2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_event_id_events_v2_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_v2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes_v2" ADD CONSTRAINT "votes_v2_event_id_events_v2_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_v2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes_v2" ADD CONSTRAINT "votes_v2_event_beer_fk" FOREIGN KEY ("event_id","event_beer_id") REFERENCES "public"."event_beers"("event_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes_v2" ADD CONSTRAINT "votes_v2_participant_fk" FOREIGN KEY ("event_id","participant_id") REFERENCES "public"."participants"("event_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "beers_v2_legacy_id_unique" ON "beers_v2" USING btree ("legacy_id");--> statement-breakpoint
CREATE UNIQUE INDEX "event_beers_event_position_unique" ON "event_beers" USING btree ("event_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "event_beers_event_beer_unique" ON "event_beers" USING btree ("event_id","beer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "event_beers_event_id_id_unique" ON "event_beers" USING btree ("event_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "event_invites_token_hash_unique" ON "event_invites" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "event_invites_event_idx" ON "event_invites" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "organizer_audit_event_idx" ON "organizer_audit_log" USING btree ("event_id");--> statement-breakpoint
CREATE UNIQUE INDEX "participants_event_name_unique" ON "participants" USING btree ("event_id","normalized_name");--> statement-breakpoint
CREATE UNIQUE INDEX "participants_event_id_id_unique" ON "participants" USING btree ("event_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "participants_legacy_user_event_unique" ON "participants" USING btree ("event_id","legacy_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_hash_unique" ON "sessions" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "sessions_participant_idx" ON "sessions" USING btree ("participant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "votes_v2_participant_beer_unique" ON "votes_v2" USING btree ("participant_id","event_beer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "votes_v2_legacy_id_unique" ON "votes_v2" USING btree ("legacy_id");