import { extPdf, extVideo, extImageDefault, } from '@/kit/extConfig';
// 获得文件扩展名
export function getExtName (fileName) {
    let ext = '';
    if (fileName) {
        let ary = fileName.split('.');
        if (ary && ary.length) {
            ext = ary[ ary.length - 1 ];
        }
    }
    return ext.toLowerCase();
}
export function getFileType (fileName) {
    let ext = getExtName(fileName);
    let res = {};
    res.isPdf = !!~extPdf.indexOf(ext);
    res.isVideo = !!~extVideo.indexOf(ext);
    res.isImage = !!~extImageDefault.indexOf(ext);
    return res;
}
export function sleep (ms) {
    let now = new Date().getTime();
    console.log('Start sleeping for', ms, 'ms.');
    while (new Date().getTime() < now + ms) {
        // sleep
    }
    console.log('Stop sleeping.');
}
// 从obj里面拿path的值，如从obj {test: {test1: 2}}里拿path ['test', test1']，并保证碰到未定义的key不出现fatal
export function getObjValue (obj, path) {
    if (!obj || typeof obj !== 'object' || !path || !path.length) {
        return null;
    }
    let result = obj;
    for (let i = 0; i < path.length; i++) {
        if (result[ path[ i ] ] !== undefined && result[ path[ i ] ] !== null) {
            result = result[ path[ i ] ];
        } else {
            return null;
        }
    }
    return result;
}
export const DATETIME_SHORTCUTS = {
    shortcuts: [{
        text: '今天',
        onClick (picker) {
            picker.$emit('pick', new Date());
        },
    }, {
        text: '昨天',
        onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
        },
    }, {
        text: '一周前',
        onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
        },
    }, ],
};
export const DATETIMERANG_SHORTCUTS = {
    shortcuts: [{
        text: '今天',
        onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end, ]);
        },
    }, {
        text: '昨天',
        onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end, ]);
        },
    }, {
        text: '7天',
        onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end, ]);
        },
    }, {
        text: '最近一个月',
        onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end, ]);
        },
    }, ],
};
export const APIRESCODE = {
    SUCCESS: 'A00000',
    SUCCESS_WITH_EXTRA: 'A00004'
}
export const groupBy = function (arr, key) {
    return arr.reduce((acc, cur) => {
        (acc[cur[key]] = acc[cur[key]] || []).push(cur);
        return acc;
    }, {});
}
