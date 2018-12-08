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
    },
    getPracticeList(data = {}) {
        let url = `http://${host}/exam/getPracticeList`;
        return post(url, data);
    },
    addOrEditPracticeInfo(data = {}) {
        let url = `http://${host}/exam/addOrEditPracticeInfo`;
        return post(url, data);
    },
    getPracticeQustionList(data = {}) {
        let url = `http://${host}/exam/getPracticeQustionList`;
        return post(url, data);
    },
    deletePracticeQuestionR(data = {}) {
        let url = `http://${host}/exam/deletePracticeQuestionR`;
        return post(url, data);
    },
    getHouseQustionListOfPractice(data = {}) {
        let url = `http://${host}/exam/getHouseQustionListOfPractice`;
        return post(url, data);
    },
    addQuestionFormHouseOfPractice(data = {}) {
        let url = `http://${host}/exam/addQuestionFormHouseOfPractice`;
        return post(url, data);
    },
    adjustPracticeQuestion(data = {}) {
        let url = `http://${host}/exam/adjustPracticeQuestion`;
        return post(url, data);
    },
    getUnfinishedExamList(data = {}) {
        let url = `http://${host}/exam/getUnfinishedExamList`;
        return get(url, data);
    },
    getOnlineExamQustionList(data = {}) {
        let url = `http://${host}/exam/getOnlineExamQustionList`;
        return post(url, data);
    },
    submitExamAnswers(data = {}) {
        let url = `http://${host}/exam/submitExamAnswers`;
        return post(url, data);
    },
    getFinishNumber(data = {}) {
        let url = `http://${host}/exam/getFinishNumber`;
        return post(url, data);
    },
    getFinishedExamList(data = {}) {
        let url = `http://${host}/exam/getFinishedExamList`;
        return get(url, data);
    },
    calculateScore(data = {}) {
        let url = `http://${host}/exam/calculateScore`;
        return post(url, data);
    },


};
