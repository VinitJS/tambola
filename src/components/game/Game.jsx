import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./Game.css";
import { resetUser } from "../../redux/user.reducer";
import { FieldValue, firestore } from "../../utils/firebase";

const Game = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id, name } = useSelector((state) => state.user);
    const { play_id } = useSelector((state) => state.game);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (play_id && id && play_id === id) navigate(`/${play_id}`, { replace: true });
    }, [play_id, id, navigate]);

    const handleClick = async () => {
        setLoading(true);
        try {
            const callRef = firestore.collection("call").doc(id);
            const callDoc = await callRef.get();
    
            if (!callDoc.exists) {
                await firestore.collection("play").doc(id).set({
                    start: false,
                    speed: 10,
                });
    
                await callRef.set({
                    game_by: name,
                    claims: {},
                    players: {},
                    coins: [],
                    version: FieldValue.increment(1),
                });
            }
    
            navigate(`/${id}`, { replace: true });
        } catch (error) {
            console.error("Error setting up game:", error);
        } finally {
            setLoading(false);
        }
    };    

    return (
        <div className="Game ma fcol faic">
            <h2>Welcome {name || "Guest"}!</h2>
            <img
                src="https://img.icons8.com/doodle/192/000000/ticket.png"
                alt="ticket"
            />
            <div className="frow faic mtm">
                <p className="cfd mrxs fss">Not {name}?</p>
                <button
                    className="btn-link fss cb"
                    onClick={() => dispatch(resetUser())}
                >
                    Change Name
                </button>
            </div>
            <div className="frow fjcc">
                <button className="btn btn-l mm" onClick={() => navigate(-2)}>
                    Cancel
                </button>
                <button className="btn btn-y mm" disabled={!id || loading} onClick={handleClick}>
                    Host Game
                </button>
            </div>
        </div>
    );
};

export default Game;
