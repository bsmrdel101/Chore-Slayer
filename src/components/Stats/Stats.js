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
                    <p>{}</p>
                </div>
                <div className="stat-column">
                <h3>Other Stats</h3>
                    <p>{}</p>
                </div>
            </div>
        </>
    );
}

export default Stats;