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
router.put('/', rejectUnauthenticated, (req, res) => {
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


module.exports = router;