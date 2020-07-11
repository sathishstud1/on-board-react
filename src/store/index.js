import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import authentication from './authentication/reducer';
import role from './roles/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {verifyGoogleEffect} from "../sagas/verifyGoogleLogin";

const persistConfig = {
  key:'root',
  storage,
  whiteList:[authentication, role]
}
const combinedReducers = combineReducers({authentication, role})
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistReducer(persistConfig, combinedReducers),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(verifyGoogleEffect);

const persistor = persistStore(store);
export  {store, persistor};
