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

export function tabReducer(state = initialState, action) {
    let newTabs = null;
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
            newTabs = {...state.tabsstore};

            let closeIndex = Object.keys(newTabs).indexOf(action.payload),
                activeTabId = null;
            delete newTabs[action.payload];

            let newKeys = Object.keys(newTabs);
            if(closeIndex > newKeys.length-1) {
                closeIndex = newKeys.length-1;
            }
            activeTabId = newKeys[closeIndex];

            return {
                ...state,
                tabsstore: newTabs,
                active_id: activeTabId,
            };
            break;
        case 'SET_ACTIVE_ID':
            return {
                ...state,
                active_id: action.payload,
            };
            break;
        case 'SET_TAB_TITLE':
            newTabs = {...state.tabsstore};
            newTabs[state.active_id].title = action.payload;
            return {
                ...state,
                tabsstore: newTabs,
            };
            break;
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
        return {type: 'CLOSE_TAB', payload: tabid};
    },
    setActiveId: (tabid) => {
        return {type: 'SET_ACTIVE_ID', payload: tabid};
    },
    setTabTitle: (title) => {
        return {type: 'SET_TAB_TITLE', payload: title};
    }
};