'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _TimePicker = require('material-ui/TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _intlLocalesSupported = require('intl-locales-supported');

var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimeFormat = void 0;

if ((0, _intlLocalesSupported2.default)(['zh'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    var IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/zh');
}

var DateTime = function (_Component) {
    (0, _inherits3.default)(DateTime, _Component);

    function DateTime(props) {
        (0, _classCallCheck3.default)(this, DateTime);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateTime.__proto__ || (0, _getPrototypeOf2.default)(DateTime)).call(this, props));

        _this.dateClickDiv = {
            small: {
                top: 20,
                width: 70
            },
            default: {
                top: 20,
                width: 80
            },
            large: {
                top: 30,
                width: 90
            }
        };
        _this.timeClickDiv = {
            small: {
                top: 20,
                left: 74,
                width: 32
            },
            default: {
                top: 20,
                left: 83,
                width: 38
            },
            large: {
                top: 30,
                left: 95,
                width: 40
            }
        };
        _this.state = {
            date: undefined,
            time: undefined,
            clickType: 'datetime'
        };

        _this.handleDataChange = function (nul, date) {
            var value = _utils2.default.dateToStr(date);
            _this.setDate(value);
            _this.refs.time.focus();
        };

        _this.handleTimeChange = function (nul, date) {
            var value = _utils2.default.dateToTimeStr(date);
            _this.setTime(value);
        };

        _this.handleClick = function (type) {
            return function (event) {
                event.stopPropagation();
                var value = _this.getValue();
                if (value.date === undefined && value.time === undefined) {
                    type = 'datetime';
                }
                _this.state.clickType = type;
                switch (type) {
                    case 'datetime':
                        _this.refs.date.focus();
                        break;
                    case 'date':
                        _this.refs.date.focus();
                        break;
                    case 'time':
                        _this.refs.time.focus();
                        break;
                }
            };
        };

        _this.handleClear = function (event) {
            _this.state.date = undefined;
            _this.state.time = undefined;
            _this.forceUpdate();
            _this.handleChange();
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(DateTime, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.value !== undefined && props.value !== '' && props.value !== null) {
                var value = props.value;
                if (this.props.timestamp) {
                    value = _utils2.default.date('Y-m-d H:i', value);
                }

                var _value$split = value.split(' ');

                var _value$split2 = (0, _slicedToArray3.default)(_value$split, 2);

                this.state.date = _value$split2[0];
                this.state.time = _value$split2[1];
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            if (this.props.onChange) {
                var value = this.state.date === undefined || this.state.time === undefined ? '' : this.state.date + ' ' + this.state.time;
                if (value && value !== '' && this.props.timestamp) {
                    value = _utils2.default.strToTime(value);
                }
                this.props.onChange(value, this);
            }
        }
    }, {
        key: 'setDate',
        value: function setDate(date) {
            this.state.date = date;
            this.forceUpdate();
            this.handleChange();
        }
    }, {
        key: 'setTime',
        value: function setTime(time) {
            this.state.time = time;
            this.forceUpdate();
            this.handleChange();
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var _value$split3 = value.split(' ');

            var _value$split4 = (0, _slicedToArray3.default)(_value$split3, 2);

            this.state.date = _value$split4[0];
            this.state.time = _value$split4[1];

            this.handleChange();
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            if (this.state.date === undefined && this.state.time === undefined && this.props.defaultValue !== undefined) {
                var _props$defaultValue$s = this.props.defaultValue.split(' '),
                    _props$defaultValue$s2 = (0, _slicedToArray3.default)(_props$defaultValue$s, 2),
                    date = _props$defaultValue$s2[0],
                    time = _props$defaultValue$s2[1];

                return {
                    date: date,
                    time: time
                };
            } else {
                return {
                    date: this.state.date,
                    time: this.state.time
                };
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _getValue = this.getValue(),
                date = _getValue.date,
                time = _getValue.time;

            var value = (date || '--/--/--') + ' ' + (time || '--:--');
            var clickDivStyle = { position: 'absolute', top: 30, bottom: 0, left: 0, width: 75, cursor: 'pointer' };
            var size = this.props.size || 'default';
            var styleProps = _style2.default.getStyle('date', this.props);
            return _react2.default.createElement(
                'div',
                { style: { position: 'relative' } },
                _react2.default.createElement(_text2.default, (0, _extends3.default)({}, this.props, { value: value, name: this.props.name || this.props.dataKey || _utils2.default.uuid() })),
                _react2.default.createElement(
                    'div',
                    { style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
                        onClick: this.handleClick('datetime') },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', { style: (0, _extends3.default)({}, clickDivStyle, this.dateClickDiv[size]),
                            onClick: this.handleClick('date') }),
                        _react2.default.createElement('div', { style: (0, _extends3.default)({}, clickDivStyle, this.timeClickDiv[size]),
                            onClick: this.handleClick('time') })
                    )
                ),
                (date !== undefined || time !== undefined) && this.props.hasClear && !this.props.disabled && !this.props.immutable ? _react2.default.createElement(_IconButton2.default, { iconClassName: 'iconfont icon-close-circle-fill', onClick: this.handleClear,
                    style: (0, _extends3.default)({ position: 'absolute', right: 0 }, styleProps.iconStyle.style),
                    iconStyle: (0, _extends3.default)({ color: '#e0e0e0' }, styleProps.iconStyle.iconStyle)

                }) : null,
                _react2.default.createElement(
                    'div',
                    { style: { display: 'none' } },
                    _react2.default.createElement(_DatePicker2.default, {
                        name: 'date',
                        ref: 'date',
                        defaultDate: _utils2.default.strToDate(date),
                        onChange: this.handleDataChange,
                        autoOk: this.props.autoOk == false ? false : true,
                        DateTimeFormat: DateTimeFormat,
                        locale: 'zh',
                        cancelLabel: '\u53D6\u6D88',
                        okLabel: '\u786E\u5B9A',
                        minDate: this.props.minDate || null,
                        maxDate: this.props.maxDate || null
                    }),
                    _react2.default.createElement(_TimePicker2.default, {
                        name: 'time',
                        ref: 'time',
                        defaultTime: _utils2.default.strToDate(time ? '1970-01-01 ' + time : undefined),
                        format: '24hr',
                        onChange: this.handleTimeChange,
                        autoOk: this.props.autoOk == false ? false : true,
                        minutesStep: this.props.minutesStep || 5,
                        cancelLabel: '\u53D6\u6D88',
                        okLabel: '\u786E\u5B9A'
                    })
                )
            );
        }
    }]);
    return DateTime;
}(_react.Component);

DateTime.defaultProps = {
    autoOk: true,
    okLabel: "确认",
    cancelLabel: "取消",
    timestamp: false,
    container: "dialog",
    label: undefined,
    borderShow: true,
    hasClear: true,
    disabled: false,
    immutable: false,
    fullWidth: true,
    multiLine: false,
    rows: 1,
    labelFixed: false,
    hintText: undefined,
    errorText: undefined,
    defaultValue: undefined,
    activeStartDate: undefined,
    minDate: undefined,
    maxDate: undefined };
exports.default = DateTime;