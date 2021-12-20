const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/:card1&:card2&:card3&:card4&:card5', rejectUnauthenticated, (req, res) => {
    // const sqlText = `
    // SELECT * FROM "cards"
	// JOIN "deck"
	// 	ON "cards"."id"="deck"."card_id"
	// WHERE "user_id"=$1 AND "card_id"=$2 OR "card_id"=$3 OR "card_id"=$4 OR "card_id"=$5 OR "card_id"=$6
    // LIMIT 5;
    // `
    const sqlText = `
    SELECT * FROM "cards"
	JOIN "deck"
		ON "cards"."id"="deck"."card_id"
	WHERE "user_id"=$1 AND "card_id"=$2 AND "user_id"=$1 OR "card_id"=$3 AND "user_id"=$1 OR "card_id"=$4 AND "user_id"=$1 OR "card_id"=$5 AND "user_id"=$1 OR "card_id"=$6 AND "user_id"=$1 
    LIMIT 5;
    `
    const sqlValues = [
        req.user.id,
        req.params.card1,
        req.params.card2,
        req.params.card3,
        req.params.card4,
        req.params.card5
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

module.exports = router;