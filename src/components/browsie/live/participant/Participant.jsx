import React, { useEffect } from 'react';
import { setPlayFailure, setPlaySuccess } from '../../../../redux/playing/playing.actions';
import { connect } from 'react-redux';
import { getGameRef } from '../../../../utils/firebase';
import Play from './Play';
import { updateRemWithReq } from '../../../../redux/game/game.actions';

const Participant = ({ gameId, setPlaySuccess, setPlayFailure, updateRemWithReq, myGameId, dReq }) => {

    useEffect(() => {
        try {
            const playRef = getGameRef(gameId.toString());
            return playRef.onSnapshot(doc => {
                if (doc.exists) {
                    if (myGameId && gameId === myGameId.toString() && doc.data().dreq !== 0 && doc.data().dreq !== dReq) {
                        updateRemWithReq(doc.data().dreq);
                    } else {
                        const { chances, claims, coins, gVersion, gameBy, c, totalPoints } = doc.data();
                        const data = { chances, claims, coins, gVersion, gameBy, c, totalPoints };
                        const playersArr = Object.entries(doc.data().players);
                        data.players = playersArr.map(([key, value]) => ({ id: key, ...value })).sort((a, b) => (a.points < b.points) ? 1 : -1);
                        data.playersNums = doc.data().playersNums;
                        data.size = playersArr.length;
                        data.gameId = gameId;
                        data.isValidGame = true;
                        setPlaySuccess(data);
                    }
                } else {
                    setPlayFailure("Internet Connection Breaking.");
                }
            });
        }
        catch (error) {
            setPlayFailure(error);
        }
    }, [gameId, setPlayFailure, setPlaySuccess, dReq, myGameId, updateRemWithReq]);

    return (
        <Play />
    );
};

const mapStateToProps = ({ game }) => (
    {
        myGameId: game.gameId,
        dReq: game.dReq
    }
);

const mapDispatchToProps = dispatch => (
    {
        setPlayFailure: message => dispatch(setPlayFailure(message)),
        setPlaySuccess: data => dispatch(setPlaySuccess(data)),
        updateRemWithReq: newDReq => dispatch(updateRemWithReq(newDReq))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Participant);