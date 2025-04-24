import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
    ticket: [],
    ticket_version: 0
});

const ticketSlice = createSlice({
    name: 'ticket',
    initialState: getInitialState(),
    reducers: {
        updateTicket: (state, { payload: { ticket, ticket_version } }) => {
            state.ticket = ticket;
            state.ticket_version = ticket_version;
        },
        toggleTick: (state, { payload: { row_index, col_index } }) => {
            state.ticket[row_index][col_index][1] = !state.ticket[row_index][col_index][1]
        }
    }
});

export const { updateTicket, toggleTick } = ticketSlice.actions;
export default ticketSlice.reducer;