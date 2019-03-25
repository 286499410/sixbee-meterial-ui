'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _loadsh = require('loadsh');

var _loadsh2 = _interopRequireDefault(_loadsh);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _uuid = require('node-uuid');

var utils = {

    uuid: function uuid() {
        return _uuid.v4();
    },

    strToTime: function strToTime(str) {
        return parseInt(utils.strToDate(str).getTime() / 1000);
    },

    date: function date() {
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
    },

    dateToStr: function dateToStr(date) {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        date = date.getDate().toString();
        return year + '-' + month.padStart(2, '0') + '-' + date.padStart(2, '0');
    },

    dateToTimeStr: function dateToTimeStr(date) {
        var hour = date.getHours().toString();
        var minute = date.getMinutes().toString();
        return hour.padStart(2, '0') + ':' + minute.padStart(2, '0');
    },

    strToDate: function strToDate(str) {
        if (_loadsh2.default.isDate(str)) {
            return str;
        } else if (str === '') {
            return undefined;
        } else if (_loadsh2.default.isString(str)) {
            str = str.replace(/-/g, '/');
            return new Date(str);
        } else {
            return undefined;
        }
    },

    parseNumber: function parseNumber(str) {
        str = (str + '').toString().replace(/,/g, '');
        if (/^-?\d*((\.\d*)?)$/.test(str)) {
            if (str.indexOf('.') == 0) {
                str = 0 + str;
            }
            if (str.indexOf('.') > 0) {
                return parseFloat(str);
            } else {
                return parseInt(str);
            }
        } else {
            return 0;
        }
    },

    parseMoney: function parseMoney(number) {
        var float = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

        if (number === undefined || number === null) {
            return '';
        }
        if (number !== '') {
            number = utils.round(utils.parseNumber(number), float);
            var groups = /([\-\+]?)(\d*)(\.\d+)?/g.exec(number.toString()),
                mask = groups[1],
                integers = (groups[2] || "").split(""),
                decimal = groups[3] || "",
                remain = integers.length % 3;
            var temp = integers.reduce(function (previousValue, currentValue, index) {
                if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
                    return previousValue + currentValue + ",";
                } else {
                    return previousValue + currentValue;
                }
            }, "").replace(/\,$/g, "");
            return mask + temp + (decimal ? !isNaN(float) ? decimal.padEnd(float + 1, '0') : '' : float ? '.' + ''.padEnd(float, '0') : '');
        }
        return number;
    },

    parseChinese: function parseChinese(number) {
        number = utils.parseNumber(number);
        if (isNaN(number) || number >= Math.pow(10, 12)) return '';
        var symbol = number < 0 ? '负' : '';
        var words = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var units = [['分', '角'], ['', '拾', '佰', '仟'], ['元', '万', '亿']];
        var splits = number.toString().split(".");

        var _splits = (0, _slicedToArray3.default)(splits, 2),
            integer = _splits[0],
            decimal = _splits[1];

        var chinese = '';
        for (var i = 0; i < 3 && integer; i++) {
            var str = '';
            var length = integer.toString().length;
            for (var j = 0; j < 4 && j < length; j++) {
                var digit = integer % 10;
                integer = parseInt(integer / 10);
                str = words[digit] + (digit > 0 ? units[1][j] : '') + str;
                str = str.replace('零零', '零');
            }
            if (str.lastIndexOf('零') == str.length - 1) {
                str = str.substr(0, str.length - 1);
            }
            if (str) {
                chinese = str + units[2][i] + chinese;
            }
        }
        if (decimal) {
            for (var _i = 0; _i < 2; _i++) {
                if (decimal[_i] > 0) {
                    chinese += words[decimal[_i]] + units[0][1 - _i];
                }
            }
        } else {
            chinese += '整';
        }
        return chinese;
    },

    round: function round(number, float) {
        var times = Math.pow(10, float);
        return Math.round(number * times) / times;
    },

    toFixed: function toFixed(number, float) {
        return utils.round(number, float).toFixed(float);
    },

    getDataSource: function getDataSource(searchText, dataSource, dataSourceConfig, context) {
        var preprocessing = function preprocessing(dataSource) {
            dataSource.map(function (row) {
                if (row[dataSourceConfig.text] === undefined) {
                    row[dataSourceConfig.text] = utils.replaceText(dataSourceConfig.text, row);
                }
            });
            return dataSource;
        };
        return new _promise2.default(function (resolve, reject) {
            if (_loadsh2.default.isFunction(dataSource)) {
                dataSource = dataSource(searchText, context);
            }
            if (_loadsh2.default.isArray(dataSource)) {
                resolve(preprocessing(dataSource));
            }
            if (dataSource instanceof _promise2.default) {
                dataSource.then(function (data) {
                    if (_loadsh2.default.isArray(data)) {
                        resolve(preprocessing(data));
                    }
                });
            }
        });
    },

    getMousePosition: function getMousePosition(event) {
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;
        return { x: x, y: y };
    },

    replaceText: function replaceText(_replaceText, data) {
        var text = _loadsh2.default.get(data, _replaceText);
        if (text !== undefined) {
            return text;
        }
        var reg = /\[(\w*)\]/g;
        var textFields = _replaceText.match(reg);
        if (_loadsh2.default.isArray(textFields)) {
            var ret = undefined;
            textFields.map(function (field) {
                var key = field.substr(1, field.length - 2);
                var value = _loadsh2.default.get(data, key);
                if (value !== undefined) {
                    ret = _replaceText.replace('[' + key + ']', value);
                    _replaceText = ret;
                }
            });
            return ret;
        } else {
            return undefined;
        }
    },

    render: function render(data, column) {
        var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var key = column.dataKey || column.key;
        var value = _loadsh2.default.get(data, key, defaultValue);
        switch (column.type) {
            case 'date':
                return (/^\d+$/.test(value) ? utils.date(column.format || 'Y-m-d', value) : value
                );
            case 'time':
                return (/^\d+$/.test(value) ? utils.date(column.format || 'H:i', value) : value
                );
            case 'datetime':
                return (/^\d+$/.test(value) ? utils.date(column.format || 'Y-m-d H:i', value) : value
                );
            case 'money':
                return value == 0 && column.showZero !== true ? '' : utils.parseMoney(value, column.float);
            case 'select':
            case 'radio':
                if (_loadsh2.default.isArray(column.dataSource)) {
                    var dataSource = column.dataSource;
                    var dataSourceConfig = column.dataSourceConfig || { text: 'text', value: 'value' };
                    var map = {};
                    dataSource.map(function (data) {
                        map[data[dataSourceConfig.value]] = data[dataSourceConfig.text];
                    });
                    return column.renderTag ? _react2.default.createElement(_tag2.default, { value: value, text: map[value], dataSource: dataSource, size: 'small' }) : map[value];
                } else {
                    return value;
                }
            case 'checkbox':
                if (column.multiple) {
                    var _dataSourceConfig = column.dataSourceConfig || { text: 'text', value: 'value' };
                    var texts = [];
                    if (_loadsh2.default.isArray(value)) {
                        value.map(function (row) {
                            return texts.push(row[_dataSourceConfig.text]);
                        });
                    }
                    return texts.join(' ');
                } else if (_loadsh2.default.isArray(column.dataSource) && column.dataSource.length > 0) {} else {
                    return value ? '是' : '否';
                }
            case 'auto':
                if (column.withKey) {
                    var withData = _loadsh2.default.get(data, column.withKey, {});
                    var _dataSourceConfig2 = column.dataSourceConfig || { text: 'text', value: 'value' };
                    return utils.replaceText(_dataSourceConfig2.text, withData);
                } else {
                    return value;
                }
            case 'image':
                var renderStyle = (0, _extends3.default)({
                    width: 80,
                    height: 80,
                    display: 'inline-block',
                    overflow: 'hidden'
                }, column.renderStyle);
                var isBase64OrUrl = function isBase64OrUrl(str) {
                    return _loadsh2.default.isString(str) ? str.substr(0, 4) === 'http' || str.substr(0, 10) === 'data:image' : false;
                };
                return value ? _react2.default.createElement(
                    'div',
                    { style: renderStyle },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex center middle', style: { height: '100%', border: '1px solid #f1f1f1' } },
                        _react2.default.createElement('img', { id: "image_" + key + '_' + data.id,
                            src: isBase64OrUrl(value) ? value : (column.documentRoot || '') + value,
                            onLoad: function onLoad() {
                                var id = '#image_' + key + '_' + data.id;
                                var width = (0, _jquery2.default)(id).width();
                                var height = (0, _jquery2.default)(id).height();
                                if (width > height) {
                                    (0, _jquery2.default)(id).css({ width: width / height * 100 + '%' });
                                } else {
                                    (0, _jquery2.default)(id).css({ height: height / width * 100 + '%' });
                                }
                            } })
                    )
                ) : _react2.default.createElement('div', { style: renderStyle });
            case 'editor':
                return _loadsh2.default.isString(value) ? value.replace(/<[^<>]+>/g, "") : '';
            case 'textarea':
                return _react2.default.createElement('div', {
                    dangerouslySetInnerHTML: { __html: _loadsh2.default.isString(value) ? value.replace(/[\r\n]|[\n]|[\r]/g, "<br/>") : '' } });
            default:
                return value;
        }
    }
};

exports.default = utils;