import React from 'react';
import {InputTextBox, InputGrid} from 'sources/components';
import { url_for } from 'sources/utils/url_for';
import {bindActionCreators} from 'redux';

import {tabActions} from 'sources/tabmanager/tabActionReducer';
import {modalActions} from 'sources/modal/modalActionReducer';
import {connect} from 'react-redux';

class ItemDetails extends React.Component {
    constructor() {
        super();
        this.state= {
            isCmdRunning: true,
            cmdMessage: '',
            cmdFailed: false,
            cmdError: '',
            cmdSuccess: '',
            warp_grid_columns: [
                { header: 'Count', accessor: d=>d[0] }, 
                { header: 'Perct.', accessor: d=>d[1] },
                { header: 'Wastage', accessor: d=>d[2] },
                { header: 'Rate', accessor: d=>d[3]},
                { header: 'Sizing Rate', accessor: d=>d[4] },
                { header: 'Weight', accessor: d=>(parseFloat(d[0]) + parseFloat(d[1])), total:true}, 
                { header: 'Warp Cost', accessor: d=>(d[1] + d[2]), total:true }, 
                { header: 'Warp Sizing Cost', accessor: d=>(d[3] * d[4]), total:true }, 
            ],
            weft_grid_columns: [
                { header: 'Count', accessor: d=>d[0] }, 
                { header: 'Perct.', accessor: d=>d[1] },
                { header: 'Wastage', accessor: d=>d[2] },
                { header: 'Rate', accessor: d=>d[3] },
                { header: 'Weight', accessor: d=>(d[0] + d[1]), total:true}, 
                { header: 'Weft Cost', accessor: d=>(d[3] * d[0]), total:true},
            ],
            warp_pack_grid_columns: [
                { header: 'Kg/Bag', accessor: d=>d[0] }, 
                { header: 'No. of cone/bag', accessor: d=>d[1] },
                { header: 'Part', accessor: d=>d[2] },
                { header: 'No Of Beam', accessor: d=>d[3]},
                { header: 'Kg/Cone', accessor: d=>d[0], total: true },
                { header: 'Total Meger', accessor: d=>(d[0] + d[1]), total: true}, 
                { header: 'Tara', accessor: d=>(d[1] + d[2]), total: true }, 
                { header: 'No Of Bagst', accessor: d=>(d[3] * d[1]), total: true},
                { header: 'Total Cut', accessor: d=>(d[3] * d[2]), total: true},
                { header: 'Cut On Beam', accessor: d=>(d[3] * d[0]), total: true},
            ],
            data: {
                title: "Untitled", id: 0,
                reed: '0', warpPanna: '0', warpReedSpace: '0', lassa: '0', warpMetre: '0', totalEnds: '0',
                weftMetre: '0', weftPanna: '0', weftReedSpace: '0', peek: '0', jobRate: '0', weavingChrg: '0',
                warpWt: '0',  warpWtWstg: '0', weftWt: '0', weftWtWstg: '0', totalWt: '0', totalWtWstg: '0', totalCost: '0',
                cramp: '0',
                rateOutPer: '0', rateOutRs: '0', demandRateOut:0, outPerctg: '0',
                rateLocalPer: '0', rateLocalRs: '0', demandRateLocal:0, localPerctg: '0',
                warp_grid_rows: [
                    [0,0,0,0,0]
                ],
                weft_grid_rows: [
                    [0,0,0,0]
                ],
                warp_pack_grid_rows: [
                    [0,0,0,0]
                ]
            }
        };

        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.handleTextChangeData = this.handleTextChangeData.bind(this);
        this.handleTextChangeFloat = this.handleTextChangeFloat.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.formulas = this.formulas.bind(this);
    }

    handleRowsChange(rows, grid='') {
        if(grid !== '') {
            this.setState(prevState => ({
                [grid]: {
                    ...prevState[grid],
                    rows: rows
                }
            }));
        }
    }

    handleTextChangeFloat(e) {
        let val = e.target.value
        if(val.trim() === '') {
            val = 0;
        } else {
            val = parseFloat(val);
        }
        this.setState({
            [e.target.name]: val,
        });
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

    formulas(field) {
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
                                        <InputTextBox label="Reed" name="reed"  maxlength={10}
                                            value={this.state.data.reed} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Panna" name="warpPanna" maxlength={10}
                                            value={this.state.data.warpPanna} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Reed Space" name="warpReedSpace" maxlength={10}
                                            value={this.state.data.warpReedSpace} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Lassa (yards)" name="lassa" maxlength={10}
                                            value={this.state.data.lassa} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Metre" name="warpMetre" maxlength={10}
                                            value={this.state.data.warpMetre} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Total Ends" name="totalEnds" maxlength={10}
                                            value={this.state.data.totalEnds} handleTextChange={this.handleTextChangeData} />
                                    </div>                
                                </div>
                                <InputGrid  
                                    gridId="warp-grid-container"
                                    columns={this.state.warp_grid_columns} 
                                    rows={this.state.data.warp_grid_rows}
                                    handleRowsChange={this.handleRowsChange.bind(null, "warp_grid")}
                                />
                            </div>
                            <div class="bordered-box mb-2" id="weft">
                                <div class="text-center my-1">
                                    <h5 class="my-auto text-primary">W E F T</h5>
                                </div>            
                                <div class="row">
                                    <div class="col-2">
                                        <InputTextBox label="Metre" name="weftMetre" maxlength={10}
                                            value={this.state.data.weftMetre} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Panna" name="weftPanna" maxlength={10}
                                            value={this.state.data.weftPanna} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Reed Space" name="weftReedSpace" maxlength={10}
                                            value={this.state.data.weftReedSpace} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Peek" name="peek" maxlength={10}
                                            value={this.state.data.peek} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Job Rate" name="jobRate" maxlength={10}
                                            value={this.state.data.jobRate} handleTextChange={this.handleTextChangeData} />
                                    </div>
                                    <div class="col-2">
                                        <InputTextBox label="Weaving Charges" name="weavingChrg" maxlength={10}
                                            value={this.state.data.weavingChrg} handleTextChange={this.handleTextChangeData} />
                                    </div>                
                                </div>
                                <InputGrid
                                    gridId="weft-grid-container"
                                    columns={this.state.weft_grid_columns} 
                                    rows={this.state.data.weft_grid_rows}
                                    handleRowsChange={this.handleRowsChange.bind(null, "weft_grid")}
                                />
                            </div>
                        </div>
                        <div class="col-2" id="section-top-right">
                            <div class="bordered-box mb-2">
                                <div class="text-center my-1">
                                    <h5 class="my-auto text-primary">O T H E R S</h5>
                                </div>
                                <InputTextBox label="Warp Weight" name="warpWt" maxlength={10}
                                    value={this.state.data.warpWt} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label="Warp Wt. with Wastage" name="warpWtWstg" maxlength={10}
                                    value={this.state.data.warpWtWstg} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label="Weft Weight" name="weftWt" maxlength={10}
                                    value={this.state.data.weftWt} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label="Weft Wt. with Wastage" name="weftWtWstg" maxlength={10}
                                    value={this.state.data.weftWtWstg} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label="Total Weight" name="totalWt" maxlength={10}
                                    value={this.state.data.totalWt} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label="Total Wt. with Wastage" name="totalWtWstg" maxlength={10}
                                    value={this.state.data.totalWtWstg} handleTextChange={this.handleTextChangeData} />
                                <InputTextBox label="Total Cost" name="totalCost" maxlength={10}
                                    value={this.state.data.totalCost} handleTextChange={this.handleTextChangeData} />
                            </div>
                        </div>
                    </div>
                    <div id="section-bottom-1" class="bordered-box mb-2">
                        <div class="text-center my-1">
                            <h5 class="my-auto text-primary">W A R P &nbsp;&nbsp; P A C K I N G</h5>
                        </div>
                        <InputGrid  
                            gridId="warppack-grid-container"
                            columns={this.state.warp_pack_grid_columns} 
                            rows={this.state.data.warp_pack_grid_rows}
                            handleRowsChange={this.handleRowsChange.bind(null, "warp_pack_grid")}
                        />
                        <div class="row">
                            <div class="col-5"></div>
                            <div class="col-2">
                                <InputTextBox label="Cramp" name="cramp" maxlength={10}
                                    value={this.state.data.cramp} handleTextChange={this.handleTextChangeData} />
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
                                <InputTextBox label="Rate Out Per" name="rateOutPer" maxlength={10}
                                    value={this.state.data.rateOutPer} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label="Rate Out Rs." name="rateOutRs" maxlength={10}
                                    value={this.state.data.rateOutRs} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label="Demanded Rate Out" name="demandRateOut" maxlength={10}
                                    value={this.state.data.demandRateOut} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label="Percentage %" name="outPerctg" maxlength={10}
                                    value={this.state.data.outPerctg} handleTextChange={this.handleTextChangeData} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <InputTextBox label="Rate Local Per" name="rateLocalPer" maxlength={10}
                                    value={this.state.data.rateLocalPer} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label="Rate Local Rs." name="rateLocalRs" maxlength={10}
                                    value={this.state.data.rateLocalRs} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label="Demanded Local Out" name="demandRateLocal" maxlength={10}
                                    value={this.state.data.demandRateLocal} handleTextChange={this.handleTextChangeData} />
                            </div>
                            <div class="col-2">
                                <InputTextBox label="Percentage %" name="localPerctg" maxlength={10}
                                    value={this.state.data.localPerctg} handleTextChange={this.handleTextChangeData} />
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


function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            setTabTitle: tabActions.setTabTitle,
            refreshTab: tabActions.refreshTab,
            openModal: modalActions.openModal,    
        }, dispatch)
    }
}

export default connect(null,mapDispatchToProps)(ItemDetails);