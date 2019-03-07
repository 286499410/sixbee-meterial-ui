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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function (_Component) {
    (0, _inherits3.default)(Item, _Component);

    function Item() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.stopPropagation();
            if (_this.props.onClick) {
                _this.props.onClick();
            }
        }, _this.handleIconClick = function (e) {
            return function (event) {
                event.stopPropagation();
                if (e.onClick) {
                    e.onClick(_this.props.data);
                }
            };
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Item, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'item ' + (this.props.selected ? 'selected' : ''),
                    style: { display: this.props.hide ? 'none' : 'block' },
                    onClick: this.handleClick },
                this.props.children,
                _react2.default.createElement(
                    'div',
                    { className: 'icon-events' },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex middle' },
                        this.context.props.iconEvents.map(function (event, key) {
                            var disabled = _.isFunction(event.disabled) ? event.disabled(_this2.props.data) : event.disabled;
                            return _react2.default.createElement(_icon2.default, { key: key,
                                type: 'button',
                                size: 16,
                                name: event.icon,
                                title: event.title,
                                hoverColor: '#1890ff',
                                disabled: disabled,
                                onClick: _this2.handleIconClick(event) });
                        })
                    )
                )
            );
        }
    }]);
    return Item;
}(_react.Component);

Item.defaultProps = {
    selected: false,
    hide: false };
Item.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setListState: _propTypes2.default.func
};
exports.default = Item;