import { url_for } from 'sources/utils/url_for';

const initialState = {
    searchText : '',
    isFetching: false,
    itemsFetchFailed: false,
    itemsFetchError: '',
    itemsList: [],
    itemsCount: 0,
}

export function searchReducer(state = initialState, action) {
    switch(action.type) {
        case 'SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload,
            }
            break;
        case 'ADD_ITEM': 
            return {
                ...state,
                itemsCount: state.itemsCount+1,
            }
            break;
        case 'FETCH_ITEMS_DONE':
            if(action.payload.status) {
                return {
                    ...state,
                    isFetching: false,
                    itemsFetchFailed: false,
                    itemsList: action.payload.data,
                }
            } else {
                return {
                    ...state,
                    isFetching: false,
                    itemsFetchFailed: true,
                    itemsFetchError: action.payload.error,
                }                
            }
            break;
        case 'FETCH_ITEMS_START':
            return {
                ...state,
                isFetching: true,
                itemsFetchFailed: false,
            }
            break;
        default:
            return state;
    }
}

export const searchActions = {
    addItem: () => {
        return {type:'ADD_ITEM'};
    },
    setSearchText:(text) => {
        return {type:'SEARCH_TEXT', payload: text};
    },
    fetchItems: () => {
        return (dispatch) => {
            dispatch({type:'FETCH_ITEMS_START'});
            $.ajax(
                url_for('items'),
                {
                    method : "GET",
                    dataType : "json",
                    contentType : "application/json; charset=utf-8",
                }
            ).done((resp) => {
                dispatch({type:'FETCH_ITEMS_DONE', payload: {status:true, data:resp.data }});
            }).fail((resp) => {
                let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
                dispatch({type:'FETCH_ITEMS_DONE', payload: {status:false, error:error}});
            });
        };
    }
};