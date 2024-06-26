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
	"type" BOOLEAN,
	"sport_name" VARCHAR(80) NOT NULL
);
CREATE TABLE "locations"(
"id" SERIAL PRIMARY KEY UNIQUE,
"city" VARCHAR(100),
"state" VARCHAR(2),
"zip" INTEGER
);
CREATE TABLE "teams" (
	"id" SERIAL PRIMARY KEY UNIQUE,
	"zip" INTEGER,
	"sport_id" INTEGER REFERENCES sports(id),
	"team_name" VARCHAR (100) NOT NULL,
	"location_id" INTEGER REFERENCES locations(id)
	);
CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY UNIQUE,
	"date" DATE,
	"team_id" INTEGER REFERENCES teams(id),
	"rating" INTEGER, 
	"comments" TEXT,
	"user_id" INTEGER REFERENCES "user"(id)
	);
CREATE TABLE "likes" (
	"id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user"(id),
    "comment_id" VARCHAR(50),  
);
