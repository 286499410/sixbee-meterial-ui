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

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _reactCalendar = require('react-calendar');

var _reactCalendar2 = _interopRequireDefault(_reactCalendar);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = function (_Component) {
    (0, _inherits3.default)(Calendar, _Component);

    function Calendar(props) {
        (0, _classCallCheck3.default)(this, Calendar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call(this, props));

        _this.state = {
            anchorEl: {},
            value: undefined,
            open: false
        };

        _this.handleTextChange = function (event) {
            if (event.target.value === '') {
                _this.setValue('');
            }
        };

        _this.handleChange = function (date) {
            var value = _utils2.default.dateToStr(date);
            if (_this.props.onChange) {
                _this.props.onChange(value, _this);
            }
            _this.setState({
                value: value,
                open: false
            });
        };

        _this.handleBlur = function (event) {
            if (_this.props.onBlur) {
                _this.props.onBlur(event, _this);
            }
        };

        _this.handleFocus = function (event) {
            _this.setState({
                open: true,
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

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Calendar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.value !== undefined) {
                this.state.value = props.value;
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.setState({ value: value });
            if (this.props.onChange) {
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
            return _react2.default.createElement(
                'div',
                { ref: 'container', style: { position: 'relative' } },
                _react2.default.createElement(_TextField2.default, {
                    ref: 'text',
                    name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                    fullWidth: this.props.fullWidth,
                    floatingLabelText: label,
                    type: 'text',
                    value: value,
                    disabled: this.props.disabled,
                    onChange: this.handleTextChange,
                    onBlur: this.handleBlur,
                    onFocus: this.handleFocus,
                    onKeyUp: this.handleKeyUp,
                    multiLine: this.props.multiLine,
                    rows: this.props.rows,
                    hintText: this.props.hintText,
                    errorText: this.props.errorText,
                    floatingLabelFixed: this.props.labelFixed,
                    underlineShow: this.props.borderShow,
                    autoComplete: 'off',
                    textareaStyle: styleProps.textareaStyle,
                    floatingLabelStyle: styleProps.floatingLabelStyle,
                    floatingLabelFocusStyle: styleProps.floatingLabelFocusStyle,
                    floatingLabelShrinkStyle: styleProps.floatingLabelShrinkStyle,
                    errorStyle: styleProps.errorStyle,
                    hintStyle: styleProps.hintStyle,
                    underlineStyle: styleProps.underlineStyle,
                    inputStyle: styleProps.inputStyle,
                    style: styleProps.style
                }),
                value !== undefined && value !== null && value !== '' && this.props.hasClear && !this.props.disabled && !this.props.immutable ? _react2.default.createElement(_IconButton2.default, { iconClassName: 'iconfont icon-close-circle-fill', onClick: this.handleClear,
                    style: (0, _extends3.default)({ position: 'absolute', right: 0 }, styleProps.iconStyle.style),
                    iconStyle: (0, _extends3.default)({ color: '#e0e0e0' }, styleProps.iconStyle.iconStyle)

                }) : null,
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        ref: 'popover',
                        style: styleProps.popoverStyle,
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: this.handleRequestClose
                    },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_reactCalendar2.default, {
                            onChange: this.handleChange,
                            value: _utils2.default.strToDate(value),
                            activeStartDate: this.props.activeStartDate ? _utils2.default.strToDate(this.props.activeStartDate) : null,
                            minDate: this.props.minDate ? _utils2.default.strToDate(this.props.minDate) : null,
                            maxDate: this.props.maxDate ? _utils2.default.strToDate(this.props.maxDate) : null
                        })
                    )
                )
            );
        }
    }]);
    return Calendar;
}(_react.Component);

Calendar.defaultProps = {
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
exports.default = Calendar;