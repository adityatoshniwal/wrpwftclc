const initialState = {
    tabsstore: {
        "search-tab": {
            content_id: "search-content",
            title: "Search",
            type: "search",
            closeable: false,
        },
        "settings-tab": {
            content_id: "settings-content",
            title: "Settings",
            type: "settings",
            closeable: false,
        },
    },
    active_id: "search-tab",
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_ITEM':
            let newTab = {
                content_id: '',
                title: 'Untitled',
                type: 'item',
                closeable: true,
            };

            let currDate = new Date(),
                newId = currDate.getDate()
                    +""+currDate.getHours()
                    +""+currDate.getMinutes()
                    +""+currDate.getSeconds()
                    +""+currDate.getMilliseconds();
            
            let newTabId = `i-${newId}-tab`;
            newTab.content_id = `i-${newId}-content`;
            
            return {
                ...state,
                tabsstore: {...state.tabsstore, [newTabId]:newTab},
                active_id: newTabId,
            }
            break;
        
        case 'CLOSE_TAB':
            let newTabs = state.tabsstore;
            let closeIndex = 0;
            let activeId = null;

            closeIndex = Object.keys(state.tabsstore).indexOf(action.payload);
            delete newTabs[action.payload]
            if(closeIndex > newTabs.length) {
                closeIndex = newTabs.length;
            }
            activeId = Object.keys(state.tabsstore)[closeIndex];

            return {
                ...state,
                tabsstore: newTabs,
                active_id: activeId,
            };
            break;
        case 'SET_ACTIVE_ID':
            return {
                ...state,
                active_id: action.payload,
            }
        default:
            return state;       
    }
}


export const tabActions = {
    openNewTab: (type)=>{
        if(type == 'item'){
            return {type: 'NEW_ITEM'}
        }
    },
    closeTabId: (tabid) => {
        return {type: 'CLOSE_TAB', payload: tabid}
    },
    setActiveId: (tabid) => {
        return {type: 'SET_ACTIVE_ID', payload: tabid}
    }
};