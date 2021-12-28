const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const taskRouter = require('./routes/task.router');
const handRouter = require('./routes/hand.router');
const deckRouter = require('./routes/deck.router');
const historyRouter = require('./routes/history.router');
const rewardsRouter = require('./routes/rewards.router');
const enemyDeckRouter = require('./routes/enemyDeck.router');
const enemyHandRouter = require('./routes/enemyHand.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/hand', handRouter);
app.use('/api/deck', deckRouter);
app.use('/api/history', historyRouter);
app.use('/api/rewards', rewardsRouter);
app.use('/api/enemyHand', enemyHandRouter);
app.use('/api/enemyDeck', enemyDeckRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
