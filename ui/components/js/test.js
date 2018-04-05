var Backbone = require("backbone");
var _ = require('underscore');

export function test() {

    Backbone.View.extend()

    console.log('in test')

    var SavedItem = Backbone.Model.extend({
        defaults : {
            itemName : "",
            totalWt : 0,
            totalWtWastage : 0,
            totalCost : 0
        },
        initialize : function() {
            console.log("Saved Item init")
        }
    });

    var SavedItemList = Backbone.Collection.extend({
        model : SavedItem,
        initialize:function(){
            this.on('add', function() {
                console.log("Item Added to Saveitemslist");
            });

            this.on('remove', function() {
                console.log("Item was removed");
            })
        }
    });

    var savedItemData = new SavedItemList();

    savedItemData.add(new SavedItem({itemName:"Item1"}))

    var SavedItemView = Backbone.View.extend({
        tagName :'li',
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render:function(){
            this.$el.html('<h4>'+this.itemName+'</h4>')
            return this;
        }
    })

    var SavedItemContainer = Backbone.View.extend({
        el:$("#save-items"),
        initialize: function(){
            this.listenTo(savedItemData, 'change', this.render)
        },
        render:function() {
                console.log('');
            }
    })
};
