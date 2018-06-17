import tp_pagewrap from './_pagewrap.html';
import {NewItemView} from '../newitem/newitem';
import { relative } from 'path';

const PAGEURL = {
    'module/newitem': NewItemView
}

class PageManager {
    
    constructor(args) {
        this.page_stack_arr = [];
        this.$page_stack = $("#page-stack");
        this.template = _.template(tp_pagewrap);
        _.bindAll(this, 'getWrappedPage');
    }

    setCurrentPage(page_title="", $page=$("Oops !! Page Not Found"),page_events=(pageObj)=>{}) {
        var currDate = new Date()
        var id = "page-"
                    +currDate.getDate()
                    +""+currDate.getHours()
                    +""+currDate.getMinutes()
                    +""+currDate.getSeconds()
                    +""+currDate.getMilliseconds()

        var $pageWrap = $(this.template({
            page_id:id, 
            page_title:page_title
        }))

        $pageWrap.find(".page-content").append($page)

        $pageWrap.find(".page-close").off('click').on('click',()=>{
            var topid = this.page_stack_arr.pop()
            $("#page-stack #"+topid).remove()
            if(this.page_stack_arr.length == 0) {
                $("#home").slideDown(300)
            }
        })

        this.$page_stack.append($pageWrap);

        $("#page-stack #"+id).removeClass("d-none")
        this.page_stack_arr.push(id);
        $("#home").slideUp(200)
        
        // page_events($("#page-stack #"+id));
    }

    getWrappedPage() {
        return this.template()
    }

    // initialize(options) {
    //     this.el = options.targetEle;
    //     this.$el = $(this.el);

    //     this.model = PageContent;
    //     this.moduleObj = options.moduleObj;

    //     this.template = _.template(tp_page);

    //     this.render();
    // }

    // render(){
    //     this.$el.html('');

    //     var body = (new this.moduleObj.body()).$el;
    //     var footer = this.moduleObj.footer ?(new this.moduleObj.footer()).$el:''

    //     this.$el.append(
    //         this.template((
    //             new this.model({
    //                 title : this.moduleObj.title,
    //                 body : body,
    //                 footer :footer
    //             })
    //         ).toJSON())
    //     );
    //     return this;
    // }
}

export {PageManager};