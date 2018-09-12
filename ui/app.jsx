import React from 'react';
import { TabContent, TabLinks } from 'sources/tabmanager/TabLinks';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tabs: [{
                id: "search-tab",
                content_id: "search-content",
                title: "Search",
                type: "search",
                closeable: false,
            },{
                id: "settings-tab",
                content_id: "settings-content",
                title: "Settings",
                type: "settings",
                closeable: true,
            }],
            active_id: "search-tab",
        }

        this.handleAddClick = this.handleAddClick.bind(this);
        this.changeActiveId = this.changeActiveId.bind(this);
        this.closeTabId = this.closeTabId.bind(this);
    }

    changeActiveId(activeId) {
        this.setState({active_id:activeId});
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

    closeTabId(tabId) {
        let newTabs = [];
        let prevTabId = "search-tab";
        let closeIndex = 0;
        let activeId = null;
        this.state.tabs.forEach(function(tab, i){
            if(tab.id === tabId) {
                activeId = prevTabId;
                closeIndex = i;
            }
            else {
                newTabs.push(tab);
            }
            prevTabId = tab.id;
        });
        
        if(closeIndex > newTabs.length-1) {
            closeIndex = newTabs.length-1;
        }

        this.setState({
            tabs:newTabs,
            active_id:newTabs[closeIndex].id,
        });
    }

    handleAddClick(e) {
        let newTab = {
            title: "Untitled",
            type: "itemdetails",
            closeable: true,            
        };

        let currDate = new Date(),
            newId = currDate.getDate()
                +""+currDate.getHours()
                +""+currDate.getMinutes()
                +""+currDate.getSeconds()
                +""+currDate.getMilliseconds();
        
        newTab.id = newId +"-tab";
        newTab.content_id = newId +"-content";
        
        this.setState({
            tabs: [...this.state.tabs, newTab],
            active_id: newTab.id,
        });

    }

    render() {
        return (
            <div>
                <div className="row main-top-nav">
                    <div className="col-10">
                        <TabLinks tabs={this.state.tabs} activeId={this.state.active_id} changeActiveId={this.changeActiveId} closeTabId={this.closeTabId}/>
                    </div>
                    <div className="col-2 text-right">
                        <div href="#" className="btn btn-sm btn-plain" id="btnAdd" data-route="module/newitem" onClick={this.handleAddClick}>
                            <i className="la la-plus la-2x"></i>
                        </div>
                        <a href="#" className="btn btn-sm btn-plain" id="btnLogout">
                            <i className="la la-power-off la-2x text-danger"></i>
                        </a>
                    </div>
                </div>
                <TabContent tabs={this.state.tabs} activeId={this.state.active_id}/>
            </div>
        );
    }
}

export default App;