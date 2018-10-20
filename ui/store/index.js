import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {tabReducer} from 'sources/tabmanager/tabActionReducer';
import {modalReducer} from 'sources/modal/modalActionReducer';
import { settingsReducer } from 'sources/settings/settingsActionReducer';

const reducers = {
    tabs: tabReducer,
    modal: modalReducer,
    settings: settingsReducer
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)));

export default store;