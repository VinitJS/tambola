import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import firebase, { getGameRef } from '../../../../utils/firebase';
import { setDrawFailure, updateRemaining, setCounting, setChancesFailure } from '../../../../redux/game/game.actions';

const Counting = React.memo(({ speed, updateRemaining, setDrawFailure, setCounting, remaining, gameId, counting, setChancesFailure, playersNums = {}, calledUpto, playersNumsCalledCount }) => {

    const timeout = useRef()

    useEffect(() => {
        if (counting) {
            console.log("COUNTING IS TRUE: ", counting)
            const pncc = { ...playersNumsCalledCount };
            if(calledUpto > 15) {
                console.log("CALLEDUPTO IS MORE THAN 14: ", calledUpto)
                setDrawFailure("All numbers are already drawn.");
                return;
            }
            console.log("CALLEDUPTO IS LESS THAN 14: ", calledUpto)
            const players = Object.entries(playersNums).map(([key, value]) => ({ id: key, nums: value }))
            let behindPlayers = players.filter(p => pncc[p.id] === undefined);
            let call, pickedPlayer;
            if (behindPlayers.length > 0) {
                console.log("PLAYERS WITH UNDEFINED", behindPlayers.length)
                pickedPlayer = behindPlayers[Math.floor(Math.random() * behindPlayers.length)];
                call = pickedPlayer.nums[0];
                pncc[pickedPlayer.id] = 0;
            } else {
                console.log("ALL PLAYERS CALLED AT LEAST ONCE: ", behindPlayers.length)
                behindPlayers = players.filter(p => pncc[p.id] < calledUpto);
                if (behindPlayers.length > 0) {
                    console.log("PLAYERS BEHIND CALLEDUPTO: ", behindPlayers.length)
                    pickedPlayer = behindPlayers[Math.floor(Math.random() * behindPlayers.length)];
                    call = pickedPlayer.nums[pncc[pickedPlayer.id]];
                    pncc[pickedPlayer.id]++;
                } else {
                    console.log("ALL PLAYERS AT CALLEDUPTO: ", calledUpto)
                    calledUpto++;
                    console.log("calledUpto: ", calledUpto);
                    updateRemaining(calledUpto, pncc);
                    return;
                }
            }
            timeout.current = setTimeout(() => {
                if (call) {
                    const gameRef = getGameRef(gameId.toString());
                    gameRef.update({
                        coins: firebase.firestore.FieldValue.arrayUnion(call)
                    }).then(() => {
                        console.log("HERE: ", calledUpto)
                        updateRemaining(calledUpto, pncc);
                    }).catch(error => {
                        console.log("FAILED")
                        setDrawFailure(error.message);
                    });
                } else {
                    setDrawFailure("Problem drawing numbers.");
                }
            }, speed);
        }
    }, [counting, gameId, setDrawFailure, speed, updateRemaining, calledUpto, playersNumsCalledCount])

    const startCounting = async () => {
        if (calledUpto === -1) {
            const gameRef = getGameRef(gameId.toString());
            let chances = Math.round(58 / Object.keys(playersNums).length);
            if(chances > 6) chances = 6;
            if(chances < 3) chances = 3;
            gameRef.update({
                chances
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
        calledUpto: game.calledUpto,
        playersNumsCalledCount: game.playersNumsCalledCount,
        playersNums: play.playersNums
    }
);

const mapDispatchToProps = dispatch => (
    {
        updateRemaining: (calledUpto, pncc) => dispatch(updateRemaining(calledUpto, pncc)),
        setDrawFailure: (message) => dispatch(setDrawFailure(message)),
        setChancesFailure: (message) => dispatch(setChancesFailure(message)),
        setCounting: (bool) => dispatch(setCounting(bool))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Counting);