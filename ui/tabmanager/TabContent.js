import React from 'react';
import Search from 'sources/search/Search';
import Settings from 'sources/settings/Settings';
import ItemDetails from 'sources/itemdetails/ItemDetails';

export default function TabContent(props) {

    let returnModule = function(type) {
        switch(type) {
            case 'search': return (
                <Search />
            )
            break;
            case 'settings': return (
                <Settings />
            )
            break;
            case 'itemdetails': return (
                <ItemDetails />
            )
            break;                
        }
    };

    return(
        <div className="tab-content py-2" id="container-tab-div">
            {props.tabs.map(function(tab) {
                    return(
                        <div className={"tab-pane vertical-scrollbar " + (tab.id === props.activeId ? "show active":"")} id={tab.content_id} role="tabpanel" aria-labelledby={tab.id}>
                            {returnModule(tab.type)}
                        </div>    
                    );
            })}
        </div>
    )
}