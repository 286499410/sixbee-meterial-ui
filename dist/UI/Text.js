"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tool = require("./tool");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function (_Component) {
    (0, _inherits3.default)(Text, _Component);

    function Text(props) {
        (0, _classCallCheck3.default)(this, Text);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).call(this, props));

        _this.state = {
            focus: false
        };

        _this.handleChange = function (event) {
            var value = event.target.value;
            _this.props.onChange && _this.props.onChange({ value: value });
        };

        _this.handleFocus = function (event) {
            _this.setState({ focus: true });
            _this.props.onFocus && _this.props.onFocus({ event: event });
        };

        _this.handleBlur = function (event) {
            _this.setState({ focus: false });
            _this.props.onBlur && _this.props.onBlur({ event: event });
        };

        _this.handleClick = function (event) {
            _this.focus();
        };

        _this.input = _react2.default.createRef();
        return _this;
    }

    (0, _createClass3.default)(Text, [{
        key: "focus",
        value: function focus() {
            if (this.input && this.input.current) {
                this.input.current.focus();
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: (0, _tool.joinBlankSpace)("form-control", this.props.className, this.state.focus && "focus", this.props.size), style: this.props.style, onClick: this.handleClick },
                (0, _tool.renderLeftIcon)(this.props),
                _react2.default.createElement("input", {
                    className: "clear-style grow",
                    type: this.props.type,
                    ref: this.input,
                    style: this.props.inputStyle,
                    onBlur: this.handleBlur,
                    onFocus: this.handleFocus,
                    value: this.props.value,
                    defaultValue: this.props.defaultValue,
                    placeholder: this.props.placeholder,
                    onChange: this.handleChange }),
                (0, _tool.renderRightIcon)(this.props)
            );
        }
    }]);
    return Text;
}(_react.Component);

Text.defaultProps = {
    type: 'text',
    className: undefined,
    style: undefined,
    inputStyle: undefined,
    onChange: undefined,
    onBlur: undefined,
    onFocus: undefined,
    value: undefined,
    defaultValue: undefined,
    leftIcon: undefined,
    rightIcon: undefined,
    placeholder: undefined,
    size: undefined
};
exports.default = Text;


Text.propTypes = {
    type: _propTypes2.default.string,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    inputStyle: _propTypes2.default.object,
    onChange: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    placeholder: _propTypes2.default.string,
    size: _propTypes2.default.string
};