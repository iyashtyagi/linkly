ALTER TABLE "clicks" RENAME TO "clicksTable";--> statement-breakpoint
ALTER TABLE "links" RENAME TO "linksTable";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "usersTable";--> statement-breakpoint
ALTER TABLE "linksTable" DROP CONSTRAINT "links_slug_unique";--> statement-breakpoint
ALTER TABLE "usersTable" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "linksTable" ADD CONSTRAINT "linksTable_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "usersTable" ADD CONSTRAINT "usersTable_username_unique" UNIQUE("username");