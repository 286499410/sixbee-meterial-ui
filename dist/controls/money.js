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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Money = function (_Component) {
    (0, _inherits3.default)(Money, _Component);

    function Money(props) {
        (0, _classCallCheck3.default)(this, Money);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Money.__proto__ || (0, _getPrototypeOf2.default)(Money)).call(this, props));

        _this.state = {
            value: undefined,
            focus: false
        };

        _this.setValue = function (value) {
            value = _lodash2.default.trim(value);
            if (/^-?\d{0,3}((,\d{3})*)((,\d{0,3})?)((\.\d{0,9})?)$/.test(value) || /^-?\d*((\.\d{0,9})?)$/.test(value)) {
                var number = value === '' ? '' : _utils2.default.round(_utils2.default.parseNumber(value), _this.props.float);
                _this.setState({
                    value: number
                });
                if (_this.props.onChange) {
                    _this.props.onChange(number, _this);
                }
            }
        };

        _this.handleChange = function (event) {
            if (!_this.props.immutable) {
                var value = event.target.value;
                _this.setValue(value);
            }
        };

        _this.handleBlur = function (event) {
            _this.state.value = _this.state.value !== '' && _this.state.value !== undefined ? _utils2.default.parseNumber(_this.state.value) : _this.state.value;
            _this.setState({ focus: false });
            if (_this.props.onBlur) {
                _this.props.onBlur(event, _this);
            }
        };

        _this.handleFocus = function (event) {
            _this.setState({ focus: true });
            if (_this.props.onFocus) {
                _this.props.onFocus(event, _this);
            }
        };

        _this.handleKeyUp = function (event) {
            if (_this.props.onKeyUp) {
                _this.props.onKeyUp(event, _this);
            }
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Money, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.hasOwnProperty('value')) {
                this.state.value = props.value === '' ? '' : _utils2.default.round(_utils2.default.parseNumber(props.value), props.float);
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value === undefined ? this.props.defaultValue === undefined ? '' : this.props.defaultValue : this.state.value;
        }
    }, {
        key: 'getStyleProps',
        value: function getStyleProps() {
            var styleProps = _style2.default.getStyle('text', this.props);
            if (this.props.textAlign) {
                styleProps.inputStyle = (0, _extends3.default)({}, styleProps.inputStyle, {
                    textAlign: this.props.textAlign
                });
            }
            if (!this.state.focus && this.state.value < 0) {
                styleProps.inputStyle = (0, _extends3.default)({}, styleProps.inputStyle, this.props.deficitStyle);
            }
            return styleProps;
        }
    }, {
        key: 'render',
        value: function render() {
            var borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
            var value = this.getValue();
            var label = this.props.label;
            var styleProps = this.getStyleProps();
            if (!this.state.focus) {
                if (!this.props.showZero && value == 0) {
                    value = '';
                } else {
                    value = value !== '' ? _utils2.default.parseMoney(value, this.props.float) : '';
                }
            }
            var textField = _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
                name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                fullWidth: this.props.fullWidth,
                floatingLabelText: label,
                type: 'text',
                value: value,
                disabled: this.props.disabled,
                onChange: this.handleChange,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onKeyUp: this.handleKeyUp,
                hintText: this.props.hintText,
                errorText: this.props.errorText,
                floatingLabelFixed: this.props.labelFixed,
                underlineShow: borderStyle === 'underline' && this.props.borderShow,
                autoComplete: this.props.autoComplete
            }, styleProps));
            if (borderStyle === 'border' && this.props.borderShow) {
                return _react2.default.createElement(
                    'div',
                    { className: "control-border" + (this.state.focus ? ' focus' : '') },
                    textField
                );
            } else {
                return textField;
            }
        }
    }]);
    return Money;
}(_react.Component);

Money.defaultProps = {

    label: undefined,
    defaultValue: undefined,
    disabled: false,
    immutable: false,
    borderShow: true,
    fullWidth: true,
    hintText: undefined,
    errorText: undefined,
    labelFixed: false,
    autoComplete: "off",
    textAlign: undefined,
    styleProps: {},
    float: 2,
    deficitStyle: { color: 'red' },
    showZero: true };
Money.contextTypes = {
    muiTheme: _propTypes2.default.object
};
exports.default = Money;