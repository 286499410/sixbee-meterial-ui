'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _page = require('../page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pager = function (_Component) {
    (0, _inherits3.default)(Pager, _Component);

    function Pager(props) {
        (0, _classCallCheck3.default)(this, Pager);
        return (0, _possibleConstructorReturn3.default)(this, (Pager.__proto__ || (0, _getPrototypeOf2.default)(Pager)).call(this, props));
    }

    (0, _createClass3.default)(Pager, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var props = (0, _assign2.default)({}, _.isFunction(this.context.props.pager) ? this.context.props.pager(this.context.Table) : this.context.props.pager);
            return _react2.default.createElement(
                'div',
                { className: 'table-pager clearfix ' + (this.context.props.bordered ? 'bordered' : '') },
                _react2.default.createElement(
                    'div',
                    { className: 'pull-right', style: { marginRight: 12 } },
                    _react2.default.createElement(_page2.default, (0, _extends3.default)({}, props, { onChange: function onChange(data) {
                            _this2.context.Table.state.scrollTop = 0;
                            _this2.context.Table.state.checked = {};
                            _this2.context.Table.handleStateChange();
                            _this2.context.Table.forceUpdate();
                            props.onChange(data);
                        } }))
                )
            );
        }
    }]);
    return Pager;
}(_react.Component);

Pager.contextTypes = {
    Table: _propTypes2.default.object,
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setTableState: _propTypes2.default.func,
    handleStateChange: _propTypes2.default.func,
    getDataRows: _propTypes2.default.func
};
exports.default = Pager;