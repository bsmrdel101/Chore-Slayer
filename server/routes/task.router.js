const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
    SELECT * FROM "tasks" WHERE "user_id"=$1;
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

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`INSERT INTO "tasks" ("name", "description", "difficulty", "user_id")
      VALUES ($1, $2, $3, $4);`
    const sqlValues = [
        req.body.name,
        req.body.description,
        req.body.difficulty,
        req.user.id
    ]

     pool.query(sqlText, sqlValues)
      .then((dbres) => res.sendStatus(201))
      .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
      })   
    // endpoint functionality
  });

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const sqlText =`DELETE FROM "tasks" WHERE "id"=$1 AND "user_id"=$2`
    
  const sqlValues = [
    req.params.id, 
    req.user.id,     
  ]

   pool.query(sqlText, sqlValues)
    .then((dbres) => res.sendStatus(201))
    .catch((dberror) => {
      console.log('Opps you messed up DB error', dberror);
      res.sendStatus(500)
    })   
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText =`
    UPDATE "tasks"
    SET "name" = $1, "description" = $2
    WHERE "id" = $3;
    `
    const sqlValues = [
        req.body.name,
        req.body.description,
        req.params.id,  
    ]

    pool.query(sqlText, sqlValues)
        .then((dbres) => res.sendStatus(201))
        .catch((dberror) => {
          console.log('Opps you messed up DB error', dberror);
          res.sendStatus(500)
    })
});

module.exports = router;
