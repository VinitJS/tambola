import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setPlayFailure, setPlaySuccess } from '../../../../redux/playing/playing.actions';
import { updateRemWithReq } from '../../../../redux/game/game.actions';
import { getGameRef } from '../../../../utils/firebase';

import Play from './Play';

const Participant = ({ gameId, setPlaySuccess, setPlayFailure, updateRemWithReq, myGameId, dReq }) => {
    useEffect(() => {
        if (!gameId) return;

        const playRef = getGameRef(gameId.toString());
        const unsubscribe = playRef.onSnapshot(doc => {
            if (!doc.exists) {
                setPlayFailure("Internet Connection Breaking.");
                return;
            }

            const data = doc.data();

            if (myGameId && gameId === myGameId.toString() && data.dreq !== 0 && data.dreq !== dReq) {
                updateRemWithReq(data.dreq);
                return;
            }

            const { chances, claims, coins, gVersion, gameBy, c, players, playersNums } = data;
            const playersArr = Object.entries(players).map(([id, value]) => ({ id, ...value }));

            setPlaySuccess({
                chances,
                claims,
                coins,
                gVersion,
                gameBy,
                c,
                players: playersArr.sort((b, a) => a.points - b.points),
                playersNums,
                size: playersArr.length,
                gameId,
                isValidGame: true,
            });
        });

        return () => unsubscribe();
    }, [gameId, myGameId, dReq, setPlayFailure, setPlaySuccess, updateRemWithReq]);

    return <Play />;
};

const mapStateToProps = ({ game }) => ({
    myGameId: game.gameId,
    dReq: game.dReq,
});

export default connect(mapStateToProps, { setPlayFailure, setPlaySuccess, updateRemWithReq })(Participant);
