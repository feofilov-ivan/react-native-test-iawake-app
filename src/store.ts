import AsyncStorage from '@react-native-community/async-storage';
import appReducer from './reducers/appReducer';
import usersReducer from './reducers/usersReducer';
import mediaReducer from './reducers/mediaReducer';
import sagas from './sagas/';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Dispatch,
  MiddlewareAPI,
  compose,
} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
//import {composeWithDevTools} from 'redux-devtools-extension';

/*ß
 *--------------------------------------------------*
 * Persist config documentation
 * https://github.com/rt2zz/redux-persist/blob/master/src/types.js#L13-L27
 *--------------------------------------------------*
 */

const appPersistConfig = {
  storage: AsyncStorage,
  key: 'app',
};

const userPersistConfig = {
  storage: AsyncStorage,
  key: 'user',
};

const mediaPersistConfig = {
  storage: AsyncStorage,
  key: 'media',
};

export const reducers = {
  app: persistReducer(appPersistConfig, appReducer),
  users: persistReducer(userPersistConfig, usersReducer),
  media: persistReducer(mediaPersistConfig, mediaReducer),
};

export const rootReducer = combineReducers(reducers);

const appMiddleware = (_store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
  next(action);
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, appMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

export const store = createStore(rootReducer, compose(...enhancers));

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
