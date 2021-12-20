import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function GameCard({card}) {
    const handleClick = () => {
        
    }

    return (
        <>
            <Card sx={{ flexGrow: 1, maxWidth: 200 }} onClick={handleClick} className="card">
                <CardActionArea>
                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                        {card.name}
                    </Typography>
                    <CardMedia
                    component="img"
                    image={card.token}
                    alt="token"
                    />
                    <CardContent>
                    <Typography varient="h6" textAlign={"center"}>
                        Energy: {card.cost}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {card.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}

export default GameCard;