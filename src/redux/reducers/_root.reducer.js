import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import taskReducer from './task.reducer';
import hand from './playerHand.reducer';
import playerBoard from './playerBoard.reducer';
import enemyBoard from './enemyBoard.reducer';
import deckReducer from './deck.reducer';
import playerStatBlock from './playerStatBlock.reducer';
import enemyStatBlock from './EnemyStatBlock.reducer';
import enemyHand from './enemyHand.reducer';
import enemyDeck from './enemyDeck.reducer';
import taskHistoryReducer from './taskHistory.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  taskReducer,
  hand,
  playerBoard,
  enemyBoard,
  deckReducer,
  playerStatBlock,
  enemyStatBlock,
  enemyHand,
  enemyDeck,
  taskHistoryReducer
});

export default rootReducer;
