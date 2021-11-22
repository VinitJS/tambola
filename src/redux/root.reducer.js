import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import gameReducer from './game/game.reducer';
import ticketReducer from './ticket/ticket.reducer';
import playReducer from './playing/playing.reducer';
import claimsReducer from './claims/claims.reducer';
import drawReducer from './drawing/drawing.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'game', 'ticket', 'play', 'claims', 'draw']
}

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    ticket: ticketReducer,
    play: playReducer,
    claims: claimsReducer,
    draw: drawReducer
})

export default persistReducer(persistConfig, rootReducer);