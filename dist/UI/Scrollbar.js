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

var _Tool = require("../../Tool");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scrollbar = function (_Component) {
    (0, _inherits3.default)(Scrollbar, _Component);

    function Scrollbar(props) {
        (0, _classCallCheck3.default)(this, Scrollbar);
        return (0, _possibleConstructorReturn3.default)(this, (Scrollbar.__proto__ || (0, _getPrototypeOf2.default)(Scrollbar)).call(this, props));
    }

    (0, _createClass3.default)(Scrollbar, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: (0, _Tool.joinBlankSpace)("scrollbar", this.props.className), style: this.props.style });
        }
    }]);
    return Scrollbar;
}(_react.Component);

exports.default = Scrollbar;