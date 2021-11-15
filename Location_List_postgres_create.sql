CREATE TABLE "public.user" (
	"id" serial NOT NULL,
	"username" varchar(32) NOT NULL UNIQUE,
	"password" varchar(64) NOT NULL,
	"email" varchar(64) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.stores" (
	"id" serial NOT NULL,
	"name" varchar(32) NOT NULL,
	"address" varchar(32) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip" int(10) NOT NULL,
	"store_number" int NOT NULL,
	CONSTRAINT "stores_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.items" (
	"id" serial NOT NULL,
	"keyword_search" varchar(32) NOT NULL,
	"product_description" varchar(255) NOT NULL,
	"store_id" int NOT NULL,
	"asile_id" int NOT NULL,
	"hidden" BOOLEAN NOT NULL DEFAULT 'false',
	"TCIN" int NOT NULL,
	"x" int NOT NULL,
	"y" int NOT NULL,
	CONSTRAINT "items_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.lists" (
	"id" serial NOT NULL,
	"list_name" varchar(32) NOT NULL,
	CONSTRAINT "lists_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.department" (
	"id" serial NOT NULL,
	"name" varchar(16) NOT NULL,
	"aisle" varchar(16) NOT NULL,
	"store_id" serial NOT NULL,
	CONSTRAINT "department_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.list_items" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"list_id" int NOT NULL,
	"item_id" int NOT NULL,
	CONSTRAINT "list_items_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("store_id") REFERENCES "stores"("id");


ALTER TABLE "department" ADD CONSTRAINT "department_fk0" FOREIGN KEY ("aisle") REFERENCES "items"("asile_id");
ALTER TABLE "department" ADD CONSTRAINT "department_fk1" FOREIGN KEY ("store_id") REFERENCES "stores"("id");

ALTER TABLE "list_items" ADD CONSTRAINT "list_items_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_fk1" FOREIGN KEY ("list_id") REFERENCES "lists"("id");
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_fk2" FOREIGN KEY ("item_id") REFERENCES "items"("id");







