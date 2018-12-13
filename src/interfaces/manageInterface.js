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
    SUCCESS: '1',

    getPersonInfo(data = {}) {
        let url = `http://${host}/manage/getPersonInfo`;
        return get(url, data);
    },
    getMenuList(data = {}) {
        let url = `http://${host}/manage/getMenuList`;
        return post(url, data);
    },
    deleteMenu(data = {}) {
        let url = `http://${host}/manage/deleteMenu`;
        return post(url, data);
    },
    addOrEditMenu(data = {}) {
        let url = `http://${host}/manage/addOrEditMenu`;
        return post(url, data);
    },
    getGroupList(data = {}) {
        let url = `http://${host}/manage/getGroupList`;
        return get(url, data);
    },
    deleteGroup(data = {}) {
        let url = `http://${host}/manage/deleteGroup`;
        return post(url, data);
    },
    addOrEditGroup(data = {}) {
        let url = `http://${host}/manage/addOrEditGroup`;
        return post(url, data);
    },
    getResListByGroupid(data = {}) {
        let url = `http://${host}/manage/getResListByGroupid`;
        return post(url, data);
    },
    setGroupFunres(data = {}) {
        let url = `http://${host}/manage/setGroupFunres`;
        return post(url, data);
    },
    getPersonList(data = {}) {
        let url = `http://${host}/manage/getPersonList`;
        return post(url, data);
    },
    setUserGroup(data = {}) {
        let url = `http://${host}/manage/setUserGroup`;
        return post(url, data);
    },
    addOrEditUser(data = {}) {
        let url = `http://${host}/manage/addOrEditUser`;
        return post(url, data);
    }

};
