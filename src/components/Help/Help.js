import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function Help() {
    return (
        <>
            <h1 className="chore-list-title">Help</h1>
            <div className="box-left">
                <h1 className="help-subtitle">Chore List</h1>
                <ul className="box-list">
                    <li>Click the <Button variant="contained" id="help-add-task-btn">+</Button> button to add a task</li>
                    <li>Press the <button className="complete-btn">Complete</button> button to finish a task and add it to your history</li>
                    <li>You can see your task history by clicking on the <button className="complete-btn">See History</button> button</li>
                    <li>When you complete 3 tasks, you earn a random amount of coins between 50 and 250</li>
                    <li>Coins can be spent in the deck page to get more cards for your deck</li>
                </ul>
            </div>
            <br />
            <div className="box-right">
                <h1 className="help-subtitle">Deck</h1>
                <p>stuff and things</p>
            </div>
            <br />
            <div className="box-left">
                <h1 className="help-subtitle">Game Overview</h1>
                <p>stuff and things</p>
            </div>
            <br />
            <div className="box-right">
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
            <div className="box-left">
                <h1 className="help-subtitle">Card Overview</h1>
                <p>stuff and things</p>
            </div>
        </>
    );
}

export default Help;