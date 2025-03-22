import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Host from './host/Host';
import Participant from './participant/Participant';

import { setClaiming } from '../../../redux/claims/claims.actions';
import { setCreatingTicket } from '../../../redux/ticket/ticket.actions';

const Livegame = ({ gId, setClaiming, setCreatingTicket }) => {
    const { gameId } = useParams();

    useEffect(() => {
        setClaiming(false);
        setCreatingTicket(false);
    }, [setClaiming, setCreatingTicket]);

    return (
        <div className="Livegame">
            {gId?.toString() === gameId?.toString() && <Host />}
            <Participant gameId={gameId} />
        </div>
    );
};

const mapStateToProps = ({ game: { gameId } }) => ({ gId: gameId });

const mapDispatchToProps = { setClaiming, setCreatingTicket };

export default connect(mapStateToProps, mapDispatchToProps)(Livegame);
