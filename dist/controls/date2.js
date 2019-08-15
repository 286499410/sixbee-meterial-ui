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

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _intlLocalesSupported = require('intl-locales-supported');

var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimeFormat = void 0;

if ((0, _intlLocalesSupported2.default)(['zh'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    var IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/zh');
}

var Date2 = function (_Component) {
    (0, _inherits3.default)(Date2, _Component);

    function Date2(props) {
        (0, _classCallCheck3.default)(this, Date2);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Date2.__proto__ || (0, _getPrototypeOf2.default)(Date2)).call(this, props));

        _this.state = {
            value: undefined
        };

        _this.handleChange = function (nul, date) {
            if (!_this.props.immutable) {
                var value = _utils2.default.dateToStr(date);
                _this.setValue(value);
            }
        };

        _this.handleClear = function (event) {
            _this.setValue('');
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Date2, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.value !== undefined) {
                var value = props.value;
                if (this.props.timestamp) {
                    value = _utils2.default.date('Y-m-d', value);
                }
                this.state.value = value;
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.setState({ value: value });
            if (this.props.onChange) {
                if (value && this.props.timestamp) {
                    value = _utils2.default.strToTime(value);
                }
                this.props.onChange(value, this);
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value === undefined ? this.props.defaultValue === undefined ? '' : this.props.defaultValue : this.state.value;
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
                _react2.default.createElement(_DatePicker2.default, {
                    ref: 'picker',
                    name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                    fullWidth: this.props.fullWidth,
                    value: _utils2.default.strToDate(value),
                    defaultDate: _utils2.default.strToDate(value),
                    floatingLabelText: label,
                    floatingLabelFixed: this.props.labelFixed,
                    onChange: this.handleChange,
                    autoOk: this.props.autoOk,
                    DateTimeFormat: DateTimeFormat,
                    locale: 'zh',
                    disabled: this.props.disabled,
                    cancelLabel: this.props.cancelLabel,
                    okLabel: this.props.okLabel,
                    minDate: this.props.minDate ? _utils2.default.strToDate(this.props.minDate) : null,
                    maxDate: this.props.maxDate ? _utils2.default.strToDate(this.props.maxDate) : null,
                    formatDate: _utils2.default.dateToStr,
                    textFieldStyle: (0, _extends3.default)({}, styleProps.style, { cursor: 'pointer' }),
                    floatingLabelStyle: styleProps.floatingLabelStyle,
                    floatingLabelFocusStyle: styleProps.floatingLabelFocusStyle,
                    floatingLabelShrinkStyle: styleProps.floatingLabelShrinkStyle,
                    errorStyle: styleProps.errorStyle,
                    hintStyle: styleProps.hintStyle,
                    underlineShow: this.props.borderShow,
                    underlineStyle: styleProps.underlineStyle,
                    inputStyle: styleProps.inputStyle,
                    container: this.props.container,
                    errorText: this.props.errorText
                }),
                value && this.props.hasClear && !this.props.disabled ? _react2.default.createElement(_IconButton2.default, { iconClassName: 'iconfont icon-close-circle-fill', onClick: this.handleClear,
                    style: (0, _extends3.default)({ position: 'absolute', right: 0 }, styleProps.iconStyle.style),
                    iconStyle: (0, _extends3.default)({ color: '#e0e0e0' }, styleProps.iconStyle.iconStyle) }) : null
            );
        }
    }]);
    return Date2;
}(_react.Component);

Date2.defaultProps = {
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
exports.default = Date2;