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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _reactDateRange = require('react-date-range');

require('react-date-range/dist/styles.css');

require('react-date-range/dist/theme/default.css');

var _locale = require('react-date-range/dist/locale');

var rdrLocales = _interopRequireWildcard(_locale);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Date2 = function (_Component) {
    (0, _inherits3.default)(Date2, _Component);

    function Date2(props) {
        (0, _classCallCheck3.default)(this, Date2);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Date2.__proto__ || (0, _getPrototypeOf2.default)(Date2)).call(this, props));

        _this.state = {
            anchorEl: {},
            value: undefined,
            open: false,
            focus: false
        };

        _this.handleTextChange = function (event) {
            if (event.target.value === '') {
                _this.setValue('');
            }
        };

        _this.handleChange = function (date) {
            var value = _utils2.default.dateToStr(date);
            _this.setValue(value);
            _this.setState({
                open: false
            });
        };

        _this.handleBlur = function (event) {
            _this.setState({ focus: false });
            if (_this.props.onBlur) {
                _this.props.onBlur(event, _this);
            }
        };

        _this.handleFocus = function (event) {
            _this.setState({
                open: true,
                focus: true,
                anchorEl: _this.refs.container
            });
            if (_this.props.onFocus) {
                _this.props.onFocus(event, _this);
            }
        };

        _this.handleKeyUp = function (event) {
            if (_this.props.onKeyUp) {
                _this.props.onKeyUp(event, _this);
            }
        };

        _this.handleClear = function (event) {
            _this.setValue('');
        };

        _this.handleRequestClose = function (event) {
            _this.setState({ open: false });
        };

        _this.focus = function () {
            _this.refs.text.focus();
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
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (_.isEqual(this.state, nextState) && _.isEqual(this.props, nextProps)) {
                return false;
            }
            return true;
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.hasOwnProperty('value')) {
                var value = props.value;
                if (this.props.timestamp && value !== undefined && value !== null && value !== '') {
                    value = _utils2.default.date('Y-m-d', value);
                }
                this.state.value = value;
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.state.value = value;
            this.forceUpdate();
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
            var styleProps = _style2.default.getStyle('calender', this.props);
            var borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
            if (borderStyle == 'border') {
                styleProps.iconStyle.style.right = 0;
                styleProps.iconStyle.style.top = 3;
            }
            var textField = _react2.default.createElement(_TextField2.default, {
                ref: 'text',
                name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                fullWidth: this.props.fullWidth,
                floatingLabelText: label,
                type: 'text',
                value: value === null || value === undefined ? '' : value,
                disabled: this.props.disabled,
                onChange: this.handleTextChange,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onKeyUp: this.handleKeyUp,
                multiLine: this.props.multiLine,
                rows: this.props.rows,
                hintText: this.props.hintText,
                errorText: borderStyle === "underline" ? this.props.errorText : undefined,
                floatingLabelFixed: this.props.labelFixed,
                underlineShow: borderStyle === 'underline' && this.props.borderShow,
                autoComplete: 'off',
                textareaStyle: styleProps.textareaStyle,
                floatingLabelStyle: styleProps.floatingLabelStyle,
                floatingLabelFocusStyle: styleProps.floatingLabelFocusStyle,
                floatingLabelShrinkStyle: styleProps.floatingLabelShrinkStyle,
                errorStyle: (0, _extends3.default)({}, styleProps.errorStyle, this.props.errorStyle),
                hintStyle: styleProps.hintStyle,
                underlineStyle: styleProps.underlineStyle,
                inputStyle: styleProps.inputStyle,
                style: styleProps.style
            });
            return _react2.default.createElement(
                'div',
                { ref: 'container', style: (0, _extends3.default)({ position: 'relative' }, this.props.rootStyle) },
                borderStyle === 'border' && this.props.borderShow ? _react2.default.createElement(
                    'div',
                    { className: 'full-width' },
                    _react2.default.createElement(
                        'div',
                        { className: "control-border" + (this.state.focus ? ' focus' : '') + (this.props.errorText ? ' error' : '') },
                        textField
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'text-small text-danger', style: { marginTop: 2 } },
                        this.props.errorText
                    )
                ) : textField,
                value !== undefined && value !== null && value !== '' && this.props.hasClear && !this.props.disabled && !this.props.immutable ? _react2.default.createElement(_IconButton2.default, { iconClassName: 'iconfont icon-close-circle-fill', onClick: this.handleClear,
                    style: (0, _extends3.default)({ position: 'absolute', right: 0 }, styleProps.iconStyle.style),
                    iconStyle: (0, _extends3.default)({ color: "rgba(0,0,0,0.3)" }, styleProps.iconStyle.iconStyle)

                }) : null,
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        ref: 'popover',
                        style: styleProps.popoverStyle,
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: this.handleRequestClose },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_reactDateRange.Calendar, {
                            locale: rdrLocales['zhCN'],
                            date: value ? _utils2.default.strToDate(value) : new Date(),
                            onChange: this.handleChange,
                            minDate: this.props.minDate ? _utils2.default.strToDate(this.props.minDate) : undefined,
                            maxDate: this.props.maxDate ? _utils2.default.strToDate(this.props.maxDate) : undefined
                        })
                    )
                )
            );
        }
    }]);
    return Date2;
}(_react.Component);

Date2.defaultProps = {
    label: undefined,
    borderShow: true,
    timestamp: false,
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
Date2.contextTypes = {
    muiTheme: _propTypes2.default.object
};
exports.default = Date2;