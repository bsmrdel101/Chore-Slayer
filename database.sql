-- Database name: chore_slayer

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "max_hp" INTEGER DEFAULT 15,
    "new_user" BOOLEAN DEFAULT true
);

CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) NOT NULL,
    "description" VARCHAR (1000),
    "difficulty" INTEGER,
    "complete" BOOLEAN DEFAULT false,
    "user_id" INTEGER REFERENCES "user"
);