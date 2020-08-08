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

var _tool = require('./tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function (_Component) {
    (0, _inherits3.default)(Icon, _Component);

    function Icon() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Icon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Icon.__proto__ || (0, _getPrototypeOf2.default)(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            _this.props.onClick && _this.props.onClick(event);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Icon, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('i', { className: (0, _tool.joinBlankSpace)(this.props.classPrefix + this.props.name, this.props.className, this.props.onClick && 'cursor-pointer'), style: this.props.style, onClick: this.handleClick });
        }
    }]);
    return Icon;
}(_react.Component);

Icon.defaultProps = {
    classPrefix: 'iconfont icon-',
    name: undefined,
    onClick: undefined
};
exports.default = Icon;