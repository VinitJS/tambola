import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket } from '../../redux/ticket.reducer';
import { updateClaims } from '../../redux/claims.reducer';
import Ticket from './ticket/Ticket';
import Ticketbar from './ticketbar/Ticketbar';
import { firestore } from "../../utils/firebase";
import './Tsection.css';

const Tsection = ({ game_id }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { id, name, total_points = 0, total_stars = 0 } = useSelector(state => state.user);
    const { play_id, version } = useSelector(state => state.game);
    const ticket_version = useSelector(state => state.ticket.ticket_version);

    const handleJoin = async () => {
        setLoading(true);
    
        try {
            const column_count = Array(9).fill(-1);
            const row_count = [0, 0, 0];
            const ticket = Array(3).fill(null).map(() => Array(9).fill(-1));
    
            for (let col = 0; col < 9; col++) {
                const random_row = Math.floor(Math.random() * 3);
                if (
                    row_count[random_row] > 4 ||
                    (col > 1 && (ticket[random_row][col - 1] === 0 && ticket[random_row][col - 2] === 0))
                ) {
                    col--;
                } else {
                    ticket[random_row][col] = 0;
                    row_count[random_row]++;
                    column_count[col]++;
                }
            }
    
            for (let row = 0; row < 3; row++) {
                for (let i = row_count[row]; i < 5; i++) {
                    const random_column = Math.floor(Math.random() * 9);
                    if (
                        ticket[row][random_column] === 0 ||
                        (ticket[row][random_column - 1] === 0 && ticket[row][random_column - 2] === 0) ||
                        (ticket[row][random_column + 1] === 0 && ticket[row][random_column + 2] === 0) ||
                        (ticket[row][random_column - 1] === 0 && ticket[row][random_column + 1] === 0)
                    ) {
                        i--;
                    } else {
                        ticket[row][random_column] = 0;
                        row_count[row]++;
                        column_count[random_column]++;
                    }
                }
            }
    
            let alternate = 0;
            const all_numbers = [
                [[1, 3, 5, 7, 9], [0, 2, 4, 6, 8]],
                [[11, 13, 15, 17, 19], [10, 12, 14, 16, 18]],
                [[21, 23, 25, 27, 29], [20, 22, 24, 26, 28]],
                [[31, 33, 35, 37, 39], [30, 32, 34, 36, 38]],
                [[41, 43, 45, 47, 49], [40, 42, 44, 46, 48]],
                [[51, 53, 55, 57, 59], [50, 52, 54, 56, 58]],
                [[61, 63, 65, 67, 69], [60, 62, 64, 66, 68]],
                [[71, 73, 75, 77, 79], [70, 72, 74, 76, 78]],
                [[81, 83, 85, 87, 89], [80, 82, 84, 86, 88]]
            ];
            const specialNumber = version % 90;
            const specialCol = Math.floor(specialNumber / 10);
    
            for (let j = 0; j < 9; j++) {
                let pick_array = [];
                const temp_call_array = [];
                for (let l = 0; l < column_count[j] + 1; l++) {
                    pick_array = all_numbers[j][alternate];
                    const random_call = pick_array.splice(Math.floor(Math.random() * pick_array.length), 1)[0];
                    temp_call_array.push(random_call);
                    alternate = (alternate === 0 ? 1 : 0);
                }
    
                if (j === specialCol && !temp_call_array.includes(specialNumber)) {
                    const replacedIndex = Math.floor(Math.random() * temp_call_array.length);
                    temp_call_array[replacedIndex] = specialNumber;
                }
    
                temp_call_array.sort();
                for (let m = 2; m > -1; m--) {
                    if (ticket[m][j] === 0) {
                        ticket[m][j] = [temp_call_array.pop(), false];
                    }
                }
            }
    
            await firestore
                .collection("call")
                .doc(game_id)
                .update({
                    [`players.${id}`]: {
                        name,
                        points: 0,
                        total_points,
                        total_stars,
                        ticket: ticket.flat().map(element => Array.isArray(element) ? element[0] : element),
                        chances_left: 6
                    }
                });
    
            dispatch(createTicket({
                ticket,
                ticket_version: version
            }));
    
            dispatch(updateClaims({
                chances_left: 6
            }));
    
        } catch (error) {
            console.error("Error resetting game:", error);
        } finally {
            setLoading(false);
        }
    };    

    return (
        (game_id === play_id && version === ticket_version)
            ?
            <>
                <Ticket />
                <Ticketbar />
            </>
            :
            <div className='Join'>
                <button disabled={loading || !id} className="btn btn-o bd mxl pxl fsxl" onClick={handleJoin}>JOIN GAME</button>
            </div>
    );
};

export default Tsection;