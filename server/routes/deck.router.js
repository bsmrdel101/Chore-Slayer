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
        SELECT * FROM "deck"
        WHERE "user_id"=$1;
    `);
    const sqlValues = [
        req.user.id
    ];
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

router.post('/', (req, res) => {
    console.log(req.body.id);
    console.log(req.body.card);
    const sqlText = (`
        INSERT INTO "deck" ("user_id", "card_id")
        VALUES ($1, $2);
    `);
    const sqlValues = [
        req.body.id,
        req.body.card      
    ];
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows[0]))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

router.get('/:id', (req, res) => {
    const sqlText = (`
        SELECT "id" FROM "user"
        ORDER BY "id" DESC
        LIMIT 1;
    `);
    pool.query(sqlText)
        .then((dbres) => res.send(dbres.rows[0]))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

module.exports = router;