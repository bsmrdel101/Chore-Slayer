import Swal from 'sweetalert2';

const playerStatBlock = (state = {block: 0, health: 20, threat: 0, energy: 5, canAttack: false, element: {}}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_PLAYER_BLOCK':
            copyOfState = {...state};
            copyOfState.block += action.payload;
            return copyOfState;
        case 'PLAYER_COWARD':
            copyOfState = {...state};
            copyOfState.block += 5;
            return copyOfState;
        case 'SWAP_BLOCK':
            copyOfState = {...state};
            copyOfState.block = action.payload.enemyBlock;
            return copyOfState;
        case 'BREAK_FORMATION':
            copyOfState = {...state};
            copyOfState.block -= 3;
            if (copyOfState.block <= 0) {
                copyOfState.block = 0;
            }
            return copyOfState;
        case 'ADD_PLAYER_THREAT':
            copyOfState = {...state};
            copyOfState.threat += action.payload;
            return copyOfState;
        case 'UPDATE_PLAYER_THREAT':
            copyOfState = {...state};
            copyOfState.threat = action.payload;
            return copyOfState;
        case 'ATTACK_PLAYER_MINION':
            copyOfState = {...state};
            if (action.payload.board[0].health <= 0) {
                copyOfState.threat -= action.payload.board[0].damage;
            }
            return copyOfState;
        case 'SWEEP_PLAYER_MINION':
            copyOfState = {...state};
            let index = action.payload.index;
            if (action.payload.board[index].health <= 0) {
                copyOfState.threat -= action.payload.board[index].damage;
            }
            return copyOfState;
        case 'PLAYER_CAN_ATTACK':
            copyOfState = {...state};
            copyOfState.canAttack = true
            return copyOfState;
        case 'REMOVE_PLAYER_ENERGY':
            copyOfState = {...state};
            copyOfState.energy -= action.payload;
            return copyOfState;
        case 'DEAL_PLAYER_DAMAGE':
            copyOfState = {...state};
            copyOfState.health -= action.payload;
            if (copyOfState.health <= 0) {
                Swal.fire({
                    title: 'You Lost!',
                    text: 'ha ha',
                    icon: 'error',
                    confirmButtonText: 'New Game'
                  }).then((result) => {
                    document.location.reload();
                  })
            }
            return copyOfState;
        case 'HEAL_PLAYER':
            copyOfState = {...state};
            if (copyOfState.health < 20) {
                copyOfState.health += 3;
            }
            return copyOfState;
        case 'RESTART_ATTACK':
            copyOfState = {...state};
            copyOfState.threat = 0;
            return copyOfState;
        case 'DOUBLE_PLAYER_BLOCK':
            copyOfState = {...state};
            copyOfState.block *= 2;
            if (copyOfState.block > 12) {
                copyOfState.block = 12;
            }
            return copyOfState;
        case 'REJUVENATE_PLAYER':
            copyOfState = {...state};
            if (copyOfState.block > 6) {
                copyOfState.block = 6;
            }
            copyOfState.health += copyOfState.block;
            copyOfState.block = 0;
            if (copyOfState.health > 20) {
                copyOfState.health = 20;
            }
            return copyOfState;
        case 'ELEMENT':
            // Element is the card data sent to the game.js for when a player clicks an enemy minion
            copyOfState = {...state};
            copyOfState.element = action.payload;
            return copyOfState;
        case 'RESET_PLAYER_ENERGY':
            copyOfState = {...state};
            copyOfState.energy = 5;
            // Set canAttack back to false at end of turn
            copyOfState.canAttack = false;
            return copyOfState;
        case 'RESET_GAME':
            copyOfState = {...state};
            copyOfState = {block: 0, health: 20, threat: 0, energy: 5, canAttack: false, element: {}};
            return copyOfState;
        default:
            return state;
    }
  };

export default playerStatBlock;
  