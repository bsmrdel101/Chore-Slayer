import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga GET route
// Retrieves the 5 random cards selected from the database
function* fetchHand(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/enemyHand/${action.payload.card1}&${action.payload.card2}&${action.payload.card3}&${action.payload.card4}&${action.payload.card5}`
      })
      yield put({
        type: 'GET_ENEMY_HAND',
        payload: response.data
      });
    } catch(err) {
      console.error('GET error: ', err);
    }
}


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

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Saga GET route
function* fetchDeck(action) {
    try {
        const response = yield axios({
          method: 'GET',
          url: '/api/enemyDeck'
        })
        // Fill the hand with 5 random cards
        let baseHand;
        let modifiedHand;
        
        // Action.payload 1 is what identifies the initial dispatch
        if (action.payload.id === 1) {
            baseHand = [];
            modifiedHand = [];
        } else {
            // baseHand and modifiedHand are set to the current values of the deck and hand reducers
            baseHand = action.payload.deck;
            modifiedHand = [];
            for (let card of action.payload.hand) {
                modifiedHand.push(card.card_id);
            }
            console.log('Enemy Deck: ', baseHand, 'Enemy Hand: ', modifiedHand);
        }

        // If this is the initial dispatch then shuffle the deck and GET the cards
        // else fill the hand the max
        if (action.payload.id === 1) {
            for (let card of response.data) {
                baseHand.push(card.card_id);
            }
            shuffleArray(baseHand);
            console.log('Enemy deck: ', response.data);
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
              if (baseHand.length === 0) {
                let int = getRandomInt(0, response.data.length);
                while (int === 3) {
                  int = getRandomInt(0, response.data.length);
                }
                baseHand.push(response.data[int].card_id);
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

        // AI turn handler
        // Scores for different actions will be added up conditionally
        // AI executes the action with the highest score at the end
        for (let card of action.payload.enemyHand) {
            if (card.cost <= action.payload.enemy.energy) {
              let blockScore = 0;
              let attackScore = 0;
              let minionScore = 0;
              let selectedCard = 0;
              let highestScore = 0;
              
              for (let card of action.payload.enemyHand) { 
                  switch (card.type) {
                      case 'block':
                          blockScore = 1;
                          break;
                      case 'attack':
                          attackScore = 1;
                          break;
                      case 'minion':
                          minionScore = 1;
                          break;
                      default:
                          break;
                  }
              }
              if (attackScore > 0) {
                  switch (true) {
                    case action.payload.playerBoard.length === 0:
                      attackScore -= 50;
                      break;
                      case action.payload.playerBoard.length === 1:
                          attackScore += 1;
                          break;
                      case action.payload.playerBoard.length > 2:
                          attackScore += 4; 
                          break;
                      default:
                          break;
                  }
              }
              
              if (blockScore > 0) {
                  switch (true) {
                      case action.payload.enemy.threat >= action.payload.player.threat:
                          blockScore -= 3;
                          break;
                      case enemy.block === 0:
                          blockScore += 2;
                      default:
                          break;
                  }
              }
      
              if (minionScore > 0) {
                  if (action.payload.enemyBoard.length === 0) {
                      minionScore += 3;
                  }
                  if (action.payload.playerBoard.length > 2) {
                      minionScore += 3;
                  }
                  if (action.payload.playerBoard.length === 0) {
                      minionScore += 1;
                  }
              }
      
              console.log(blockScore, attackScore, minionScore);
      
              // Adds up the scores to see what type of card it will be
              let cardType = '';
              if (attackScore > highestScore) {
                  cardType = 'attack';
                  highestScore = attackScore;
                  attackScore = 0;
              }
              if (blockScore > highestScore) {
                  cardType = 'block';
                  highestScore = blockScore;
                  blockScore = 0;
              }
              if (minionScore > highestScore) {
                  cardType = 'minion';
                  highestScore = minionScore;
                  minionScore = 0
              }
              console.log(cardType);

              // Determines what type of block card will get played
              if (cardType === 'block') {
                  switch (card.card_id) {
                      case 5:
                          let blockDiff = action.payload.player.block - action.payload.enemy.block;
                          if (blockDiff > 1) {
                              selectedCard = card.card_id;
                              console.log(card.name);
                          }
                          break;
                      case 6:
                          if (action.payload.player.block > 5 || action.payload.player.block >= 3 && action.payload.enemy.block < 3) {
                              selectedCard = card.card_id;
                              console.log(card.name);
                          }
                          break;
                      default:
                          selectedCard = card.card_id;
                          console.log(card.name);
                          break;
                  }
              }
              // Determines what type of attack card will get played
              if (cardType === 'attack') {
                  selectedCard = card.card_id;
                  console.log(card.name);
              }
              // Determines what type of minion card will get played
              if (cardType === 'minion') {
                  selectedCard = card.card_id;
                  console.log(card.name);
              }
              console.log(blockScore, attackScore, minionScore, 'Card: ', selectedCard);
              console.log('-----');

              // Play the selected card
              let index = 0;
                for (let card of action.payload.enemyHand) {
                    if (card.card_id === selectedCard) {
                        console.log('AI plays: ', card);
                        switch (card.type) {
                            case 'block':
                                if (card.block_amount) {
                                  yield put({
                                    type: 'ADD_ENEMY_BLOCK',
                                    payload: card.block_amount
                                  });
                                }
                                switch (card.card_id) {
                                    case 5: // Swap block
                                        yield put({type: 'SWAP_PLAYER_BLOCK'})
                                        break;
                                    case 6: // Break formation
                                        console.log('TODO: Break Formation');
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case 'attack':
                                if (action.payload.playerBoard.length > 0) {
                                  let lowestHp = 50;
                                  let minionId;
                                  for (let minion of action.payload.playerBoard) {
                                    if (minion.health < lowestHp) {
                                      minionId = minion.card_id;
                                      lowestHp = minion.health;
                                    }
                                  }
                                  yield put({
                                    type: 'ATTACK_PLAYER_MINION',
                                    payload: {id: minionId, attack: card.attack_amount}
                                  })
                                } else {
                                  console.log('* Player had no minions to attack *');
                                }
                                break;
                            case 'minion':
                              yield put({
                                type: 'SUMMON_ENEMY_MINION',
                                payload: {damage: card.damage, health: card.health}
                              })
                              yield put({
                                  type: 'ADD_ENEMY_THREAT',
                                  payload: card.damage
                              })
                                break;
                            default:
                                break;
                        }
                        yield put({
                          type: 'SELECT_ENEMY_CARD',
                          payload: index
                        })
                    }
                    index++;
                }
                yield put({
                  type: 'REMOVE_ENEMY_ENERGY',
                  payload: card.cost
                })
            }
        } // End of loop

      yield put({
        type: 'FETCH_ENEMY_HAND',
        payload: {card1: modifiedHand[0], card2: modifiedHand[1], card3: modifiedHand[2], card4: modifiedHand[3], card5: modifiedHand[4]}
      });

      yield put({
          type: 'GET_ENEMY_DECK',
          payload: baseHand
      })

    } catch(err) {
      console.error('GET error: ', err);
    }
}

function* enemySaga() {
    yield takeLatest('FETCH_ENEMY_DECK', fetchDeck);
    yield takeLatest('FETCH_ENEMY_HAND', fetchHand);
  }
  
export default enemySaga;
