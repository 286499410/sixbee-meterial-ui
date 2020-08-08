"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _tool = require("../../lib/tool");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_React$Component) {
    (0, _inherits3.default)(Header, _React$Component);

    function Header(props) {
        (0, _classCallCheck3.default)(this, Header);
        return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).call(this, props));
    }

    (0, _createClass3.default)(Header, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: (0, _tool.joinBlankSpace)("header", this.props.className), style: (0, _extends3.default)({
                        height: this.props.height,
                        minHeight: this.props.height
                    }, this.props.style) },
                this.props.children
            );
        }
    }]);
    return Header;
}(_react2.default.Component);

Header.defaultProps = {
    height: 48
};
exports.default = Header;