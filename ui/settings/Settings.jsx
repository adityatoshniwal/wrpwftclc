import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {settingsActions} from './settingsActionReducer';

import {InputTextBox} from 'sources/components';

function formatFormula(field_data, fields_for_cat) {
    let formatted = field_data.field_formula;

    for(let i=0; i<fields_for_cat.length; i++) {
        let field = fields_for_cat[i];
        formatted = formatted.replace(`[${field.field_code}]`, `[${field.field_name}]`);
    }
    return formatted;
}

function Formulas(props) {
    if(props.formulas) {
        return(
            <div className="row">
                {Object.keys(props.formulas).map((formula_cat) => {
                    let fields_for_cat = props.formulas[formula_cat].fields;
                    return fields_for_cat.map((field_data)=>{
                        return(
                            <div className="col-md-6">
                                <InputTextBox label={props.getLabel(field_data.for_field_code)} name={field_data.for_field_code}  maxlength={100}
                                value={field_data.formula} multiline={true} readonly={true} rows={3}/>    
                            </div>)    
                    })
                })}
            </div>
        );

    } else {
        return(<div></div>);
    }
}

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "This is settings page",
        };

        this.getLabel = this.getLabel.bind(this);
    }

    getLabel(name){
        let retVal = '';
        if(this.props.fieldcodes[name]) {
            retVal = this.props.fieldcodes[name].field_name;
        }
        return retVal;
    }

    render() {
        return (
            <div>
                <div className="bordered-box my-2">
                    <span class="h5">Formula</span>
                    <div className="settings-list">
                        <Formulas formulas={this.props.formulas} getLabel={this.getLabel}/>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        ...state.settings,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            ...settingsActions,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);