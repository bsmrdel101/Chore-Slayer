const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`INSERT INTO "history" ("name", "description", "difficulty", "user_id")
      VALUES ($1, $2, $3, $4);`
    const sqlValues = [
        req.body.name,
        req.body.description,
        req.body.difficulty,
        req.user.id
    ]
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Opps you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

router.post('/:id', rejectUnauthenticated, (req, res) => {
  const sqlText =`INSERT INTO "tasks" ("name", "description", "difficulty", "user_id")
    VALUES ($1, $2, $3, $4);`
  const sqlValues = [
      req.body.name,
      req.body.description,
      req.body.difficulty,
      req.user.id
  ]
  pool.query(sqlText, sqlValues)
      .then((dbres) => res.send(dbres.rows))
      .catch((dberror) => {
      console.log('Opps you messed up DB error', dberror);
      res.sendStatus(500)
  })  
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // endpoint functionality
    const sqlText =`DELETE FROM "history" WHERE "id"=$1 AND "user_id"=$2`
      
    const sqlValues = [
      req.params.id, 
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