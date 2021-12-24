import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Gets a random number
// Takes in parameters of min/max
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

// Saga GET route
function* fetchDeck(action) {
    try {
        const response = yield axios({
          method: 'GET',
          url: '/api/deck'
        })
        // Fill the hand with 5 random cards
        let baseHand;
        let modifiedHand;
        
        // Action.payload 1 is what identifies the initial dispatch
        if (action.payload === 1) {
            baseHand = [];
            modifiedHand = [];
        } else {
            // baseHand and modifiedHand are set to the current values of the deck and hand reducers
            baseHand = action.payload.deck;
            modifiedHand = [];
            for (let card of action.payload.hand) {
                modifiedHand.push(card.card_id);
            }
            console.log('Deck: ', baseHand, 'Hand: ', modifiedHand);
        }

        // If this is the initial dispatch then shuffle the deck and GET the cards
        // else fill the hand the max
        if (action.payload === 1) {
            for (let card of response.data) {
                baseHand.push(card.card_id);
            }
            shuffleArray(baseHand);
            console.log('deck reducer: ', response.data);
            console.log('**** Hand Process ****');
            for (let i = modifiedHand.length; i < 5; i++) {
                const card = baseHand[0];
                console.log('base hand: ', baseHand);
                console.log('card', card);
                baseHand.splice(0, 1);
                modifiedHand.push(card);
            }
            console.log('**** Outcome ****');
            console.log('modified hand', modifiedHand);
            console.log('base hand', baseHand);
        } else {
            for (let i = modifiedHand.length; i < 5; i++) {
              // Only lets the loop iterate one more time if there's 1 card left in the deck
              if (baseHand.length === 1) {
                i = 4;
              }
                const card = baseHand[0];
                console.log('base hand: ', baseHand);
                console.log('card', card);
                baseHand.splice(0, 1);
                modifiedHand.push(card);
            }
            console.log('**** Outcome ****');
            console.log('modified hand', modifiedHand);
            console.log('base hand', baseHand);
        }

      yield put({
        type: 'FETCH_HAND',
        payload: {card1: modifiedHand[0], card2: modifiedHand[1], card3: modifiedHand[2], card4: modifiedHand[3], card5: modifiedHand[4]}
      });

      yield put({
          type: 'GET_DECK',
          payload: baseHand
      })
    } catch(err) {
      console.error('GET error: ', err);
    }
}

function* deckSaga() {
    yield takeLatest('FETCH_DECK', fetchDeck);
  }
  
export default deckSaga;
