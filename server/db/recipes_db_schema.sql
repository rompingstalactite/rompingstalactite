CREATE TABLE "users" (
  "id" SERIAL NOT NULL UNIQUE,
  "username" VARCHAR(255) UNIQUE,
  "facebook_id" VARCHAR(255) UNIQUE,
  "google_id" VARCHAR(255) UNIQUE,
  "created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "display_name" VARCHAR(255),
  "avatar" VARCHAR(255),
  "email" VARCHAR(255),
  "google_access_token" VARCHAR(255),
  "active" BOOLEAN DEFAULT true,
  CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "recipes" (
	"id" SERIAL NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
  "updated_at" TIMESTAMP NOT NULL DEFAULT current_timestamp,
	"title" TEXT NOT NULL,
	-- will need to make author NOT NULL in future implementation
  "author" integer,
  "parent" integer,
  "images" TEXT[] NOT NULL,
  "followers" TEXT[] NOT NULL,
  "yield" integer NOT NULL,
  "yield_unit" TEXT NOT NULL,
  "ingredients" TEXT[] NOT NULL,
  "prep_time" integer NOT NULL,
  "prep_steps" TEXT[] NOT NULL,
  "cook_time" integer NOT NULL,
  "cook_steps" TEXT[] NOT NULL,
  "finish_steps" TEXT[] NOT NULL,
  "tags" TEXT[] NOT NULL,
	CONSTRAINT recipes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "images_recipes" (
	"image_id" integer NOT NULL,
	"recipe_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "images" (
	"id" SERIAL NOT NULL UNIQUE,
	"timestamp" TIMESTAMP NOT NULL,
	"image" BYTEA NOT NULL,
	CONSTRAINT images_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favorites_recipes_users" (
	"recipe_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"favorite_date" TIMESTAMP NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "followers_users_users" (
	"user" integer NOT NULL,
	"target" integer NOT NULL
) WITH (
  OIDS=FALSE
);


ALTER TABLE "recipes" ADD CONSTRAINT "recipes_fk0" FOREIGN KEY ("parent") REFERENCES "recipes"("id");
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_fk1" FOREIGN KEY ("author") REFERENCES "users"("id");

ALTER TABLE "images_recipes" ADD CONSTRAINT "images_recipes_fk0" FOREIGN KEY ("image_id") REFERENCES "images"("id");
ALTER TABLE "images_recipes" ADD CONSTRAINT "images_recipes_fk1" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id");

ALTER TABLE "favorites_recipes_users" ADD CONSTRAINT "favorites_recipes_users_fk0" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id");
ALTER TABLE "favorites_recipes_users" ADD CONSTRAINT "favorites_recipes_users_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "followers_users_users" ADD CONSTRAINT "followers_users_users_fk0" FOREIGN KEY ("user") REFERENCES "users"("id");
ALTER TABLE "followers_users_users" ADD CONSTRAINT "followers_users_users_fk1" FOREIGN KEY ("target") REFERENCES "users"("id");

