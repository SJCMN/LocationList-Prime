
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "lists" (
	"id" serial NOT NULL PRIMARY KEY,
	"list_name" varchar(32) NOT NULL
);

CREATE TABLE "list_items" (
	"id" serial NOT NULL PRIMARY KEY,
	"user_id" int REFERENCES "user"("id") NOT NULL,
	"list_id" int REFERENCES "lists"("id") NOT NULL,
	"item_id" int REFERENCES "items"("id") NOT NULL
);

CREATE TABLE "items" (
	"id" serial NOT NULL PRIMARY KEY,
	"keyword_search" varchar(32) NOT NULL,
	"product_description" varchar(255) NOT NULL,
	"store_id" int NOT NULL,
	"department" VARCHAR(4),
	"asile_id" int NOT NULL,
	"hidden" BOOLEAN NOT NULL DEFAULT 'false',
	"TCIN" int NOT NULL,
	"x" int NOT NULL,
	"y" int NOT NULL
);



CREATE TABLE "stores" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(32) NOT NULL,
	"address" varchar(32) NOT NULL,
	"city" varchar(32) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip" int NOT NULL,
	"store_number" int NOT NULL
);


CREATE TABLE "department" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" varchar(16) NOT NULL,
	"aisle" varchar(16) NOT NULL,
	"store_id" int REFERENCES "stores" NOT NULL
);

