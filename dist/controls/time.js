'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _TimePicker = require('material-ui/TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Time = function (_Component) {
    (0, _inherits3.default)(Time, _Component);

    function Time(props) {
        (0, _classCallCheck3.default)(this, Time);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Time.__proto__ || (0, _getPrototypeOf2.default)(Time)).call(this, props));

        _this.state = {
            value: undefined,
            date: undefined
        };

        _this.handleChange = function (event, date) {
            var value = _utils2.default.dateToTimeStr(date);
            _this.setValue(value);
        };

        _this.toTime = function (str) {
            if (str === undefined || str === '') {
                return undefined;
            } else if (_lodash2.default.isDate(str)) {
                return str;
            } else {
                str = '1970/01/01 ' + str;
                return new Date(str);
            }
        };

        _this.handleClear = function (event) {
            _this.setValue('');
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Time, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.value !== undefined) {
                this.state.value = props.value;
                if (this.props.onChange) {
                    this.props.onChange(value, this);
                }
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.setState({ value: value });
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value === undefined ? this.props.defaultValue : this.state.value;
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.getValue();
            var label = this.props.label;
            var styleProps = _style2.default.getStyle('date', this.props);
            return _react2.default.createElement(
                'div',
                { style: { position: 'relative' } },
                _react2.default.createElement(_TimePicker2.default, {
                    name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                    fullWidth: this.props.fullWidth,
                    value: this.toTime(value),
                    floatingLabelText: label,
                    floatingLabelFixed: this.props.labelFixed,
                    onChange: this.handleChange,
                    autoOk: this.props.autoOk,
                    disabled: this.props.disabled,
                    format: this.props.format,
                    minutesStep: this.props.minutesStep,
                    cancelLabel: this.props.cancelLabel,
                    okLabel: this.props.okLabel,
                    textFieldStyle: (0, _extends3.default)({}, styleProps.style, { cursor: 'pointer' }),
                    floatingLabelStyle: styleProps.floatingLabelStyle,
                    floatingLabelFocusStyle: styleProps.floatingLabelFocusStyle,
                    floatingLabelShrinkStyle: styleProps.floatingLabelShrinkStyle,
                    errorStyle: styleProps.errorStyle,
                    hintStyle: styleProps.hintStyle,
                    underlineStyle: styleProps.underlineStyle,
                    inputStyle: styleProps.inputStyle
                }),
                value && this.props.hasClear && !this.props.disabled ? _react2.default.createElement(_IconButton2.default, { iconClassName: 'iconfont icon-close-circle-fill', onClick: this.handleClear,
                    style: (0, _extends3.default)({ position: 'absolute', right: 0 }, styleProps.iconStyle.style),
                    iconStyle: (0, _extends3.default)({ color: '#e0e0e0' }, styleProps.iconStyle.iconStyle) }) : null
            );
        }
    }]);
    return Time;
}(_react.Component);

Time.defaultProps = {
    autoOk: true,
    okLabel: "确认",
    cancelLabel: "取消",
    format: "24hr",
    minutesStep: 5,
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
exports.default = Time;