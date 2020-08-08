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

var _tool = require('../../lib/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableBody = function (_Component) {
    (0, _inherits3.default)(TableBody, _Component);

    function TableBody(props) {
        (0, _classCallCheck3.default)(this, TableBody);
        return (0, _possibleConstructorReturn3.default)(this, (TableBody.__proto__ || (0, _getPrototypeOf2.default)(TableBody)).call(this, props));
    }

    (0, _createClass3.default)(TableBody, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: (0, _tool.joinBlankSpace)("table-footer", this.props.className), style: this.props.style });
        }
    }]);
    return TableBody;
}(_react.Component);

TableBody.contextTypes = {
    Form: _propTypes2.default.object
};
exports.default = TableBody;