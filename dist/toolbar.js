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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolbar = function (_Component) {
    (0, _inherits3.default)(Toolbar, _Component);

    function Toolbar() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Toolbar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Toolbar.__proto__ || (0, _getPrototypeOf2.default)(Toolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.handleClick = function (e) {
            return function (event) {
                if (e.onClick) {
                    e.onClick(event, e, _this.props.context);
                }
            };
        }, _this.renderEvent = function (event) {
            if (_lodash2.default.isObject(event)) {
                switch (event.type) {
                    case 'button':
                        return _react2.default.createElement(_button2.default, {
                            ref: event.key,
                            type: event.buttonType,
                            size: event.size || 'default',
                            icon: event.icon,
                            label: event.label,
                            labelPosition: event.labelPosition || 'after'
                        });
                    case 'dropdown':
                        return _react2.default.createElement(
                            _dropdown2.default,
                            {
                                ref: event.key,
                                dataSource: event.dataSource,
                                context: _this.props.context,
                                defaultValue: event.defaultValue,
                                size: event.size || 'default',
                                anchorOrigin: event.anchorOrigin,
                                targetOrigin: event.targetOrigin
                            },
                            function () {
                                if (_lodash2.default.isString(event.children.type)) {
                                    switch (event.children.type) {
                                        case 'button':
                                            return _react2.default.createElement(_button2.default, { style: { marginTop: 0 },
                                                type: event.children.buttonType,
                                                size: event.size || 'default',
                                                icon: event.children.icon,
                                                labelPosition: event.children.labelPosition || 'after',
                                                label: event.children.label
                                            });
                                        default:
                                            return null;
                                    }
                                } else {
                                    return event.children;
                                }
                            }()
                        );
                    case 'control':
                        var styleProps = {
                            select: {
                                style: {
                                    height: 30
                                },
                                labelStyle: {
                                    height: 30,
                                    lineHeight: '30px',
                                    paddingLeft: 24
                                },
                                iconStyle: {
                                    top: 2,
                                    right: 0
                                },
                                menuItemStyle: {
                                    paddingLeft: 8
                                }
                            },
                            auto: {
                                style: {
                                    paddingLeft: 8
                                },
                                iconStyle: {
                                    style: {
                                        right: 0
                                    }
                                }
                            },
                            checkbox: {
                                style: {
                                    marginTop: 0,
                                    marginLeft: 8
                                },
                                labelStyle: {
                                    whiteSpace: 'nowrap',
                                    marginTop: 1
                                }
                            }
                        };
                        return _react2.default.createElement(
                            'div',
                            { className: 'flex middle', style: { width: event.width || 'auto' } },
                            _react2.default.createElement(
                                'div',
                                null,
                                event.label
                            ),
                            _react2.default.createElement(
                                'div',
                                { style: { flexGrow: 1 } },
                                _react2.default.createElement(
                                    'div',
                                    { style: {
                                            border: '1px solid rgb(217, 227, 239)',
                                            height: 30,
                                            background: '#fff',
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            borderRadius: 3
                                        } },
                                    _react2.default.createElement(_control2.default, (0, _extends3.default)({
                                        ref: event.key,
                                        label: false,
                                        borderShow: false
                                    }, event.field, {
                                        onChange: event.onChange
                                    }))
                                )
                            )
                        );
                    case 'component':
                        var _Component2 = event.component;
                        return _react2.default.createElement(_Component2, _lodash2.default.isFunction(event.props) ? event.props() : event.props);
                    case 'refresh':
                        return _react2.default.createElement(_icon2.default, { type: 'button', name: 'refresh', size: 22 });
                    case 'render':
                        return event.render(_this.props);
                    case 'text':
                    default:
                        return _react2.default.createElement(
                            'div',
                            { style: (0, _extends3.default)({ display: 'table', fontSize: 14 }, event.style) },
                            event.label
                        );
                }
            }
            return null;
        }, _this.getControl = function (key) {
            return _this.refs[key];
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Toolbar, [{
        key: 'setDataSource',
        value: function setDataSource(dataSource) {
            this.setState({ dataSource: dataSource });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var dataSource = this.state.dataSource || this.props.dataSource;
            return _react2.default.createElement(
                'div',
                { className: 'toolbar', style: this.props.style },
                dataSource.map(function (rows, index) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'toolbar-group', key: index },
                        rows.map(function (event, j) {
                            if (_lodash2.default.isString(event) && _this2.props.events && _this2.props.events[event]) {
                                event = _this2.props.events[event];
                            } else if (_lodash2.default.isObject(event) && _this2.props.events && _this2.props.events[event.key]) {
                                event = (0, _extends3.default)({}, _this2.props.events[event.key], event);
                            }
                            if (event.isShow) {
                                var isShow = _lodash2.default.isFunction(event.isShow) ? event.isShow() : event.isShow;
                                if (!isShow) {
                                    return null;
                                }
                            }
                            return _react2.default.createElement(
                                'div',
                                { className: 'toolbar-item',
                                    key: j,
                                    onClick: _this2.handleClick(event),
                                    'auth-key': _lodash2.default.isFunction(event.authKey) ? event.authKey() : event.authKey },
                                _this2.renderEvent(event)
                            );
                        })
                    );
                })
            );
        }
    }]);
    return Toolbar;
}(_react.Component);

Toolbar.defaultProps = {
    dataSource: [[], []]
};
exports.default = Toolbar;