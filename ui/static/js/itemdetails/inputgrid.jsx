import React from 'react';
// import ReactDataGrid from 'react-data-grid';
import ReactTable from 'react-table';

class InputGrid extends React.Component {
    constructor() {
        super();
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e){
        let newRows = this.props.rows,
            rowno = e.target.getAttribute("data-row"),
            colno = e.target.getAttribute("data-col");
        
        newRows[rowno][colno] = e.target.value;
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
                                    <a href="#" className="btn btn-sm border-0 rounded-0 btn-white formulagrid-row-remove">
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
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <a href="#" className="btn btn-sm border-0 rounded-0 formulagrid-add" id="">
                                <i className="la la-plus-square la-lg mr-1 text-success"></i>
                            </a>
                        </td>
                        <td className="text-left">
                            <a href="#" className="btn btn-sm border-0 rounded-0 formulagrid-reset" id="" data-toggle="tooltip" title="Reset Grid">
                                <i className="la la-retweet la-lg mr-1 text-danger"></i>
                            </a>
                            <a href="#" className="btn btn-sm border-0 rounded-0 formulagrid-calc" data-toggle="tooltip" title="Total">
                                <i className="la la-calculator la-lg mr-1 text-primary"></i>
                            </a>                                
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

export default InputGrid;