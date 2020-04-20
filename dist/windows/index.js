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

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Windows = function (_Component) {
    (0, _inherits3.default)(Windows, _Component);
    (0, _createClass3.default)(Windows, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                window: this
            };
        }
    }]);

    function Windows(props) {
        (0, _classCallCheck3.default)(this, Windows);
        return (0, _possibleConstructorReturn3.default)(this, (Windows.__proto__ || (0, _getPrototypeOf2.default)(Windows)).call(this, props));
    }

    (0, _createClass3.default)(Windows, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                Container,
                { fullScreen: true, direction: 'column' },
                _react2.default.createElement(WindowTabs, (0, _extends3.default)({ context: this, ref: 'tabs' }, this.props, { currentKey: this.lib.getCurrentKey() })),
                _react2.default.createElement(
                    Content,
                    { className: 'space', style: { height: 0 } },
                    _react2.default.createElement(
                        'div',
                        { ref: 'masker', className: 'masker hidden', style: { zIndex: 10 } },
                        _react2.default.createElement(
                            'div',
                            { className: 'position-center' },
                            _react2.default.createElement(Refresh, { size: 50,
                                left: -25,
                                top: -25,
                                loadingColor: '#fff',
                                style: { backgroundColor: 'transparent', boxShadow: 'none' }
                            })
                        )
                    ),
                    this.props.children
                )
            );
        }
    }]);
    return Windows;
}(_react.Component);

Windows.defaultProps = {
    maxTabs: 8,
    pages: [{ url: '/finance/voucher', title: '凭证列表', state: {} }, { url: '/finance/voucher/add', title: '录凭证', state: {} }],
    shouldWindowRemove: undefined };
Windows.childContextTypes = {
    props: PropTypes.object
};
exports.default = Windows;