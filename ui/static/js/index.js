import 'static/css/index.css';

// import * as alertify from 'alertifyjs';
import 'static/js/alertify-defaults';

import {SavedItemListView} from 'sources/saveditems/saveditems';




// import {MenuListView} from '../../modules/mainmenu/mainmenu'
// import {PageContentView} from '../../modules/pagecontent/pagecontent'

import {AppRouter} from 'sources/router'
import { PageManager } from 'sources/pagecontent/pagecontent';
import { NewItemView } from 'sources/newitem/newitem';
import { RESTSession } from 'sources/rest_caller';
import { getCookie, loadUrl } from './utils';

const $preloader = $('.loader');

$preloader.toggleClass('open');

$(window).on('load',() => {
    window.app_router = new AppRouter()
    window.app_rest = new RESTSession();
    window.app_router.start()

    var slv = new SavedItemListView({
        targetEle : "#saved-items"
    });

    var pm = new PageManager();
    
    window.app_router.addRoutes({
        'module/newitem':(route, params)=>{
            pm.setCurrentPage("New Item",(new NewItemView()).$el)
        },
        'module/newitem/:id':(route, params)=>{
            pm.setCurrentPage("New Item",(new NewItemView(params.id)).$el)
        }
    });

    $('#btnLogout').on('click',()=>{
        window.app_rest.post(
            'users/logout',
            {},
            (resp) => {
                loadUrl('login.html');
            },
            null,
            false
        );        
    });
    
    $preloader.toggleClass('open');
});
