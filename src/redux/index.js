import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './combineReducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// force default export safely (avoids “middleware is not a function”)
const thunk = require('redux-thunk').default;

const persistConfig = { key: 'root', storage: AsyncStorage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

export { store, persistor };
export default store;
