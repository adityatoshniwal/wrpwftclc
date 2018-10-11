import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {tabReducer} from 'sources/tabmanager/tabActionReducer';
import {modalReducer} from 'sources/modal/modalActionReducer';

const reducers = {
    tabs: tabReducer,
    modal: modalReducer,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)));

export default store;