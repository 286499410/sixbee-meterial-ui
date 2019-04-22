import _ from 'loadsh';
import Tag from "./tag";
import React from 'react';
import $ from 'jquery';

let uuid = require('node-uuid');

const utils = {

    uuid: () => {
        return uuid.v4();
    },

    strToTime:
        (str) => {
            return parseInt(utils.strToDate(str).getTime() / 1000);
        },

    /**
     * 时间戳转日期时间
     * @param format
     * @param timestamp
     * @returns {*}
     */
    date:
        (format = 'Y-m-d H:i:s', timestamp) => {
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
        },

    /**
     * 转成常见日期格式
     * @param date
     */
    dateToStr:
        (date) => {
            let year = date.getFullYear().toString();
            let month = (date.getMonth() + 1).toString();
            date = date.getDate().toString();
            return year + '-' + month.padStart(2, '0') + '-' + date.padStart(2, '0');
        },

    /**
     * 转成时间格式
     * @param date
     * @returns {string}
     */
    dateToTimeStr:
        (date) => {
            let hour = date.getHours().toString();
            let minute = date.getMinutes().toString();
            return hour.padStart(2, '0') + ':' + minute.padStart(2, '0');
        },

    /**
     * 字符串转Date类型
     * @param str
     * @returns {*}
     */
    strToDate:
        (str) => {
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
        },

    /**
     * 字符串,金额转数值
     * @param str
     * @returns {Number}
     */
    parseNumber:
        (str) => {
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

    /**
     * 数值转千分位格式
     * @param number
     * @param float
     * @returns {*}
     */
    parseMoney:
        (number, float = 2) => {
            if (number === undefined || number === null) {
                return '';
            }
            if (number !== '') {
                number = utils.round(utils.parseNumber(number), float);
                let groups = (/([\-\+]?)(\d*)(\.\d+)?/g).exec(number.toString()),
                    mask = groups[1],            //符号位
                    integers = (groups[2] || "").split(""), //整数部分
                    decimal = groups[3] || "",       //小数部分
                    remain = integers.length % 3;
                let temp = integers.reduce((previousValue, currentValue, index) => {
                    if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
                        return previousValue + currentValue + ",";
                    } else {
                        return previousValue + currentValue;
                    }
                }, "").replace(/\,$/g, "");
                return mask + temp + (decimal ? (!isNaN(float) ? decimal.padEnd(float + 1, '0') : '') : (float ? '.' + ''.padEnd(float, '0') : ''));
            }
            return number;
        },

    /**
     * 数值,金额转大写中文
     * @param number
     * @returns {*}
     */
    parseChinese:
        (number) => {
            number = utils.parseNumber(number);
            if (isNaN(number) || number >= Math.pow(10, 12)) return '';
            let symbol = number < 0 ? '负' : '';
            let words = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
            let units = [
                ['分', '角'],
                ['', '拾', '佰', '仟'],
                ['元', '万', '亿']
            ];
            let splits = number.toString().split(".");
            let [integer, decimal] = splits;
            let chinese = '';
            for (let i = 0; i < 3 && integer; i++) {
                let str = '';
                let length = integer.toString().length;
                for (let j = 0; j < 4 && j < length; j++) {
                    let digit = integer % 10;
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
                for (let i = 0; i < 2; i++) {
                    if (decimal[i] > 0) {
                        chinese += words[decimal[i]] + units[0][1 - i];
                    }
                }
            } else {
                chinese += '整';
            }
            return chinese;
        },

    /**
     * 数字精度
     * @param number
     * @param float
     * @returns {number}
     */
    round:
        (number, float) => {
            let times = Math.pow(10, float);
            return Math.round(number * times) / times;
        },

    /**
     *
     * @param number
     * @param float
     * @returns {string}
     */
    toFixed:
        (number, float) => {
            return utils.round(number, float).toFixed(float);
        },

    /**
     * 获取数据源
     * @param searchText
     * @returns {Promise<any>}
     */
    getDataSource:
        (searchText, dataSource, dataSourceConfig, context) => {
            let preprocessing = (dataSource) => {
                dataSource.map((row) => {
                    if (row[dataSourceConfig.text] === undefined) {
                        row[dataSourceConfig.text] = utils.replaceText(dataSourceConfig.text, row);
                    }
                });
                return dataSource;
            };
            return new Promise((resolve, reject) => {
                if (_.isFunction(dataSource)) {
                    dataSource = dataSource(searchText, context);
                }
                if (_.isArray(dataSource)) {
                    resolve(preprocessing(dataSource));
                }
                if (dataSource instanceof Promise) {
                    dataSource.then((data) => {
                        if (_.isArray(data)) {
                            resolve(preprocessing(data));
                        }
                    })
                }
            });
        },

    /**
     * 获取鼠标坐标
     * @param event
     * @returns {{x: (Number|number), y: (Number|number)}}
     */
    getMousePosition:
        (event) => {
            let e = event || window.event;
            let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            let x = e.pageX || e.clientX + scrollX;
            let y = e.pageY || e.clientY + scrollY;
            return {x: x, y: y};
        },

    replaceText:
        (replaceText, data) => {
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
        },

    render: (data, column, defaultValue = '') => {
        let key = column.dataKey || column.key;
        let value = _.get(data, key, defaultValue);
        switch (column.type) {
            case 'date':
                return /^\d+$/.test(value) ? utils.date(column.format || 'Y-m-d', value) : value;
            case 'time':
                return /^\d+$/.test(value) ? utils.date(column.format || 'H:i', value) : value;
            case 'datetime':
                return /^\d+$/.test(value) ? utils.date(column.format || 'Y-m-d H:i', value) : value;
            case 'money':
                return value == 0 && column.showZero !== true ? '' : utils.parseMoney(value, column.float);
            case 'select':
            case 'radio':
                if (_.isArray(column.dataSource)) {
                    let dataSource = column.dataSource;
                    let dataSourceConfig = column.dataSourceConfig || {text: 'text', value: 'value'};
                    let map = {};
                    dataSource.map((data) => {
                        map[data[dataSourceConfig.value]] = data[dataSourceConfig.text];
                    });
                    return column.renderTag ?
                        <Tag value={value} text={map[value]} dataSource={dataSource} size="small"/> : map[value];
                } else {
                    return value;
                }
            case 'checkbox':
                if (column.multiple) {
                    let dataSourceConfig = column.dataSourceConfig || {text: 'text', value: 'value'};
                    let texts = [];
                    if (_.isArray(value)) {
                        value.map(row => {
                            return texts.push(row[dataSourceConfig.text]);
                        })
                    }
                    return texts.join(' ');
                } else if (_.isArray(column.dataSource) && column.dataSource.length > 0) {

                } else {
                    return value ? '是' : '否';
                }
            case 'auto':
                if (column.withKey) {
                    let withData = _.get(data, column.withKey, {});
                    let dataSourceConfig = column.dataSourceConfig || {text: 'text', value: 'value'};
                    return utils.replaceText(dataSourceConfig.text, withData);
                } else {
                    return value;
                }
            case 'image':
                let renderStyle = {
                    width: 80,
                    height: 80,
                    display: 'inline-block',
                    overflow: 'hidden',
                    ...column.renderStyle
                };
                let isBase64OrUrl = (str) => {
                    return _.isString(str) ? str.substr(0, 4) === 'http' || str.substr(0, 10) === 'data:image' : false;
                };
                return value ? <div style={renderStyle}>
                    <div className="flex center middle" style={{height: '100%', border: '1px solid #f1f1f1'}}>
                        <img id={"image_" + key + '_' + data.id}
                             src={isBase64OrUrl(value) ? value : (column.documentRoot || '') + value}
                             onLoad={() => {
                                 let id = '#image_' + key + '_' + data.id;
                                 let width = $(id).width();
                                 let height = $(id).height();
                                 if (width > height) {
                                     $(id).css({width: width / height * 100 + '%'});
                                 } else {
                                     $(id).css({height: height / width * 100 + '%'});
                                 }
                             }}/>
                    </div>
                </div> : <div style={renderStyle}></div>;
            case 'editor':
                return _.isString(value) ? value.replace(/<[^<>]+>/g, "") : '';
            case 'textarea':
                return <div
                    dangerouslySetInnerHTML={{__html: _.isString(value) ? value.replace(/[\r\n]|[\n]|[\r]/g, "<br/>") : ''}}></div>
            default:
                return value;
        }
    }
};

export default utils;