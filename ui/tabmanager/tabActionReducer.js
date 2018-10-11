const initialState = {
    tabsstore: [{
            tab_id: "search-tab",
            content_id: "search-content",
            title: "Search",
            type: "search",
            closeable: false,
            refresh: 0,
        }, {
            tab_id: "settings-tab",
            content_id: "settings-content",
            title: "Settings",
            type: "settings",
            closeable: false,
            refresh: true,
        },
    ],
    active_id: "settings-tab",
}

export function tabReducer(state = initialState, action) {
    let newTabs = null;
    switch(action.type) {
        case 'NEW_ITEM_TAB':
            let newTab = {
                tab_id:'',
                content_id: '',
                title: 'New Item',
                type: 'item',
                closeable: true,
                item_id: action.payload,
            };

            /* If tab already open, then just make it active */
            if(action.payload > 0) {
                let openedTabIndex = _.findIndex(state.tabsstore, {type:'item', item_id: action.payload});
                if(openedTabIndex > -1) {
                    return {
                        ...state,
                        active_id: state.tabsstore[openedTabIndex].tab_id,
                    };                    
                }
            }
            
            let currDate = new Date(),
                newId = currDate.getDate()
                    +""+currDate.getHours()
                    +""+currDate.getMinutes()
                    +""+currDate.getSeconds()
                    +""+currDate.getMilliseconds();
            
            newTab.tab_id = `i-${newId}-tab`;
            newTab.content_id = `i-${newId}-content`;
            
            return {
                ...state,
                tabsstore: [...state.tabsstore, newTab],
                active_id: newTab.tab_id,
            }
            break;
        
        case 'CLOSE_TAB':
            let closeIndex = 0,
                activeTabId = '';

            closeIndex = _.findIndex(state.tabsstore, {tab_id: action.payload});
            activeTabId = state.tabsstore[closeIndex-1].tab_id;

            return {
                ...state,
                tabsstore : [
                    ...state.tabsstore.slice(0, closeIndex),
                    ...state.tabsstore.slice(closeIndex+1),
                ],
                active_id: (state.active_id===action.payload)?activeTabId:state.active_id,
            };
            break;
        case 'SET_ACTIVE_ID':
            return {
                ...state,
                active_id: action.payload,
            };
            break;
        case 'SET_TAB_TITLE':
            let activeIndex = _.findIndex(state.tabsstore, {tab_id: state.active_id});
            // newTab = state.tabsstore[activeIndex];
            // newTab.title = action.payload;
            return {
                ...state,
                tabsstore: [
                    ...state.tabsstore.slice(0, activeIndex),
                    {
                        ...state.tabsstore[activeIndex],
                        title: action.payload,
                    },
                    ...state.tabsstore.slice(activeIndex+1),
                ],
            };
            break;

        case 'REFRESH_TAB':
            let refreshIndex = _.findIndex(state.tabsstore, {tab_id: action.payload});
            return {
                ...state,
                tabsstore: [
                    ...state.tabsstore.slice(0, refreshIndex),
                    {
                        ...state.tabsstore[refreshIndex],
                        refresh: !state.tabsstore[refreshIndex].refresh,
                    },
                    ...state.tabsstore.slice(refreshIndex+1),
                ],
            }
        default:
            return state;       
    }
}


export const tabActions = {
    openItemTab: (item_id)=>{
        return {type: 'NEW_ITEM_TAB', payload: item_id};
    },
    closeTabId: (tabid) => {
        return {type: 'CLOSE_TAB', payload: tabid};
    },
    setActiveId: (tabid) => {
        return {type: 'SET_ACTIVE_ID', payload: tabid};
    },
    setTabTitle: (title) => {
        return {type: 'SET_TAB_TITLE', payload: title};
    },
    refreshTab: (tabid) => {
        return {type: 'REFRESH_TAB', payload: tabid};
    }
};