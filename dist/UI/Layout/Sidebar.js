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

var Sidebar = function (_React$Component) {
    (0, _inherits3.default)(Sidebar, _React$Component);

    function Sidebar(props) {
        (0, _classCallCheck3.default)(this, Sidebar);
        return (0, _possibleConstructorReturn3.default)(this, (Sidebar.__proto__ || (0, _getPrototypeOf2.default)(Sidebar)).call(this, props));
    }

    (0, _createClass3.default)(Sidebar, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: (0, _tool.joinBlankSpace)("sidebar", this.props.className),
                    style: (0, _extends3.default)({ width: this.props.width, minWidth: this.props.width }, this.props.style) },
                this.props.children
            );
        }
    }]);
    return Sidebar;
}(_react2.default.Component);

Sidebar.defaultProps = {
    width: 200
};
exports.default = Sidebar;