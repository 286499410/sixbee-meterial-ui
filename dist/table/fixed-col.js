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

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FixedCol = function (_Component) {
    (0, _inherits3.default)(FixedCol, _Component);

    function FixedCol(props) {
        (0, _classCallCheck3.default)(this, FixedCol);
        return (0, _possibleConstructorReturn3.default)(this, (FixedCol.__proto__ || (0, _getPrototypeOf2.default)(FixedCol)).call(this, props));
    }

    (0, _createClass3.default)(FixedCol, [{
        key: 'getWidth',
        value: function getWidth() {
            var state = this.context.state;
            var props = this.context.props;
            var width = 0;
            if (props.fixedCheckbox && this.props.position == 'left') {
                width += props.checkboxColumnWidth;
            }
            if (this.props.columns) {
                this.props.columns.map(function (columnKey) {
                    width += state.columnWidths[columnKey];
                });
            }
            return width;
        }
    }, {
        key: 'render',
        value: function render() {
            var state = this.context.state;
            var props = this.context.props;
            var width = this.getWidth();
            var style = {
                position: 'absolute',
                top: 0,
                zIndex: 3,
                width: width - 1,
                backgroundColor: '#fff',
                overflow: 'hidden'
            };
            if (this.props.position == 'right') {
                style.right = 0;
                if (state.scrollLeft < state.tableWidth - state.containerWidth - 1) {
                    style.boxShadow = '-6px 0 6px rgba(0,0,0,0.1)';
                }
            } else {
                style.left = 0;
                style.width--;
                if (state.scrollLeft && state.scrollLeft > 0) {
                    style.boxShadow = '6px 0 6px rgba(0,0,0,0.1)';
                }
            }
            if (state.containerWidth > state.tableWidth) {
                return null;
            }
            if (state.dataSource.length == 0) {
                return null;
            }
            return _react2.default.createElement(
                'div',
                { style: style },
                _react2.default.createElement(_header2.default, {
                    ref: 'header',
                    width: width,
                    showColumns: this.props.columns,
                    showCheckboxes: this.props.position == 'left',
                    showSeries: this.props.position == 'left'
                }),
                _react2.default.createElement(
                    'div',
                    { style: { marginTop: -2 } },
                    _react2.default.createElement(_body2.default, {
                        ref: 'body',
                        hasScrollbar: false,
                        hasEmptyTip: false,
                        hasLoading: false,
                        width: width,
                        height: 20,
                        showColumns: this.props.columns,
                        showCheckboxes: this.props.position == 'left',
                        showSeries: this.props.position == 'left'
                    })
                )
            );
        }
    }]);
    return FixedCol;
}(_react.Component);

FixedCol.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setTableState: _propTypes2.default.func
};
exports.default = FixedCol;