import Request from '../kit/Request';
import UrlConfig from '../kit/urlConfig';

const host = UrlConfig.onlinelearningApiHost;

function post(url, data) {
    //json序列化时去掉空值属性
    let jsonStr = JSON.stringify(data, function(k, v){
        if(v === 0) {
            return v;
        }
        if(!v) {
            return undefined;
        }
        if(Array.isArray(v) && v.length == 0){
            return undefined;
        }
        return v;
    });

    return Request({
        data: jsonStr,
        method: 'post',
        contentType: 'application/json',
        url
    });
}

function get(url, data) {
    return Request({
        data,
        method: 'get',
        url
    });
}

function formPost(url, data) {
    return Request({
        data: data,
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        url
    });
}

export default {
    SUCCESS_CODE: '0',


    doLogin(data = {}) {
        let url = `http://${host}/auth/webLogin`;
        return post(url, data);
    },

    getVideoSummaryPeriod(data = {}) {
        let url = `http://${host}/qube/api/1.0/video/summary/period`
        return get(url, data);
    },

    getUserDetail(data = {}) {
        let url = `http://${host}/qube/api/1.0/user/detail/id`;
        return post(url, data);
    },

};
