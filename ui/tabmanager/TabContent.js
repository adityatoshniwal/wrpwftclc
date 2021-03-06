import React from 'react';
import Search from 'sources/search/Search';
import Settings from 'sources/settings/Settings';
import ItemDetails from 'sources/itemdetails/ItemDetails';
import {tabActions} from './tabActionReducer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


function TabContent(props) {

    let returnModule = function(tab) {
        switch(tab.type) {
            case 'search': return (
                <Search refresh={tab.refresh}/>
            )
            break;
            case 'settings': return (
                <Settings />
            )
            break;
            case 'item': return (
                <ItemDetails item_id={tab.item_id}/>
            )
            break;                
        }
    };

    return(
        <div className="tab-content py-1" id="container-tab-div">
            {props.tabsstore.map((tab) => {
                return (
                    <div key={tab.tab_id} className={"tab-pane vertical-scrollbar " + (tab.tab_id === props.active_id ? "show active":"")} 
                        id={tab.content_id} role="tabpanel" aria-labelledby={tab.tab_id}>
                        {returnModule(tab)}
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