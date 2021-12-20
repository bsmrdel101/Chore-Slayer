const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/:card_id_one&:card_id_two&:card_id_three&:card_id_four&:card_id_five&:card_id_six&:card_id_seven', rejectUnauthenticated, (req, res) => {
    const sqlText = `
    SELECT * FROM "cards"
	JOIN "deck"
		ON "cards"."id"="deck"."card_id"
	WHERE "user_id"=$1 AND "card_id"=$2 OR "card_id"=$3 OR "card_id"=$4 OR "card_id"=$5 OR "card_id"=$6 OR "card_id"=$7 OR "card_id"=$8
    LIMIT 5;
    `
    const sqlValues = [
        req.user.id,
        req.params.card_id_one,
        req.params.card_id_two,
        req.params.card_id_three,
        req.params.card_id_four,
        req.params.card_id_five,
        req.params.card_id_six,
        req.params.card_id_seven
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

module.exports = router;