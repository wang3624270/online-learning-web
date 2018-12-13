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

    getTermList(data = {}) {
        let url = `http://${host}/course/getTermList`;
        return get(url, data);
    },
    addOrEditTerm(data = {}) {
        let url = `http://${host}/course/addOrEditTerm`;
        return post(url, data);
    },
    deleteTerm(data = {}) {
        let url = `http://${host}/course/deleteTerm`;
        return post(url, data);
    },
    getResourceList(data = {}) {
        let url = `http://${host}/course/getResourceList`;
        return post(url, data);
    },
    downloadResource(data = {}) {
        let url = `http://${resourceHost}/accDownload?accId=`+data.accId;
        window.location.href=url;
    },
    resourceUploadUrl(){
        let url = `http://${host}/course/uploadResource`;
        return url;
    },
    deleteSource(data = {}) {
        let url = `http://${host}/course/deleteSource`;
        return post(url, data);
    },
    getCourseList(data = {}) {
        let url = `http://${host}/course/getCourseList`;
        return post(url, data);
    },
    getAllCollegeOption(data = {}) {
        let url = `http://${host}/course/getAllCollegeOption`;
        return get(url, data);
    },
    uploadCoverImg(){
        let url = `http://${host}/course/uploadCoverImg`;
        return url;
    },
    addOrEditCourseInfo(data = {}) {
        let url = `http://${host}/course/addOrEditCourseInfo`;
        return post(url, data);
    },
    getCourseInfo(data = {}) {
        let url = `http://${host}/course/getCourseInfo`;
        return post(url, data);
    },
    coverImgUrl(id){
        let url = `http://${resourceHost}/fileDownload?attachId=`+id;
        return url;
    },
    deleteCourse(data = {}) {
        let url = `http://${host}/course/deleteCourse`;
        return post(url, data);
    },
    getTeachTaskList(data = {}) {
        let url = `http://${host}/course/getTeachTaskList`;
        return post(url, data);
    },
    getAllCourseOption(data = {}) {
        let url = `http://${host}/course/getAllCourseOption`;
        return get(url, data);
    },
    addOrEditTeachTask(data = {}) {
        let url = `http://${host}/course/addOrEditTeachTask`;
        return post(url, data);
    },
    getCourseSectionList(data = {}) {
        let url = `http://${host}/course/getCourseSectionList`;
        return post(url, data);
    },
    addOrEditSection(data = {}) {
        let url = `http://${host}/course/addOrEditSection`;
        return post(url, data);
    },
    adjustSectionOrder(data = {}) {
        let url = `http://${host}/course/adjustSectionOrder`;
        return post(url, data);
    },
    matchSectionAndResource(data = {}) {
        let url = `http://${host}/course/matchSectionAndResource`;
        return post(url, data);
    },
    cancelMatchSectionAndResource(data = {}) {
        let url = `http://${host}/course/cancelMatchSectionAndResource`;
        return post(url, data);
    },
    getPersonalCoursesList(data = {}) {
        let url = `http://${host}/course/getPersonalCoursesList`;
        return post(url, data);
    },
    getCourseCommentList(data = {}) {
        let url = `http://${host}/course/getCourseCommentList`;
        return post(url, data);
    },
    addCourseComment(data = {}) {
        let url = `http://${host}/course/addCourseComment`;
        return post(url, data);
    },
    entryTeachTask(data = {}) {
        let url = `http://${host}/course/entryTeachTask`;
        return post(url, data);
    },
    getCourseResourceList(data = {}) {
        let url = `http://${host}/course/getCourseResourceList`;
        return post(url, data);
    },
    addOrEditCourseResource(data = {}) {
        let url = `http://${host}/course/addOrEditCourseResource`;
        return post(url, data);
    },
    matchFolderAndResource(data = {}) {
        let url = `http://${host}/course/matchFolderAndResource`;
        return post(url, data);
    },
    cancelMatchFolderAndResource(data = {}) {
        let url = `http://${host}/course/cancelMatchFolderAndResource`;
        return post(url, data);
    },
    getCoursePersonList(data = {}) {
        let url = `http://${host}/course/getCoursePersonList`;
        return post(url, data);
    },
    getNotMapPersonList(data = {}) {
        let url = `http://${host}/course/getNotMapPersonList`;
        return post(url, data);
    },
    addToTask(data = {}) {
        let url = `http://${host}/course/addToTask`;
        return post(url, data);
    },
    deletePeopleFromPlan(data = {}) {
        let url = `http://${host}/course/deletePeopleFromPlan`;
        return post(url, data);
    },
    getAllTaskNewsInfo(data = {}) {
        let url = `http://${host}/course/getAllTaskNewsInfo`;
        return post(url, data);
    },
    deleteTaskNews(data = {}) {
        let url = `http://${host}/course/deleteTaskNews`;
        return post(url, data);
    },
    addOrEditTaskNews(data = {}) {
        let url = `http://${host}/course/addOrEditTaskNews`;
        return post(url, data);
    },
    deleteComment(data = {}) {
        let url = `http://${host}/course/deleteComment`;
        return post(url, data);
    },
    getCourseInterlocutionList(data = {}) {
        let url = `http://${host}/course/getCourseInterlocutionList`;
        return post(url, data);
    },
    submitInterlocutionReplay(data = {}) {
        let url = `http://${host}/course/submitInterlocutionReplay`;
        return post(url, data);
    },
    deleteInterlocution(data = {}) {
        let url = `http://${host}/course/deleteInterlocution`;
        return post(url, data);
    },
    getSectionResourceInfo(data = {}) {
        let url = `http://${host}/course/getSectionResourceInfo`;
        return post(url, data);
    },
    videoPlayUrl(accId) {
        let url = `http://${resourceHost}/videoPlay?accId=`+accId;
        return url;
    },
    submitInterlocutionQuestion(data = {}) {
        let url = `http://${host}/course/submitInterlocutionQuestion`;
        return post(url, data);
    }



};
