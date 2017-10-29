export function createGetUrl(path, currentUrl, param) {
    let array = param.split(' ');
    let newUrl;
    if (path === 'search') {
        newUrl = 'q'+ '=' + array[0];
        for (let i = 1; i < array.length; i++) {
            newUrl += '+' + array[i];
        }
    }
    return newUrl;
}

export function getQueryString(params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
}

export function buildUrl(url, parameters){
    var qs = "";
    for(var key in parameters) {
        var value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0){
        qs = qs.substring(0, qs.length-1); //chop off last "&"
        url = url + "?" + qs;
    }
    return url;
}

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}