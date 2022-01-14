import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Help() {
    return (
        <div className="help-center">
            <h1 className="chore-list-title">Help</h1>
            <div className="help-box">
                <h1 className="help-subtitle">Chore List</h1>
                <ul className="box-list">
                    <li>Click the <Button variant="contained" id="help-add-task-btn">+</Button> button to add a task.</li>
                    <li>Press the <button className="complete-btn">Complete</button> button to finish a task and add it to your history.</li>
                    <li>You can see your task history by clicking on the <button className="complete-btn">See History</button> button.</li>
                    <li>When you complete 3 tasks, you earn a random amount of coins between 50 and 250.</li>
                    <li>Coins can be spent in the deck page to get more cards for your deck.</li>
                </ul>
            </div>
            <br />
            <div className="help-box">
                <h1 className="help-subtitle">Deck</h1>
                <ul className="box-list">
                    <li>The deck page shows all the cards in your deck.</li>
                    <li>Click on a card to sell it for a fraction of it's cost.</li>
                    <li>Press <button className="help-add-cards-btn">Add Cards</button> to show the card store, where you can spend your coins to buy more cards.</li>
                    <li>You can only have a max of 15 cards in your deck, and can't leave the page with less than that.</li>
                </ul>
            </div>
            <br />
            <div className="help-box">
                <h1 className="help-subtitle">Card Types</h1>
                <div className="type-label-container">
                    <Grid container spacing={2} columns={2}>
                        <Grid className="type-images">
                            <img className="help-card-type-img" src="attack-icon.png" />
                            <img className="help-card-type-img" src="minion-icon.png" />
                            <img className="help-card-type-img" src="block-icon.png" />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid>
                            <p>Attack</p>
                        </Grid>
                        <Grid>
                            <p>Minion</p>
                        </Grid>
                        <Grid>
                            <p>Block</p>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <br />
            <div className="help-box">
                <h1 className="help-subtitle">Player Stats Overview</h1>
                <ul className="box-list">
                    <li><img src="heart.png" className="stat-icon"/> The heart represents how much health you have left.</li>
                    <li><img src="threat.png" className="stat-icon"/> This icon shows your threat, which is the sum of all your minions damage values on the board.</li>
                    <li><img src="shield.png" className="stat-icon"/> The shield indicates how much block you have.</li>
                    <li><img src="energy.png" className="stat-icon"/> Energy shows your current pool of energy, which you use to play cards.</li>
                </ul>
            </div>
            <br />
            <div className="help-box">
                <h1 className="help-subtitle">Card Example</h1>
                <center>
                    <Card sx={{ flexGrow: 1, maxWidth: 200, backgroundColor: '#2b5c55', color: 'white' }} id="help-card">
                        <CardActionArea>
                            <Typography gutterBottom variant="h5" component="div" textAlign={"center"} fontSize="25px">
                                Wolf
                            </Typography>
                            <Typography variant="body1" color="white" textAlign={"center"}>
                                <em>Common</em>
                            </Typography>
                            <center>
                                <CardMedia className='token'
                                component="img"
                                image="minion-icon.png"
                                alt="token"
                                draggable="false"
                                />
                            </center>
                            <CardContent>
                            <Typography varient="h6" textAlign={"center"} fontSize={"18px"}>
                                Energy: 3
                            </Typography>
                            <Typography variant="body2" color="white">
                                Summons a (2/3) wolf
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <p>The card above is named wolf and has a common rarity, which is also indicated by the background color.</p>
                    <p>The icon in the middle shows its a minion type. It costs 3 energy to play. </p>
                    <p>The description bellow tells use that it will summon a wolf with 2 health and 3 damage (2/3).</p>
                </center>
            </div>
            <br />
            <div className="help-box">
                <h1 className="help-subtitle">Game Overview</h1>
                <ul className="box-list">
                    <li>The game starts with a setup round at round 0, which only means that nobody can deal damage at that time.</li>
                    <li>In the middle of the screen are two game boards and stat blocks. The bottom sections belong to you, and the top is for the AI.</li>
                    <li>The empty box on the left of the screen will display the moves that both you and the AI play.</li>
                    <li>On the bottom of the screen is your hand, which holds five cards. The hand is filled with a random order of cards from your deck. <br/>Your deck will be re-shuffled after you go through all your cards.</li>
                    <li>Inside the stat blocks are block, energy, health, and threat values.</li>
                    <li>If your health reaches zero then you lose, but if the enemy's health drops to zero you win.</li>
                    <li>Playing a card costs energy equal to what is displayed on the card. You cannot play a card if it cost more energy than you have.</li>
                    <li>When you're done playing cards press the end turn button to make it the AI's turn.</li>
                    <li>At the end of each player's turn, the game will check if you can deal damage to the other player</li>
                    <ul>
                        <li>If you have a greater threat than your opponent, you will deal damage equal to the excess amount of threat you have over them.</li>
                        <li>At the end of your turn, if you had 6 threat and the AI had 2, you would deal 4 damage to them.</li>
                        <li>However block is also taken into account for defending, when calculating damage. In the same situation, if the AI had 4 block you would've dealt 0 damage.<br />
                        This is because you had 6 threat and the AI had 2 threat + 4 block.</li>
                    </ul>
                </ul>
            </div>
        </div>
    );
}

export default Help;