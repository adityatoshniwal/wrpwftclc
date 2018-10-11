import React from 'react';
import ReactModal from 'react-modal';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {modalActions} from './modalActionReducer';

class Modal extends React.Component {
    constructor(){
        super();
        this.onRequestClose = this.onRequestClose.bind(this);
    }

    onRequestClose() {
        this.props.closeModal();
    }

    render() {
        let returnOkBtn = (props) => {
            if(props.onOkClick) {
                return(
                    <button className="btn btn-primary mr-2" onClick={props.onOkClick}>{props.okText?props.okText:"OK"}</button>
                );
            }
        }
    
        let returnCancelBtn = (props) =>{
            if(props.onCancelClick) {
                return(
                    <button className="btn btn-cancel mr-2" onClick={props.onCancelClick}>{props.cancelText?props.cancelText:"Cancel"}</button>
                );
            }
        }
        return(
            <ReactModal {...this.props} className="react-modal-main" overlayClassName="react-modal-overlay"
                onRequestClose={this.onRequestClose}>
                <div className="react-modal-body">
                    <div className="react-modal-content">
                        {this.props.content}
                    </div>
                    <div className="react-modal-footer">
                        {returnOkBtn(this.props)}
                        {returnCancelBtn(this.props)}
                    </div>
                </div>
            </ReactModal>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.modal,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            ...modalActions,
        }, dispatch)        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);