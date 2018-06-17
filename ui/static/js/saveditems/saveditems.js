import tp_savedItem from './saveditems.html';
import { RESTSession } from 'rest_caller';
import { url_for } from 'sources/url_for';


let rest = new RESTSession();

class SavedItemList {
    constructor() {
        this.items = {}
        _.bindAll(this,'load_items')
    }

    load_items(callback) {
        return $.ajax(
            url_for('items'), 
            {
                method : "GET",
                dataType : "json",
                contentType : "application/json; charset=utf-8",
            })
            .done((resp) => {
                _.each(resp.data, (item) => {
                    this.items[item.id] = JSON.parse(item.data_json);
                })
            });
    }

    all_items() {
        return this.items;
    }
}

class SavedItemListView {
    constructor(options) {
        this.$target = $(options.targetEle);
        this.itemTemplate = _.template(tp_savedItem)

        this.itemList = new SavedItemList();
        this.itemList.load_items()
            .done(() => {
                this.render()
            });
    }

    render() {
        this.$target.html('');
        this.$target.append('<ul>');
        let $ul = this.$target.find('ul');
        _.each(this.itemList.all_items() ,(item)=>{
            var $item_view = $(this.itemTemplate(item))
            $ul.append($item_view)
        });
    }
}

export {SavedItemListView};