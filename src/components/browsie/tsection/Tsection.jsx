import React from 'react';
import Ticket from './ticket/Ticket';
import Ticketbar from './ticketbar/Ticketbar';
import { connect } from 'react-redux';
import { createTicket } from '../../../redux/ticket/ticket.actions';

const Tsection = ({ gameId, playId, gVersion, tVersion, id, name, v, p, createTicket, creatingTicket, size, players }) => {

    const handleJoin = async () => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        const utter = new SpeechSynthesisUtterance();
        const voice = voices.filter(voice => voice.lang === "hi-IN")[0] || voices[0];
        utter.voice = voice;
        utter.volume = 1;
        utter.pitch = 1;
        utter.rate = 1;
        utter.text = "You have 6 chances to claim.";
        synth.speak(utter);

        let shouldReset = false;
        const playerId = players.find(player => player.id === id.toString());
        if(!playerId) shouldReset = true;
        createTicket(gVersion, gameId, id, name, v, p, 5, shouldReset, size);
    }

    return (
        (gameId === playId && gVersion === tVersion)
            ?
            <>
                <Ticket />
                <Ticketbar />
            </>
            :
            <>
                <button disabled={creatingTicket} className="btn btn-g mtxl pxl" onClick={handleJoin}>GET TICKET</button>
            </>

    );
};

const mapStateToProps = ({ user, ticket, play }) => (
    {
        id: user.id,
        name: user.name,
        v: user.v,
        p: user.p,
        tVersion: ticket.tVersion,
        creatingTicket: ticket.creatingTicket,
        gVersion: play.gVersion,
        playId: play.gameId,
        size: play.size,
        players: play.players,
    }
);

const mapDispatchToProps = dispatch => (
    {
        createTicket: (gVersion, gameId, userId, name, v, p, points, shouldReset) => dispatch(createTicket(gVersion, gameId, userId, name, v, p, points, shouldReset))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Tsection);