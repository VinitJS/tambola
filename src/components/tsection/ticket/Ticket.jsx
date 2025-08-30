import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTick } from '../../../redux/ticket.reducer';

import './Ticket.css';

const Ticket = () => {
    const dispatch = useDispatch();
    const ticket = useSelector(state => state.ticket.ticket);

    return (
        <div className="Ticket">
            <div className="grid bco tac">
                {
                    ticket && ticket.map((row, row_index) => (
                        <div className="trow w100pc" key={row_index}>
                            {
                                row.map((cell, col_index) => <button 
                                    onClick={() => cell !== -1 && dispatch(toggleTick({ row_index, col_index }))} 
                                    className={`tcell brs ${cell[1] ? "bcy" : "bco cw"}`} 
                                    key={col_index}
                                >
                                    {cell[0]}
                                </button>)
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Ticket;
