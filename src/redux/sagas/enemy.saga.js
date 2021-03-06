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

// Decides what card will be played after the specific card type has been decided
function cardDecider() {
  
}

// Saga GET route
function* handleEnemyTurn(action) {
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
        
        // ----- AI turn handler -----
        // Scores for different actions will be added up conditionally
        // Actions with the highest scores are given more priority
        console.log('***** AI Handler *****'); 

        let enemyHand = [];
        let energy = action.payload.enemy.energy
        const enemy = action.payload.enemy
        const enemyBoard = action.payload.enemyBoard
        const playerBoard = action.payload.playerBoard
        const player = action.payload.player
        const round = action.payload.round

        // Initializes enemy hand
        console.log(response.data);
        for (let card of response.data) {
          for (let modifiedId of modifiedHand) {
            if (card.card_id === modifiedId) {
              enemyHand.push(card);
            }
          }
        }

        for (let card of enemyHand) {
            if (card.cost <= energy) {
              let blockScore = 0;
              let attackScore = 0;
              let minionScore = 0;
              let selectedCard = 0;
              let highestScore = 0;

              let lowestHp = 50;
              let minionId;

              for (let card of enemyHand) { 
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
              console.log('block',blockScore,'atk', attackScore,'minion', minionScore);

              console.log('block before', blockScore);
              // Switch statements don't work because it breaks after one condition is met
              if (blockScore > 0) {
                if (enemy.threat >= player.threat) {
                  blockScore -= 1;
                  console.log('enemy threat > player  -1');
                }
                if (enemy.block === 0) {
                  blockScore += 2;
                  console.log('Have no block  +2');
                } 
                if (enemy.block < 4 && round > 5) {
                  blockScore += 3;
                  console.log('< 4 block after round 5  +3');
                }
              }
              console.log('block after', blockScore);

              console.log('attack before', attackScore);
              /* Card type deciders */
              if (attackScore > 0) {
                if (playerBoard.length === 0) {
                  attackScore -= 50;
                  console.log('No player minions  -50');
                }
                if (playerBoard.length === 1) {
                  attackScore += 1;
                  console.log('1 player minion  +1');
                }
                if (playerBoard.length > 2) {
                  attackScore += 4; 
                  console.log('More than 2 player minions  +4');
                }
              }
              console.log('attack after', attackScore);
      
              console.log('minion before', minionScore);
              if (minionScore > 0) {
                  if (enemyBoard.length === 0) {
                      minionScore += 4;
                      console.log('no enemy minions  +4');
                  }
                  if (playerBoard.length > 2) {
                      minionScore += 1;
                      console.log('more than 2 player minions  +1');
                  }
                  if (playerBoard.length === 0) {
                      minionScore += 5;
                      console.log('no player minions  +5');
                  }
                  if (enemyBoard.length >= 5) {
                      minionScore -= 100;
                      console.log('5 or more enemy minions  -100');
                  }
                  if (player.block < 3 && playerBoard.length < 4) {
                    minionScore += 3;
                    console.log('player block < 3 && < 4 player minions  +3');
                  }
                  if (player.block === 0) {
                    minionScore += 2;
                    console.log('no player block  +2');
                  }
              }
              console.log('minion after', minionScore);
              // End of card type deciders
      
              console.log('Type scores: ', blockScore, attackScore, minionScore);
      
              // Adds up the scores to see what type of card it will be
              let cardType = '';
              if (attackScore > highestScore) {
                  cardType = 'attack';
                  highestScore = attackScore;
              }
              if (blockScore > highestScore) {
                  cardType = 'block';
                  highestScore = blockScore;
              }
              if (minionScore > highestScore) {
                  cardType = 'minion';
                  highestScore = minionScore;
              }
              console.log('-----'); 
              console.log('Card type: ', cardType);

              // Determines what type of block card will get played
              if (cardType === 'block') {
                console.log('Inside block!');
                  switch (card.card_id) {
                      case 23:
                          selectedCard = card.card_id;
                          console.log(card.name);
                          break;
                      case 5:
                          let blockDiff = player.block + 2;
                          console.log(blockDiff, enemy.block);
                          if (blockDiff > enemy.block) {
                              selectedCard = card.card_id;
                              console.log(card.name);
                          }
                          break;
                      case 6:
                          if (player.block > 5 || player.block >= 3 && enemy.block < 3) {
                              selectedCard = card.card_id;
                              console.log(card.name);
                          }
                          break;
                      case 17:
                          if (playerBoard >= 5) {
                            selectedCard = card.card_id;
                            console.log(card.name);
                          }
                          break;
                      case 24:
                          if (enemy.block >= 5) {
                            selectedCard = card.card_id;
                            console.log(card.name);
                          }
                          break;
                      default:          
                          for (let card of enemyHand) {
                            if (card.type === 'block' && energy >= card.cost) {
                              selectedCard = card.card_id;
                              console.log(card.name);
                              break;
                            }
                          }
                          break;
                  }
              }
              // Determines what type of attack card will get played
              if (cardType === 'attack') {
                console.log('Inside attack!');
                for (let card of enemyHand) {
                  console.log(card);
                  if (card.type === 'attack') {
                    if (energy >= card.cost) {
                      selectedCard = card.card_id;
                      console.log(card.name);
                      break;
                    }
                  }
                }
                console.log(selectedCard);

                // Checks if there wasn't a compatible attack card to play
                // if there isn't then select the cardType with the next highest score
                if (selectedCard === 0) {
                  blockScore > minionScore ? cardType = 'block' : cardType = 'minion';
                  console.log(cardType);
                }
              }
              // Determines what type of minion card will get played
              if (cardType === 'minion') {
                console.log('Inside minion!');
                switch (card.card_id) {
                  case 14:
                    if (energy >= card.cost) {
                      selectedCard = card.card_id;
                      console.log(card.name);
                      break;
                    }
                  case 20:
                    if (enemyBoard.length >= 5) {
                      selectedCard = card.card_id;
                      console.log(card.name);
                      break;
                    }
                  case 21:
                    if (enemy.health <= 17) {
                      selectedCard = card.card_id;
                      console.log(card.name);
                      break;
                    }
                  default:
                    for (let card of enemyHand) {
                      if (card.type === 'minion' && energy >= card.cost) {
                        selectedCard = card.card_id;
                        console.log(card.name);
                        break;
                      }
                    }
                    break;
                }
              }
              console.log(blockScore, attackScore, minionScore, 'Card: ', selectedCard);
              console.log('-----');

              // Play the selected card
              let index = 0;
              let energyCard = 0;
                for (let card of enemyHand) {
                    if (card.card_id === selectedCard) {
                        energyCard = card;
                        switch (card.type) {
                            // Block card handler
                            case 'block':
                                yield put({type: 'ADD_ACTION', payload: {name: card.name, type: 'enemy'}});
                                if (card.block_amount) {
                                  yield put({
                                    type: 'ADD_ENEMY_BLOCK',
                                    payload: card.block_amount
                                  });
                                }
                                switch (card.card_id) {
                                    case 5: // Swap block
                                        yield put({type: 'SWAP_BLOCK', payload: {enemyBlock: enemy.block, playerBlock: player.block}});
                                        break;
                                    case 6: // Break formation
                                        yield put({type: 'BREAK_FORMATION'});
                                        break;
                                    case 17: // Coward
                                        yield put({type: 'ENEMY_COWARD', payload: playerBoard.length});
                                    break;
                                    case 23: // Tower shield
                                        yield put({
                                            type: 'DOUBLE_ENEMY_BLOCK'
                                        });
                                        break;
                                    case 24: // Rejuvenate
                                        yield put({
                                            type: 'REJUVENATE_ENEMY'
                                        });
                                        break;
                                    default:
                                        break;
                                }
                                break;

                            // Attack card handler
                            case 'attack':
                                yield put({type: 'ADD_ACTION', payload: {name: card.name, type: 'enemy'}});
                                switch (card.card_id) {
                                  case 18: // Sweep
                                    let i = 0
                                    if (playerBoard.length > 0) {
                                      for (let minion of playerBoard) {
                                        minionId = minion.card_id;
                                        // Deals the 2 damage to all player minions
                                        console.log('SWEEP BEFORE', minion);
                                        yield put({
                                          type: 'SWEEP_PLAYER_MINION',
                                          payload: {id: minionId, attack: card.attack_amount, board: playerBoard, index: i}
                                        })
                                        i++;
                                        console.log('SWEEP AFTER', minion);
                                      }
                                    } else {
                                      console.log('* Player had no minions to attack *');
                                    }
                                    break;
                                  case 19: // Restart
                                    if (playerBoard.length > 0) {
                                      yield put({
                                        type: 'RESTART_ATTACK'
                                      });
                                    } else {
                                      console.log('* Player had no minions to attack *');
                                    }
                                    break;
                                  case 22: // Rebound  
                                    yield put({
                                        type: 'DEAL_ENEMY_DAMAGE',
                                        payload: round
                                    });
                                    yield put({
                                        type: 'DEAL_PLAYER_DAMAGE',
                                        payload: round
                                    });
                                    break;
                                  default:
                                    if (playerBoard.length > 0) {
                                      for (let minion of playerBoard) {
                                        if (minion.health < lowestHp) {
                                          minionId = minion.card_id;
                                          lowestHp = minion.health;
                                        }
                                      }
                                      yield put({
                                        type: 'ATTACK_PLAYER_MINION',
                                        payload: {id: minionId, attack: card.attack_amount, board: playerBoard}
                                      })
                                    } else {
                                      console.log('* Player had no minions to attack *');
                                    }
                                    break;
                                }
                                break;

                            // Minion card handler
                            case 'minion':
                                yield put({type: 'ADD_ACTION', payload: {name: card.name, type: 'enemy'}});
                                switch (card.card_id) {
                                  case 20: // Dragon
                                  if (enemyBoard.length >= 5) {
                                      for (let i = 0; i < 5; i++) {
                                          yield put({
                                              type: 'DRAGON_SACRIFICE_ENEMY'
                                          });
                                      }
                                      yield put({
                                        type: 'SUMMON_ENEMY_MINION',
                                        payload: {damage: card.damage, health: card.health, rarity: card.rarity}
                                      })
                                      // Add the enemy threat
                                      yield put({
                                          type: 'ADD_ENEMY_THREAT',
                                          payload: card.damage
                                      })
                                  }
                                  break;
                                  case 21: // Cleric
                                      if (enemyBoard.length <= 5) {
                                        yield put({
                                            type: 'HEAL_ENEMY'
                                        });
                                        yield put({
                                          type: 'SUMMON_ENEMY_MINION',
                                          payload: {damage: card.damage, health: card.health, rarity: card.rarity}
                                        })
                                        yield put({
                                            type: 'ADD_ENEMY_THREAT',
                                            payload: card.damage
                                        })
                                      }
                                      break;
                                  default:
                                    if (enemyBoard.length <= 5) {
                                      yield put({
                                        type: 'SUMMON_ENEMY_MINION',
                                        payload: {damage: card.damage, health: card.health, rarity: card.rarity}
                                      })
                                      yield put({
                                          type: 'ADD_ENEMY_THREAT',
                                          payload: card.damage
                                      })
                                    }
                                    break;
                                }
                                break;
                            default:
                                break;
                        }
                        console.log('before hand:', enemyHand);
                        // Remove card from enemy hand
                        enemyHand.splice(index, 1);
                        yield put({
                          type: 'SELECT_ENEMY_CARD',
                          payload: index
                        })
                        console.log('after hand:', enemyHand);
                        break;
                    }
                    index++;
                }
                // Removes energy from local variable, which enemy uses for calculations
                console.log('starting energy: ', energy);
                energy -= energyCard.cost;
                console.log('energy used:', energyCard.cost);
                console.log('energy left:', energy);
            }
        } // End of loop

        let playerDefence = player.threat + player.block;
        // Deals damage to the player if allowed
        if (enemy.threat > playerDefence && round > 0) {
          console.log('dealt', enemy.threat - playerDefence); 
          yield put({
            type: 'DEAL_PLAYER_DAMAGE',
            payload: enemy.threat - playerDefence
          })
        }

        // Activates player's slime machine if it exists on the board
        for (let minion of playerBoard) {
          if (minion.damage === 0 && minion.health === 6) {
            yield put({
              type: 'SUMMON_PLAYER_MINION',
              payload: {damage: 1, health: 1, rarity: 'Common'}
            });
            yield put({
                type: 'ADD_PLAYER_THREAT',
                payload: 1
            });
          }
        }

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
    yield takeLatest('FETCH_ENEMY_DECK', handleEnemyTurn);
    yield takeLatest('FETCH_ENEMY_HAND', fetchHand);
  }
  
export default enemySaga;
