import React from 'react';

function InputTextBox(props){
    let returnLabel = (props) =>{
        return (<label for={props.id}>{props.label}</label>);
    }
    let returnInput = function(props) {
        return (
            <input className={"form-control " +(props.normal?"":"form-control-sm")} type="text" 
            id={props.id} name={props.name} value={props.value} onChange={props.handleTextChange} 
            maxLength={props.maxlength} readOnly={props.readonly}/>
        )
    };

    let returnTextarea = function(props) {
        return (
            <textarea className={"form-control " +(props.normal?"":"form-control-sm")} type="text" 
            id={props.id} name={props.name} value={props.value} onChange={props.handleTextChange} 
            maxLength={props.maxlength} readOnly={props.readonly} 
            rows={props.rows?props.rows:4}/>
        )
    };

    if(props.label) {
        if(props.multiline) {
            return(
                <div className="form-group">
                    {returnLabel(props)}
                    {returnTextarea(props)}
                </div>
            );        
        } else {
            return(
                <div className="form-group">
                    {returnLabel(props)}
                    {returnInput(props)}
                </div>
            );            
        }
    } else {
        if(props.multiline) {
            return(
                <div className="form-group">
                    {returnTextarea(props)}
                </div>
            );        
        } else {
            return(
                <div className="form-group">
                    {returnInput(props)}
                </div>
            );            
        }
    }
}

export default InputTextBox;