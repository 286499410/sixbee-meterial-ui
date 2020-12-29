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

var _icon = require("../icon");

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function (_React$Component) {
    (0, _inherits3.default)(Checkbox, _React$Component);

    function Checkbox(props) {
        (0, _classCallCheck3.default)(this, Checkbox);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).call(this, props));

        _this.handleClick = function (event) {
            var isInputChecked = _this.props.checked != 1 ? 1 : 0;
            if (_this.props.onCheck) {
                _this.props.onCheck(event, isInputChecked);
            }
        };

        return _this;
    }

    (0, _createClass3.default)(Checkbox, [{
        key: "getIconName",
        value: function getIconName() {
            return {
                0: "border",
                1: "check-square-fill",
                2: "minus-square-fill"
            }[this.props.checked];
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(_icon2.default, { type: "button",
                size: this.props.size,
                name: this.getIconName(),
                onClick: this.handleClick,
                className: this.props.checked == 1 || this.props.checked == 2 ? "text-primary" : "",
                color: " ",
                padding: 2,
                iconStyle: {
                    transition: "none"
                }
            });
        }
    }]);
    return Checkbox;
}(_react2.default.Component);

Checkbox.defaultProps = {
    checked: 0,
    onCheck: undefined,
    size: 20
};
exports.default = Checkbox;