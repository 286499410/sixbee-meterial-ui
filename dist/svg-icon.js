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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIcon = function (_Component) {
    (0, _inherits3.default)(SvgIcon, _Component);

    function SvgIcon() {
        (0, _classCallCheck3.default)(this, SvgIcon);
        return (0, _possibleConstructorReturn3.default)(this, (SvgIcon.__proto__ || (0, _getPrototypeOf2.default)(SvgIcon)).apply(this, arguments));
    }

    (0, _createClass3.default)(SvgIcon, [{
        key: 'render',
        value: function render() {
            var useTag = '<use xlink:href="#icon-' + this.props.name + '"></use>';
            return _react2.default.createElement('svg', { className: 'icon', 'aria-hidden': 'true', style: this.props.style, dangerouslySetInnerHTML: { __html: useTag } });
        }
    }]);
    return SvgIcon;
}(_react.Component);

SvgIcon.defaultProps = {
    name: undefined
};
exports.default = SvgIcon;