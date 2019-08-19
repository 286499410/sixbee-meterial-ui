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

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTime = function (_Component) {
    (0, _inherits3.default)(DateTime, _Component);

    function DateTime(props) {
        (0, _classCallCheck3.default)(this, DateTime);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateTime.__proto__ || (0, _getPrototypeOf2.default)(DateTime)).call(this, props));

        _this.state = {
            date: undefined,
            time: undefined
        };

        _this.handleChange = function (type) {
            return function (value) {
                switch (type) {
                    case 'date':
                        _this.state.date = value;
                        break;
                    case 'time':
                        _this.state.time = value;
                        break;
                }

                var _this$getValue = _this.getValue(),
                    date = _this$getValue.date,
                    time = _this$getValue.time;

                if (type === 'date' && _this.isEmpty(time)) {
                    _this.refs.time.focus();
                }
                _this.setValue((date || '') + ' ' + (time || ''));
            };
        };

        _this.handleClear = function (event) {
            _this.setValue(null);
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
            if (!this.isEmpty(props.value)) {
                var value = props.value;
                if (this.props.timestamp) {
                    value = _utils2.default.date('Y-m-d H:i', value);
                }

                var _value$split = value.split(' ');

                var _value$split2 = (0, _slicedToArray3.default)(_value$split, 2);

                this.state.date = _value$split2[0];
                this.state.time = _value$split2[1];
            } else if ((props.value === '' || props.value === null) && !this.isEmpty(this.state.date) && !this.isEmpty(this.state.time)) {
                this.state.date = null;
                this.state.time = null;
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
            if (this.isEmpty(value)) {
                this.state.date = null;
                this.state.time = null;
            } else {
                var _value$split3 = value.split(' ');

                var _value$split4 = (0, _slicedToArray3.default)(_value$split3, 2);

                this.state.date = _value$split4[0];
                this.state.time = _value$split4[1];
            }
            this.forceUpdate();
            if (this.props.onChange) {
                var _value = this.isEmpty(this.state.date) || this.isEmpty(this.state.time) ? '' : this.state.date + ' ' + this.state.time;
                if (_value && _value !== '' && this.props.timestamp) {
                    _value = _utils2.default.strToTime(_value);
                }
                this.props.onChange(_value, this);
            }
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(value) {
            return value === undefined || value === null || value === '';
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            if (this.state.date === undefined && this.state.time === undefined && this.props.defaultValue !== undefined) {
                var defaultValue = this.props.defaultValue;
                if (this.props.timestamp) {
                    defaultValue = _utils2.default.date('Y-m-d H:i', defaultValue);
                }

                var _defaultValue$split = defaultValue.split(' '),
                    _defaultValue$split2 = (0, _slicedToArray3.default)(_defaultValue$split, 2),
                    date = _defaultValue$split2[0],
                    time = _defaultValue$split2[1];

                return {
                    date: date !== undefined ? date : this.props.defaultDate,
                    time: time !== undefined ? time : this.props.defaultTime
                };
            } else {
                return {
                    date: this.state.date !== undefined ? this.state.date : this.props.defaultDate,
                    time: this.state.time !== undefined ? this.state.time : this.props.defaultTime
                };
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _getValue = this.getValue(),
                date = _getValue.date,
                time = _getValue.time;

            var styleProps = _style2.default.getStyle('date', this.props);
            var label = this.props.label;
            return _react2.default.createElement(
                'div',
                { style: { position: 'relative' } },
                label === false ? null : _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        { style: {
                                transform: "scale(0.75)",
                                transformOrigin: 'left top 0px',
                                color: 'rgba(0,0,0,0.3)',
                                fontSize: 15,
                                display: 'inline-block',
                                position: 'relative',
                                top: 12
                            } },
                        label
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'flex' },
                    _react2.default.createElement(
                        'div',
                        { style: { width: 100 } },
                        _react2.default.createElement(_date2.default, {
                            ref: 'date',
                            hintText: '\u65E5\u671F',
                            value: date || '',
                            minDate: this.props.minDate || null,
                            maxDate: this.props.maxDate || null,
                            hasClear: false,
                            onChange: this.handleChange('date'),
                            errorText: this.props.errorText
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: { width: 80 } },
                        _react2.default.createElement(_time2.default, {
                            ref: 'time',
                            hintText: '\u65F6\u95F4',
                            value: time || '',
                            hasClear: false,
                            errorText: this.props.errorText ? ' ' : undefined,
                            onChange: this.handleChange('time'),
                            minuteStep: this.props.minuteStep
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'relative', style: { flexGrow: 1 } },
                        _react2.default.createElement(_text2.default, {
                            errorText: this.props.errorText ? ' ' : undefined
                        }),
                        _react2.default.createElement('div', { className: 'full-screen', onClick: function onClick() {
                                _this2.refs.date.focus();
                            } })
                    )
                ),
                (!this.isEmpty(date) || !this.isEmpty(time)) && this.props.hasClear && !this.props.disabled && !this.props.immutable ? _react2.default.createElement(_IconButton2.default, { iconClassName: 'iconfont icon-close-circle-fill', onClick: this.handleClear,
                    style: (0, _extends3.default)({ position: 'absolute', right: 0 }, styleProps.iconStyle.style),
                    iconStyle: (0, _extends3.default)({ color: '#e0e0e0' }, styleProps.iconStyle.iconStyle)

                }) : null
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
    maxDate: undefined,
    defaultDate: undefined,
    defaultTime: undefined,
    minuteStep: 15 };
exports.default = DateTime;