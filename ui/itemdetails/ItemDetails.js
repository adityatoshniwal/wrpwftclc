import React from 'react';
import InputTextBox from 'sources/components';
import InputGrid from 'sources/components';

class ItemDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Untitled",
            reed: '0', warpPanna: '0', warpReedSpace: '0', lassa: '0', warpMetre: '0', totalEnds: '0',
            weftMetre: '0', weftPanna: '0', weftReedSpace: '0', peek: '0', jobRate: '0', weavingChrg: '0',
            warpWt: '0',  warpWtWstg: '0', weftWt: '0', weftWtWstg: '0', totalWt: '0', totalWtWstg: '0', totalCost: '0',
            cramp: '0',
            rateOutPer: '0', rateOutRs: '0', demandRateOut:0, outPerctg: '0',
            rateLocalPer: '0', rateLocalRs: '0', demandRateLocal:0, localPerctg: '0',
            warp_grid: {
                columns: [
                      { header: 'Count', accessor: d=>d[0] }, 
                      { header: 'Perct.', accessor: d=>d[1] },
                      { header: 'Wastage', accessor: d=>d[2] },
                      { header: 'Rate', accessor: d=>d[3]},
                      { header: 'Sizing Rate', accessor: d=>d[4] },
                      { header: 'Weight', accessor: d=>(parseFloat(d[0]) + parseFloat(d[1])), total:true}, 
                      { header: 'Warp Cost', accessor: d=>(d[1] + d[2]), total:true }, 
                      { header: 'Warp Sizing Cost', accessor: d=>(d[3] * d[4]), total:true }, ],
                rows: [
                    [0,0,0,0,0]
                ]
            },
            weft_grid: {
                columns: [
                    { header: 'Count', accessor: d=>d[0] }, 
                    { header: 'Perct.', accessor: d=>d[1] },
                    { header: 'Wastage', accessor: d=>d[2] },
                    { header: 'Rate', accessor: d=>d[3] },
                    { header: 'Weight', accessor: d=>(d[0] + d[1]), total:true}, 
                    { header: 'Weft Cost', accessor: d=>(d[3] * d[0]), total:true},],
                rows: [
                    [0,0,0,0]
                ]
            },
            warp_pack_grid: {
                columns: [
                      { header: 'Kg/Bag', accessor: d=>d[0] }, 
                      { header: 'No. of cone/bag', accessor: d=>d[1] },
                      { header: 'Part', accessor: d=>d[2] },
                      { header: 'No Of Beam', accessor: d=>d[3]},
                      { header: 'Kg/Cone', accessor: d=>d[0], total: true },
                      { header: 'Total Meger', accessor: d=>(d[0] + d[1]), total: true}, 
                      { header: 'Tara', accessor: d=>(d[1] + d[2]), total: true }, 
                      { header: 'No Of Bagst', accessor: d=>(d[3] * d[1]), total: true},
                      { header: 'Total Cut', accessor: d=>(d[3] * d[2]), total: true},
                      { header: 'Cut On Beam', accessor: d=>(d[3] * d[0]), total: true},],
                rows: [
                    [0,0,0,0]
                ]
            },
        };

        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextChangeFloat = this.handleTextChangeFloat.bind(this);
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

    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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

    render() {
        return(
            <div>
                <div>
                    <InputTextBox id="txtTitle" name="title" value={this.state.title} maxlength={50}
                                            handleTextChange={this.handleTextChange} />
                </div>
                <div class="row py-2">    
                    <div class="col-10" id="section-top-left">
                        <div id="warp">
                            <div class="text-center ribbon-primary my-2">
                                <h5 class="my-auto">W A R P</h5>
                            </div>
                            <div class="row">
                                <div class="col-2">
                                    <InputTextBox label="Reed" name="reed"  maxlength={10}
                                        value={this.state.reed} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Panna" name="warpPanna" maxlength={10}
                                        value={this.state.warpPanna} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Reed Space" name="warpReedSpace" maxlength={10}
                                        value={this.state.warpReedSpace} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Lassa (yards)" name="lassa" maxlength={10}
                                        value={this.state.lassa} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Metre" name="warpMetre" maxlength={10}
                                        value={this.state.warpMetre} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Total Ends" name="totalEnds" maxlength={10}
                                        value={this.state.totalEnds} handleTextChange={this.handleTextChange} />
                                </div>                
                            </div>
                            <InputGrid  
                                gridId="warp-grid-container"
                                columns={this.state.warp_grid.columns} 
                                rows={this.state.warp_grid.rows}
                                handleRowsChange={this.handleRowsChange.bind(null, "warp_grid")}
                            />
                        </div>
                        <div id="weft">
                            <div class="text-center ribbon-primary">
                                <h5 class="my-auto">W E F T</h5>
                            </div>            
                            <div class="row">
                                <div class="col-2">
                                    <InputTextBox label="Metre" name="weftMetre" maxlength={10}
                                        value={this.state.weftMetre} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Panna" name="weftPanna" maxlength={10}
                                        value={this.state.weftPanna} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Reed Space" name="weftReedSpace" maxlength={10}
                                        value={this.state.weftReedSpace} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Peek" name="peek" maxlength={10}
                                        value={this.state.peek} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Job Rate" name="jobRate" maxlength={10}
                                        value={this.state.jobRate} handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Weaving Charges" name="weavingChrg" maxlength={10}
                                        value={this.state.weavingChrg} handleTextChange={this.handleTextChange} />
                                </div>                
                            </div>
                            <InputGrid
                                gridId="weft-grid-container"
                                columns={this.state.weft_grid.columns} 
                                rows={this.state.weft_grid.rows}
                                handleRowsChange={this.handleRowsChange.bind(null, "weft_grid")}
                            />
                        </div>
                    </div>
                    <div class="col-2" id="section-top-right bg-warning">
                        <div class="text-center ribbon-primary my-2">
                            <h5 class="my-auto">O T H E R S</h5>
                        </div>
                        <InputTextBox label="Warp Weight" name="warpWt" maxlength={10}
                            value={this.state.warpWt} handleTextChange={this.handleTextChange} />
                        <InputTextBox label="Warp Wt. with Wastage" name="warpWtWstg" maxlength={10}
                            value={this.state.warpWtWstg} handleTextChange={this.handleTextChange} />
                        <InputTextBox label="Weft Weight" name="weftWt" maxlength={10}
                            value={this.state.weftWt} handleTextChange={this.handleTextChange} />
                        <InputTextBox label="Weft Wt. with Wastage" name="weftWtWstg" maxlength={10}
                            value={this.state.weftWtWstg} handleTextChange={this.handleTextChange} />
                        <InputTextBox label="Total Weight" name="totalWt" maxlength={10}
                            value={this.state.totalWt} handleTextChange={this.handleTextChange} />
                        <InputTextBox label="Total Wt. with Wastage" name="totalWtWstg" maxlength={10}
                            value={this.state.totalWtWstg} handleTextChange={this.handleTextChange} />
                        <InputTextBox label="Total Cost" name="totalCost" maxlength={10}
                            value={this.state.totalCost} handleTextChange={this.handleTextChange} />
                    </div>
                </div>
                <div id="section-bottom-1" class="">
                    <div class="text-center ribbon-primary my-2">
                        <h5 class="my-auto">W A R P &nbsp;&nbsp; P A C K I N G</h5>
                    </div>
                    <InputGrid  
                        gridId="warppack-grid-container"
                        columns={this.state.warp_pack_grid.columns} 
                        rows={this.state.warp_pack_grid.rows}
                        handleRowsChange={this.handleRowsChange.bind(null, "warp_pack_grid")}
                    />
                    <div class="row">
                        <div class="col-5"></div>
                        <div class="col-2">
                            <InputTextBox label="Cramp" name="cramp" maxlength={10}
                                value={this.state.cramp} handleTextChange={this.handleTextChange} />
                        </div>
                        <div class="col-5"></div>
                    </div>
                </div>
                <div id="section-bottom-2" class="p-2">
                    <div class="text-center ribbon-primary my-2">
                        <h5 class="my-auto">R A T E S</h5>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <InputTextBox label="Rate Out Per" name="rateOutPer" maxlength={10}
                                value={this.state.rateOutPer} handleTextChange={this.handleTextChange} />
                        </div>
                        <div class="col-2">
                            <InputTextBox label="Rate Out Rs." name="rateOutRs" maxlength={10}
                                value={this.state.rateOutRs} handleTextChange={this.handleTextChange} />
                        </div>
                        <div class="col-2">
                            <InputTextBox label="Demanded Rate Out" name="demandRateOut" maxlength={10}
                                value={this.state.demandRateOut} handleTextChange={this.handleTextChange} />
                        </div>
                        <div class="col-2">
                            <InputTextBox label="Percentage %" name="outPerctg" maxlength={10}
                                value={this.state.outPerctg} handleTextChange={this.handleTextChange} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <InputTextBox label="Rate Local Per" name="rateLocalPer" maxlength={10}
                                value={this.state.rateLocalPer} handleTextChange={this.handleTextChange} />
                        </div>
                        <div class="col-2">
                            <InputTextBox label="Rate Local Rs." name="rateLocalRs" maxlength={10}
                                value={this.state.rateLocalRs} handleTextChange={this.handleTextChange} />
                        </div>
                        <div class="col-2">
                            <InputTextBox label="Demanded Local Out" name="demandRateLocal" maxlength={10}
                                value={this.state.demandRateLocal} handleTextChange={this.handleTextChange} />
                        </div>
                        <div class="col-2">
                            <InputTextBox label="Percentage %" name="localPerctg" maxlength={10}
                                value={this.state.localPerctg} handleTextChange={this.handleTextChange} />
                        </div>
                    </div>
                </div>
                <div class="ribbon-primary">
                    <button class="btn btn-primary " id="btn-save">
                        <i class="la la-save la-lg mr-1"></i>Save
                    </button>
                    <button class="btn btn-primary " id="btn-save-as">
                        <i class="la la-save la-lg mr-1"></i>Save As
                    </button>
                    <button class="btn btn-primary " id="btn-save-reset">
                        <i class="la la-save la-lg mr-1"></i>Reset
                    </button>
                </div>
            </div>
        )
    }
}

export default ItemDetails;