import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import logger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import * as reducer from './index'

const root = combineReducers(reducer);
const middle = applyMiddleware(thunk,promise,logger);

const store = createStore(root,compose(middle));

export default store;