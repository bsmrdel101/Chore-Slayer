import Swal from 'sweetalert2';

const enemyStatBlock = (state = {block: 0, health: 20, threat: 0, energy: 5, storedThreat: 0}, action) => {
    let copyOfState;
    switch (action.type) {
        case 'ADD_ENEMY_BLOCK':
            copyOfState = {...state};
            copyOfState.block += action.payload;
            return copyOfState;
        case 'SWAP_ENEMY_BLOCK':
            copyOfState = {...state};
            console.log('TODO: add swap block mechanic');
            return copyOfState;
        case 'ADD_ENEMY_THREAT':
            copyOfState = {...state};
            if (action.payload.round > 0) {
                let damage = action.payload.damage + copyOfState.storedThreat;
                copyOfState.threat += damage;
                copyOfState.storedThreat = 0;
            } else {
                copyOfState.storedThreat = action.payload.damage;
            }
            return copyOfState;
        case 'UPDATE_ENEMY_THREAT':
            copyOfState = {...state};
            console.log('!!!!!!!!!!', action.payload) 
            copyOfState.threat -= action.payload;
            return copyOfState;
        case 'ATTACK_ENEMY_MINION':
            let id = action.payload.id;
            copyOfState = {...state};
            if (action.payload.board[id].health <= 0) {
                copyOfState.threat -= action.payload.board[id].damage;
            }
            return copyOfState;
        case 'DEAL_ENEMY_DAMAGE':
            copyOfState = {...state};
            copyOfState.health -= action.payload;
            if (copyOfState.health <= 0) {
                document.location.reload();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
            return copyOfState;
        case 'REMOVE_ENEMY_ENERGY':
            copyOfState = {...state};
            copyOfState.energy -= action.payload;
            return copyOfState;
        case 'RESET_ENEMY_ENERGY':
            copyOfState = {...state};
            copyOfState.energy = 5;
            return copyOfState;
        case 'RESET_GAME':
            copyOfState = {...state};
            copyOfState = {block: 0, health: 20, threat: 0, energy: 5, storedThreat: 0};
            return copyOfState;
        default:
            return state;
    }
  };

export default enemyStatBlock;
  