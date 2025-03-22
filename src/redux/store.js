import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import rootReducer from './root.reducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

let middlewares = [thunk]; // logger, 

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

// Assign to a named variable before exporting
const storeConfig = { store, persistor };
export default storeConfig;
