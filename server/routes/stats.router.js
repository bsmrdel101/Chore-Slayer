const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Gets all of the user stats
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        SELECT * FROM "stats"
        WHERE "user_id" = $1;
    `
    const sqlValues = [
        req.user.id
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows[0]))
        .catch((dberror) => {
        console.log('Oops you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        SELECT new_user FROM "user"
        WHERE "id" = $1;
    `
    const sqlValues = [
        req.user.id
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows[0]))
        .catch((dberror) => {
        console.log('Oops you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        INSERT INTO "stats" ("games_won", "games_lost", "total_games", "cards_played", "total_damage", "total_block", "minions_slain", "times_surrendered", "highest_threat", "highest_block", "user_id")
        VALUES ('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', $1);
    `
    const sqlValues = [
        req.user.id
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Oops you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

// Sets new_user to false
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText =`
    UPDATE "user"
    SET "new_user" = false
    WHERE "id" = $1;
    `
    const sqlValues = [
        req.user.id
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.sendStatus(201))
        .catch((dberror) => {
          console.log('Oops you messed up DB error', dberror);
          res.sendStatus(500)
    })
});

// Updates stat
router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText =
    `
        UPDATE "stats"
        SET "games_won"=$1, "games_lost"=$3, "total_games"=$4, "cards_played"=$5, "total_damage"=$6, "total_block"=$7, "minions_slain"=$8, "times_surrendered"=$9, "highest_threat"=$10, "highest_block"=$11 
        WHERE "user_id" = $2;
    `
    const sqlValues = [
        req.body.games_won,
        req.user.id,
        req.body.games_lost,
        req.body.total_games,
        req.body.cards_played,
        req.body.total_damage,
        req.body.total_block,
        req.body.minions_slain,
        req.body.times_surrendered,
        req.body.highest_threat,
        req.body.highest_block
    ]

    pool.query(sqlText, sqlValues)
        .then((dbres) => res.sendStatus(201))
        .catch((dberror) => {
          console.log('Oops you messed up DB error', dberror);
          res.sendStatus(500)
    })
});



module.exports = router;