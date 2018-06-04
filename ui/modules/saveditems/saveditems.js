import tp_savedItem from './saveditems.html';
import { RESTSession } from 'common/js/rest_caller';

let rest = new RESTSession();

class SavedItemList {
    constructor() {
        this.items = {}
        _.bindAll(this,'load_items')
    }

    load_items() {
        rest.get(
            'items', {
                done: (resp) => {
                    _.each(resp.data, (item) => {
                        this.items[item.id] = JSON.parse(item.data_json);
                    })
                },
                async:false
            }
        );
    }

    all_items() {
        return this.items;
    }

    add_item(item_json) {
        this.items[item_json.id] = item_json
    }

    remove_item(item_id) {
        delete this.items[item_id]
    }

    refresh_item(item_id) {
        //call rest api to get data
    }
}

class SavedItemListView {
    constructor(options) {
        this.$target = $(options.targetEle);
        this.itemList = new SavedItemList();
        this.itemList.load_items();
        this.itemTemplate = _.template(tp_savedItem)
        this.render();
    }

    render() {
        let $el = $("ul");
        _.each(this.itemList.all_items() ,(item)=>{
            var $item_view = $(this.itemTemplate(item))
            $el.append($item_view)
        });

        $(this.target).html('');
        $(this.target).append($el);
    }
}

export {SavedItemListView};