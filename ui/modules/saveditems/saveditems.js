import tp_savedItem from './_saveditem.html';


class SavedItem extends Backbone.Model {
    defaults() {
        return {
            name:"New Item",
            totalWt:0,
            totalWtWaste:0,
            actualCost:0
        }
    }
}

class SavedItemList extends Backbone.Collection {
    initialize(){
        this.model = SavedItem;
    }
}

class SavedItemView extends Backbone.View {
    initialize() {
        this.template = _.template(tp_savedItem);
    }

    render() {
        this.$el = $(this.template(this.model.toJSON()));
        return this;
    }
}

class SavedItemListView extends Backbone.View {
    initialize(options) {
        this.el = options.targetEle;
        this.$el = $(this.el);

        this.ItemView = SavedItemView;

        this.savedItems = new SavedItemList();

        this.fetchItems();

        this.render();
    }

    fetchItems() {
        //load this.savedItems
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        })); 
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));
        this.savedItems.add(new this.savedItems.model({
            name:"Aditya", total:14
        }));                                                               
    }

    render() {
        this.$el.html('');
        this.savedItems.each((item) => {
            var v = new this.ItemView({
                model:item
            })

            this.$el.append(v.render().$el)
        })
    }
}

export {SavedItemListView};