import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestore, FieldValue } from "../../utils/firebase";
import { resetGame, updateGame } from "../../redux/game.reducer";
import { useNavigate } from "react-router-dom";

const Manage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, name } = useSelector((state) => state.user);
    const { coin_count, speed, players_count } = useSelector((state) => state.game);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState("");
    
    useEffect(() => {
        const unsubscribe = firestore.collection("play").doc(id).onSnapshot(
            (snapshot) => {
                if (!snapshot.exists) {
                    dispatch(resetGame())
                    navigate("/");
                } else {
                    const { start, error } = snapshot.data();
                    setLoading(start);
                    setErrorMessage(error || "");
                }
            },
            (error) => {
                console.error("Error fetching game status:", error);
            }
        );
    
        return () => unsubscribe();
    }, [id, navigate, dispatch]);

    const handleReset = async () => {
        setLoading(true);
        try {
            if (window.confirm("Press OK to reset this game.")) {
                await firestore.collection("play").doc(id).update({
                    start: false,
                    error: ""
                });

                await firestore.collection("call").doc(id).update({
                    game_by: name,
                    claims: {},
                    players: {},
                    coins: [],
                    // message: "",
                    version: FieldValue.increment(1)
                });
            }
        } catch (error) {
            console.error("Error resetting game:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStart = async () => {
        setLoading(true);
        if (players_count < 2) {
            alert("Minimum 2 players needed to start the game. Invite friends!")
            return setLoading(false);
        }
        
        if (window.confirm("Press OK to start numbers to be called out.")) {
            try {
                await firestore.collection("play").doc(id).update({
                    speed,
                    start: true
                });

                // if (message) {
                //     await firestore.collection("call").doc(id).update({
                //         message: message.trim(),
                //     });
                // }
            } catch (error) {
                console.error("Error starting game:", error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="Manage card brm mtm">
            <div className="card-body fcol faic brm bcgg">
                <div className="fcol faic pxs mtm brm bclst op80pc">
                    <div className="btn-group frow fwrap fjcc mm">
                        {["Fast", "Medium", "Slow"].map((label, index) => {
                            return (
                                <button
                                    key={label}
                                    disabled={(coin_count > 0) || loading}
                                    onClick={() => dispatch(updateGame({ speed: (index+1) * 5 }))}
                                    className={`mxs btn ${speed === (index+1) * 5 ? "btn-y" : ""}`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                {/* <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Celebration message"
                    className="textbox w100 brs mtm"
                    disabled={loading}
                /> */}
                <div className="btn-group frow">
                    <button
                        disabled={coin_count > 0 || loading}
                        onClick={handleStart}
                        className="btn btn-g mm"
                    >
                        Start Game
                    </button>
                    <button
                        disabled={loading}
                        onClick={handleReset}
                        className="btn btn-o mm"
                    >
                        Reset Game
                    </button>
                </div>
            </div>
            {errorMessage && (
                <div className="mm pm tac bcr clst brm b">
                    <span className="fsxxl">⚠️</span> {errorMessage}
                </div>
            )}
        </div>
    );
};

export default Manage;
