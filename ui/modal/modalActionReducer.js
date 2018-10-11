const initialState = {
    isOpen : false,
    okText: 'OK',
    cancelText: 'Cancel',
    content: 'Empty Is Empty Test',
}

export const modalReducer = function(state=initialState, action) {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                ...action.payload,
                isOpen: true,
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                isOpen: false,
            };            
        default:
            return state;
    }
}

export const modalActions = {
    openModal(options) {
        return {'type':'OPEN_MODAL', payload:options};
    },

    closeModal(action) {
        return {'type':'CLOSE_MODAL'};
    }    
}