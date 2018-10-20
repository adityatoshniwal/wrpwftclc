import React from 'react';
import TabContent from 'sources/tabmanager/TabContent';
import TabLinks from 'sources/tabmanager/TabLinks';
import {tabActions} from 'sources/tabmanager/tabActionReducer';
import {modalActions} from 'sources/modal/modalActionReducer';
import { settingsActions } from 'sources/settings/settingsActionReducer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'sources/modal/Modal';


function PleaseWait(props) {
    return (
        <div class={"loader-overlay "+(props.isLoading?"open":"")}>
            <div className="loader-container">
                <div className="loader"/>
            </div>
            <div className="h4 m-3 text-primary">Loading the application...</div>
        </div>    
    )
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
        }

        this.handleAddClick = this.handleAddClick.bind(this);
    }

    componentWillMount() {
        this.props.loadSettings();
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
        if(this.props.settings.isCmdRunning) {
            return( <PleaseWait isOpen={this.props.settings.isCmdRunning}/> )
        }
        else {
            return (
                <div>
                    <div className="row main-top-nav">
                        <div className="col-10">
                            <TabLinks />
                        </div>
                        <div className="col-2 text-right">
                            <a href="#" className="btn btn-sm btn-light" id="btnAdd" data-route="module/newitem" onClick={this.handleAddClick}>
                                <i className="fa fa-plus fa-2x"></i>
                            </a>
                            <a href="#" className="btn btn-sm btn-light" id="btnLogout">
                                <i className="fa fa-power-off fa-2x text-danger"></i>
                            </a>                        
                        </div>
                    </div>
                    <TabContent />
                    <Modal />
                </div>
            );
        }
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
            loadSettings: settingsActions.loadSettings,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);