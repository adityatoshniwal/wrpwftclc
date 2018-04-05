import '../css/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../css/main.css';

// import {map_and_load} from '../../common/js/at_utils';
// import * as at_controls from '../../components/js/at_controls';
// import * as at_pagemanage from '../../components/js/at_pagemanage';

import {SavedItemListView} from '../../modules/saveditems/saveditems';

import {MenuListView} from '../../modules/mainmenu/mainmenu'
import {PageContentView} from '../../modules/pagecontent/pagecontent'
import { AppRouter } from './router';

window.onload = () => {

    var slv = new SavedItemListView({
        targetEle : "#saved-items"
    });

    // $("#btnNewItem").on('click', (e) => {

    //     var pageContent = new PageContentView({
    //         targetEle:"#pageModal .modal-dialog",
    //         module : $(e.currentTarget).data("module")
    //     })
        
    //     $("#pageModal").modal('show');

    // }) 

    var router = new AppRouter;
    Backbone.history.start();

    console.log(Backbone.history.handlers);

    

    // var menuView = new MenuListView({
    //     targetEle : "#main-menu",
    //     menuData : [
    //         { href:"#",text:"New",icon:"la-edit", has_badge:true, module:"newitem"},
    //         { href:"#",text:"Saved Items",icon:"la-list-ul", has_badge:true, module:"saveditems"},
    //         { href:"#",text:"Templates",icon:"la-bookmark", has_badge:true, module:"templates"},
    //         { href:"#",text:"Reports",icon:"la-bar-chart", has_badge:true, module:"reports"},
    //     ]
    // });    


    // var userDropData = [
    //     { class:"dropdown-item",href:"#",linkText:"Profile",icon:"cog"},
    //     { class:"dropdown-item",href:"#",linkText:"Logout",icon:"sign-out"}
    // ]#

    // map_and_load(menuData,at_controls.nav_menu_item,"main-menu")
    // map_and_load(userDropData,at_controls.menu_link,"user-drop")

    // $("#main-menu .nav-link").on("click", (e) =>{
    //     var ele = $(e.target).closest("a")
    //     var pagename = ele.data("pagename");
    //     at_pagemanage.load_page(pagename);
    // })

    // $("#close-page-btn").on("click", (e) => {
    //     at_pagemanage.close_page();
    // })

    // $("#username").text("Aditya")

    // $('[data-toggle="tooltip"]').tooltip();
    
}

