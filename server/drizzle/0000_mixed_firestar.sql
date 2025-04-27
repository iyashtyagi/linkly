CREATE TABLE "clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid NOT NULL,
	"ip" varchar(45),
	"country" varchar(90),
	"state" varchar(90),
	"city" varchar(90),
	"latitude" real,
	"longitude" real,
	"device" varchar(20),
	"orientation" varchar(20),
	"dark_mode" boolean,
	"os" varchar(50),
	"browser" varchar(50),
	"user_agent" varchar(500),
	"network" varchar(100),
	"language" varchar(10),
	"referrer" varchar(1000),
	"click_type" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"url" varchar(1000) NOT NULL,
	"slug" varchar(100) NOT NULL,
	CONSTRAINT "links_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"first_name" varchar(30) NOT NULL,
	"last_name" varchar(30) NOT NULL,
	"password" varchar(30) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
