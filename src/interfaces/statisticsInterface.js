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

    getPersonScoreList(data = {}) {
        let url = `http://${host}/statistics/getPersonScoreList`;
        return post(url, data);
    },
    getPersonHomeworkScore(data = {}) {
        let url = `http://${host}/statistics/getPersonHomeworkScore`;
        return post(url, data);
    },
    setPersonScoreLevel(data = {}) {
        let url = `http://${host}/statistics/setPersonScoreLevel`;
        return post(url, data);
    },
    getAchievementInfo(data = {}) {
        let url = `http://${host}/statistics/getAchievementInfo`;
        return get(url, data);
    },
    getLearningInfo(data = {}) {
        let url = `http://${host}/statistics/getLearningInfo`;
        return get(url, data);
    },
    getCourseSubjectInfo(data = {}) {
        let url = `http://${host}/statistics/getCourseSubjectInfo`;
        return get(url, data);
    }

};
