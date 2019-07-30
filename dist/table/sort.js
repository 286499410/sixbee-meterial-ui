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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sort = function (_Component) {
    (0, _inherits3.default)(Sort, _Component);

    function Sort(props) {
        (0, _classCallCheck3.default)(this, Sort);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Sort.__proto__ || (0, _getPrototypeOf2.default)(Sort)).call(this, props));

        _this.handleClick = function (direction) {
            return function (event) {
                if (_this.isCurrent(direction)) {
                    direction = undefined;
                }
                if (_this.props.onSort) {
                    _this.props.onSort(direction, _this.props.field);
                }
            };
        };

        return _this;
    }

    (0, _createClass3.default)(Sort, [{
        key: 'isCurrent',
        value: function isCurrent(direction) {
            var state = this.context.state;
            var sortData = {
                key: _lodash2.default.get(state.sortData.field, 'key'),
                dataKey: _lodash2.default.get(state.sortData.field, 'dataKey'),
                direction: _lodash2.default.get(state.sortData, 'direction')
            };
            return _lodash2.default.isEqual({
                key: this.props.field.key,
                dataKey: this.props.field.dataKey,
                direction: direction
            }, sortData);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        lineHeight: 1,
                        paddingLeft: 2,
                        paddingRight: 2,
                        marginTop: -2
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'cursor-pointer', style: { width: 12, height: 12, paddingTop: 4 },
                        onClick: this.handleClick('asc') },
                    _react2.default.createElement(_icon2.default, { name: 'caret-up',
                        style: { position: 'relative', bottom: 1 },
                        color: this.isCurrent('asc') ? this.props.checkedColor : this.props.unCheckedColor, size: 12 })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'cursor-pointer', style: { width: 12, height: 12, paddingBottom: 4 },
                        onClick: this.handleClick('desc') },
                    _react2.default.createElement(_icon2.default, { name: 'caret-down',
                        style: { position: 'relative', top: -1 },
                        color: this.isCurrent('desc') ? this.props.checkedColor : this.props.unCheckedColor, size: 12 })
                )
            );
        }
    }]);
    return Sort;
}(_react.Component);

Sort.contextTypes = {
    Table: _propTypes2.default.object,
    state: _propTypes2.default.object,
    props: _propTypes2.default.object
};
Sort.defaultProps = {
    field: {},
    unCheckedColor: '#bfbfbf',
    checkedColor: '#28a7e1',
    onSort: undefined
};
exports.default = Sort;