// Config for redux global store
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // ✅ default import
import rootReducer from './combineReducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(persistedReducer, composedEnhancers);
const persistor = persistStore(store);

export { store, persistor };
export default store; // ✅ default export so `import store from '../redux'` works
