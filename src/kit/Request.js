import $ from 'jquery';
/**
 * jquery ajax
 */
function doAjax (sendData) {
    let sendObj = {};
    let url = sendData.url || '';
    let data = sendData.data || null;
    // let type = (sendData.method || 'get').toLowerCase();
    // let dataType = sendData.dataType || 'json';
    let credentials = !!(sendData.credentials && sendData.credentials.toLowerCase() === 'include');
    if (url) {
        sendObj[ 'url' ] = url;
    }
    if (data) {
        sendObj[ 'data' ] = data;
    }
    sendObj[ 'type' ] = sendData.method;
    sendObj[ 'dataType' ] = sendData.dataType;
    sendObj['contentType'] = sendData.contentType;
    sendObj[ 'xhrFields' ] = { withCredentials: credentials, };
    return $.ajax(sendObj).then((data) => {
        if (data.code === 'A00001') {
            var curUrl = location.href;
            var loginUrl = userLoginInterface.loginUrl + '%3FredirectUrl%3D' + curUrl;
            location.href = loginUrl;
        }
        return data;
    }).catch((err) => {
        console.log('Jquery Ajax Error!', err, sendObj);
        return {
            code: 'E00000',
            data: err,
            msg: 'Request Error!',
        };
    });
}
/**
 * params参数说明：
 * url:         string          请求地址
 * data:        object          请求数据
 * method:      string          请求方式(get,post,delete,put...)
 * credentials: string          是否带cookie访问(默认'include',带cookie)
 * dataType:    string          返回数据类型
 */
export default function Request (params) {
    params = params || {};
    let url = params.url || '';
    let method = (params.method || 'get').toLowerCase();
    let data = params.data || {};
    let credentials = params.credentials || 'include'; // 为'inlcude'时带cookie
    let dataType = (params.dataType || 'json').toLowerCase();
    let contentType = params.contentType || 'application/x-www-form-urlencoded;charset=UTF-8';
    return doAjax({ url, method, data, credentials, dataType, contentType, });
}
