import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import npvReducer from './npvReducer';

/* eslint-disable no-underscore-dangle */
export default function createStore() {
  return _createStore(
    combineReducers({ npv: npvReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
  );
}
/* eslint-enable */
