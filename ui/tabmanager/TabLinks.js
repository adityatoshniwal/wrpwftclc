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
        this.props.setActiveId(e.currentTarget.id);
    }

    handleTabCloseClick(e) {
        e.stopPropagation();
        this.props.closeTabId(e.target.getAttribute("data-tabid"))
    }

    render() {
        let self = this;
        return (
            <ul className="nav nav-pills" id="container-tab-buttons" role="tablist">
                {this.props.tabsstore.map((tab) => {
                    return (
                        <li key={tab.tab_id} className="nav-item" onClick={self.handleTabClick}>
                            <a className={"nav-link " + (tab.tab_id === self.props.active_id ? "active":"")} id={tab.tab_id} data-toggle="tab" 
                               href={"#"+tab.content_id} role="tab" aria-controls={tab.content_id} onClick={self.handleTabClick}
                               aria-selected={(tab.tab_id === self.props.active_id ? "true":"false")}>
                                <span className="mr-1">{tab.title}</span>
                                <a data-tabid={tab.tab_id} class={"nav-close fa fa-close fa-1x " + (tab.closeable?"":"d-none")}
                                        onClick={self.handleTabCloseClick}></a>
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