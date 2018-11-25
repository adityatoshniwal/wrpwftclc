import React from 'react';
import {InputTextBox, InputGrid} from 'sources/components';
import { url_for } from 'sources/utils/url_for';
import {bindActionCreators} from 'redux';

import {tabActions} from 'sources/tabmanager/tabActionReducer';
import {modalActions} from 'sources/modal/modalActionReducer';
import {connect} from 'react-redux';
import mathexp from 'mathjs-expression-parser';

class ItemDetails extends React.Component {
    constructor(props) {
        super();
        this.state= {
            isCmdRunning: true,
            cmdMessage: '',
            cmdFailed: false,
            cmdError: '',
            cmdSuccess: '',
            data: {
                title: "Untitled", id: 0,
                reed: '0', warpPanna: '0', warpReedSpace: '0', lassa: '0', warpMetre: '0', totalEnds: '0',
                weftMetre: '0', weftPanna: '0', weftReedSpace: '0', peek: '0', jobRate: '0', weavingChrg: '0',
                warpWt: '0',  warpWtWstg: '0', weftWt: '0', weftWtWstg: '0', totalWt: '0', totalWtWstg: '0', totalCost: '0',
                cramp: '0',
                rateOutPer: '0', rateOutRs: '0', demandRateOut:0, outPerctg: '0',
                rateLocalPer: '0', rateLocalRs: '0', demandRateLocal:0, localPerctg: '0',
                warp_grid_rows: [
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]
                ],
                weft_grid_rows: [
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0]
                ],
                warppack_grid_rows: [
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
                ]
            }
        };

        this.handleCellChange = this.handleCellChange.bind(this);
        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.handleTextChangeData = this.handleTextChangeData.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleUpdateTotal = this.handleUpdateTotal.bind(this);
        this.formula = this.formula.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.gridColNo = this.gridColNo.bind(this);
    }

    componentWillMount() {
        this.setState({
            warp_grid_columns: [
                { name:'warpGCount', header: this.getLabel('warpGCount')}, 
                { name:'warpGPerct', header: this.getLabel('warpGPerct')},
                { name:'warpGWstg', header: this.getLabel('warpGWstg')},
                { name:'warpGRate', header: this.getLabel('warpGRate')},
                { name:'warpGSizRate', header: this.getLabel('warpGSizRate')},
                { name:'warpGWt', header: this.getLabel('warpGWt'), total:true}, 
                { name:'warpGCost', header: this.getLabel('warpGCost'), total:true }, 
                { name:'warpGSizCost', header: this.getLabel('warpGSizCost'), total:true }, 
            ],
            weft_grid_columns: [
                { header: this.getLabel('weftGCount')}, 
                { header: this.getLabel('weftGPerct')},
                { header: this.getLabel('weftGWstg')},
                { header: this.getLabel('weftGRate')},
                { header: this.getLabel('weftGWt'), total:true}, 
                { header: this.getLabel('weftGCost'), total:true},
            ],
            warp_pack_grid_columns: [
                { header: this.getLabel('warppackGKgBag') }, 
                { header: this.getLabel('warppackGConeBag') },
                { header: this.getLabel('warppackGPart') },
                { header: this.getLabel('warppackGBeam')},
                { header: this.getLabel('warppackGKgCone'), total: true },
                { header: this.getLabel('warppackGMeger'), total: true}, 
                { header: this.getLabel('warppackGTara'), total: true }, 
                { header: this.getLabel('warppackGBags'), total: true},
                { header: this.getLabel('warppackGCut'), total: true},
                { header: this.getLabel('warppackGCutBeam'), total: true},
            ],
        });
    }

    gridRow(gridId) {
        let gridIdRowMap = {
            'warp-grid-container': 'warp_grid_rows',
            'weft-grid-container': 'weft_grid_rows',
            'warppack-grid-container': 'warppack_grid_rows',
        }

        return(gridIdRowMap[gridId]);
    }

    gridColNo(gridId, fieldcode) {
        let gridIdColMap = {
            'warp-grid-container': 'warp_grid_columns',
            'weft-grid-container': 'weft_grid_columns',
            'warppack-grid-container': 'warppack_grid_columns',
        }

        let cols = this.state[gridIdColMap[gridId]];
        return _.findIndex(cols, {'name':fieldcode});
    }

    handleUpdateTotal(gridId, newRows) {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [this.gridRow(gridId)]: newRows
            }
        }));
        this.evaluate();
    }


    handleCellChange(gridId='', rowno, colno, newRows) {
        if(gridId !== '') {
            let gridRows = this.gridRow(gridId);
            
            this.setState(prevState => {
                return {
                    data: {
                        ...prevState.data,
                        [gridRows]: newRows,
                    }
                }
            });

            this.evaluate();
        }
    }

    handleRowsChange(gridId, newRows) {
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [this.gridRow(gridId)]: newRows
            }
        }));
        this.evaluate();
    }

    handleTextChangeData(e) {
        let name = e.target.name,
            value = e.target.value;

        this.setState((prevState)=>({
            data:{
                ...prevState.data,
                [name]: value
            }
        }));

        if(name === "title") {
            this.props.setTabTitle(value);
        }

        this.evaluate();
    }

    handleSaveClick(e) {

        this.setState({
            isCmdRunning: true,
            cmdFailed: false,
        });

        /* Update if existing */
        if(this.state.data.id > 0) {
            $.ajax(
                url_for('items') + "/" + this.state.data.id,
                {
                    method : "PUT",
                    dataType : "json",
                    contentType : "application/json; charset=utf-8",
                    data: JSON.stringify(this.state.data),
                }
            ).done((resp) => {
                this.setState((prevState) => ({
                    isCmdRunning: false,
                    cmdFailed: false,
                    cmdSuccess: resp.message,
                }));
                this.props.refreshTab('search-tab');
            }).fail((resp) => {
                let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
                this.setState({
                    isCmdRunning: false,
                    cmdFailed: true,
                    cmdError: error,
                });
            });
        } else {
            $.ajax(
                url_for('items'),
                {
                    method : "POST",
                    dataType : "json",
                    contentType : "application/json; charset=utf-8",
                    data: JSON.stringify(this.state.data),
                }
            ).done((resp) => {
                this.setState((prevState) => ({
                    isCmdRunning: false,
                    cmdFailed: false,
                    cmdSuccess: resp.message,
                    data: {
                        ...prevState.data,
                        id: resp.data,
                    }
                }));
                this.props.refreshTab('search-tab');
            }).fail((resp) => {
                let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
                this.setState({
                    isCmdRunning: false,
                    cmdFailed: true,
                    cmdError: error,
                });
            });
        }
    }

    evaluate(inObj) {

        this.setState((prevState)=>{
            let warp_grid = prevState.data.warp_grid_rows;
            let warp_formulas = this.props.formulas.warp_field_codes.fields;

            warp_formulas.forEach(formula => {
                let colno = this.gridColNo('warp-grid-container',formula.for_field_code);
                let availFieldCodes = formula.avail_field_codes;
                let formulaData = {}
                for(let rowno=0; rowno<warp_grid.length-1; rowno++) {
                    availFieldCodes.split(',').forEach(fieldcode=>{
                        let availcolno = this.gridColNo('warp-grid-container',fieldcode)
                        if(availcolno < 0){
                            formulaData[fieldcode] = prevState.data[fieldcode];
                        } else {
                            formulaData[fieldcode] = parseFloat(warp_grid[rowno][availcolno]);    
                        }
                        
                    });
                    warp_grid[rowno][colno] = mathexp.eval(formula.formula,formulaData);
                }
            });

            return {
                data: {
                    ...prevState.data,
                    'warp_grid_rows': warp_grid,
                }
            }
            // this.state.warp_grid_columns.forEach(col,colno => {
            //     let currFormula = _.findWhere(warp_formulas,{'for_field_code':col.name});
            //     if(currFormula) {
            //         warp_grid.forEach(row, rowno=>{
            //             warp_grid
            //         });
            //     }
            // });
        });
    }

    formula(field) {
        let self = this;

        let formulasObj = {
            nanError: function(val) {
                return isNaN(val)?"":val;
            },
            warpPanna: function() {
                return formulasObj.nanError(parseFloat(self.state.reed)+1);
            }
        };
        return formulasObj[field];
    }

    fetchItem() {
        this.setState({
            isCmdRunning: true,
            cmdFailed: false,
        });

        $.ajax(
            url_for('items') + '/' + this.props.item_id,
            {
                method : "GET",
                dataType : "json",
                contentType : "application/json; charset=utf-8",
            }
        ).done((resp) => {
            this.setState((prevState) => ({
                isCmdRunning: false,
                cmdFailed: false,
                data: {
                    ...prevState.data,
                    ...resp.data,
                }
            }));
            this.props.setTabTitle(resp.data.title);
        }).fail((resp) => {
            let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
            this.setState({
                isCmdRunning: false,
                cmdFailed: true,
                cmdError: error,
            });
        });
    }

    getLabel(name){
        let retVal = '';
        if(this.props.fieldcodes[name]) {
            retVal = this.props.fieldcodes[name].field_name;
        }
        return retVal;
    }

    componentDidMount() {
        if(this.props.item_id > 0) {
            this.fetchItem();
        }
    }

    render() {
        return(
            <div className="my-2">
                <div className="itemdetails-body">
                    <div className="itemdetails-header bg-light">
                        <InputTextBox id="txtTitle" name="title" value={this.state.data.title} maxlength={50}
                                      normal={true} handleTextChange={this.handleTextChangeData} />
                    </div>                
                    <div class="row">    
                        <div class="col-10" id="section-top-left">
                            <div class="bordered-box mb-2" id="warp">
                                <div class="text-center my-2">
                                    <h5 class="my-auto text-primary">W A R P</h5>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("reed")} name="reed"
                                            type="number" value={this.state.data.reed} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("warpPanna")} name="warpPanna"
                                           type="number" value={this.state.data.warpPanna} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("warpReedSpace")} name="warpReedSpace"
                                           type="number" value={this.state.data.warpReedSpace} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("lassa")} name="lassa"
                                           type="number" value={this.state.data.lassa} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("warpMetre")} name="warpMetre"
                                           type="number" value={this.state.data.warpMetre} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("totalEnds")} name="totalEnds"
                                           type="number" value={this.state.data.totalEnds} handleTextChange={this.handleTextChangeData} />
                                    </div>                
                                </div>
                                <InputGrid  
                                    type="number"
                                    gridId="warp-grid-container"
                                    columns={this.state.warp_grid_columns} 
                                    rows={this.state.data.warp_grid_rows}
                                    handleCellChange={this.handleCellChange}
                                    handleRowsChange={this.handleRowsChange}
                                    handleUpdateTotal={this.handleUpdateTotal}
                                />
                            </div>
                            <div class="bordered-box mb-2" id="weft">
                                <div class="text-center my-1">
                                    <h5 class="my-auto text-primary">W E F T</h5>
                                </div>            
                                <div class="row">
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("weftMetre")} name="weftMetre"
                                           type="number" value={this.state.data.weftMetre} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("weftPanna")} name="weftPanna"
                                           type="number" value={this.state.data.weftPanna} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("weftReedSpace")} name="weftReedSpace"
                                           type="number" value={this.state.data.weftReedSpace} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("peek")} name="peek"
                                           type="number" value={this.state.data.peek} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("jobRate")} name="jobRate"
                                           type="number" value={this.state.data.jobRate} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label={this.getLabel("weavingChrg")} name="weavingChrg"
                                           type="number" value={this.state.data.weavingChrg} handleTextChange={this.handleTextChangeData} />
                                    </div>                
                                </div>
                                <InputGrid
                                    type="number"
                                    gridId="weft-grid-container"
                                    columns={this.state.weft_grid_columns} 
                                    rows={this.state.data.weft_grid_rows}
                                    handleCellChange={this.handleCellChange}
                                    handleRowsChange={this.handleRowsChange}
                                />
                            </div>
                        </div>
                        <div class="col-2" id="section-top-right">
                            <div class="bordered-box mb-2">
                                <div class="text-center my-1">
                                    <h5 class="my-auto text-primary">O T H E R S</h5>
                                </div>
                                <InputTextBox label={this.getLabel("warpWt")} name="warpWt"
                                   type="number" value={this.state.data.warpWt} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label={this.getLabel("warpWtWstg")} name="warpWtWstg"
                                   type="number" value={this.state.data.warpWtWstg} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label={this.getLabel("weftWt")} name="weftWt"
                                   type="number" value={this.state.data.weftWt} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label={this.getLabel("weftWtWstg")} name="weftWtWstg"
                                   type="number" value={this.state.data.weftWtWstg} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label={this.getLabel("totalWt")} name="totalWt"
                                   type="number" value={this.state.data.totalWt} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label={this.getLabel("totalWtWstg")} name="totalWtWstg"
                                   type="number" value={this.state.data.totalWtWstg} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label={this.getLabel("totalCost")} name="totalCost"
                                   type="number" value={this.state.data.totalCost} handleTextChange={this.handleTextChangeData} />
                            </div>
                        </div>
                    </div>
                    <div id="section-bottom-1" class="bordered-box mb-2">
                        <div class="text-center my-1">
                            <h5 class="my-auto text-primary">W A R P &nbsp;&nbsp; P A C K I N G</h5>
                        </div>
                        <InputGrid  
                            type="number"
                            gridId="warppack-grid-container"
                            columns={this.state.warp_pack_grid_columns} 
                            rows={this.state.data.warppack_grid_rows}
                            handleCellChange={this.handleCellChange}
                            handleRowsChange={this.handleRowsChange}
                        />
                        <div class="row">
                            <div class="col-5"></div>
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("cramp")} name="cramp"
                                   type="number" value={this.state.data.cramp} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-5"></div>
                        </div>
                    </div>
                    <div id="section-bottom-2" class="bordered-box mb-2">
                        <div class="text-center my-1">
                            <h5 class="my-auto text-primary">R A T E S</h5>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("rateOutPer")} name="rateOutPer"
                                   type="number" value={this.state.data.rateOutPer} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("rateOutRs")} name="rateOutRs"
                                   type="number" value={this.state.data.rateOutRs} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("demandRateOut")} name="demandRateOut"
                                   type="number" value={this.state.data.demandRateOut} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("outPerctg")} name="outPerctg"
                                   type="number" value={this.state.data.outPerctg} handleTextChange={this.handleTextChangeData} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("rateLocalPer")} name="rateLocalPer"
                                   type="number" value={this.state.data.rateLocalPer} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("rateLocalRs")} name="rateLocalRs"
                                   type="number" value={this.state.data.rateLocalRs} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("demandRateLocal")} name="demandRateLocal"
                                   type="number" value={this.state.data.demandRateLocal} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label={this.getLabel("localPerctg")} name="localPerctg"
                                   type="number" value={this.state.data.localPerctg} handleTextChange={this.handleTextChangeData} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="itemdetails-footer bg-light">
                    <button class="btn btn-primary m-1" id="btn-save" onClick={this.handleSaveClick}>
                        Save
                    </button>
                    <button class="btn btn-primary m-1" id="btn-save-as">
                        Save As
                    </button>
                    <button class="btn btn-secondary m-1" id="btn-save-reset">
                        Reset
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fieldcodes: state.settings.fieldcodes,
        formulas: state.settings.formulas,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            setTabTitle: tabActions.setTabTitle,
            refreshTab: tabActions.refreshTab,
            openModal: modalActions.openModal,
        }, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemDetails);