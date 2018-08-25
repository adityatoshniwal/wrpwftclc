import tp_grid from './_formulagrid.html';
import tp_gridrow from './_formulagridrow.html';
import $ from 'jquery';


class FormulaGrid {
    constructor(options) {
        this.gridId = options.gridId || '';
        this.$target = options.target;

        this.state = {
            columns  :options.columns,
            rows : []
        }
        
        this.gridTemplate = _.template(tp_grid);
        this.rowTemplate = _.template(tp_gridrow);

        _.bindAll(this, 'addRows', 'removeRowAt', 'render');
    }

    static defineColumn(options) {
        return $.extend({
            title: '',
            readonly :false,
            formula : '',
            type :'integer'
        }, options);
    }

    resetRows() {
        let self = this;
        _.forEach(self.state.rows,function(row, i) {
            self.state.rows[i] = row.fill(0);
        });
        self.render();
    }

    addRows(rows){
        let self = this;
        _.forEach(rows,function(row) {
            if(row.length < self.state.columns.length) {
                row.push(...(new Array(self.state.columns.length-row.length)).fill(0))
            }
            self.state.rows.push(row); 
        });
        self.render();
    }

    addEmptyRow() {
        let self = this;
        self.state.rows.push(
            new Array(self.state.columns.length).fill(0)
        );
        self.render();
    }

    removeRowAt(index) {
        var self = this;
        self.state.rows.splice(index,1); 
        self.render();
    }

    render() {
        let self = this;
        if(self.$el) {
            self.$el.remove();
        }
        self.$el = $(self.gridTemplate({
            gridId: this.gridId,
            columns: this.state.columns,
        }));

        self.$el.find(".formulagrid-add").off('click').on('click',(e)=>{
            e.preventDefault();
            self.addEmptyRow();
            self.$el.find(".formulagrid-add").trigger('focus');
        });

        this.$el.find(".formulagrid-reset").off('click').on('click',(e)=>{
            e.preventDefault();
            self.resetRows();
        });

        _.forEach(self.state.rows,function(row) {
            let $row = $(self.rowTemplate({
                row : row,
                columns :self.state.columns,
            }));

            $row.find('input').on('click',function(){
                $(this).trigger('select');
            })

            $row.find(".formulagrid-row-remove").on('click',(e)=>{
                e.preventDefault();
                var rid = e.currentTarget.closest(".formulagrid-row").rowIndex-1;
                self.removeRowAt(rid,1);
            });

            self.$el.find(".formulagrid-rows").append($row);
        });

        self.$el.appendTo(self.$target);
    }

}


class formulagrid {
    constructor(typeIorF, cols, cols_edit, initData, dblClickHeaderCallback, $target) {
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
            cols:this.cols, grid_id:"dummy", cols_edit:this.cols_edit
        }));

        this.rowTemplate = _.template(tp_gridrow)

        this.typeIorF = typeIorF;

        if(this.typeIorF === "I") {
            this.inputRegex = "^[0-9]*$";
        }
        else if(this.typeIorF === "F") {
            this.inputRegex = "^[0-9]*$";            
        }

        this.$el.find('thead td input[data-edit="true"]').on('dblclick', function(e){
            dblClickHeaderCallback(e.currentTarget.closest('td').cellIndex);
        })

        this.formulae = {};

        _.bindAll(this,'getRows','setFormula','executeFormulae', 'convertFirst');

        this.$el.find(".formulagrid-add").off('click').on('click',(e)=>{
            e.preventDefault();
            this.rows.push(new Array(this.cols.length).fill(0));
            this.render()
            this.$el.find(".formulagrid-add").trigger('focus');
        });

        this.$el.find(".formulagrid-reset").off('click').on('click',(e)=>{
            e.preventDefault();
            _.each(this.rows,(row, i) => {
                this.rows[i] = row.fill(0);
            });
            this.render()
        });
    }

    defaults() {
        return {
            cols : [0]
        }
    }

    render() {
        this.$el.find("tbody .formulagrid-row").remove();
        _.forEach(this.rows,(row)=>{
            var $row = $(this.rowTemplate({
                'row':row,
                'cols':this.cols,
                'cols_edit':this.cols_edit
            }));

            $row.find(".formulagrid-col input").on('change keyup paste',(e)=>{
                e.preventDefault();
                var rid = e.currentTarget.closest(".formulagrid-row").rowIndex-1;
                var cid = e.currentTarget.closest(".formulagrid-col").cellIndex-1;
                if(e.currentTarget.value.match(this.inputRegex)!=null){
                    this.rows[rid][cid] = this.convertFirst(e.currentTarget.value);
                    this.executeFormulae(rid,cid);
                }
                else {
                    e.currentTarget.value = this.rows[rid][cid];
                }
            });

            $row.find(".formulagrid-col input").on('focusout',(e)=>{
                e.preventDefault();
                var rid = e.currentTarget.closest(".formulagrid-row").rowIndex-1;                
                var cid = e.currentTarget.closest(".formulagrid-col").cellIndex-1;
                if(e.currentTarget.value === "") {
                    e.currentTarget.value = 0;
                    this.rows[rid][cid] = this.convertFirst(e.currentTarget.value);
                }
                this.executeFormulae(rid,cid);
            });

            $row.find(".formulagrid-row-remove").on('click',(e)=>{
                e.preventDefault();
                var rid = e.currentTarget.closest(".formulagrid-row").rowIndex-1;
                this.rows.splice(rid,1);
                this.$el.find("tbody tr:eq("+rid+")").remove();
            });

            this.$el.find(".formulagrid-rows").append($row);
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

export {formulagrid, FormulaGrid};