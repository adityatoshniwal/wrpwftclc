import {PAGEMAP} from "./at_pagemap";
import * as at_controls from './at_controls';
var $ = require('jquery')
var pages = []
const PAGEDIR = 'components/'


export function add_page(pageurl, destId) {
    if(pages.indexOf(pageurl) === -1) {
        pages.push(pageurl)
    }
    console.log(pages);
}

export function remove_page() {
    return pages.pop();
}

export function get_pages() {
    return pages;
}

export function load_page(pagename) {
    var newid = Date.now();
    try {
        /* Page Div Button */
        $("<div>", {
            class:"m-1 float-left bg-white",
        })
        .append(at_controls.button(pagename,"dark","",(e) => {
            $("#menu-content-div .loaded-page").attr("hidden","");
            $("#menu-content-div #"+newid).removeAttr("hidden");
        }))
        .append(at_controls.button("","danger","close",(e) => {
            $("#menu-content-div #"+newid).remove()
            $(e.target).closest("div").remove()
        }))
        .appendTo("#menu-button-div");

        /* Page */
        $("<div>", {
            id:newid,
            class:"loaded-page"
        })
        .load(PAGEDIR+pagename, (response, status, xhr)=>{
            console.log(pagename+":"+status);
            if(status==="success"){
                PAGEMAP[pagename].page_load();
            }
            $("#menu-content-div .loaded-page").attr("hidden","");  
        })
        .appendTo("#menu-content-div")


    } catch (error) {
        console.log(error);
    }
}

export function close_page() {
    // var currpage = 
}

export function get_top_page() {
    return pages[pages.length-1]
}