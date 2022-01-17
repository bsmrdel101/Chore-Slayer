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
    "new_user" BOOLEAN DEFAULT true,
    "needs_deck" BOOLEAN DEFAULT true
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

CREATE TABLE "stats" (
	"id" SERIAL PRIMARY KEY,
    "games_won" INTEGER DEFAULT 0,
    "games_lost" INTEGER DEFAULT 0,
    "total_games" INTEGER DEFAULT 0,
    "cards_played" INTEGER DEFAULT 0,
    "total_damage" INTEGER DEFAULT 0,
    "total_block" INTEGER DEFAULT 0,
    "minions_slain" INTEGER DEFAULT 0,
    "times_surrendered" INTEGER DEFAULT 0,
    "highest_threat" INTEGER DEFAULT 0,
    "highest_block" INTEGER  DEFAULT 0,
    "user_id" INTEGER REFERENCES "user"
);

-- Add cards
INSERT INTO "cards" ("name", "type", "token", "description", "cost", "block_amount", "attack_amount", "damage", "health", "rarity", "price")
VALUES 
('Minor Block', 'block', 'block-icon.png', NULL, '0', '1', NULL, NULL, NULL, 'Common', '0'),
('Shield', 'block', 'block-icon.png', NULL, '1', '2', NULL, NULL, NULL, 'Common', '0'),
('Major Block', 'block', 'block-icon.png', NULL, '2', '3', NULL, NULL, NULL, 'Uncommon', '25'),
('Block Swap', 'block', 'block-icon.png', 'Swap block with your opponent', '2', NULL, NULL, NULL, NULL, 'Uncommon', '25'),
('Break Formation', 'block', 'block-icon.png', 'Both players lose 3 block', '2', NULL, NULL, NULL, NULL, 'Common', '0'),
('Dagger', 'attack', 'attack-icon.png', NULL, '0', NULL, '1', NULL, NULL, 'Common', '0'),
('Longsword', 'attack', 'attack-icon.png', NULL, '2', NULL, '3', NULL, NULL, 'Common', '0'),
('Greataxe', 'attack', 'attack-icon.png', NULL, '3', NULL, '5', NULL, NULL, 'Common', '0'),
('Balista', 'attack', 'attack-icon.png', NULL, '5', NULL, '8', NULL, NULL, 'Rare', '80'),
('Slime', 'minion', 'minion-icon.png', 'Summons a (1/1) slime', '0', NULL, NULL, '1', '1', 'Common', '0'),
('Orc', 'minion', 'minion-icon.png', 'Summons a (3/6) slime', '4', NULL, NULL, '3', '6', 'Uncommon', '25'),
('Robotic Spider', 'minion', 'minion-icon.png', 'Summons a (2/1) spider bot', '1', NULL, NULL, '2', '1', 'Common', '0'),
('Mammoth', 'minion', 'minion-icon.png', 'Summons a (6/6) mammoth', '5', NULL, NULL, '6', '6', 'Rare', '100'),
('Wolf', 'minion', 'minion-icon.png', 'Summons a (4/2) wolf', '3', NULL, NULL, '4', '2', 'Common', '0'),
('Bear', 'minion', 'minion-icon.png', 'Summons a (2/4) bear', '3', NULL, NULL, '2', '4', 'Common', '0'),
('Coward', 'block', 'block-icon.png', 'If the enemy has 5 or more minions gain 5 block', '3', NULL, NULL, NULL, NULL, 'Uncommon', '50'),
('Sweep', 'attack', 'attack-icon.png', 'Damages a random amount of enemies', '3', NULL, '2', NULL, NULL, 'Uncommon', '50'),
('Restart', 'attack', 'attack-icon.png', 'Kills all minions', '5', NULL, NULL, NULL, NULL, 'Very Rare', '250'),
('Dragon', 'minion', 'minion-icon.png', 'Requires 5 minions on board to sacrifice before being summoned. Summons a (9/9) Dragon', '5', NULL, NULL, '9', '9', 'Legendary', '500'),
('Cleric', 'minion', 'minion-icon.png', 'Heals you for 3 health when summoned. Summons a (3/3) cleric', '2', NULL, NULL, '3', '3', 'Uncommon', '50'),
('Rebound', 'attack', 'attack-icon.png', 'Deals damage equal to the round number, but also deals that much damage to you.', '1', NULL, NULL, NULL, NULL, 'Rare', '100'),
('Tower Shield', 'block', 'block-icon.png', 'Doubles your block (max 12)', '3', NULL, NULL, NULL, NULL, 'Legendary', '400'),
('Rejuvinate', 'block', 'block-icon.png', 'Removes all your block, but heals you for that much (max 6)', '2', NULL, NULL, NULL, NULL, 'Very Rare', '200'),
('Slime Machine', 'minion', 'minion-icon.png', 'Summons a (0/8) Slime Machine, which summons a (1/1) slime at the end of your turn, for each turn this minion is alive.', '3', NULL, NULL, '0', '8', 'Very Rare', '250');
