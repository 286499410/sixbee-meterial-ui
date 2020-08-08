import React from 'react';
import _ from 'lodash';
import Icon from "../UI/Icon";

const joinBlankSpace = (...arg) => {
    let classNames = [];
    _.isArray(arg) && arg.map(str => {
        str && classNames.push(str);
    });
    return classNames.join(' ');
};

const renderLeftIcon = (props) => {
    return _.isString(props.leftIcon) ? <Icon className="left-icon" name={props.leftIcon}/> : props.leftIcon
};

const renderRightIcon = (props) => {
    return _.isString(props.rightIcon) ? <Icon className="right-icon" name={props.rightIcon}/> : props.rightIcon
};

const replaceText = (data, replaceText) => {
    let text = _.get(data, replaceText);
    if (text !== undefined) {
        return text;
    }
    let reg = /\[((\w|\w.\w||\w.\w.\w)*)\]/g;
    let textFields = replaceText.match(reg);
    if (_.isArray(textFields)) {
        let ret = undefined;
        textFields.map((field) => {
            let key = field.substr(1, field.length - 2);
            let value = _.get(data, key, '');
            ret = replaceText.replace(`[${key}]`, value);
            replaceText = ret;
        });
        return ret;
    } else {
        return undefined;
    }
};

const getDataFromDataSourceByValue = (value, dataSource, dataSourceConfig) => {
    for (let i = 0; i < dataSource.length; i++) {
        let data = dataSource[i];
        if (data[dataSourceConfig.value] === value) {
            return data;
        }
        if (data.children && data.children.length > 0) {
            let tempData = getDataFromDataSourceByValue(value, data.children, dataSourceConfig);
            if (tempData) return tempData;
        }
    }
};

const getFilterDataSource = (filterText, dataSource, dataSourceConfig, filter) => {
    if(filter === undefined) {
        filter = (data, filterText) => {
            let text = replaceText(data, dataSourceConfig.text);
            return filterText === '' ? true : text.toString().indexOf(filterText) >= 0;
        }
    }
    let filterDataSource = [];
    dataSource.map(data => {
        let children = getFilterDataSource(filterText, data.children || [], dataSourceConfig);
        if(children && children.length > 0) {
            filterDataSource.push({...data, children: children});
        } else if(filter(data, filterText)) {
            filterDataSource.push({...data, children: []});
        }
    });
    return filterDataSource;
};

const isEmpty = (value) => {
    return value === undefined || value === null || value === '';
};

const isEmail = (value) => {
    let reg = /^[A-Za-z0-9._-\u4e00-\u9fff]+@[a-zA-Z0-9_-\u4e00-\u9fff]+(\.[a-zA-Z0-9_-\u4e00-\u9fff]+)+$/;
    return reg.test(value);
};

const isMobile = (value) => {
    let reg = /^\d{11}$/;
    return reg.test(value);
};

const isUrl = (value) => {
    let reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return reg.test(value);
};

const isIp = (value) => {
    let reg = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
    return reg.test(value);
};

const isInteger = (value) => {
    let reg = /^\d+$/;
    return reg.test(value);
};

const isNumber = (value) => {
    let reg = /^\d+(\.\d+)?$/;
    return reg.test(value);
};

const cmpDateTime = (datetime1, datetime2) => {
    let diff = new Date(Date.parse(datetime1)).getTime() - new Date(Date.parse(datetime2)).getTime();
    if (diff > 0) {
        return 1;
    } else if (diff == 0) {
        return 0;
    } else {
        return -1;
    }
};


const forEach = (data, callback) => {
    data.map(row => {
        callback(row);
        if(data.children && _.isArray(data.children)) {
            forEach(data.children, callback);
        }
    });
};

/**
 * 时间戳转日期时间
 * @param format
 * @param timestamp
 * @returns {*}
 */
const date = (format = 'Y-m-d H:i:s', timestamp) => {
    let myDate = new Date();
    myDate.setTime(timestamp * 1000);
    let year = myDate.getFullYear().toString();
    let month = (myDate.getMonth() + 1).toString();
    let date = myDate.getDate().toString();
    let hour = myDate.getHours().toString();
    let minute = myDate.getMinutes().toString();
    let second = myDate.getSeconds().toString();
    let datetime = format;
    datetime = datetime.replace('Y', year);
    datetime = datetime.replace('m', month.padStart(2, '0'));
    datetime = datetime.replace('d', date.padStart(2, '0'));
    datetime = datetime.replace('H', hour.padStart(2, '0'));
    datetime = datetime.replace('i', minute.padStart(2, '0'));
    datetime = datetime.replace('s', second.padStart(2, '0'));
    return datetime;
};

const strToTime =
    (str) => {
        return parseInt(strToDate(str).getTime() / 1000);
    };

/**
 * 转成常见日期格式
 * @param date
 */
const dateToStr =
    (date) => {
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        date = date.getDate().toString();
        return year + '-' + month.padStart(2, '0') + '-' + date.padStart(2, '0');
    };

/**
 * 转成时间格式
 * @param date
 * @returns {string}
 */
const dateToTimeStr = (date) => {
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    return hour.padStart(2, '0') + ':' + minute.padStart(2, '0');
};

/**
 * 字符串转Date类型
 * @param str
 * @returns {*}
 */
const strToDate = (str) => {
    if (_.isDate(str)) {
        return str;
    } else if (str === '') {
        return undefined;
    } else if (_.isString(str)) {
        str = str.replace(/-/g, '/');
        return new Date(str);
    } else {
        return undefined;
    }
};


/**
 * 获取数据源
 * @param searchText
 * @returns {Promise<any>}
 */
const getDataSource = ({dataSource, searchText = ''}) => {
    dataSource = _.isFunction(dataSource) ? dataSource(searchText) : dataSource;
    return dataSource;
};

const objectToFormData = (obj, form, namespace) => {
    let fd = form || new FormData();
    let formKey;
    if (_.isArray(obj)) {
        if (obj.length == 0) {
            fd.append(namespace, '');
        } else {
            obj.map((item, index) => {
                if (_.isObject(item) && !(item instanceof File)) {
                    objectToFormData(item, fd, namespace + '[' + index + ']');
                } else {
                    fd.append(namespace + '[]', item)
                }
            })
        }
    } else {
        for (let property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (namespace) {
                    formKey = namespace + '[' + property + ']';
                } else {
                    formKey = property;
                }
                if (typeof obj[property] === 'object' && obj[property] !== null && !(obj[property] instanceof File)) {
                    objectToFormData(obj[property], fd, formKey);
                } else {
                    if (obj[property] !== undefined) {
                        fd.append(formKey, (obj[property] === undefined || obj[property] === null) ? '' : obj[property]);
                    }
                }
            }
        }
    }
    return fd;
};


export default {
    joinBlankSpace,
    replaceText,
    isEmpty,
    isEmail,
    isMobile,
    isUrl,
    isIp,
    isInteger,
    isNumber,
    cmpDateTime,
    getDataSource,
    date,
    strToTime,
    dateToStr,
    dateToTimeStr,
    strToDate,
    getDataFromDataSourceByValue,
    getFilterDataSource,
    objectToFormData,
    renderLeftIcon,
    renderRightIcon,
    forEach
}
export {
    joinBlankSpace,
    replaceText,
    isEmpty,
    isEmail,
    isMobile,
    isUrl,
    isIp,
    isInteger,
    isNumber,
    cmpDateTime,
    getDataSource,
    date,
    strToTime,
    dateToStr,
    dateToTimeStr,
    strToDate,
    getDataFromDataSourceByValue,
    getFilterDataSource,
    objectToFormData,
    renderLeftIcon,
    renderRightIcon,
    forEach
};