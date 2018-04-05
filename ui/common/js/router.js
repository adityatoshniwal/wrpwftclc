import { PageContentView } from "../../modules/pagecontent/pagecontent";
import { NewItemView, NewItemFooterView } from "../../modules/newitem/newitem";

const MODULEMAP = {
    'newitem': {
        title : 'New Item',
        body : NewItemView,
        footer : NewItemFooterView
    }    
}

class AppRouter extends Backbone.Router {
    constructor() {
        super({
            routes: {
                '':'home',
                'module/:modulename(/:id)':'showModule'
            }
        });
        
        console.log('routes set !!');
    }

    home(){
        
    }

    showModule(modulename,id = 0) {
        var pageContent = new PageContentView({
            targetEle:"#pageModal .modal-dialog",
            moduleObj:MODULEMAP[modulename]
        })
        
        $("#pageModal").modal('show');
    }
}

export {AppRouter}