import TicketActionTypes from './ticket.types';

const INITIAL_STATE = {
    myTicket: [],
    myTNums: [],
    columnDensity: [],
    tVersion: 0,
    creatingTicket: false,
    error: ""
}

const ticketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TicketActionTypes.SET_MYTICKET:
            return {
                ...state,
                ...action.payload
            }
        case TicketActionTypes.TOGGLE_TICK:
            const tempTicket = [...state.myTicket];
            tempTicket[action.payload.index][action.payload.i][1] = !tempTicket[action.payload.index][action.payload.i][1]
            return {
                ...state,
                myTicket: tempTicket
            }
        case TicketActionTypes.SET_JOIN_ERROR:
            return {
                ...state,
                error: action.payload,
                creatingTicket: false
            }
        case TicketActionTypes.SET_CREATING_TICKET:
            return {
                ...state,
                creatingTicket: action.payload
            }
        case TicketActionTypes.RESET_TICKET:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}

export default ticketReducer;