import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {tabActions} from './tabActionReducer';

class TabLinks extends React.Component {
    constructor(){
        super()
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTabCloseClick = this.handleTabCloseClick.bind(this);
    }

    handleTabClick(e) {
        e.stopPropagation();
        console.log('Tab clicked - '+ e.target.id);
        this.props.setActiveId(e.target.id);
    }

    handleTabCloseClick(e) {
        e.stopPropagation();
        console.log('Tab closed - '+ e.target.getAttribute("data-tabid"));
        this.props.closeTabId(e.target.getAttribute("data-tabid"))
    }

    render() {
        let self = this;
        return (
            <ul className="nav nav-tabs" id="container-tab-buttons" role="tablist">
                {Object.keys(this.props.tabsstore).map((tabid) => {
                    let tab = this.props.tabsstore[tabid];
                    return (
                        <li key={tabid} className="nav-item" onClick={self.handleTabClick}>
                            <a className={"nav-link " + (tabid === self.props.active_id ? "active":"")} id={tabid} data-toggle="tab" 
                               href={"#"+tab.content_id} role="tab" aria-controls={tab.content_id} onClick={self.handleTabClick}
                               aria-selected={(tabid === self.props.active_id ? "true":"false")}>
                                {tab.title}
                                <button data-tabid={""+tabid} class={"nav-close la la-close la-1x btn-light " + (tab.closeable?"":"btn-hide")} 
                                        onClick={self.handleTabCloseClick}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.tabs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            ...tabActions,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabLinks);