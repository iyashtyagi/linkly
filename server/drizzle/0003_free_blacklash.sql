ALTER TABLE "clicksTable" ALTER COLUMN "latitude" SET DATA TYPE varchar(15);--> statement-breakpoint
ALTER TABLE "clicksTable" ALTER COLUMN "longitude" SET DATA TYPE varchar(15);--> statement-breakpoint
ALTER TABLE "linksTable" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "usersTable" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "clicksTable" ADD CONSTRAINT "clicksTable_link_id_linksTable_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."linksTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linksTable" ADD CONSTRAINT "linksTable_user_id_usersTable_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."usersTable"("id") ON DELETE cascade ON UPDATE no action;