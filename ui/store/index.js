import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import itemDetailsReducer from 'sources/itemdetails/itemActionReducer';

import {searchReducer} from 'sources/search/searchActionReducer';
import {tabReducer} from 'sources/tabmanager/tabActionReducer';

const reducers = {
    item: itemDetailsReducer,
    tabs: tabReducer,
    search: searchReducer
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)));

export default store;


// {
//     user: '',
//     tab_template: {
//         content_id: '',
//         title: 'Untitled',
//         type: '',
//         closeable: true,
//         content: {}
//     },
//     tabs: {
//         'search-tab': {
//             content_id: 'search-content',
//             title: 'Search',
//             type: 'search',
//             closeable: false,
//             content: {
//                 curr_search: '',
//                 items_list: [
        
//                 ]
//             }
//         },
//         // 'settings-tab': {
//         //     content_id: 'settings-content',
//         //     title: 'Settings',
//         //     type: 'settings',
//         //     closeable: false,
//         //     content: {

//         //     }
//         // },
//         // 'aboutus-tab': {
//         //     content_id: 'aboutus-content',
//         //     title: 'About us',
//         //     type: 'aboutus',
//         //     closeable: false,
//         //     content: {

//         //     }
//         // }
//     },
//     active_tab: 'search-tab',    
// });