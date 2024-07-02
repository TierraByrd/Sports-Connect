-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INTEGER
);
CREATE TABLE "sports" (
	"id" SERIAL PRIMARY KEY UNIQUE,
	"sport_name" VARCHAR(80) NOT NULL,
	"sport_description" TEXT,
	"sport_type" VARCHAR(10) CHECK ("sport_type" IN ('team','single'))
	);
	
CREATE TABLE "locations"(
"id" SERIAL PRIMARY KEY UNIQUE,
"city" VARCHAR(100),
"state" VARCHAR(2),
"zip" INTEGER
);
CREATE TABLE "teams" (
	"id" SERIAL PRIMARY KEY UNIQUE,
	"sport_id" INTEGER REFERENCES "sports"("id"),
	"team_name" VARCHAR (100) NOT NULL,
	"location_id" INTEGER REFERENCES "locations"("id"),
	"coach_name" VARCHAR(100),
	"contact_info" TEXT,
	"current_rating" NUMERIC(3,2) DEFAULT 0.00
	);
CREATE TABLE "reviews" (
	"id" SERIAL PRIMARY KEY UNIQUE,
	"date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"team_id" INTEGER REFERENCES "teams"("id"),
	"rating" INTEGER CHECK (rating >= 1 AND rating <= 5), 
	"comments" TEXT,
	"user_id" INTEGER REFERENCES "user"("id")
	);
CREATE TABLE "likes" (
	"id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user"("id"),
    "review_id" INTEGER REFERENCES "reviews"("id") 
);