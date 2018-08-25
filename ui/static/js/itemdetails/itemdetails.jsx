import React from 'react';
import InputTextBox from './inputtextbox';
import InputGrid from './inputgrid';

class ItemDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Untitled",
            reed: '0', warpPanna: '0', warpReedSpace: '0', lassa: '0', warpMetre: '0', totalEnds: '0',
            weftMetre: '0', weftPanna: '0', weftReedSpace: '0', peek: '0', jobRate: '0', weavingChrg: '0',
            warpWt: '0',  warpWtWstg: '0', weftHt: '0', weftHtWstg: '0', totalWt: '0', totalWtWstg: '0', totalCost: '0',
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
                      { header: 'Weight', accessor: d=>(d[0] + d[1])}, 
                      { header: 'Warp Cost', accessor: d=>(d[1] + d[2]) }, 
                      { header: 'Warp Sizing Cost', accessor: d=>(d[3] * d[4])},],
                rows: [
                    [0,0,0,0,0],
                    [0,0,0,0,0]
                ]
            },
            weft_grid: {
                columns: [
                    { header: 'Count', accessor: d=>d[0] }, 
                    { header: 'Perct.', accessor: d=>d[1] },
                    { header: 'Wastage', accessor: d=>d[2] },
                    { header: 'Rate', accessor: d=>d[3] },
                    { header: 'Weight', accessor: d=>(d[0] + d[1])}, 
                    { header: 'Weft Cost', accessor: d=>(d[3] * d[0])},],
                rows: [
                    [0,0,0,0],
                    [0,0,0,0]
                ]
            },
            warp_pack_grid: {
                columns: [
                      { header: 'Count', accessor: d=>d[0] }, 
                      { header: 'Perct.', accessor: d=>d[1] },
                      { header: 'Wastage', accessor: d=>d[2] },
                      { header: 'Rate', accessor: d=>d[3]},
                      { header: 'Sizing Rate', accessor: d=>d[4] },
                      { header: 'Weight', accessor: d=>(d[0] + d[1])}, 
                      { header: 'Warp Cost', accessor: d=>(d[1] + d[2]) }, 
                      { header: 'Warp Sizing Cost', accessor: d=>(d[3] * d[4])},],
                rows: [
                    [0,0,0,0,0],
                    [0,0,0,0,0]
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
                return isNaN(val)?"error":val;
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
                            <div class="text-center ribbon-primary">
                                <h5 class="my-auto">W A R P</h5>
                            </div>
                            <div class="row">
                                <div class="col-2">
                                    <InputTextBox label="Reed" id="txtReed" name="reed"  maxlength={10}
                                        value={this.state.reed}
                                        handleTextChange={this.handleTextChange} />
                                </div>
                                <div class="col-2">
                                    <InputTextBox label="Panna" id="txtPanna" name="panna" maxlength={10}
                                        value={this.formulas('warpPanna').call()}/>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Reed Space</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm "/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Lassa (yards)</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm "/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Metre</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm "/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Total Ends</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm " readonly/>
                                    </div>
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
                                    <div class="form-group">
                                        <label for="txtReed">Metre</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm "/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Panna</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm "/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Reed Space</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm "/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Peek</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm "/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Job Rate</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm "/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <label for="txtReed">Weaving Charges</label>
                                        <input type="text" id="txtReed" class="form-control form-control-sm " readonly/>
                                    </div>
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
                        <div class="text-center ribbon-primary">
                            <h5 class="my-auto">O T H E R S</h5>
                        </div>            
                        <div class="form-group my-1">
                            <label for="txt1">Warp Weight</label>
                            <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                        </div>
                        <div class="form-group my-1">
                            <label for="txt1">Warp Wt. with Wastage</label>
                            <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                        </div>
                        <div class="form-group my-1">
                            <label for="txt1">Weft Weight</label>
                            <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                        </div>
                        <div class="form-group my-1">
                            <label for="txt1">Weft Wt. with Wastage</label>
                            <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                        </div>
                        <div class="form-group my-1">
                            <label for="txt1">Total Weight</label>
                            <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                        </div>
                        <div class="form-group my-1">
                            <label for="txt1">Total Wt. with Wastage</label>
                            <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                        </div>
                        <div class="form-group my-1">
                            <label for="txt1">Total Cost</label>
                            <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                        </div>
                    </div>
                </div>
                <div id="section-bottom-1" class="my-2">
                    <div class="text-center ribbon-primary">
                        <h5 class="my-auto">W A R P &nbsp;&nbsp; P A C K I N G</h5>
                    </div>
                    <InputGrid  
                        gridId="warppack-grid-container"
                        columns={this.state.warp_pack_grid.columns} 
                        rows={this.state.warp_pack_grid.rows}
                        handleRowsChange={this.handleRowsChange.bind(null, "warp_pack_grid")}
                    />
                    <div class="text-center" id="warppack-grid-container">
                    </div>
                    <div class="row">
                        <div class="col-4 text-right">
                            Cramp
                        </div>
                        <div class="col-4">
                            <input type="text" id="crampTxt" class="form-control form-control-sm " readonly />
                        </div>
                    </div>
                </div>
                <div id="section-bottom-2" class="p-2 my-2">
                    <div class="text-center ribbon-primary">
                        <h5 class="my-auto">R A T E S</h5>
                    </div>    
                    <div class="row">
                        <div class="col-2">
                            <div class="form-group my-1">
                                <label for="txt1">Rate Out Per</label>
                                <input type="text" id="txt1" class="form-control form-control-sm " />
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group my-1">
                                <label for="txt1">Rs.</label>
                                <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group my-1">
                                <label for="txt1">Demanded Rate Out</label>
                                <input type="text" id="txt1" class="form-control form-control-sm " />
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group my-1">
                                <label for="txt1">Percentage %</label>
                                <input type="text" id="txt1" class="form-control form-control-sm  text-danger" value="0" readonly />
                            </div>
                        </div>
                        <div class="col-1 text-right">
                            <a href="#" class="btn btn-sm border-0 " id="grid-reset" data-toggle="tooltip" title="Reset Textboxes">
                                <i class="la la-retweet la-lg mr-1 text-danger"></i>
                                <span></span>
                            </a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <div class="form-group my-1">
                                <label for="txt1">Rate Out Per</label>
                                <input type="text" id="txt1" class="form-control form-control-sm " />
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group my-1">
                                <label for="txt1">Rs.</label>
                                <input type="text" id="txt1" class="form-control form-control-sm " readonly />
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group my-1">
                                <label for="txt1">Demanded Rate Out</label>
                                <input type="text" id="txt1" class="form-control form-control-sm " />
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group my-1">
                                <label for="txt1">Percentage %</label>
                                <input type="text" id="txt1" class="form-control form-control-sm  text-danger" value="0" readonly />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ribbon-primary">
                    <button class="btn btn-primary " id="btn-save">
                        <i class="la la-save la-lg mr-1"></i>Save
                    </button>
                    <button class="btn btn-primary " id="btn-save-as">
                        <i class="la la-save la-lg mr-1"></i>Save As Template
                    </button>    
                </div>
            </div>
        )
    }
}

export default ItemDetails;