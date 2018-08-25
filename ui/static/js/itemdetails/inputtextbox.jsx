import React from 'react';

function InputTextBox(props){
    if(props.label) {
        return(
            <div className="form-group">
                <label for={props.id}>{props.label}</label>
                <input className="form-control form-control-sm " type="text" 
                    id={props.id} name={props.name} value={props.value} onChange={props.handleTextChange} 
                    maxLength={props.maxlength} readOnly={props.readonly}/>
            </div>
        );    
    } else {
        return(
            <div className="form-group">
                <input className="form-control form-control-sm " type="text" 
                    id={props.id} name={props.name} value={props.value} onChange={props.handleTextChange} 
                    maxLength={props.maxlength}/>
            </div>
        );        
    }
}

export default InputTextBox;