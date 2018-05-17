import tp_newitem from './_newitem.html';
import { TextGrid } from './textgrid';


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
                    [1,2,3,0,0,0,0,0]
                ],
                weft_grid: [
                    [0,0,0,4,5,6]
                ],
                warp_pack_grid : [
                    [0,0,0,0,0,0,0,0,3,0,1]
                ]
            };
        }
        _.bindAll(this,'defaults','get','set','save')
        
    }

    defaults() {
        return {
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

        this.warp_cols = ["Count", "Perctg.", "Wastage", "Rate", "Sizing Rate", 
                        "Weight", "Warp Cost", "Warp Sizing Cost"];
        this.warp_edit = [false, false, false, false, false, true, true, true];
        this.weft_cols = ["Count", "Perctg.", "Wastage", "Rate", "Weight", "Weft Cost"];
        this.weft_edit = [false, false, false, true, true, true];

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
        this.warpGrid = new TextGrid(
                                "F",
                                this.warp_cols, 
                                this.warp_edit,
                                this.itemData.warp_grid,
                                this.$el.find("#warp-grid-container")
                            );
        this.warpGrid.setFormula(6,[0,1],(cols) =>{
            return cols[0]+cols[1];
        });
        this.warpGrid.render();


        this.weftGrid = new TextGrid(
                                "F",
                                this.weft_cols, 
                                this.weft_edit,
                                this.itemData.weft_grid,
                                this.$el.find("#weft-grid-container")
                            );
        this.weftGrid.render();

        this.packGrid = new TextGrid(
            "F",
            this.warp_pack_cols, 
            this.warp_pack_edit,
            this.itemData.warp_pack_grid,
            this.$el.find("#warppack-grid-container")
        );
        this.packGrid.render();
    }
}

export {NewItemView};