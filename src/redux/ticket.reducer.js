import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
    ticket: null,
    ticket_version: null
});

const ticketSlice = createSlice({
    name: 'ticket',
    initialState: getInitialState(),
    reducers: {
        createTicket: (state, { payload: { ticket, ticket_version } }) => {
            state.ticket = ticket;
            state.ticket_version = ticket_version;
        },
        updateTicket: (state, { payload: { flatTicket, version } }) => {
            if (!flatTicket) {
                state.ticket = null;
                state.ticket_version = null;
            } else if (state.ticket && state.ticket.flat().map(element => Array.isArray(element) ? element[0] : element).join('-') !== flatTicket.join('-')) {
                state.ticket = Array.from({ length: 3 }, (_, row) => flatTicket.slice(row * 9, row * 9 + 9).map(n => n === -1 ? -1 : [n, false]))
                state.ticket_version = version;
            }
        },
        toggleTick: (state, { payload: { row_index, col_index } }) => {
            state.ticket[row_index][col_index][1] = !state.ticket[row_index][col_index][1]
        }
    }
});

export const { createTicket, updateTicket, toggleTick } = ticketSlice.actions;
export default ticketSlice.reducer;