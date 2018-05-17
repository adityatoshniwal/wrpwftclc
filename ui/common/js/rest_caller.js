import { error } from "util";

const BASE_URL = window.location.protocol + '//' + window.location.host +'/api';

class RESTSession {
    
    constructor() {
        this.dataType = "json";
        this.contentType = "application/json; charset=utf-8";
        _.bindAll(this, 'responseFail','get','put','post','delete');
    }

    responseFail(jqXHR) {
        //Unauthorised access
        if(jqXHR.status === 401) {
            window.location.replace("401.html");
        }
        else {
            alert('Failed\nStatus : '+jqXHR.status+'-'+jqXHR.statusText
            +'\nReadyState : '+jqXHR.readyState);
        }
    }

    post(url, data, successCallback = null, failCallback = null, async=true) {
        $.ajax(
            BASE_URL + "/" + url, {
            method : "POST",
            dataType : this.dataType,
            contentType : this.contentType,
            data : JSON.stringify(data),
            async :async
        }).done((data, status, jqXHR)=>{
            if(successCallback != null){
                successCallback(data);
            }
        }).fail((jqXHR, status, errorThrown)=>{
            this.responseFail(jqXHR);
            if(failCallback != null) {
                failCallback(data);
            }
        }).always((a, status, b)=>{
            //console.log(a);
        });
    }

    get(url, successCallback = null, failCallback = null, async=true) {
        $.ajax(
            BASE_URL + "/" + url, {
            method : "GET",
            dataType : this.dataType,
            contentType : this.contentType,
            async :async
        }).done((data, status, jqXHR)=>{
            if(successCallback != null){
                successCallback(data);
            }
        }).fail((jqXHR, status, errorThrown)=>{
            this.responseFail(jqXHR);
            if(failCallback != null) {
                failCallback(data);
            }
        }).always((a, status, b)=>{
            //console.log(a);
        });
    }

    put(url, data) {
        $.ajax({
            method : "PUT",
            dataType : this.dataType,
            contentType : this.contentType,
            url : BASE_URL + "/" + url,
            type : "json",
            data : data,
        }).done((data, status, jqXHR)=>{
            if(successCallback != null){
                successCallback(data);
            }
        }).fail((jqXHR, status, errorThrown)=>{
            this.responseFail(jqXHR);
            if(failCallback != null) {
                failCallback(data);
            }
        }).always((a, status, b)=>{
            //console.log(a);
        });
    }

    post(url, data, successCallback = null, failCallback = null, async=true) {
        $.ajax(
            BASE_URL + "/" + url, {
            method : "POST",
            dataType : this.dataType,
            contentType : this.contentType,
            data : JSON.stringify(data),
            async :async
        }).done((data, status, jqXHR)=>{
            if(successCallback != null){
                successCallback(data);
            }
        }).fail((jqXHR, status, errorThrown)=>{
            this.responseFail(jqXHR);
            if(failCallback != null) {
                failCallback(data);
            }
        }).always((a, status, b)=>{
            //console.log(a);
        });
    }

    delete(url) {
        $.ajax({
            method : "DELETE",
            dataType : this.dataType,
            contentType : this.contentType,
            url : BASE_URL + "/" + url,
            type : "json",
        }).done((data, status, jqXHR)=>{
            null;
        }).fail((jqXHR, status, errorThrown)=>{
            this.responseFail(jqXHR);
        }).always((a, status, b)=>{
            //console.log(a);
        });
    }
}

export {RESTSession};