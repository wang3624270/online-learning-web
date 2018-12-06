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

    getLectureList(data = {}) {
        let url = `http://${host}/lecture/getLectureList`;
        return post(url, data);
    },
    coverImgUrl(id){
        let url = `http://${resourceHost}/fileDownload?attachId=`+id;
        return url;
    },
    uploadCoverImg(){
        let url = `http://${host}/lecture/uploadCoverImg`;
        return url;
    },
    getLectureInfo(data = {}) {
        let url = `http://${host}/lecture/getLectureInfo`;
        return post(url, data);
    },
    addOrEditLectureInfo(data = {}) {
        let url = `http://${host}/lecture/addOrEditLectureInfo`;
        return post(url, data);
    },
    deleteLecture(data = {}) {
        let url = `http://${host}/lecture/deleteLecture`;
        return post(url, data);
    },
    entryLecture(data = {}) {
        let url = `http://${host}/lecture/entryLecture`;
        return post(url, data);
    },
    cancelEntry(data = {}) {
        let url = `http://${host}/lecture/cancelEntry`;
        return post(url, data);
    },
    getEntryList(data = {}) {
        let url = `http://${host}/lecture/getEntryList`;
        return post(url, data);
    },
    applyCheck(data = {}) {
        let url = `http://${host}/lecture/applyCheck`;
        return post(url, data);
    },
    subAttendance(data = {}) {
        let url = `http://${host}/lecture/subAttendance`;
        return post(url, data);
    },
    hasAttendance(data = {}) {
        let url = `http://${host}/lecture/hasAttendance`;
        return post(url, data);
    },

};
