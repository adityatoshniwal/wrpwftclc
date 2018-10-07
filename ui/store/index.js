import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {searchReducer} from 'sources/search/searchActionReducer';
import {tabReducer} from 'sources/tabmanager/tabActionReducer';

const reducers = {
    tabs: tabReducer,
    search: searchReducer
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)));

export default store;