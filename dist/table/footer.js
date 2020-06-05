'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _body = require('./body');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function (_Component) {
    (0, _inherits3.default)(Footer, _Component);

    function Footer() {
        (0, _classCallCheck3.default)(this, Footer);
        return (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || (0, _getPrototypeOf2.default)(Footer)).apply(this, arguments));
    }

    (0, _createClass3.default)(Footer, [{
        key: 'render',
        value: function render() {
            var props = this.context.props;
            var state = this.context.state;
            return _react2.default.createElement(
                'div',
                { ref: 'container',
                    className: 'table-footer',
                    style: { overflow: 'hidden', width: state.containerWidth + 2 } },
                _react2.default.createElement(
                    'table',
                    { className: 'table ' + (props.bordered ? 'bordered' : '') + ' ' + (props.condensed ? 'condensed' : ''),
                        style: { width: state.tableWidth || '100%' } },
                    _react2.default.createElement(_body.TableBodyColGroup, { showCheckboxes: props.showCheckboxes, showSeries: props.showSeries }),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        props.footerData.map(function (row, i) {
                            return _react2.default.createElement(
                                'tr',
                                { key: i },
                                row.map(function (col, j) {
                                    return _lodash2.default.isString(col) || col === null ? _react2.default.createElement(
                                        'td',
                                        { key: j },
                                        col
                                    ) : _react2.default.createElement(
                                        'td',
                                        { key: j, colSpan: col.colSpan || 1, rowSpan: col.rowSpan || 1,
                                            style: (0, _extends3.default)({ textAlign: col.textAlign || 'left' }, col.style) },
                                        col.content
                                    );
                                })
                            );
                        })
                    )
                )
            );
        }
    }]);
    return Footer;
}(_react.Component);

Footer.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setTableState: _propTypes2.default.func
};
exports.default = Footer;