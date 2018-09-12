import React from 'react';
import Settings from 'sources/settings/Settings';
import Search from 'sources/search/Search';
import ItemDetails from 'sources/itemdetails/ItemDetails';

class TabLinks extends React.Component {
    constructor(){
        super()
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleTabCloseClick = this.handleTabCloseClick.bind(this);
    }

    handleTabClick(e) {
        e.stopPropagation();
        this.props.changeActiveId(e.target.id);
    }

    handleTabCloseClick(e) {
        e.stopPropagation();
        this.props.closeTabId(e.target.getAttribute("data-tabid"))
    }

    render() {
        let self = this;
        let activeId = this.props.activeId;
        let handleTabClick = this.handleTabClick;
        let handleTabCloseClick = this.handleTabCloseClick;
        return (
            <ul className="nav nav-tabs" id="container-tab-buttons" role="tablist">
                {this.props.tabs.map(function(tab) {
                    return (
                        <li key={tab.id} className="nav-item">
                            <a className={"nav-link " + (tab.id === self.props.activeId ? "active":"")} id={tab.id} data-toggle="tab" 
                               href={"#"+tab.content_id} role="tab" aria-controls={tab.content_id} onClick={self.handleTabClick}
                               aria-selected={(tab.id === self.props.activeId ? "true":"false")}>
                                {tab.title}
                                <button data-tabid={""+tab.id} class={"nav-close la la-close la-1x btn-plain-noborder " + (tab.closeable?"":"btn-hide")} 
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

export {TabContent, TabLinks};