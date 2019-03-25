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

var _List = require('material-ui/List');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaterialList = function (_Component) {
    (0, _inherits3.default)(MaterialList, _Component);

    function MaterialList() {
        (0, _classCallCheck3.default)(this, MaterialList);
        return (0, _possibleConstructorReturn3.default)(this, (MaterialList.__proto__ || (0, _getPrototypeOf2.default)(MaterialList)).apply(this, arguments));
    }

    (0, _createClass3.default)(MaterialList, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _List.List,
                null,
                this.props.dataSource.map(function (data, index) {
                    return _react2.default.createElement(_List.ListItem, { style: { fontSize: 14 }, innerDivStyle: { padding: 12 }, key: index, primaryText: data.label, leftIcon: data.icon, onClick: data.onClick });
                })
            );
        }
    }]);
    return MaterialList;
}(_react.Component);

MaterialList.defaultProps = {
    dataSource: []
};
exports.default = MaterialList;