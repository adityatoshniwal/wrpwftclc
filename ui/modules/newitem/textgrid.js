import tp_grid from './_textgrid.html';
import tp_gridrow from './_textgridrow.html';
import { isThisSecond } from 'date-fns';

class TextGrid {

    constructor(typeIorF, cols, cols_edit, initData, $target) {
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
            cols:this.cols, grid_id:"dummy"
        }));

        this.rowTemplate = _.template(tp_gridrow)

        this.typeIorF = typeIorF;

        if(this.typeIorF === "I") {
            this.inputRegex = "^[0-9]*$";
        }
        else if(this.typeIorF === "F") {
            this.inputRegex = "^[0-9]*$";            
        }

        this.formulae = {};

        _.bindAll(this,'getRows','setFormula','executeFormulae', 'convertFirst');

        this.$el.find(".textgrid-add").off('click').on('click',(e)=>{
            e.preventDefault();
            this.rows.push(new Array(this.cols.length).fill(0));
            this.render()
        });

        this.$el.find(".textgrid-reset").off('click').on('click',(e)=>{
            e.preventDefault();
            _.each(this.rows,(row, i) => {
                this.rows[i] = row.fill(0);
            });
            this.render()
        });
    }

    render() {
        this.$el.find("tbody .textgrid-row").remove();
        _.forEach(this.rows,(row)=>{
            var $row = $(this.rowTemplate({
                'row':row,
                'cols':this.cols,
                'cols_edit':this.cols_edit
            }));

            $row.find(".textgrid-col input").on('change keyup paste',(e)=>{
                e.preventDefault();
                var rid = e.currentTarget.closest(".textgrid-row").rowIndex-1;
                var cid = e.currentTarget.closest(".textgrid-col").cellIndex-1;
                if(e.currentTarget.value.match(this.inputRegex)!=null){
                    this.rows[rid][cid] = this.convertFirst(e.currentTarget.value);
                    this.executeFormulae(rid,cid);
                }
                else {
                    e.currentTarget.value = this.rows[rid][cid];
                }
            });

            $row.find(".textgrid-col input").on('focusout',(e)=>{
                var rid = e.currentTarget.closest(".textgrid-row").rowIndex-1;                
                var cid = e.currentTarget.closest(".textgrid-col").cellIndex-1;
                if(e.currentTarget.value === "") {
                    e.currentTarget.value = 0;
                    this.rows[rid][cid] = this.convertFirst(e.currentTarget.value);
                }
                this.executeFormulae(rid,cid);
            });

            $row.find(".textgrid-row-remove").on('click',(e)=>{
                var rid = e.currentTarget.closest(".textgrid-row").rowIndex-1;
                this.rows.splice(rid,1);
                this.$el.find("tbody tr:eq("+rid+")").remove();
            });

            this.$el.find(".textgrid-rows").append($row);
        });

        this.$target.find(".text-grid").remove();
        this.$target.append(this.$el);
    }

    convertFirst(i_string) {
        if(i_string === "") {
            i_string = 0;
        }
        if(this.typeIorF === "I") {
            return(parseInt(i_string));
        }
        else if(this.typeIorF === "F"){
            return(parseInt(i_string));
        }
    }

    setFormula(targetColId, inputColIds, setTargetColFunc) {
        if(!this.formulae[targetColId]) {
            this.formulae[targetColId] = []
        }
        this.formulae[targetColId].push({
            callback:setTargetColFunc,
            params:inputColIds
        });
    }

    executeFormulae(rowId) {
        _.forEach(this.formulae,(farr, targetColId)=>{
            _.forEach(farr, (f) => {
                targetColId = parseInt(targetColId);
                this.rows[rowId][targetColId] = f.callback(f.params.map((colId)=>this.rows[rowId][colId]))
                this.$el.find("tbody tr:eq("+rowId+") td:eq("+(targetColId+1)+") input").val(this.rows[rowId][targetColId]);                
            })
        })
    }

    getRows() {
        return this.rows;
    }

    setInputRegex(regex) {
        this.inputRegex = regex;
    }

}

export {TextGrid};