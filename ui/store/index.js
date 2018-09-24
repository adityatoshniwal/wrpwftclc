import {createStore, combineReducers, applyMiddleware} from 'redux';
import itemDetailsReducer from 'sources/itemdetails/itemActionReducer';
import tabReducer from 'sources/tabmanager/tabActionReducer';
import {searchReducer} from 'sources/search/searchActionReducer';

import thunk from 'redux-thunk';


const reducers = {
    item: itemDetailsReducer,
    tabs: tabReducer,
    search: searchReducer
}

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

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