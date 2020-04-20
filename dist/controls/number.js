'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Number = function (_Component) {
    (0, _inherits3.default)(Number, _Component);

    function Number(props) {
        (0, _classCallCheck3.default)(this, Number);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Number.__proto__ || (0, _getPrototypeOf2.default)(Number)).call(this, props));

        _this.state = {
            value: undefined,
            errorText: '',
            focus: false
        };

        _this.setValue = function (value) {
            _this.state.value = value;
            if (_this.props.onChange) {
                _this.props.onChange(value, _this);
            }
            _this.forceUpdate();
        };

        _this.handleChange = function (event) {
            var value = event.target.value;
            if (!_this.props.immutable) {
                if (!/^-?\d*((\.\d*)?)$/.test(value)) {
                    return;
                }
                _this.setValue(value);
            }
        };

        _this.handleBlur = function (event) {
            _this.state.focus = false;
            var float = _this.getFloat();
            if (float) {
                var value = _this.getValue();
                if (value === undefined || value === null || value === '') {
                    _this.forceUpdate();
                    return;
                }
                value = _utils2.default.toFixed(value, float);
                if (_this.state.value !== value) {
                    _this.setValue(_utils2.default.toFixed(value, float));
                } else {
                    _this.forceUpdate();
                }
            } else {
                _this.forceUpdate();
            }
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
            if (event.keyCode == 13 && _this.props.onEnter) {
                _this.props.onEnter(event, _this);
            }
        };

        _this.focus = function () {
            _this.refs.text.focus();
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Number, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (_lodash2.default.isEqual(this.state, nextState) && _lodash2.default.isEqual(this.props, nextProps)) {
                return false;
            }
            return true;
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.hasOwnProperty('value')) {
                this.state.value = props.value;
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
                styleProps.inputStyle = (0, _assign2.default)({}, styleProps.inputStyle, { textAlign: this.props.textAlign });
            }
            return _lodash2.default.merge(styleProps, this.props.styleProps);
        }
    }, {
        key: 'getFloat',
        value: function getFloat() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            if (_lodash2.default.isFunction(props.float)) {
                return props.float();
            }
            return props.float;
        }
    }, {
        key: 'render',
        value: function render() {
            var borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
            var value = this.getValue();
            var label = this.props.label;
            var styleProps = this.getStyleProps();
            var textField = _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
                ref: 'text',
                name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                fullWidth: this.props.fullWidth,
                floatingLabelText: label,
                type: "text",
                value: value == null ? '' : value,
                disabled: this.props.disabled,
                onChange: this.handleChange,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onKeyUp: this.handleKeyUp,
                multiLine: this.props.multiLine,
                rows: this.props.rows,
                hintText: this.props.hintText,
                errorText: borderStyle === 'underline' ? this.props.errorText : undefined,
                floatingLabelFixed: this.props.labelFixed,
                underlineShow: borderStyle === 'underline' && this.props.borderShow,
                autoComplete: this.props.autoComplete
            }, styleProps));
            var content = textField;
            if (this.props.leftIcon) {
                content = _react2.default.createElement(
                    'div',
                    { className: 'flex middle', style: this.props.rootStyle },
                    _react2.default.createElement(
                        'div',
                        { style: { paddingRight: 8 } },
                        _react2.default.createElement(_icon2.default, { name: this.props.leftIcon })
                    ),
                    textField
                );
            }
            if (borderStyle === 'border' && this.props.borderShow) {
                return _react2.default.createElement(
                    'div',
                    { className: 'full-width', style: this.props.rootStyle },
                    _react2.default.createElement(
                        'div',
                        {
                            className: "control-border" + (this.state.focus ? ' focus' : '') + (this.props.errorText ? ' error' : '') },
                        content
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'text-small text-danger', style: { marginTop: 2 } },
                        this.props.errorText
                    )
                );
            } else {
                return content;
            }
        }
    }]);
    return Number;
}(_react.Component);

Number.defaultProps = {
    label: undefined,
    defaultValue: undefined,
    type: 'text',
    disabled: false,
    immutable: false,
    multiLine: false,
    borderShow: true,
    rows: 1,
    fullWidth: true,
    hintText: undefined,
    errorText: undefined,
    labelFixed: false,
    autoComplete: "off",
    textAlign: undefined,
    styleProps: {},
    borderStyle: undefined,
    float: undefined };
Number.contextTypes = {
    muiTheme: _propTypes2.default.object
};
exports.default = Number;