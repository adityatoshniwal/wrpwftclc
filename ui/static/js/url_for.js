export function url_for(subUrl) {
    let base_url = window.location.protocol + '//' + window.location.host +'/api';
    return base_url + "/" + subUrl
}