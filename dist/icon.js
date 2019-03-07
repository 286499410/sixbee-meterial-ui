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

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function (_Component) {
    (0, _inherits3.default)(Icon, _Component);

    function Icon() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Icon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Icon.__proto__ || (0, _getPrototypeOf2.default)(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            if (!_this.props.disabled && _this.props.onClick) {
                _this.props.onClick(event);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Icon, [{
        key: 'render',
        value: function render() {
            var iconClassName = this.props.classPrefix + this.props.name;
            if (this.props.type == 'button') {
                return _react2.default.createElement(
                    _IconButton2.default,
                    {
                        disabled: this.props.disabled,
                        style: (0, _extends3.default)({
                            color: this.props.color,
                            width: this.props.size + this.props.padding * 2,
                            height: this.props.size + this.props.padding * 2,
                            padding: this.props.padding
                        }, this.props.buttonStyle),
                        hoveredStyle: {
                            color: this.props.hoverColor
                        },
                        iconStyle: {
                            width: this.props.size,
                            height: this.props.size
                        },
                        tooltip: this.props.tooltip,
                        title: this.props.title,
                        onClick: this.handleClick },
                    _react2.default.createElement(
                        'div',
                        { className: 'relative' },
                        _react2.default.createElement(
                            'div',
                            { className: 'position-center' },
                            _react2.default.createElement(_FontIcon2.default, { className: iconClassName, color: 'inherit', style: (0, _extends3.default)({
                                    fontSize: this.props.size
                                }, this.props.iconStyle) }),
                            this.props.children
                        )
                    )
                );
            } else {
                return _react2.default.createElement(_FontIcon2.default, { className: iconClassName,
                    title: this.props.title,
                    color: this.props.color,
                    hoverColor: this.props.hoverColor,
                    style: (0, _extends3.default)({
                        fontSize: this.props.size
                    }, this.props.iconStyle)
                });
            }
        }
    }]);
    return Icon;
}(_react.Component);

Icon.defaultProps = {
    classPrefix: 'iconfont icon-',
    disabled: false,
    color: 'inherit',
    hoverColor: 'inherit',
    name: undefined,
    type: undefined,
    onClick: undefined,
    size: 16,
    padding: 8,
    tooltip: undefined,
    tooltipPosition: undefined,
    iconStyle: undefined,
    buttonStyle: undefined };
exports.default = Icon;