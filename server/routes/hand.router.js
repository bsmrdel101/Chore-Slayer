const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/:card_id', rejectUnauthenticated, (req, res) => {
    const sqlText = `
    SELECT * FROM "cards"
	JOIN "deck"
		ON "cards"."id"="deck"."card_id"
	WHERE "user_id"=$1 AND "card_id"=$2
    LIMIT 5;
    `
    const sqlValues = [
        req.user.id,
        req.params.card_id
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

module.exports = router;