'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.forEach = exports.renderRightIcon = exports.renderLeftIcon = exports.objectToFormData = exports.getFilterDataSource = exports.getDataFromDataSourceByValue = exports.strToDate = exports.dateToTimeStr = exports.dateToStr = exports.strToTime = exports.date = exports.getDataSource = exports.cmpDateTime = exports.isNumber = exports.isInteger = exports.isIp = exports.isUrl = exports.isMobile = exports.isEmail = exports.isEmpty = exports.replaceText = exports.joinBlankSpace = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Icon = require('../UI/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var joinBlankSpace = function joinBlankSpace() {
    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
    }

    var classNames = [];
    _lodash2.default.isArray(arg) && arg.map(function (str) {
        str && classNames.push(str);
    });
    return classNames.join(' ');
};

var renderLeftIcon = function renderLeftIcon(props) {
    return _lodash2.default.isString(props.leftIcon) ? _react2.default.createElement(_Icon2.default, { className: 'left-icon', name: props.leftIcon }) : props.leftIcon;
};

var renderRightIcon = function renderRightIcon(props) {
    return _lodash2.default.isString(props.rightIcon) ? _react2.default.createElement(_Icon2.default, { className: 'right-icon', name: props.rightIcon }) : props.rightIcon;
};

var replaceText = function replaceText(data, _replaceText) {
    var text = _lodash2.default.get(data, _replaceText);
    if (text !== undefined) {
        return text;
    }
    var reg = /\[((\w|\w.\w||\w.\w.\w)*)\]/g;
    var textFields = _replaceText.match(reg);
    if (_lodash2.default.isArray(textFields)) {
        var ret = undefined;
        textFields.map(function (field) {
            var key = field.substr(1, field.length - 2);
            var value = _lodash2.default.get(data, key, '');
            ret = _replaceText.replace('[' + key + ']', value);
            _replaceText = ret;
        });
        return ret;
    } else {
        return undefined;
    }
};

var getDataFromDataSourceByValue = function getDataFromDataSourceByValue(value, dataSource, dataSourceConfig) {
    for (var i = 0; i < dataSource.length; i++) {
        var data = dataSource[i];
        if (data[dataSourceConfig.value] === value) {
            return data;
        }
        if (data.children && data.children.length > 0) {
            var tempData = getDataFromDataSourceByValue(value, data.children, dataSourceConfig);
            if (tempData) return tempData;
        }
    }
};

var getFilterDataSource = function getFilterDataSource(filterText, dataSource, dataSourceConfig, filter) {
    if (filter === undefined) {
        filter = function filter(data, filterText) {
            var text = replaceText(data, dataSourceConfig.text);
            return filterText === '' ? true : text.toString().indexOf(filterText) >= 0;
        };
    }
    var filterDataSource = [];
    dataSource.map(function (data) {
        var children = getFilterDataSource(filterText, data.children || [], dataSourceConfig);
        if (children && children.length > 0) {
            filterDataSource.push((0, _extends3.default)({}, data, { children: children }));
        } else if (filter(data, filterText)) {
            filterDataSource.push((0, _extends3.default)({}, data, { children: [] }));
        }
    });
    return filterDataSource;
};

var isEmpty = function isEmpty(value) {
    return value === undefined || value === null || value === '';
};

var isEmail = function isEmail(value) {
    var reg = /^[A-Za-z0-9._-\u4e00-\u9fff]+@[a-zA-Z0-9_-\u4e00-\u9fff]+(\.[a-zA-Z0-9_-\u4e00-\u9fff]+)+$/;
    return reg.test(value);
};

var isMobile = function isMobile(value) {
    var reg = /^\d{11}$/;
    return reg.test(value);
};

var isUrl = function isUrl(value) {
    var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return reg.test(value);
};

var isIp = function isIp(value) {
    var reg = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
    return reg.test(value);
};

var isInteger = function isInteger(value) {
    var reg = /^\d+$/;
    return reg.test(value);
};

var isNumber = function isNumber(value) {
    var reg = /^\d+(\.\d+)?$/;
    return reg.test(value);
};

var cmpDateTime = function cmpDateTime(datetime1, datetime2) {
    var diff = new Date(Date.parse(datetime1)).getTime() - new Date(Date.parse(datetime2)).getTime();
    if (diff > 0) {
        return 1;
    } else if (diff == 0) {
        return 0;
    } else {
        return -1;
    }
};

var forEach = function forEach(data, callback) {
    data.map(function (row) {
        callback(row);
        if (data.children && _lodash2.default.isArray(data.children)) {
            forEach(data.children, callback);
        }
    });
};

var date = function date() {
    var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Y-m-d H:i:s';
    var timestamp = arguments[1];

    var myDate = new Date();
    myDate.setTime(timestamp * 1000);
    var year = myDate.getFullYear().toString();
    var month = (myDate.getMonth() + 1).toString();
    var date = myDate.getDate().toString();
    var hour = myDate.getHours().toString();
    var minute = myDate.getMinutes().toString();
    var second = myDate.getSeconds().toString();
    var datetime = format;
    datetime = datetime.replace('Y', year);
    datetime = datetime.replace('m', month.padStart(2, '0'));
    datetime = datetime.replace('d', date.padStart(2, '0'));
    datetime = datetime.replace('H', hour.padStart(2, '0'));
    datetime = datetime.replace('i', minute.padStart(2, '0'));
    datetime = datetime.replace('s', second.padStart(2, '0'));
    return datetime;
};

var strToTime = function strToTime(str) {
    return parseInt(strToDate(str).getTime() / 1000);
};

var dateToStr = function dateToStr(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    date = date.getDate().toString();
    return year + '-' + month.padStart(2, '0') + '-' + date.padStart(2, '0');
};

var dateToTimeStr = function dateToTimeStr(date) {
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    return hour.padStart(2, '0') + ':' + minute.padStart(2, '0');
};

var strToDate = function strToDate(str) {
    if (_lodash2.default.isDate(str)) {
        return str;
    } else if (str === '') {
        return undefined;
    } else if (_lodash2.default.isString(str)) {
        str = str.replace(/-/g, '/');
        return new Date(str);
    } else {
        return undefined;
    }
};

var getDataSource = function getDataSource(_ref) {
    var dataSource = _ref.dataSource,
        _ref$searchText = _ref.searchText,
        searchText = _ref$searchText === undefined ? '' : _ref$searchText;

    dataSource = _lodash2.default.isFunction(dataSource) ? dataSource(searchText) : dataSource;
    return dataSource;
};

var objectToFormData = function objectToFormData(obj, form, namespace) {
    var fd = form || new FormData();
    var formKey = void 0;
    if (_lodash2.default.isArray(obj)) {
        if (obj.length == 0) {
            fd.append(namespace, '');
        } else {
            obj.map(function (item, index) {
                if (_lodash2.default.isObject(item) && !(item instanceof File)) {
                    objectToFormData(item, fd, namespace + '[' + index + ']');
                } else {
                    fd.append(namespace + '[]', item);
                }
            });
        }
    } else {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (namespace) {
                    formKey = namespace + '[' + property + ']';
                } else {
                    formKey = property;
                }
                if ((0, _typeof3.default)(obj[property]) === 'object' && obj[property] !== null && !(obj[property] instanceof File)) {
                    objectToFormData(obj[property], fd, formKey);
                } else {
                    if (obj[property] !== undefined) {
                        fd.append(formKey, obj[property] === undefined || obj[property] === null ? '' : obj[property]);
                    }
                }
            }
        }
    }
    return fd;
};

exports.default = {
    joinBlankSpace: joinBlankSpace,
    replaceText: replaceText,
    isEmpty: isEmpty,
    isEmail: isEmail,
    isMobile: isMobile,
    isUrl: isUrl,
    isIp: isIp,
    isInteger: isInteger,
    isNumber: isNumber,
    cmpDateTime: cmpDateTime,
    getDataSource: getDataSource,
    date: date,
    strToTime: strToTime,
    dateToStr: dateToStr,
    dateToTimeStr: dateToTimeStr,
    strToDate: strToDate,
    getDataFromDataSourceByValue: getDataFromDataSourceByValue,
    getFilterDataSource: getFilterDataSource,
    objectToFormData: objectToFormData,
    renderLeftIcon: renderLeftIcon,
    renderRightIcon: renderRightIcon,
    forEach: forEach
};
exports.joinBlankSpace = joinBlankSpace;
exports.replaceText = replaceText;
exports.isEmpty = isEmpty;
exports.isEmail = isEmail;
exports.isMobile = isMobile;
exports.isUrl = isUrl;
exports.isIp = isIp;
exports.isInteger = isInteger;
exports.isNumber = isNumber;
exports.cmpDateTime = cmpDateTime;
exports.getDataSource = getDataSource;
exports.date = date;
exports.strToTime = strToTime;
exports.dateToStr = dateToStr;
exports.dateToTimeStr = dateToTimeStr;
exports.strToDate = strToDate;
exports.getDataFromDataSourceByValue = getDataFromDataSourceByValue;
exports.getFilterDataSource = getFilterDataSource;
exports.objectToFormData = objectToFormData;
exports.renderLeftIcon = renderLeftIcon;
exports.renderRightIcon = renderRightIcon;
exports.forEach = forEach;