import Request from '../kit/Request';
import UrlConfig from '../kit/urlConfig';

const host = UrlConfig.onlinelearningApiHost;
const resourceHost = UrlConfig.onlinelearningResourceHost;

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
    SUCCESS: '1',

    getHomeworkList(data = {}) {
        let url = `http://${host}/homework/getHomeworkList`;
        return post(url, data);
    },
    addOrEditHomework(data = {}) {
        let url = `http://${host}/homework/addOrEditHomework`;
        return post(url, data);
    },
    getHomeworkSelectList(data = {}) {
        let url = `http://${host}/homework/getHomeworkSelectList`;
        return post(url, data);
    },
    submitHomeworkScore(data = {}) {
        let url = `http://${host}/homework/submitHomeworkScore`;
        return post(url, data);
    },
    getPersonHomeworkList(data = {}) {
        let url = `http://${host}/homework/getPersonHomeworkList`;
        return get(url, data);
    },
    addOrEditHomeworkAnswer(data = {}) {
        let url = `http://${host}/homework/addOrEditHomeworkAnswer`;
        return post(url, data);
    },
    getActivityList(data = {}) {
        let url = `http://${host}/homework/getActivityList`;
        return post(url, data);
    },
    addOrEditActivity(data = {}) {
        let url = `http://${host}/homework/addOrEditActivity`;
        return post(url, data);
    },
    getActivitySelectList(data = {}) {
        let url = `http://${host}/homework/getActivitySelectList`;
        return post(url, data);
    },
    submitScore(data = {}) {
        let url = `http://${host}/homework/submitScore`;
        return post(url, data);
    },
    getPersonActivityList(data = {}) {
        let url = `http://${host}/homework/getPersonActivityList`;
        return get(url, data);
    }




};
