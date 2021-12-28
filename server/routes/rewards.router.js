const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`
    UPDATE "user"
    SET "newCard" = $1, "statIncrease" = $2
    WHERE "id" = $3;
    `
    const sqlValues = [
        req.body.newCard,
        req.body.statIncrease,
        req.user.id,  
    ]
    console.log('this is sqlValues', sqlValues);
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.sendStatus(201))
        .catch((dberror) => {
          console.log('Opps you messed up DB error', dberror);
          res.sendStatus(500)
    })
});

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        SELECT * FROM "history"
        WHERE "user_id"=$1;
    `
    const sqlValues = [
        req.user.id
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

module.exports = router;