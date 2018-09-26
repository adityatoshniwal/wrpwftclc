import React from 'react';
import Search from 'sources/search/Search';
import Settings from 'sources/settings/Settings';
import ItemDetails from 'sources/itemdetails/ItemDetails';
import {tabActions} from './tabActionReducer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


function TabContent(props) {

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
            {Object.keys(props.tabsstore).map((tabid) => {
                let tab = props.tabsstore[tabid];
                return(
                    <div className={"tab-pane vertical-scrollbar " + (tabid === props.active_id ? "show active":"")} id={tab.content_id} role="tabpanel" aria-labelledby={tabid}>
                        {returnModule(tab.type)}
                    </div>    
                );
            })}
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);