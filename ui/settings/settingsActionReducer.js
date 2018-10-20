import { url_for } from 'sources/utils/url_for';
const initialState = {
    isCmdRunning: false,
    cmdMessage: '',
    cmdFailed: false,
    cmdError: '',
    cmdSuccess: '',
}

export function settingsReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOAD_SETTINGS_START':
            return {
                ...state,
                isCmdRunning: true,
                cmdFailed: false,    
            };
            break;
        case 'LOAD_SETTINGS_DONE':
            if(action.payload.status) {
                return {
                    ...state,
                    isCmdRunning: false,
                    cmdFailed: false,
                    ...action.payload.data
                };    
            } else {
                return {
                    ...state,
                    isCmdRunning: false,
                    cmdFailed: true,
                    cmdError: action.payload.error,
                };
            }
            break;
        default:
            return state;       
    }
}

export const settingsActions = {
    loadSettings: function() {
        return (dispatch) => {
            dispatch({type:'LOAD_SETTINGS_START'});
            $.ajax(
                url_for('settings'),
                {
                    method : "GET",
                    dataType : "json",
                    contentType : "application/json; charset=utf-8",
                }
            ).done((resp) => {
                dispatch({type:'LOAD_SETTINGS_DONE', payload: {status: true, data: resp.data}});
            }).fail((resp) => {
                let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
                dispatch({type:'LOAD_SETTINGS_DONE', payload: {status: false, error: error}});
            });        
        }
    }
};