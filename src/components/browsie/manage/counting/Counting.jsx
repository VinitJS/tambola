import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import firebase, { getGameRef } from '../../../../utils/firebase';
import { setDrawFailure, updateRemaining, setCounting, setChancesFailure } from '../../../../redux/game/game.actions';

const Counting = React.memo(({ 
  speed, 
  updateRemaining, 
  setDrawFailure, 
  setCounting, 
  remaining, 
  gameId, 
  counting, 
  setChancesFailure, 
  playersLen 
}) => {
  
    const timeout = useRef();

    useEffect(() => {
        if (counting && remaining.length > 0) {
            const tempRemaining = [...remaining];
            timeout.current = setTimeout(() => {
                const chosen = tempRemaining.pop();
                if (chosen) {
                    const gameRef = getGameRef(gameId.toString());
                    gameRef.update({
                        coins: firebase.firestore.FieldValue.arrayUnion(chosen)
                    }).then(() => {
                        updateRemaining(tempRemaining);
                    }).catch(error => {
                        setDrawFailure(error.message);
                    });
                } else {
                    setDrawFailure("Problem drawing numbers.");
                }
            }, speed);
        } else if (remaining.length === 0) {
            setDrawFailure("All numbers are already drawn.");
        }
    }, [counting, gameId, remaining, setDrawFailure, speed, updateRemaining]);

    const startCounting = async () => {
        const gameRef = getGameRef(gameId.toString());
        if (remaining.length > 88) {
            const chances = 6;
            try {
                await gameRef.update({ chances });
                setCounting(true);
            } catch (error) {
                setChancesFailure(error.message);
            }
        } else {
            setCounting(true);
        }
    };

    const pauseCounting = () => {
        clearTimeout(timeout.current);
        setDrawFailure("Game paused!");
    };

    return (
        <div className="btn-group frow">
            <button 
                disabled={remaining.length < 1} 
                onClick={counting ? pauseCounting : startCounting} 
                className={`btn ${counting ? 'btn-r' : 'btn-g'} mm`}
            >
                {counting ? 'Pause Number Calling' : 'Start Number Calling'}
            </button>
        </div>
    );
});

const mapStateToProps = ({ game, play }) => ({
    speed: game.speed,
    remaining: game.remaining,
    gameId: game.gameId,
    counting: game.counting,
    playersLen: play.players.length,
});

const mapDispatchToProps = {
    updateRemaining,
    setDrawFailure,
    setChancesFailure,
    setCounting,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counting);
