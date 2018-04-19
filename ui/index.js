import './common/css/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import './common/css/main.css';

import {SavedItemListView} from './modules/saveditems/saveditems';



// import {MenuListView} from '../../modules/mainmenu/mainmenu'
// import {PageContentView} from '../../modules/pagecontent/pagecontent'

import {AppRouter} from './router'
import { PageManager } from './modules/pagecontent/pagecontent';
import { NewItemView } from './modules/newitem/newitem';

window.onload = () => {
    window.app_router = new AppRouter()

    var pm = new PageManager();
    window.app_router.start()
    var slv = new SavedItemListView({
        targetEle : "#saved-items"
    });

    window.app_router.addRoute('module/newitem',(route, params)=>{
        console.log("Clicked-"+route)
        pm.setCurrentPage("New Item",(new NewItemView()).$el)
    })

    window.app_router.addRoute('module/newitem/:id',(route, params)=>{
        console.log("Clicked-"+route)
        console.log(params.id)
    }) 
}

