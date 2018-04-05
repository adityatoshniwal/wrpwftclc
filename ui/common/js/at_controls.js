import {json_to_attr} from '../../common/js/at_utils';

var $ = require('jquery');

export function button(text,color,icon, click_event = (e) => {} ) {
    var ele = 
    $("<button>",{
        class:"btn btn-"+color+" rounded-0",
        click:click_event
    });
    if(icon) {
        $('<i>',{class:'la la-'+icon+' mr-1'}).appendTo(ele)
    }
    $('<span>', {html:text}).appendTo(ele)
    return ele;
}

export function page_tab_button(text, targetid, click_event = (e) => {} ){
    var ele = ''


    return ele;
}

export function link_button(text, bgcolor, textcolor, icon, click_event = (e) => {} ) {
    var ele = 
    $('<a>', {
        href:"#",
        class:"btn btn-sm border-0 rounded-0 btn-"+bgcolor,        
        click:click_event
    });
    if(icon) {
        $('<i>',{class:'la la-'+icon+' la-lg mr-1 text-'+textcolor}).appendTo(ele);
    }
    $('<span>', {html:text}).appendTo(ele);
    return ele;        

}

export function menu_link(attr) {
    var linkText = attr.linkText;
    var icon = attr.icon;

    ["linkText","icon"].forEach((key) => {delete attr[key]})
    
    var ele=`
    <a ${json_to_attr(attr)}>`
    if(icon) {
        ele = ele + `<i class="la la-${icon} text-danger la-lg"></i>`
    }
    ele = ele + `
        <span class="">${linkText}</span>
        <span class="badge badge-pill badge-primary"></span>        
    </a>`
    return ele
}

export function nav_menu_item(attr) {
    return `
    <li class="nav-item active">
        ${menu_link(attr)}
    </li>`
}

export function icon(name,color,size="1x") {
    return `
    <i class="la la-${name} la-${size} ${color}"></i>`    
}

export function textlabelrow(textlabel = "text", cols, cols_labels=[],row_label="",id_prefix="", readonly=false) {
    var row = $("<tr>");

    $('<td>').append(row_label).appendTo(row);

    for(var j=0; j<cols; j++) {
        $('<td>')
            .append(
                textlabel==="label" ? cols_labels[j] : 
                        $('<input>',{
                            id:(id_prefix+j),
                            class:"rounded-0 m-0 form-control form-control-sm",
                            maxlength:"10"
                        })
            )
            .appendTo(row)
    };
    if(readonly) {
        row.find("input").attr("readonly","readonly");
    }
    return row;
}

export function textlabelgrid(cols=0, rows=0, cols_labels=[], rows_labels=[], id_prefix="", attr={}, readonly="") {
    /* Add blank labels if lables are less */
    while(cols_labels.length < cols) {
        cols_labels.push("");
    }

    while(rows_labels.length < rows) {
        rows_labels.push("");
    }

    var ele = $("<table>",attr)

    for(var i = 0; i < rows; i++){
        if(i===0){
            textlabelrow("label",cols,cols_labels,"",id_prefix+i).appendTo(ele);
        }
        textlabelrow("text",cols,[],rows_labels[i],id_prefix+i,readonly).appendTo(ele);
    }
    return ele;
}