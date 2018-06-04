import {RESTSession} from 'common/js/rest_caller';
import { loadUrl } from './utils';


const $preloader = $('.loader');



$(window).on('load', ()=> {
    $('#btnLogin').on('click',(e) => {
        $preloader.addClass("open");
        let rest = new RESTSession();
        let resp;
        $("#errorMsg").html('');
        rest.post(
            'users/login',{
                'username':$("#txtUsername").val(),
                'pass':$("#txtPass").val()
            },(resp) => {
                if(!resp.data.isValid) {
                    $("#errorMsg").html(resp.data.message);
                }
                else {
                    loadUrl('index.html');
                }
                $preloader.removeClass("open");
            },() => {
                $preloader.removeClass("open");
            }
        );
    })
});