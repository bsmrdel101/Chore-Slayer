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
        // Shuffle the rows of data
        let baseHand = [];
        let modifiedHand = [];

        for (let card of response.data) {
            baseHand.push(card.card_id);
        }
        shuffleArray(baseHand);
        console.log('deck reducer: ', response.data);
        console.log('**** Hand Process ****');
        for (let i = 0; i < 5; i++) {
            const card = baseHand[0];
            console.log('base hand: ', baseHand);
            console.log('card', card);
            baseHand.splice(0, 1);
            modifiedHand.push(card);
        }
        console.log('**** Outcome ****');
        console.log('modified hand', modifiedHand);
        console.log('base hand', baseHand);

      yield put({
        type: 'FETCH_HAND',
        payload: {card1: modifiedHand[0], card2: modifiedHand[1], card3: modifiedHand[2], card4: modifiedHand[3], card5: modifiedHand[4]}
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}

function* deckSaga() {
    yield takeLatest('FETCH_DECK', fetchDeck);
  }
  
export default deckSaga;
