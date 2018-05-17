export const AppAlertTypes = {
    MODAL: 'modal',
    NOTIFY: 'notify'
}

export function AppAlert(type, message) {
    console.log('Alert Type - '+type);
    if(type === AppAlertTypes.MODAL){

    }
    else if(type === AppAlertTypes.NOTIFY){
        
    }
}