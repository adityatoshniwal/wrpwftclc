import React from 'react';
import TabContent from 'sources/tabmanager/TabContent';
import TabLinks from 'sources/tabmanager/TabLinks';
import {tabActions} from 'sources/tabmanager/tabActionReducer';

import ReactModal from 'react-modal';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


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
        this.props.openNewTab('item', {item_id:0});
    }

    handleMClick(e){
        this.setState((prevState) => {
            return {
                ...prevState,
                isModalOpen: true,
            };
        });
    }

    onModalClose() {
        this.setState((prevState) => {
            return {
                ...prevState,
                isModalOpen: false,
            };
        });

    }

    render() {
        return (
            <div>
                <div className="row main-top-nav">
                    <div className="col-10">
                        <TabLinks />
                    </div>
                    <div className="col-2 text-right">
                        <div href="#" className="btn btn-sm btn-light" id="btnAdd" onClick={this.handleMClick.bind(this)}>
                            <i className="">M</i>
                        </div>
                        <div href="#" className="btn btn-sm btn-light" id="btnAdd" data-route="module/newitem" onClick={this.handleAddClick}>
                            <i className="la la-plus la-2x"></i>
                        </div>
                        <a href="#" className="btn btn-sm btn-light" id="btnLogout">
                            <i className="la la-power-off la-2x text-danger"></i>
                        </a>                        
                    </div>
                </div>
                <TabContent />
                <ReactModal
                    isOpen = {this.state.isModalOpen}
                    onRequestClose={this.onModalClose.bind(this)}>
                    <h1>Hello Modal</h1>
                </ReactModal>
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
            openNewTab:tabActions.openNewTab,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);