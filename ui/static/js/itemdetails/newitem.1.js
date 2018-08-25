import tp_newitem from './_newitem.html';
// import { TextGrid } from './textgrid';
import {UI} from 'formulize';
import { FormulaGrid } from './formulagrid';


alertify.dialog('formulaDialog', function() {
    var $dialogContent;
    return {
        main: function(params) {
        },
        setup: function() {
            return {
                options: {
                    resizable: false,
                    maximizable: false,
                    padding: false,
                },
                buttons: [
                    {text:'OK', className: alertify.defaults.theme.ok,},
                    {text:'Cancel', key:27, className: alertify.defaults.theme.cancel,}
                ],
            };
        },
        build: function() {
            $dialogContent = $(this.elements.content);
            $dialogContent.append('<div class="formula-div"></div>');
            $dialogContent.append(`<div class="formula-tags">
            </div>`);
        },
        settings: {
            dialogFormula: '',
        },
        // listen and respond to changes in dialog settings.
        settingUpdated: function(key, oldValue, newValue) {
            switch(key) {
                case 'dialogFormula':
                    $dialogContent.find('.formula-div').formulize({
                        text: {
                            pass: 'Valid',
                            error: 'Not Valid'
                        }
                    })
    
                    var formulize = $dialogContent.find('.formula-div').data('$formulize');
                    formulize.setData({
                        operator: '*',
                        operand1: { value: { type: 'unit', unit: 1 } },
                        operand2: { value: { type: 'unit', unit: 2 } }
                    });

                    $('<a href="#" data-value="3.14">PI</a>')
                    .appendTo($dialogContent.find('.formula-tags'))
                    .on('click', function(e){
                        formulize.insert({'data-value':1});
                    })
                break;
            }
        },
        // listen to internal dialog events.
        hooks: {

        },
    };
});

class NewItemModel {
    constructor(id=0) {
        this.id = id
        if(this.id===0){
            this.data = this.defaults()
        }
        else {
            //load from service
            this.data = {
                warp_grid: [
                    [2,0,0,0,0,0,0,0],
                    [1,0,0,0,0,0,0,0],
                    [3,0,0,0,0,0,0,0]
                ],
                weft_grid: [
                    [0,0,0,0,0,0]
                ],
                warp_pack_grid : [
                    [0,0,0,0,0,0,0,0,3,0,1]
                ],            
                other:{
                    warp_wt:0,
                    warp_wt_wstg:0,
                    weft_wt:0,
                    weft_wt_wstg:0,
                    total_wt:0,
                    total_wstg:0,
                    total_cost:0
                }
            };
        }
        _.bindAll(this,'defaults','get','set','save')
        
    }

    defaults() {
        return {    
            warp_grid: [
                [0,0,0,0,0,0,0,0]
            ],
            weft_grid: [
                [0,0,0,0,0,0]
            ],
            warp_pack_grid : [
                [0,0,0,0,0,0,0,0,0,0,0]
            ]
        }
    }

    get() {
        return this.data;
    }

    set(data){
        this.data = data;
    }

    save() {
        //saveto db
        return this.id;
    }
}

class NewItemView {
    constructor(id=0) {

        _.bindAll(this,'render')

        this.warp_pack_cols = ["Kg/Bag", "No. of cone/bag", "Part", "No Of Beam", 
                                "Kg/Cone", "Total Meger", "Sizing Meger", "Tara",
                                "No Of Bags", "Total Cut", "Cut On Beam"];
        this.warp_pack_edit = [false, false, false, false, true, true, true, true, true, true, true];


        this.pageTemplate = _.template(tp_newitem);
        this.itemData = (new NewItemModel(id)).get();
        
        //prepare UI
        this.render();
    }

    render() {
        this.$el = $(this.pageTemplate(this.uiData))

        window.tab_manager.tabTitleBind(this.$el.find('#item-title'));

        this.warpGrid = new FormulaGrid({
            gridId : 'warp-grid',
            target: this.$el.find("#warp-grid-container"),
            columns :[
                FormulaGrid.defineColumn({title : 'Count'}),
                FormulaGrid.defineColumn({title : 'Perct.'}),
                FormulaGrid.defineColumn({title : 'Wastage'}),
                FormulaGrid.defineColumn({title : 'Rate'}),
                FormulaGrid.defineColumn({title : 'Sizing Rate'}),
                FormulaGrid.defineColumn({title : 'Weight', readonly :true}),
                FormulaGrid.defineColumn({title : 'Warp Cost', readonly :true}),
                FormulaGrid.defineColumn({title : 'Warp Sizing Cost', readonly :true}),
            ]
        });

        this.warpGrid.addRows([
            [0],
        ]);

        this.weftGrid = new FormulaGrid({
            gridId : 'weft-grid',
            target: this.$el.find("#weft-grid-container"),
            columns :[
                FormulaGrid.defineColumn({title : 'Count'}),
                FormulaGrid.defineColumn({title : 'Perct.'}),
                FormulaGrid.defineColumn({title : 'Wastage'}),
                FormulaGrid.defineColumn({title : 'Rate'}),
                FormulaGrid.defineColumn({title : 'Weight', readonly :true}),
                FormulaGrid.defineColumn({title : 'Weft Cost', readonly :true}),
            ]
        });

        this.weftGrid.addRows([
            [0],
        ]);

        this.warp_pack_cols = ["", "", "", "", 
        "Kg/Cone", "Total Meger", "Sizing Meger", "Tara",
        "No Of Bags", "Total Cut", "Cut On Beam"];


        this.packGrid = new FormulaGrid({
            gridId : 'weft-grid',
            target: this.$el.find("#warppack-grid-container"),
            columns :[
                FormulaGrid.defineColumn({title : 'Kg/Bag'}),
                FormulaGrid.defineColumn({title : 'No. of cone/bag'}),
                FormulaGrid.defineColumn({title : 'Part'}),
                FormulaGrid.defineColumn({title : 'No Of Beam'}),
                FormulaGrid.defineColumn({title : 'Kg/Cone', readonly :true}),
                FormulaGrid.defineColumn({title : 'Total Meger', readonly :true}),
                FormulaGrid.defineColumn({title : 'Sizing Meger', readonly :true}),
                FormulaGrid.defineColumn({title : 'Tara', readonly :true}),
                FormulaGrid.defineColumn({title : 'No Of Bags', readonly :true}),
                FormulaGrid.defineColumn({title : 'Total Cut', readonly :true}),
                FormulaGrid.defineColumn({title : 'Cut On Beam', readonly :true}),
            ]
        });

        this.packGrid.addRows([
            [0],
        ]);
    }

}

export {NewItemView};