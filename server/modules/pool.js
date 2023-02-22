/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/

const pg = require('pg');
// const url = require('url');

// let config = {};

const conString = "postgres://lfjcmypu:Wmqk2bE2ximq3szw8mQnuSZh0vgMIkCY@suleiman.db.elephantsql.com/lfjcmypu"
const pool = new pg.Client(conString);
pool.connect((err) => {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  pool.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    // pool.end();
  });
});

// if (process.env.DATABASE_URL) {
//   // Heroku gives a url, not a connection object
//   // https://github.com/brianc/node-pg-pool
//   const params = url.parse(process.env.DATABASE_URL);
//   const auth = params.auth.split(':');

//   config = {
//     user: auth[0],
//     password: auth[1],
//     host: params.hostname,
//     port: params.port,
//     database: params.pathname.split('/')[1],
//     ssl: { rejectUnauthorized: false },
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//   };
// } else {
//   config = {
//     host: 'localhost', // Server hosting the postgres database
//     port: 5432, // env var: PGPORT
//     database: 'chore_slayer', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//   };
// }

// this creates the pool that will be shared by all other modules
// const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
// pool.on('error', (err) => {
//   console.log('Unexpected error on idle client', err);
//   process.exit(-1);
// });

module.exports = pool;
