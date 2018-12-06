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

    getQustionList(data = {}) {
        let url = `http://${host}/exam/getQustionList`;
        return post(url, data);
    },
    addOrEditQuestion(data = {}) {
        let url = `http://${host}/exam/addOrEditQuestion`;
        return post(url, data);
    },
    getExamList(data = {}) {
        let url = `http://${host}/exam/getExamList`;
        return post(url, data);
    },
    addOrEditExamInfo(data = {}) {
        let url = `http://${host}/exam/addOrEditExamInfo`;
        return post(url, data);
    },
    getExamQustionList(data = {}) {
        let url = `http://${host}/exam/getExamQustionList`;
        return post(url, data);
    },
    editExamQuestionScore(data = {}) {
        let url = `http://${host}/exam/editExamQuestionScore`;
        return post(url, data);
    },
    adjustExamQuestion(data = {}) {
        let url = `http://${host}/exam/adjustExamQuestion`;
        return post(url, data);
    },
    deleteExamQuestionR(data = {}) {
        let url = `http://${host}/exam/deleteExamQuestionR`;
        return post(url, data);
    },
    getHouseQustionList(data = {}) {
        let url = `http://${host}/exam/getHouseQustionList`;
        return post(url, data);
    },
    addQuestionFormHouse(data = {}) {
        let url = `http://${host}/exam/addQuestionFormHouse`;
        return post(url, data);
    }


};
