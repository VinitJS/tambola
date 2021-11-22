import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Host from './host/Host';

import Participant from './participant/Participant';

import './Livegame.css';
import { setClaiming } from '../../../redux/claims/claims.actions';
import { setCreatingTicket } from '../../../redux/ticket/ticket.actions';

const Livegame = ({ gId, setClaiming, setCreatingTicket }) => {

    const { gameId } = useParams('gameId');

    useEffect(() => {
        setClaiming(false);
        setCreatingTicket(false);
    }, [setClaiming, setCreatingTicket]);

    return (
        <div className="Livegame">
            {
                (gId?.toString() === gameId?.toString())
                && <Host />
            }
            < Participant gameId={gameId} />
        </div >
    );
};

const mapDispatchToProps = dispatch => (
    {
        setClaiming: bool => dispatch(setClaiming(bool)),
        setCreatingTicket: bool => dispatch(setCreatingTicket(bool))
    }
)

const mapStateToProps = ({ game }) => (
    {
        gId: game.gameId
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Livegame);