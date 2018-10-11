import React from 'react';

import {InputTextBox} from 'sources/components';

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "This is settings page",
            warpWt: '[Warp] + [Weight] / 2'

        };
    }

    render() {
        return (
            <div>
                <div className="bordered-box my-2">
                    <span class="h5">Formula</span>
                    <div className="settings-list">
                        <div className="row">
                            <div className="col-md-6">
                                <InputTextBox label="Warp Weight" name="warpWt"  maxlength={100}
                                    value={this.state.warpWt} multiline={true} readonly={true}/>
                            </div>
                            <div className="col-md-6">
                                <InputTextBox label="Warp Weight" name="warpWt"  maxlength={100}
                                    value={this.state.warpWt} multiline={true} readonly={true}/>
                            </div>
                            <div className="col-md-6">
                                <InputTextBox label="Warp Weight" name="warpWt"  maxlength={100}
                                    value={this.state.warpWt} multiline={true} readonly={true}/>
                            </div>
                            <div className="col-md-6">
                                <InputTextBox label="Warp Weight" name="warpWt"  maxlength={100}
                                    value={this.state.warpWt} multiline={true} readonly={true}/>
                            </div>                                                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;