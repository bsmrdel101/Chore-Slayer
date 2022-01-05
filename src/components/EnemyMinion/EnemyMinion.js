import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

function EnemyMinion({minion}) {
    return (
        <>
            {
                minion.rarity === 'Common' &&
                <Card className="minion" sx={{backgroundColor: '#2b5c55', color: 'white'}}>
                    <CardMedia
                    component="img"
                    image="attack-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }     
            {
                minion.rarity === 'Uncommon' &&
                <Card className="minion" sx={{backgroundColor: '#3f813f', color: 'white'}}>
                    <CardMedia
                    component="img"
                    image="attack-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }     
            {
                minion.rarity === 'Rare' &&
                <Card className="minion" sx={{backgroundColor: '#343483', color: 'white'}}>
                    <CardMedia
                    component="img"
                    image="attack-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }     
            {
                minion.rarity === 'Very Rare' &&
                <Card className="minion" sx={{backgroundColor: '#562772', color: 'white'}}>
                    <CardMedia
                    component="img"
                    image="attack-icon.png"
                    alt="token"
                    draggable="false"
                    />
                    <p>{minion.damage} / {minion.health}</p>
                </Card>                
            }     
            {
                minion.rarity === 'Legendary' &&
                <Card className="minion" sx={{backgroundColor: '#a73434', color: 'white'}}>
                    <CardMedia
                    component="img"
                    image="attack-icon.png"
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