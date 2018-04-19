import tp_newitem from './_newitem.html';
import tp_grid from './_textgrid.html';
import tp_gridrow from './_textgridrow.html';


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

class TextGrid {
    constructor(cols, cols_edit, initData, $target) {
        this.cols = cols;

        if(cols_edit==null){
            cols_edit = new Array(this.cols.length).fill(true);
        }
        this.cols_edit = cols_edit;

        if(initData==null){
            initData = [];
            initData.push(new Array(this.cols.length).fill(0));
        }
        this.rows = initData;

        this.$target = $target;

        this.$el = $(_.template(tp_grid)({
            cols:this.cols, grid_id:"aditya"
        }));

        this.rowTemplate = _.template(tp_gridrow)

        _.bindAll(this,'getRows');

        this.$el.find(".grid-add").off('click').on('click',(e)=>{
            this.rows.push(new Array(this.cols.length).fill(0));
            this.render()
        });
    }

    render(rows=null) {
        //load the rows
        this.$el.find("tbody .textgrid-row").remove();
        _.forEach(this.rows,(row)=>{
            var $row = $(this.rowTemplate({
                'row':row,
                'cols':this.cols,
                'cols_edit':this.cols_edit
            }));

            $row.find(".textgrid-col input").on('change keyup paste',(e)=>{
                e.preventDefault();
                var code = String.fromCharCode(e.keyCode ? e.keyCode : e.which);
                var cid = e.currentTarget.closest(".textgrid-col").cellIndex-1;
                var rid = e.currentTarget.closest(".textgrid-row").rowIndex-1;

                if(e.currentTarget.value.match("^[0-9]*$")!=null){
                    this.rows[rid][cid] = e.currentTarget.value;
                }
                else {
                    e.currentTarget.value = this.rows[rid][cid];
                }
            });

            $row.find(".textgrid-col input").on('focusout',(e)=>{
                var cid = e.currentTarget.closest(".textgrid-col").cellIndex-1;
                var rid = e.currentTarget.closest(".textgrid-row").rowIndex-1;                
                if(e.currentTarget.value === ""){
                    e.currentTarget.value = 0;
                    this.rows[rid][cid] = e.currentTarget.value;
                }
            });

            $row.find(".grid-remove").on('click',(e)=>{
                var rid = e.currentTarget.closest(".textgrid-row").rowIndex;
                this.rows.splice(rid-1,1);
                this.render()
            });
            this.$el.find("tbody").append($row);
        });

        this.$target.find(".text-grid").remove();
        this.$target.append(this.$el);

        console.log(this.getRows())
    }

    getRows() {
        return this.rows;
    }
}

class NewItemView {
    constructor(id=0) {

        _.bindAll(this,'appendRow','bindEvents')

        this.uiData = {
            warp_cols:["Count", "Perctg.", "Wastage", "Rate", "Sizing Rate", 
                        "Weight", "Warp Cost", "Warp Sizing Cost"],
            warp_edit:[false, false, false, false, false, true, true, true],
            weft_cols:["Count", "Perctg.", "Wastage", "Rate", "Weight", "Weft Cost"],
            weft_edit:[false, false, false, true, true, true]
        }

        this.pageTemplate = _.template(tp_newitem);
        this.itemData = (new NewItemModel()).get();
        
        //prepare UI
        this.$el = $(this.pageTemplate(this.uiData))
        this.warpGrid = new TextGrid(
                                this.uiData.warp_cols, 
                                this.uiData.warp_edit,
                                this.itemData.warp_grid,
                                this.$el.find("#warp-grid-container")
                            );
        this.warpGrid.render();
        
        // _.forEach(this.itemData.weft_grid,(row)=>{
        //     this.appendRow(this.$el.find("#weft-grid"), row, this.uiData.weft_cols, this.uiData.weft_edit)
        // })

        // this.bindEvents();
    }

    renderGrid(selector, cols, cols_edit) {
        var $grid = this.$el.find("#warp-grid");
        $grid.find("tr").remove()
        _.forEach(this.itemData.warp_grid,(row)=>{
            var $row = $(this.rowTemplate({
                'row':row,
                'cols':cols,
                'cols_edit':cols_edit
            }))
            $row.find(".grid-remove").on('click',(e)=>{
                $(e.currentTarget).closest("tr").remove()
            })
            this.$el.find("#warp-grid").find("tbody").append($row)
        })

    }

    bindEvents() {
        //bind grids
        this.$el.find("#warp-grid .grid-add").on('click',(e)=>{
            e.preventDefault();
            this.itemData.warp_grid.push(Array(this.uiData.warp_cols.length).fill(0))
            // this.renderWarpGrid();
        });

        this.$el.find("#weft-grid .grid-add").on('click',(e)=>{
            e.preventDefault();
            this.appendRow(this.$el.find("#weft-grid"), null, this.uiData.weft_cols, this.uiData.weft_edit);
        });

        this.$el.find("#btn-save").on('click', (e)=> {
            console.log("set");
            e.preventDefault();
            console.log(this.itemData);
        });
    }

    appendRow($gridRef, row=null, cols, cols_edit) {
        if(row === null){
            row = Array(cols.length).fill(0)
        }
        this.itemData.warp_grid.push(row)
        
        // var $row = $(this.rowTemplate({
        //     'row':row,
        //     'cols':cols,
        //     'cols_edit':cols_edit
        // }))
        // $row.find(".grid-remove").on('click',(e)=>{
        //     $(e.currentTarget).closest("tr").remove()
        // })
        // $gridRef.find("tbody").append($row)
        // this.renderWarpGrid();
        
    }
}

export {NewItemView};