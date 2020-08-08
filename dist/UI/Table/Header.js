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

var TableHeader = function (_Component) {
    (0, _inherits3.default)(TableHeader, _Component);

    function TableHeader(props) {
        (0, _classCallCheck3.default)(this, TableHeader);
        return (0, _possibleConstructorReturn3.default)(this, (TableHeader.__proto__ || (0, _getPrototypeOf2.default)(TableHeader)).call(this, props));
    }

    (0, _createClass3.default)(TableHeader, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: (0, _tool.joinBlankSpace)("table-header", this.props.className), style: this.props.style });
        }
    }]);
    return TableHeader;
}(_react.Component);

TableHeader.contextTypes = {
    Form: _propTypes2.default.object
};
exports.default = TableHeader;