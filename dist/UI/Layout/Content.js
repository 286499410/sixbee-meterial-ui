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

var _tool = require('../../lib/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = function (_React$Component) {
    (0, _inherits3.default)(Content, _React$Component);

    function Content(props) {
        (0, _classCallCheck3.default)(this, Content);
        return (0, _possibleConstructorReturn3.default)(this, (Content.__proto__ || (0, _getPrototypeOf2.default)(Content)).call(this, props));
    }

    (0, _createClass3.default)(Content, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: (0, _tool.joinBlankSpace)("content", this.props.className), style: this.props.style },
                this.props.children
            );
        }
    }]);
    return Content;
}(_react2.default.Component);

Content.defaultProps = {
    transition: 'fade'
};
exports.default = Content;