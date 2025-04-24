import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import coinsReducer from './coins.reducer';
import gameReducer from './game.reducer';
import ticketReducer from './ticket.reducer';
import playersReducer from './players.reducer';
import claimsReducer from './claims.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  coins: coinsReducer,
  game: gameReducer,
  ticket: ticketReducer,
  players: playersReducer,
  claims: claimsReducer
});

const CURRENT_VERSION = 0;

const persistConfig = {
  key: 'root',
  storage,
  version: CURRENT_VERSION,
  migrate: (state) => {
    if (!state || !state._persist || state._persist.version !== CURRENT_VERSION) 
      return Promise.resolve(undefined);
    return Promise.resolve(state);
  },
  whitelist: ['user', 'coins', 'game', 'ticket', 'players', 'claims'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
