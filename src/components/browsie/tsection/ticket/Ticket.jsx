import React from 'react';
import { connect } from 'react-redux';
import { toggleTick } from '../../../../redux/ticket/ticket.actions';

import './Ticket.css';

const Ticket = ({ myTicket, toggleTick, myTicket1 }) => {

    return (
        <div className="Ticket">
            <div className="grid mts bco brs tac">
                {
                    myTicket && myTicket.map((row, index) => <div className="trow frow faic w100pc" key={index}>
                        {
                            row.map((cell, i) => <button onClick={() => cell !== -1 && toggleTick(index, i, 0)} className={`tcell brs ${cell[1] ? "bcy" : "bco cw"}`} key={i}>{cell[0]}</button>)
                        }
                    </div>)
                }
            </div>
        </div>
    );
};

const mapStateToProps = ({ ticket }) => (
    {
        myTicket: ticket.myTicket,
        myTicket1: ticket.myTicket1
    }
);

const mapDispatchToProps = dispatch => (
    {
        toggleTick: (index, i, ticketNumber) => dispatch(toggleTick(index, i, ticketNumber))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);