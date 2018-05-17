import 'common/css/reset.css';
import 'common/css/index.css';

import {SavedItemListView} from 'modules/saveditems/saveditems';




// import {MenuListView} from '../../modules/mainmenu/mainmenu'
// import {PageContentView} from '../../modules/pagecontent/pagecontent'

import {AppRouter} from 'common/js/router'
import { PageManager } from 'modules/pagecontent/pagecontent';
import { NewItemView } from 'modules/newitem/newitem';
import { RESTSession } from 'common/js/rest_caller';
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
