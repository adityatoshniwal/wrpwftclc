import tp_tabcontent from './_tabcontent.html';
import tp_tabbutton from './_tabbutton.html';
import {NewItemView} from '../newitem/newitem';
import { relative } from 'path';

const tabURL = {
    'module/newitem': NewItemView
}

class TabManager {
    
    constructor(args) {
        this.$container_tab_buttons = $("#container-tab-buttons");
        this.$container_tab_div = $("#container-tab-div");
        this.tp_tab_button = _.template(
        `<li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#<%-id%>" role="tab" aria-controls="<%-id%>" aria-selected="false">
                <span></span>
                <button class="nav-close la la-close la-1x btn-plain-noborder"></button>
            </a>
        </li>`);
        this.tp_tab_content = _.template('<div class="tab-pane vertical-scrollbar" id="<%-id%>" role="tabpanel"></div>');
        _.bindAll(this, 'setCurrentTab', 'setTabTitle', 'tabTitleBind');
    }

    setCurrentTab(params) {
        let currDate = new Date(),
            self = this;

        self.params = $.extend({
            id :"tab-"
                +currDate.getDate()
                +""+currDate.getHours()
                +""+currDate.getMinutes()
                +""+currDate.getSeconds()
                +""+currDate.getMilliseconds(),
            title :'Untitled',
            content : '<h1>No Content !!<h1>'            
        }, params);

        let existingTab = self.$container_tab_buttons.find('.nav-link[aria-controls="'+self.params.id+'"]');
        if(existingTab.length > 0) {
            existingTab.tab('show');
            return;
        }

        $(self.tp_tab_content({
            id : self.params.id,
        }))
        .append(self.params.content)
        .appendTo(self.$container_tab_div);

        $(self.tp_tab_button({
            id : self.params.id,
            title : self.params.title
        }))
        .appendTo(self.$container_tab_buttons);

        self.$container_tab_buttons.find('.nav-close').on('click', function(e) {
            let id = $(e.currentTarget).closest('.nav-link').attr('aria-controls');
            let tabBtn = self.$container_tab_buttons.find('.nav-link[aria-controls="'+id+'"]')
                            .parent('.nav-item');
            
            if(tabBtn.next().length > 0) {
                tabBtn.next().find('.nav-link:last').tab('show');
            }
            else {
                tabBtn.prev().find('.nav-link:last').tab('show');
            }
            tabBtn.remove();
            self.$container_tab_div.find('.tab-pane[id="'+id+'"]').remove();
            // self.$container_tab_buttons.find('.nav-link:last').tab('show');
        });

        self.setTabTitle(self.params.id, self.params.title);
        
        self.$container_tab_buttons.find('.nav-link[aria-controls="'+self.params.id+'"]').tab('show');
    }

    setTabTitle(id, title) {
        let self = this;
        self.$container_tab_buttons.find('.nav-link[aria-controls="'+id+'"] span').html(title);
    }

    tabTitleBind($source) {
        let self = this;
        $source.on('change', function(e){
            if($source.closest('.tab-pane')) {
                if($source.val().trim() === '') $source.val('Untitled');
                
                self.setTabTitle(
                    $source.closest('.tab-pane').attr('id'), $source.val()
                );
            }
                
        })
    }
}

export {TabManager};