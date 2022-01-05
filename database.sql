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
    "coins" INTEGER DEFAULT 0,
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

CREATE TABLE "history" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) NOT NULL,
    "description" VARCHAR (1000),
    "difficulty" INTEGER,
    "newCard" INTEGER DEFAULT 0,
    "user_id" INTEGER REFERENCES "user"
);

CREATE TABLE "cards" (
	"id" SERIAL PRIMARY KEY,
    "name" TEXT,
    "type" TEXT,
    "token" TEXT,
    "description" TEXT,
    "cost" INTEGER,
    "block_amount" INTEGER,
    "attack_amount" INTEGER,
    "damage" INTEGER,
    "health" INTEGER,
    "rarity" TEXT,
    "price" INTEGER    
);

CREATE TABLE "deck" (
	"id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "card_id" INTEGER REFERENCES "cards"
);

CREATE TABLE "hand" (
	"id" SERIAL PRIMARY KEY,
    "hand_user_id" INTEGER REFERENCES "user",
    "hand_card_id" INTEGER REFERENCES "cards",
    "deck_id" INTEGER REFERENCES "deck"
);


-- Add card data to table

INSERT INTO "cards" ("name", "type", "token", "description", "cost", "block_amount", "attack_amount", "damage", "health")
VALUES 
('Break Formation', 'block', 'shield_token.png', 'Both players lose 3 block', '2', '0', '0', '0', '0');