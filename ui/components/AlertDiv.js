import React from 'react';
function AlertDiv(props) {
    return(
        <div className={"alert alert-"+props.type} role="alert">
            <span className="text-center">{props.message}</span>
        </div>
    );
}

export default AlertDiv;