var $ = require('jquery');

export function json_to_attr(inJson) {
    var str = "";
    for(var key in inJson){
        str =  str + " " + key + "=\""+inJson[key]+"\""
    }
    return  str.trim();
}

export function map_and_load(inJson, eleFunc = (e) => {return ""}, targetId) {
    append_element("#"+targetId,inJson.map(eleFunc).join("\n"))
}

export function append_element(selector, element) {
    $(selector).append(element);
}

export function set_element(selector,element) {
    $(selector).html(element);
}

export function remove_element(selector) {
    $(selector).remove();
}

export function remove_element_child(selector, filter="") {
    $(selector).children(filter).remove();
}