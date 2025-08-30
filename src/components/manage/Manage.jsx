import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestore, FieldValue } from "../../utils/firebase";
import { resetGame, updateGame } from "../../redux/game.reducer";
import { useNavigate } from "react-router-dom";

const Manage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, name } = useSelector((state) => state.user);
    const { coin_count, speed, players_count, difficulty } = useSelector((state) => state.game);
    const [loading, setLoading] = useState(false);
    const [started, setStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        const unsubscribe = firestore.collection("play").doc(id).onSnapshot(
            (snapshot) => {
                if (!snapshot.exists) {
                    dispatch(resetGame())
                    navigate("/", { replace: true });
                } else {
                    const { start, error } = snapshot.data();
                    setStarted(start);
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
                    version: FieldValue.increment(1),
                    difficulty: difficulty || "Beginner"
                });
            }
        } catch (error) {
            console.error("Error resetting game:", error);
        }
        setLoading(false);
    };

    const handleStart = async () => {
        setLoading(true);
        if (window.confirm("Press OK to start the game.")) {
            try {
                await firestore.collection("play").doc(id).update({
                    speed,
                    start: true
                });
            } catch (error) {
                console.error("Error starting game:", error);
            }
        }
        setLoading(false);
    };

    const handlePause = async () => {
        setLoading(true);
        if (window.confirm("Press OK to pause the game.")) {
            try {
                await firestore.collection("play").doc(id).update({
                    start: false
                });
            } catch (error) {
                console.error("Error pausing game:", error);
            }
        }
        setLoading(false);
    };

    const handleDifficulty = async (newDifficulty) => {
        if (newDifficulty === difficulty) return;
        setLoading(true);
        if (window.confirm(`Press OK to change difficulty. This will ${newDifficulty === "Beginner" ? "reduce" : "increase"} the number of claims.`)) {
            try {
                await firestore.collection("call").doc(id).update({
                    difficulty: newDifficulty || "Beginner",
                });
            } catch (error) {
                console.error("Error setting game difficluty:", error);
            }
        }
        setLoading(false);
    }

    return (
        <div className="Manage card brm mtm">
            <div className="card-body fcol faic brm bcgg">
                <div className="fcol faic bcl pm mm brm op80pc">
                    <h3 className="title clst frow faic">
                        Speed
                    </h3>
                    <div className="btn-group frow fwrap fjcc">
                        {[["Fast", 8], ["Medium", 12], ["Slow", 16]].map(([label, seconds],) => {
                            return (
                                <button
                                    key={label || loading}
                                    disabled={started}
                                    onClick={() => dispatch(updateGame({ speed: seconds }))}
                                    className={`mxs btn ${speed === seconds ? "btn-y" : ""}`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                    <h3 className="title clst frow faic mtm">
                        Difficulty
                    </h3>
                    <div className="btn-group frow fwrap fjcc">
                        {["Beginner", "Advanced"].map((diff) => {
                            return (
                                <button
                                    key={diff}
                                    disabled={started || (coin_count > 0 && coin_count < 90) || loading}
                                    onClick={() => handleDifficulty(diff)}
                                    className={`mxs btn ${difficulty === diff ? "btn-y" : ""}`}
                                >
                                    {diff}
                                </button>
                            );
                        })}
                    </div>
                </div>
                {players_count < 2 && <p className="tac co fss">Minimum 2 players must join to start the game.</p>}
                <div className="btn-group frow">
                    {started ?
                        <button
                            disabled={coin_count === 90 || loading}
                            onClick={handlePause}
                            className="btn btn-y mm"
                        >
                            Pause
                        </button> :
                        <button
                            disabled={coin_count === 90 || players_count < 2 || loading}
                            onClick={handleStart}
                            className="btn btn-g mm"
                        >
                            Start
                        </button>
                    }
                    <button
                        disabled={started || coin_count < 90 || loading}
                        onClick={handleReset}
                        className="btn btn-o mm"
                    >
                        Reset
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