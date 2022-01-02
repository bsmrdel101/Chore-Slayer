const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Adds coins
router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`
    UPDATE "user"
    SET "coins" = $1
    WHERE "id" = $2;
    `
    const sqlValues = [
        req.body.coins,
        req.user.id,  
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.sendStatus(201))
        .catch((dberror) => {
          console.log('Oops you messed up DB error', dberror);
          res.sendStatus(500)
    })
});

// Subtracts coins
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText =`
    UPDATE "user"
    SET "coins" = $1
    WHERE "id" = $2;
    `
    const sqlValues = [
        req.body.coins,
        req.user.id,  
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.sendStatus(201))
        .catch((dberror) => {
          console.log('Oops you messed up DB error', dberror);
          res.sendStatus(500)
    })
});

router.get('/', (req, res) => {
    const sqlText =`
        SELECT "coins" FROM "user"
        WHERE "id" = $1;
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


module.exports = router;