import React from 'react';

export default class InputGrid extends React.Component {
    constructor() {
        super();
        this.handleCellChange = this.handleCellChange.bind(this);
        this.handleRemoveRowClick = this.handleRemoveRowClick.bind(this);
        this.handleAddRowClick = this.handleAddRowClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleUpdateTotal= this.handleUpdateTotal.bind(this);
        this.state = {
            total: []
        }
    }

    componentDidMount() {
        this.setState({
            total: new Array(this.props.columns.length).fill(0)
        });
    }

    handleUpdateTotal() {
        let newRows = Object.assign(this.props.rows),
            newRowsLen = newRows.length,
            total = newRows[newRowsLen-1];

        this.props.columns.forEach((column,colno) => {
            if(column.total) {
                total[colno] = 0;
                newRows.forEach((row,rowno) => {
                    if(rowno < newRowsLen-1)
                        total[colno] += parseFloat(row[colno]) || 0;
                });
            }
        });

        if(this.props.handleUpdateTotal){
            this.props.handleUpdateTotal(this.props.gridId, newRows);
        }
    }

    handleCellChange(e){
        let rowno = e.currentTarget.getAttribute("data-row"),
            colno = e.currentTarget.getAttribute("data-col");
        
        if(rowno === 'total') {
            return;
        }

        let newRows = Object.assign(this.props.rows)
        newRows[rowno][colno] = e.target.value;

        if(this.props.handleCellChange){
            this.props.handleCellChange(this.props.gridId, rowno, colno, newRows);
        }
        this.handleUpdateTotal();
    }

    handleRemoveRowClick(e) {
        let newRows = this.props.rows,
            rowno = e.currentTarget.getAttribute("data-row");
        
        newRows.splice(rowno, 1);

        if(this.props.handleRowsChange){
            this.props.handleRowsChange(this.props.gridId,newRows);
        }

        this.handleUpdateTotal();
    }

    handleAddRowClick(e) {
        let newRows = this.props.rows;
        newRows.push((new Array(this.props.columns.length)).fill(0));

        if(this.props.handleRowsChange){
            this.props.handleRowsChange(this.props.gridId,newRows);
        }

        this.handleUpdateTotal();
    }
    
    handleResetClick(e) {
        let newRows = this.props.rows;
        newRows.forEach((row,i) =>{
            newRows[i] = row.fill(0);
        });

        if(this.props.handleRowsChange){
            this.props.handleRowsChange(this.props.gridId,newRows);
        }

        this.handleUpdateTotal();
    }

    render() {
        let editableCols = [];
        self = this;

        return(
            <table className="m-auto inputgrid" id={this.props.gridId}>
                <thead>
                    <tr>
                        <td></td>
                        {self.props.columns.map(function(column){
                            return(
                                <td>
                                    <input className="mx-1 form-control form-control-sm inputgrid-col-header" 
                                        value={column.header} tabindex="-1" data-formula="" readonly/>
                                </td>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className="inputgrid-rows">
                    {self.props.rows.map((row, rowno)=>{
                        {/* Last row always be total */}
                        if(rowno < self.props.rows.length-1) {
                            return(
                                <tr key={rowno} className="inputgrid-row">
                                    <td>
                                        <a href="#" className="btn btn-sm btn-light inputgrid-row-remove"
                                            data-row={rowno} onClick={this.handleRemoveRowClick}>
                                            <i className="fa fa-minus-square fa-lg text-danger"></i>
                                        </a>
                                    </td>
                                    {self.props.columns.map((column, colno)=>{
                                        return(                                        
                                            <td className="inputgrid-col">
                                                <input className="m-0 form-control form-control-sm" maxlength="10" value={row[colno]}
                                                    data-col={colno} data-row={rowno} onChange={this.handleCellChange}
                                                    readOnly={column.readonly} type={this.props.type?this.props.type:"text"}
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>                            
                            );
                        } else {
                            return(
                                <tr key={rowno} className="inputgrid-row">
                                    <td>
                                        <a className="btn btn-sm border-0 btn-white inputgrid-row-remove">
                                            <i className="fa fa-calculator fa-lg text-primary"></i>
                                        </a>
                                    </td>
                                    {self.props.columns.map((column, colno)=>{
                                        return(                                        
                                            <td className="inputgrid-col">
                                                <input className=" m-0 form-control form-control-sm" maxlength="10" value={row[colno]}
                                                data-col={colno} data-row="total" disabled={column.total === undefined?true:!column.total} onChange={this.handleCellChange}/>
                                            </td>
                                        )
                                    })}
                                </tr>    
                            );                   
                        }
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <a href="#" className="btn btn-sm border-0  inputgrid-add" data-toggle="tooltip" title="Add row"
                                onClick={this.handleAddRowClick}>
                                <i className="fa fa-plus-square fa-lg text-success"></i>
                            </a>
                        </td>
                        <td className="text-left">
                            <a href="#" className="btn btn-sm border-0  inputgrid-reset" data-toggle="tooltip" title="Reset Grid"
                                onClick={this.handleResetClick}>
                                <i className="fa fa-retweet fa-lg mr-1 text-danger"></i>
                            </a>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}