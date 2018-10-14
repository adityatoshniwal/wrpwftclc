import React from 'react';
import TabContent from 'sources/tabmanager/TabContent';
import TabLinks from 'sources/tabmanager/TabLinks';
import {tabActions} from 'sources/tabmanager/tabActionReducer';
import {modalActions} from 'sources/modal/modalActionReducer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'sources/modal/Modal';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen:false,
        }

        this.handleAddClick = this.handleAddClick.bind(this);
    }

    changeActiveTabTitle(title) {
        if(title !== ''){
            this.setState(prevState=>{
                let tabs = prevState.tabs;
                tabs.forEach((tab)=> {
                    if(tab.id === prevState.active_id){
                        
                    }
                })
                
            })
        }
    }

    handleAddClick(e){
        this.props.openItemTab(0);
    }

    render() {
        return (
            <div>
                <div className="row main-top-nav">
                    <div className="col-10">
                        <TabLinks />
                    </div>
                    <div className="col-2 text-right">
                        <a href="#" className="btn btn-sm btn-light" id="btnAdd" data-route="module/newitem" onClick={this.handleAddClick}>
                            <i className="la la-plus la-2x"></i>
                        </a>
                        <a href="#" className="btn btn-sm btn-light" id="btnLogout">
                            <i className="la la-power-off la-2x text-danger"></i>
                        </a>                        
                    </div>
                </div>
                <TabContent />
                <Modal />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            openItemTab:tabActions.openItemTab,
            openModal: modalActions.openModal,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);