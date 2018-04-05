import tp_newitem from './_newitem.html';
import tp_newitemfooter from './_newitemfooter.html';

import tp_textgrid from './_textgrid.html';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

class NewItem extends Backbone.Model {
    defaults() {
        return {
            warp_grid_1: {
                labels:["Count", "Perctg.", "Wastage", "Rate", "Sizing Rate"],
                values:[
                    [0,0,0,0,0],
                    [0,0,0,0,0]                    
                ],
                is_readonly:false,
                has_minus_icon:true
            },
            warp_grid_2: {
                labels:["Weight", "Warp Cost", "Warp Sizing Cost"],
                values:[
                    [0,0,0]
                ],
                is_readonly:true,
                has_minus_icon:false 
            },
            weft_grid_1: {
                labels:["Count", "Perctg.", "Wastage", "Rate"],
                values:[
                    [0,0,0,0]
                ],
                is_readonly:false,
                has_minus_icon:true
            },
            weft_grid_2: {
                labels:["Weight", "Weft Cost"],
                values:[
                    [0,0]
                ],
                is_readonly:true,
                has_minus_icon:false
            }            
        }
    }
}

class NewItemView extends Backbone.View {
    initialize(options) { 
        this.template = _.template(tp_newitem);
        this.model = NewItem;
        this.render();
    }

    render() {
        var txtGrid = _.template(tp_textgrid);
        var modelObj = new this.model();

        modelObj.set('warp_grid_1_html',txtGrid(modelObj.get('warp_grid_1')));
        modelObj.set('warp_grid_2_html',txtGrid(modelObj.get('warp_grid_2')));
        modelObj.set('weft_grid_1_html',txtGrid(modelObj.get('weft_grid_1')));
        modelObj.set('weft_grid_2_html',txtGrid(modelObj.get('weft_grid_2')));
        
        console.log(modelObj)
        this.$el = this.template(modelObj.toJSON());
        return this;
    }
}

class NewItemFooter extends Backbone.Model {
    defaults() {
        return {
        }
    }
}

class NewItemFooterView extends Backbone.View {
    initialize(options) { 
        this.template = _.template(tp_newitemfooter);
        this.model = NewItemFooter;



        this.render();
    }

    render() {
        this.$el = this.template((new this.model()).toJSON());
        return this;
    }
}

export {NewItemView,NewItemFooterView};