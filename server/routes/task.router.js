const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`
    SELECT * FROM "tasks";
    `).then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

module.exports = router;
