import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
// import { useDispatch } from 'react-redux';

// const handleHandShuffle = (response) => {
//     response.forEach(card => {
//         baseHand.push(card.card_id);
//     });
//     shuffleArray(baseHand);
//     for (let i = 0; i < 5; i++) {
//         const card = baseHand[0];
//         baseHand.splice(0, 1);
//         discardPile.push(card);
//         modifiedHand.push(card);
//         console.log('modified hand', modifiedHand);
//     }
//     console.log('discardPile', discardPile);
// }

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

// const fetchHand = () => {
//     console.log('HERE', modifiedHand);
//     dispatch({
//         type: 'FETCH_HAND',
//         payload: {card1: modifiedHand[0], card2: modifiedHand[1], card3: modifiedHand[2], card4: modifiedHand[3], card5: modifiedHand[4]}
//     });
// }

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
        let discardPile = [];
        // const dispatch = useDispatch();

        for (let card of response.data) {
            baseHand.push(card.card_id);
        }
        shuffleArray(baseHand);
        for (let i = 0; i < 5; i++) {
            const card = baseHand[0];
            console.log('base hand: ', baseHand);
            console.log('card', card);
            baseHand.splice(0, 1);
            discardPile.push(card);
            modifiedHand.push(card);
        }
        console.log('discardPile', discardPile);
        console.log('modified hand', modifiedHand);

      yield put({
        // type: 'GET_DECK',
        // payload: response.data
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
