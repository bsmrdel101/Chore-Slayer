const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT "needs_deck" FROM "user"
        WHERE "id"=$1;
    `);
    const sqlValues = [
        req.user.id
    ];
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows[0]))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        INSERT INTO "deck" ("user_id", "card_id")
        VALUES ($1, 5),
        ($1, 9),
        ($1, 10),
        ($1, 12),
        ($1, 4),
        ($1, 2),
        ($1, 8),
        ($1, 21),
        ($1, 13),
        ($1, 15),
        ($1, 11),
        ($1, 7),
        ($1, 6),
        ($1, 16),
        ($1, 17);
    `);
    const sqlValues = [
        req.user.id, 
    ];
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows[0]))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText =
    `
        UPDATE "user"
        SET "needs_deck" = false
        WHERE "id" = $1;
    `
    const sqlValues = [
        req.user.id
    ]
    console.log('this is sqlValues', sqlValues);
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.sendStatus(201))
        .catch((dberror) => {
          console.log('Opps you messed up DB error', dberror);
          res.sendStatus(500)
    })
});

module.exports = router;