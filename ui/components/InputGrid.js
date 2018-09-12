import React from 'react';

export default class InputGrid extends React.Component {
    constructor() {
        super();
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleRemoveRowClick = this.handleRemoveRowClick.bind(this);
        this.handleAddRowClick = this.handleAddRowClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.updateTotal= this.updateTotal.bind(this);
        this.state = {
            total: []
        }
    }

    componentDidMount() {
        this.setState({
            total: new Array(this.props.columns.length).fill(0)
        });
    }

    updateTotal() {
        this.setState(prevState=> {
            let total = prevState.total,
                newRows = this.props.rows;
            this.props.columns.forEach((column,colno) => {
                if(column.total) {
                    let accessor = column.accessor;
                    total[colno] = 0;
                    newRows.forEach(row => {
                        total[colno] += parseFloat(accessor(row)) || 0;
                    });
                }
            });

            return {
                total: total
            }
        });
    }

    handleTextChange(e){
        let newRows = this.props.rows,
            rowno = e.currentTarget.getAttribute("data-row"),
            colno = e.currentTarget.getAttribute("data-col");
        
        if(rowno === 'total') {
            return;
        }

        newRows[rowno][colno] = e.target.value;

        this.updateTotal();

        if(this.props.handleRowsChange){
            this.props.handleRowsChange(newRows);
        }
    }

    handleRemoveRowClick(e) {
        let newRows = this.props.rows,
            rowno = e.currentTarget.getAttribute("data-row");
        
        newRows.splice(rowno, 1);

        this.updateTotal();

        if(this.props.handleRowsChange){
            this.props.handleRowsChange(newRows);
        }
    }

    handleAddRowClick(e) {
        let newRows = this.props.rows;
        newRows.push((new Array(this.props.columns.length)).fill(0));

        if(this.props.handleRowsChange){
            this.props.handleRowsChange(newRows);
        }
    }
    
    handleResetClick(e) {
        let newRows = this.props.rows;
        newRows.forEach((row,i) =>{
            newRows[i] = row.fill(0);
        });

        this.updateTotal();

        if(this.props.handleRowsChange){
            this.props.handleRowsChange(newRows);
        }
    }

    render() {
        let editableCols = [];
        self = this;
        // this.props.grid.columns.forEach(element => {
        //     element.Cell = self.renderEditable
        // });

        return(
            <table className="m-auto formulagrid" id={this.props.gridId}>
                <thead>
                    <tr className="border-bottom">
                        <td></td>
                        {self.props.columns.map(function(column){
                            return(
                                <td>
                                    <input className="rounded-0 mx-1 form-control form-control-sm border border-0 bg-white unselectable" 
                                        value={column.header} tabindex="-1" data-formula="" readonly/>
                                </td>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className="formulagrid-rows">
                    {self.props.rows.map((row, rowno)=>{
                        return(
                            <tr className="formulagrid-row">
                                <td>
                                    <a href="#" className="btn btn-sm border-0 rounded-0 btn-white formulagrid-row-remove"
                                        data-row={rowno} onClick={this.handleRemoveRowClick}>
                                        <i className="la la-minus-square la-lg mr-1 text-danger"></i>
                                    </a>
                                </td>
                                {self.props.columns.map((column, colno)=>{
                                    return(                                        
                                        <td className="formulagrid-col">
                                            <input className="rounded-0 m-0 form-control form-control-sm" maxlength="10" value={column.accessor(row)}
                                                data-col={colno} data-row={rowno} onChange={this.handleTextChange}
                                                readOnly={column.readonly}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>                            
                        )
                    })}
                    <tr className="formulagrid-row">
                        <td>
                            <a className="btn btn-sm border-0 rounded-0 btn-white formulagrid-row-remove">
                                <i className="la la-calculator la-lg mr-1 text-primary"></i>
                            </a>
                        </td>
                        {self.props.columns.map((column, colno)=>{
                            return(                                        
                                <td className="formulagrid-col">
                                    <input className="rounded-0 m-0 form-control form-control-sm" maxlength="10" value={this.state.total[colno]}
                                      data-col={colno} data-row="total" disabled={column.total === undefined?true:!column.total} onChange={this.handleTextChange}/>
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <a href="#" className="btn btn-sm border-0 rounded-0 formulagrid-add" data-toggle="tooltip" title="Add row"
                                onClick={this.handleAddRowClick}>
                                <i className="la la-plus-square la-lg mr-1 text-success"></i>
                            </a>
                        </td>
                        <td className="text-left">
                            <a href="#" className="btn btn-sm border-0 rounded-0 formulagrid-reset" data-toggle="tooltip" title="Reset Grid"
                                onClick={this.handleResetClick}>
                                <i className="la la-retweet la-lg mr-1 text-danger"></i>
                            </a>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}