import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';

function EnemyMinion({minion, index}) {
    const dispatch = useDispatch();

    const player = useSelector((store) => store.playerStatBlock);
    const enemyBoard = useSelector((store) => store.enemyBoard);

    // Deals damage to a minion that the player has selected
    const handlePlayerAttack = (i) => {
        if (player.canAttack === true) {
            dispatch({
                type: 'ATTACK_ENEMY_MINION',
                payload: {id: i, attack: player.element.attack_amount, board: enemyBoard}
            })
        }
        player.canAttack = false;
    }

    return (
        <>
            {
                minion.rarity === 'Common' &&
                <Card className="minion" sx={{backgroundColor: '#2b5c55', color: 'white'}} onClick={() => handlePlayerAttack(index)}>
                    <CardMedia
                    component="img"
                    image="minion-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }     
            {
                minion.rarity === 'Uncommon' &&
                <Card className="minion" sx={{backgroundColor: '#3f813f', color: 'white'}} onClick={() => handlePlayerAttack(index)}>
                    <CardMedia
                    component="img"
                    image="minion-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }     
            {
                minion.rarity === 'Rare' &&
                <Card className="minion" sx={{backgroundColor: '#343483', color: 'white'}} onClick={() => handlePlayerAttack(index)}>
                    <CardMedia
                    component="img"
                    image="minion-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }     
            {
                minion.rarity === 'Very Rare' &&
                <Card className="minion" sx={{backgroundColor: '#562772', color: 'white'}} onClick={() => handlePlayerAttack(index)}>
                    <CardMedia
                    component="img"
                    image="minion-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }     
            {
                minion.rarity === 'Legendary' &&
                <Card className="minion" sx={{backgroundColor: '#a73434', color: 'white'}} onClick={() => handlePlayerAttack(index)}>
                    <CardMedia
                    component="img"
                    image="minion-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }                                                                     
        </>
    );
}

export default EnemyMinion;