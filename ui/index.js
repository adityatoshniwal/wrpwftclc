import 'bootstrap'
import 'sources/styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';

// import * as alertify from 'alertifyjs';
import 'sources/tools/alertify-defaults';

// import {SavedItemListView} from 'sources/saveditems/saveditems';

import {AppRouter} from 'sources/utils/router'
import { RESTSession } from 'sources/utils/rest_caller';
import { getCookie, loadUrl } from 'sources/utils/utils';
import App from './app';

const $preloader = $('.loader');

$preloader.toggleClass('open');

window.app_rest = new RESTSession();

ReactDOM.render(
    <App />,
    document.getElementById("app-content")
);



$(window).on('load',() => {
    // window.app_router = new AppRouter()
    // window.app_rest = new RESTSession();
    // window.app_router.start();

    // var slv = new SavedItemListView({
    //     targetEle : "#saved-items"
    // });

    // window.tab_manager = new TabManager();
    
    // window.app_router.addRoutes({
    //     'module/newitem':(route, params)=>{
    //         window.tab_manager.setCurrentTab({
    //             content: (new NewItemView()).$el
    //         });
    //     },
    //     'module/newitem/:id':(route, params)=>{
    //         window.tab_manager.setCurrentPage("New Item",(new NewItemView(params.id)).$el)
    //     }
    // });



    // $('#btnLogout').on('click',()=>{
    //     window.app_rest.post(
    //         'users/logout',
    //         {},
    //         (resp) => {
    //             loadUrl('login.html');
    //         },
    //         null,
    //         false
    //     );        
    // });
    
    $preloader.toggleClass('open');
});
