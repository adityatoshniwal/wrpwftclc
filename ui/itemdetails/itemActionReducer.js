/* Store the array of items */
export const ITEM_INITIAL_STATE = {
    
};

export default function itemReducer(state = ITEM_INITIAL_STATE, action) {
    switch(action.type) {
        case 'LOAD_ITEM_START':
            return {
                ...state,
                [action.payload.tabid]: {
                    isFetching: true,
                    fetchFailed: false,
                    fetchError: '',                            
                    data: {}
                }
            };
        
        case 'LOAD_ITEM_DONE':
            if(action.payload.status) {
                return {
                    ...state,
                    [action.payload.tabid]: {
                        ...state[action.payload.tabid],
                        isFetching: false,
                        fetchFailed: action.payload.status,
                        fetchError: action.payload.error,
                        data: {
                            ...action.payload.data,
                        }
                    }
                };
            } else {
                return {
                    ...state,
                    [action.payload.tabid]: {
                        ...state[action.payload.tabid],
                        isFetching: false,
                        fetchFailed: action.payload.status,
                        fetchError: action.payload.error,
                    }
                };                
            }
    }
    return state;
}

export const itemActions = {
    loadItem: (item_id, tabid) => {
        return (dispatch) => {
            dispatch({type:'LOAD_ITEM_START', payload: {tabid}});
            // $.ajax(
            //     url_for('items'),
            //     {
            //         method : "GET",
            //         dataType : "json",
            //         contentType : "application/json; charset=utf-8",
            //     }
            // ).done((resp) => {
            //     dispatch({type:'LOAD_ITEM_DONE', payload: {status:true, data:resp.data }});
            // }).fail((resp) => {
            //     let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
            //     dispatch({type:'LOAD_ITEM_DONE', payload: {status:false, error:error}});
            // });
            setTimeout((dispatch)=>{
                dispatch({type:'LOAD_ITEM_DONE', payload: {status:true, data:emptyItem }});
            }, 3000);
        };
    }
}