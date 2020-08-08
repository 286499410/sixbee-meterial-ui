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

var _tool = require('./tool');

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _Auto = require('./Auto');

var _Auto2 = _interopRequireDefault(_Auto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Control = function (_Component) {
    (0, _inherits3.default)(Control, _Component);

    function Control(props) {
        (0, _classCallCheck3.default)(this, Control);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Control.__proto__ || (0, _getPrototypeOf2.default)(Control)).call(this, props));

        _this.controlComponent = {
            text: _Text2.default,
            auto: _Auto2.default
        };
        _this.state = {
            focus: false
        };

        _this.handleChange = function (_ref) {
            var value = _ref.value;

            var control = _this;
            if (_this.props.onChange) {
                _this.props.onChange(value, control);
            }
        };

        _this.focus = function () {
            if (_this.control && _this.control.current) {
                if (_this.control.current.focus) {
                    _this.control.current.focus();
                }
            }
        };

        _this.control = _react2.default.createRef();
        return _this;
    }

    (0, _createClass3.default)(Control, [{
        key: 'getValue',
        value: function getValue() {
            if (this.props.hasOwnProperty('value')) {
                return this.props.value;
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.handleChange({ target: { value: value } });
        }
    }, {
        key: 'getErrorText',
        value: function getErrorText() {
            if (this.props.hasOwnProperty('errorText')) {
                return this.props.errorText;
            }
        }
    }, {
        key: 'getControlProps',
        value: function getControlProps() {
            var control = this,
                form = this.context.Form;
            return _.isFunction(this.props.controlProps) ? this.props.controlProps({
                control: control,
                form: form
            }) : this.props.controlProps || {};
        }
    }, {
        key: 'getComponent',
        value: function getComponent() {
            if (this.props.type === 'component') {
                return this.props.component;
            }
            return this.controlComponent[this.props.type] || _Text2.default;
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.getValue();
            var Com = this.getComponent();
            var controlProps = this.getControlProps();
            var errorText = this.getErrorText();
            return _react2.default.createElement(
                'div',
                { className: (0, _tool.joinBlankSpace)("form-group", this.props.groupClassName), style: this.props.groupStyle },
                this.props.label && _react2.default.createElement(
                    'label',
                    null,
                    this.props.label
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'full-width' },
                    _react2.default.createElement(Com, (0, _extends3.default)({
                        ref: this.control,
                        size: this.props.size,
                        value: value === undefined ? '' : value,
                        type: this.props.type,
                        onChange: this.handleChange,
                        onFocus: this.props.onFocus,
                        onBlur: this.props.onBlur,
                        leftIcon: this.props.leftIcon,
                        rightIcon: this.props.rightIcon,
                        placeholder: this.props.placeholder,
                        style: this.props.style,
                        inputStyle: this.props.inputStyle,
                        dataSource: this.props.dataSource,
                        dataSourceConfig: this.props.dataSourceConfig,
                        onCreate: this.props.onCreate,
                        menuProps: this.props.menuProps
                    }, controlProps, {
                        className: (0, _tool.joinBlankSpace)(controlProps.className || this.props.className, errorText && 'control-error')
                    })),
                    _react2.default.createElement(
                        'div',
                        { className: 'control-error-text' },
                        this.getErrorText()
                    )
                )
            );
        }
    }]);
    return Control;
}(_react.Component);

Control.defaultProps = {
    type: 'text',
    name: undefined,
    onChange: undefined,
    clearStyle: false };
exports.default = Control;


Control.propTypes = {
    name: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    observeChangeKeys: _propTypes2.default.array,
    onObserveChange: _propTypes2.default.func
};