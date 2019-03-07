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

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_Component) {
    (0, _inherits3.default)(Header, _Component);

    function Header(props) {
        (0, _classCallCheck3.default)(this, Header);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).call(this, props));

        _this.handleIconClick = function (e) {
            return function (event) {
                event.stopPropagation();
                if (e.onClick) {
                    e.onClick();
                }
            };
        };

        return _this;
    }

    (0, _createClass3.default)(Header, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'list-header' },
                _react2.default.createElement(
                    'div',
                    { className: 'relative' },
                    this.context.props.title,
                    this.context.props.filter ? _react2.default.createElement(_filter2.default, null) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'icon-events' },
                        _react2.default.createElement(
                            'div',
                            { className: 'flex middle', style: { marginRight: -10 } },
                            this.context.props.headerIconEvents.map(function (event, key) {
                                return _react2.default.createElement(_icon2.default, { key: key,
                                    type: 'button',
                                    name: event.icon,
                                    title: event.title,
                                    hoverColor: '#1890ff',
                                    onClick: _this2.handleIconClick(event) });
                            })
                        )
                    )
                )
            );
        }
    }]);
    return Header;
}(_react.Component);

Header.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setListState: _propTypes2.default.func
};
exports.default = Header;