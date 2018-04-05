import tp_page from './_pagecontent.html';
import {NewItemView, NewItemFooterView} from '../newitem/newitem';

const PAGEMAP = {

}

class PageContent extends Backbone.Model {
    defaults(){
        return {
            title : "New Page",
            body:"Page is empty",
            footer:'',
        }
    }
}

class PageContentView extends Backbone.View {
    
    initialize(options) {
        this.el = options.targetEle;
        this.$el = $(this.el);

        this.model = PageContent;
        this.moduleObj = options.moduleObj;

        this.template = _.template(tp_page);

        this.render();
    }

    render(){
        this.$el.html('');

        var body = (new this.moduleObj.body()).$el;
        var footer = this.moduleObj.footer ?(new this.moduleObj.footer()).$el:''

        this.$el.append(
            this.template((
                new this.model({
                    title : this.moduleObj.title,
                    body : body,
                    footer :footer
                })
            ).toJSON())
        );
        return this;
    }
}
export {PageContentView};