import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function DisplayCard({card}) {
    

    return (
        <>
            <Card sx={{ flexGrow: 1, maxWidth: 200 }}>
                <CardActionArea>
                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                        {card.name}
                    </Typography>
                    <CardMedia
                    component="img"
                    image={card.token}
                    alt="token"
                    draggable="false"
                    />
                    <CardContent>
                    <Typography varient="h6" textAlign={"center"}>
                        Energy: {card.cost}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {card.block_amount &&
                            <>
                                Block: {card.block_amount}
                                <br/>
                            </>
                        }
                        {card.attack_amount &&
                            <>
                                Damage: {card.attack_amount}
                                <br/>
                            </>
                        }
                        {card.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}

export default DisplayCard;