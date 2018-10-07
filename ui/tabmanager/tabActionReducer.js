const initialState = {
    tabsstore: [{
            tab_id: "search-tab",
            content_id: "search-content",
            title: "Search",
            type: "search",
            closeable: false,
        }, {
            tab_id: "settings-tab",
            content_id: "settings-content",
            title: "Settings",
            type: "settings",
            closeable: false,
        },
    ],
    active_id: "search-tab",
}

export function tabReducer(state = initialState, action) {
    let newTabs = null;
    switch(action.type) {
        case 'NEW_TAB':
            let newTab = {
                tab_id:'',
                content_id: '',
                title: 'New Item',
                type: 'item',
                closeable: true,
                data: action.payload.data,
            };

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
        default:
            return state;       
    }
}


export const tabActions = {
    openNewTab: (type, data={})=>{
        return {type: 'NEW_TAB', payload: {type, data}};
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