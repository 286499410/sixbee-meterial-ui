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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tool = require('../lib/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function (_Component) {
    (0, _inherits3.default)(Button, _Component);

    function Button(props) {
        (0, _classCallCheck3.default)(this, Button);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this, props));

        _this.handleClick = function (event) {
            if (_this.context.Form) {
                if (['reset', 'submit'].indexOf(_this.props.type) >= 0) {
                    _this.context.Form[_this.props.type]();
                }
            }
            if (_this.props.onClick) {
                _this.props.onClick(event);
            }
        };

        return _this;
    }

    (0, _createClass3.default)(Button, [{
        key: 'render',
        value: function render() {
            console.log("render Button");
            return _react2.default.createElement(
                'button',
                { className: (0, _tool.joinBlankSpace)("btn ripple", this.props.className), style: this.props.style, onClick: this.handleClick },
                this.props.children
            );
        }
    }]);
    return Button;
}(_react.Component);

Button.defaultProps = {
    style: undefined,
    type: 'button',
    onClick: undefined
};
Button.contextTypes = {
    Form: _propTypes2.default.object
};
exports.default = Button;


Button.propTypes = {
    style: _propTypes2.default.object,
    type: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};