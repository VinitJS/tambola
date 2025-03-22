import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import firebase, { getGameRef } from '../../../../utils/firebase';
import { setDrawFailure, updateRemaining, setCounting, setChancesFailure } from '../../../../redux/game/game.actions';

const Counting = React.memo(({ speed, updateRemaining, setDrawFailure, setCounting, remaining, gameId, counting, setChancesFailure, playersLen }) => {

    const timeout = useRef()

    useEffect(() => {
        if (counting) {
            if (remaining.length > 0) {
                const tempRemaining = [...remaining];
                timeout.current = setTimeout(() => {
                    const chosen = tempRemaining.pop();
                    if (chosen) {
                        const gameRef = getGameRef(gameId.toString());
                        gameRef.update({
                            coins: firebase.firestore.FieldValue.arrayUnion(chosen)
                        }).then(res => {
                            updateRemaining(tempRemaining);
                        }).catch(error => {
                            setDrawFailure(error.message);
                        });
                    } else {
                        setDrawFailure("Problem drawing numbers.");
                    }
                }, speed);
            } else {
                setDrawFailure("All numbers are already drawn.");
            }
        }
    }, [counting, gameId, remaining, setDrawFailure, speed, updateRemaining])

    const startCounting = async () => {
        if (remaining.length > 88) {
            const gameRef = getGameRef(gameId.toString());
            gameRef.update({
                chances: playersLen < 10 ? 6 : playersLen < 15 ? 5 : playersLen < 20 ? 4 : 3
            }).then(() => {
                setCounting(true);
            }).catch((error) => {
                setChancesFailure(error.message);
            });
        } else {
            setCounting(true);
        }
    }

    const pauseCounting = () => {
        clearTimeout(timeout.current);
        setDrawFailure("Game paused!");
    }

    return (
        <div className="btn-group frow">
            {
                counting
                    ?
                    <button disabled={remaining.length < 1} onClick={pauseCounting} className="btn btn-r mm">Pause Number Calling</button>
                    :
                    <button disabled={remaining.length < 1} onClick={startCounting} className="btn btn-g mm">Start Number Calling</button>
            }
        </div>
    );
});

const mapStateToProps = ({ game, play }) => (
    {
        speed: game.speed,
        remaining: game.remaining,
        gameId: game.gameId,
        counting: game.counting,
        playersLen: play.players.length
    }
);

const mapDispatchToProps = dispatch => (
    {
        updateRemaining: (remaining) => dispatch(updateRemaining(remaining)),
        setDrawFailure: (message) => dispatch(setDrawFailure(message)),
        setChancesFailure: (message) => dispatch(setChancesFailure(message)),
        setCounting: (bool) => dispatch(setCounting(bool))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Counting);