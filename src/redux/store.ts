import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers/index';

const middleware = applyMiddleware(thunk);
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;


const persistConfig = {
  key: 'root',
  storage: storage
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, composeEnhancers(middleware));

const Persistor = persistStore(store);

export { Persistor };
export default store;
