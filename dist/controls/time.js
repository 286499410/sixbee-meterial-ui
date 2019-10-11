'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactCustomScrollbars = require('react-custom-scrollbars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Time = function (_Component) {
    (0, _inherits3.default)(Time, _Component);

    function Time(props) {
        (0, _classCallCheck3.default)(this, Time);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Time.__proto__ || (0, _getPrototypeOf2.default)(Time)).call(this, props));

        _this.state = {
            value: undefined,
            open: false,
            popoverWidth: 100
        };

        _this.handleChange = function (type, value) {
            return function (event) {
                var hour = _this.getHour();
                var minute = _this.getMinute();
                switch (type) {
                    case 'hour':
                        _this.refs.hour.scrollTop(_this.refs.hour.getScrollTop() + (0, _jquery2.default)(_this.refs['hour' + value]).position().top);
                        hour = value;
                        break;
                    case 'minute':
                        _this.refs.minute.scrollTop(_this.refs.minute.getScrollTop() + (0, _jquery2.default)(_this.refs['minute' + value]).position().top);
                        minute = value;
                        _this.state.open = false;
                        break;
                }
                _this.setValue(hour + ':' + minute);
            };
        };

        _this.handleFocus = function (event) {
            _this.setState({
                open: true,
                anchorEl: _this.refs.container,
                width: (0, _jquery2.default)(_this.refs.container).width()
            });
            setTimeout(function () {
                var hour = _this.getHour();
                var minute = _this.getMinute();
                _this.refs.hour.scrollTop(_this.refs.hour.getScrollTop() + (0, _jquery2.default)(_this.refs['hour' + hour]).position().top);
                _this.refs.minute.scrollTop(_this.refs.minute.getScrollTop() + (0, _jquery2.default)(_this.refs['minute' + minute]).position().top);
            }, 50);
            if (_this.props.onFocus) {
                _this.props.onFocus(event, _this);
            }
        };

        _this.handleBlur = function (event) {
            var value = event.target.value;
            if (_this.state.value !== value) {
                _this.setValue(value);
            }
        };

        _this.handleRequestClose = function (event) {
            _this.setState({ open: false });
        };

        _this.handleClear = function (event) {
            _this.setValue('');
        };

        _this.focus = function () {
            _this.refs.text.focus();
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
            this.state.value = props.value;
        }
    }, {
        key: 'getHours',
        value: function getHours() {
            var hours = [];
            for (var i = 0; i < 24; i++) {
                hours.push(i.toString().padStart(2, '0'));
            }
            return hours;
        }
    }, {
        key: 'getMinutes',
        value: function getMinutes() {
            var minutes = [];
            for (var i = 0; i < 60; i += this.props.minuteStep) {
                minutes.push(i.toString().padStart(2, '0'));
            }
            return minutes;
        }
    }, {
        key: 'getHour',
        value: function getHour() {
            var value = this.state.value || '';
            return value.split(':')[0] || this.props.defaultHour;
        }
    }, {
        key: 'getMinute',
        value: function getMinute() {
            var value = this.state.value || '';
            return value.split(':')[1] || this.props.defaultMinute;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            if (value !== undefined && value !== '' && /^[0-5]\d:[0-5]\d$/.test(value)) {
                this.setState({ value: value });
                if (this.props.onChange) {
                    this.props.onChange(value);
                }
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value === undefined ? this.props.defaultValue : this.state.value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var label = this.props.label;
            var styleProps = _style2.default.getStyle('text', this.props);
            var currentHour = this.getHour();
            var currentMinute = this.getMinute();
            var value = this.getValue();
            return _react2.default.createElement(
                'div',
                { ref: 'container', style: { position: 'relative' } },
                _react2.default.createElement(_text2.default, {
                    ref: 'text',
                    name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                    fullWidth: this.props.fullWidth,
                    value: value,
                    floatingLabelText: label,
                    floatingLabelFixed: this.props.labelFixed,
                    onChange: this.handleChange,
                    disabled: this.props.disabled,
                    floatingLabelStyle: styleProps.floatingLabelStyle,
                    floatingLabelFocusStyle: styleProps.floatingLabelFocusStyle,
                    floatingLabelShrinkStyle: styleProps.floatingLabelShrinkStyle,
                    errorStyle: styleProps.errorStyle,
                    hintStyle: styleProps.hintStyle,
                    underlineStyle: styleProps.underlineStyle,
                    inputStyle: styleProps.inputStyle,
                    hintText: this.props.hintText,
                    onFocus: this.handleFocus,
                    onBlur: this.handleBlur,
                    errorText: this.props.errorText
                }),
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
                        { className: 'flex', style: { width: this.state.popoverWidth } },
                        _react2.default.createElement(
                            'div',
                            { className: 'relative', style: { maxHeight: 210, height: 210, width: 'calc(50% + 1px)', borderRight: '1px solid #e5e5e5' } },
                            _react2.default.createElement(
                                _reactCustomScrollbars.Scrollbars,
                                { ref: 'hour', autoHide: true },
                                this.getHours().map(function (hour) {
                                    var selected = currentHour == hour;
                                    return _react2.default.createElement(
                                        'div',
                                        { key: hour,
                                            ref: 'hour' + hour,
                                            className: "space-small text-center hover-bg cursor-pointer" + (selected ? " bg-gray" : ""),
                                            onClick: _this2.handleChange('hour', hour) },
                                        hour
                                    );
                                }),
                                _react2.default.createElement('div', { style: { height: 210 - 35 } })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'relative', style: { maxHeight: 210, height: 210, width: '50%' } },
                            _react2.default.createElement(
                                _reactCustomScrollbars.Scrollbars,
                                { ref: 'minute', autoHide: true },
                                this.getMinutes().map(function (minute) {
                                    var selected = currentMinute == minute;
                                    return _react2.default.createElement(
                                        'div',
                                        { key: minute,
                                            ref: 'minute' + minute,
                                            className: "space-small text-center hover-bg cursor-pointer" + (selected ? " bg-gray" : ""),
                                            onClick: _this2.handleChange('minute', minute) },
                                        minute
                                    );
                                }),
                                _react2.default.createElement('div', { style: { height: 210 - 35 } })
                            )
                        )
                    )
                )
            );
        }
    }]);
    return Time;
}(_react.Component);

Time.defaultProps = {
    autoOk: true,
    format: "24hr",
    minutesStep: 5,
    label: undefined,
    borderShow: true,
    hasClear: true,
    disabled: false,
    immutable: false,
    fullWidth: true,
    labelFixed: false,
    hintText: undefined,
    errorText: undefined,
    defaultValue: undefined,
    defaultHour: '12',
    defaultMinute: '00',
    minuteStep: 15 };
exports.default = Time;