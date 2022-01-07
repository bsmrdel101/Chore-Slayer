import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Stats() {
    const dispatch = useDispatch();

    return (
        <>
            <br/>
            <h1 id="stats-title">Game Stats</h1>
            <div className="stats-container">
                <div className="stat-column">
                    <h3>General Stats</h3>
                    <p>Games Won: {}</p>
                    <p>Games Lost: {}</p>
                    <p>Total Games: {}</p>
                </div>
                <div className="stat-column">
                <h3>Other Stats</h3>
                    <p>Cards Played: {}</p>
                    <p>Total Damage: {}</p>
                    <p>Total Block: {}</p>
                    <p>Minions Slain: {}</p>
                    <p>Times Surrendered: {}</p>
                    <p>Highest threat in game: {}</p>
                    <p>Highest block in game: {}</p>
                </div>
            </div>
        </>
    );
}

export default Stats;