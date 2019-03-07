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

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _reactSortablejs = require('react-sortablejs');

var _reactSortablejs2 = _interopRequireDefault(_reactSortablejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        color: '#485065'
    },
    wrapper: {
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        height: '100%',
        transition: 'width .3s linear'
    },
    removeIcon: {
        position: 'absolute',
        right: 6,
        top: 0,
        color: '#969db0'
    }
};

var Nav = function (_Component) {
    (0, _inherits3.default)(Nav, _Component);

    function Nav(props) {
        (0, _classCallCheck3.default)(this, Nav);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Nav.__proto__ || (0, _getPrototypeOf2.default)(Nav)).call(this, props));

        _this.dataMap = {};
        _this.state = {
            width: 40,
            customs: [],
            open: false,
            anchorEl: {}
        };

        _this.handleAllMenuClick = function (event) {
            _this.setState({ showAll: !_this.state.showAll });
        };

        _this.handleClick = function (data) {
            return function (event) {
                var clickType = _this.getClickType(event);
                if (_this.props.onClick) {
                    _this.props.onClick(data, clickType);
                }
                _this.handleClose(event);
            };
        };

        _this.handleOpen = function (event) {
            _this.setState({ open: true });
        };

        _this.handleClose = function (event) {
            _this.setState({
                open: false,
                showAll: false
            });
        };

        _this.handleRemove = function (custom) {
            return function (event) {
                event.stopPropagation();
                var clickType = _this.getClickType(event);
                if (clickType == 0) {
                    _.remove(_this.state.customs, function (n) {
                        return n.id == custom.id;
                    });
                    _this.forceUpdate();
                    _this.handleChange();
                }
            };
        };

        _this.handleAdd = function (item) {
            return function (event) {
                event.stopPropagation();
                var clickType = _this.getClickType(event);
                if (clickType == 0) {
                    if (_this.findIndex(item) == -1) {
                        _this.state.customs.push(item);
                        _this.forceUpdate();
                        _this.handleChange();
                    }
                }
            };
        };

        _this.handleOrder = function (order, sortable, evt) {
            var hash = {},
                customs = [];
            _this.state.customs.map(function (custom) {
                return hash[custom.id] = custom;
            });
            order.map(function (id) {
                customs.push(hash[id]);
            });
            _this.setState({ customs: customs });
            _this.handleChange();
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Nav, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            if (this.props.onChange) {
                this.props.onChange(this.state.customs);
            }
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.customs !== undefined) {
                this.state.customs = props.customs;
            }
            this.state.width = this.props.iconWidth;
        }
    }, {
        key: 'getClickType',
        value: function getClickType(event) {
            if (document.implementation.hasFeature("MouseEvents", "2.0")) {
                return event.button;
            } else {
                switch (event.button) {
                    case 0:
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                        return 0;
                    case 2:
                    case 6:
                        return 2;
                    case 4:
                        return 1;
                }
            }
        }
    }, {
        key: 'findIndex',
        value: function findIndex(item) {
            return _.findIndex(this.state.customs, function (n) {
                return n.id == item.id;
            });
        }
    }, {
        key: 'renderAll',
        value: function renderAll() {
            var _this2 = this;

            var dataSource = this.props.dataSource;
            var nodes = [];
            dataSource.map(function (row, i) {
                if (row.children && row.children.length > 0) {
                    nodes.push(_react2.default.createElement(
                        'div',
                        { key: i, 'auth-key': row.dataKey, style: { width: 164, marginBottom: 16, marginLeft: 8 } },
                        _react2.default.createElement(
                            'div',
                            { className: 'text-bold text-default', style: { padding: 8 } },
                            row.label
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            row.children.map(function (child, j) {
                                var index = _this2.findIndex(child);
                                return _react2.default.createElement(
                                    'div',
                                    { key: j, className: 'flex middle hover-bg hover cursor-pointer relative text-small',
                                        style: { padding: 8, userSelect: 'none' },
                                        onClick: _this2.handleClick(child)
                                    },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        child.label
                                    ),
                                    index >= 0 ? _react2.default.createElement(
                                        'div',
                                        { className: 'text-primary', style: { position: 'absolute', right: 0 } },
                                        _react2.default.createElement(_icon2.default, { type: 'button',
                                            name: 'star-fill',
                                            size: 16,
                                            onClick: _this2.handleRemove(child)
                                        })
                                    ) : _react2.default.createElement(
                                        'div',
                                        { className: 'text-primary hover-show', style: { position: 'absolute', right: 0 } },
                                        _react2.default.createElement(_icon2.default, { type: 'button',
                                            name: 'star',
                                            size: 16,
                                            onClick: _this2.handleAdd(child)
                                        })
                                    )
                                );
                            })
                        )
                    ));
                }
            });
            return _react2.default.createElement(
                'div',
                { className: 'flex', style: {
                        padding: 20,
                        lineHeight: 1.4,
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        height: 550,
                        width: 970
                    } },
                _react2.default.createElement(
                    'div',
                    { style: { position: 'absolute', right: 8, top: 8, lineHeight: 1 } },
                    _react2.default.createElement(_icon2.default, { type: 'button',
                        name: 'close',
                        onClick: this.handleClose })
                ),
                nodes
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { style: style.container },
                _react2.default.createElement(
                    'div',
                    { className: 'border-right-primary',
                        style: (0, _extends3.default)({}, style.wrapper, { width: this.state.open ? this.props.itemWidth : this.props.iconWidth }),
                        onMouseEnter: this.handleOpen },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex middle cursor-pointer hover-bg',
                            style: { height: this.props.itemHeight, width: this.props.itemWidth },
                            onClick: this.handleAllMenuClick },
                        _react2.default.createElement(
                            'div',
                            { className: 'flex middle center',
                                style: { width: this.props.iconWidth, height: this.props.itemHeight } },
                            _react2.default.createElement(_icon2.default, { name: 'menu', size: 20 })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'relative', style: { width: this.props.itemWidth - this.props.iconWidth } },
                            '\u6240\u6709\u83DC\u5355',
                            _react2.default.createElement(
                                'div',
                                { style: style.removeIcon },
                                _react2.default.createElement(_icon2.default, { size: 16, name: 'right' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactSortablejs2.default,
                        { onChange: this.handleOrder },
                        this.state.customs.map(function (custom, index) {
                            return _react2.default.createElement(
                                'div',
                                { key: index, className: 'flex middle cursor-pointer hover hover-bg',
                                    'data-id': custom.id,
                                    style: { height: _this3.props.itemHeight, width: _this3.props.itemWidth },
                                    onClick: _this3.handleClick(custom) },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'flex middle center',
                                        style: { width: _this3.props.iconWidth, height: _this3.props.itemHeight } },
                                    _react2.default.createElement(_icon2.default, { name: custom.icon, size: 20 })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'relative', style: { width: _this3.props.itemWidth - _this3.props.iconWidth } },
                                    custom.label,
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'hover-show', style: style.removeIcon },
                                        _react2.default.createElement(_icon2.default, { type: 'button', size: 16, name: 'close', padding: 2,
                                            onClick: _this3.handleRemove(custom) }),
                                        _react2.default.createElement(_icon2.default, { type: 'button', size: 16, name: 'drag', padding: 2 })
                                    )
                                )
                            );
                        })
                    )
                ),
                this.state.showAll ? _react2.default.createElement(
                    'div',
                    { style: {
                            position: 'absolute',
                            zIndex: 10,
                            left: this.props.itemWidth,
                            bottom: 0,
                            top: 0,
                            cursor: 'default'
                        }, className: 'bg-white border-right-primary', onClick: function onClick(event) {
                            event.stopPropagation();
                        } },
                    this.renderAll()
                ) : null,
                this.state.open ? _react2.default.createElement('div', { style: {
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9
                    }, onMouseEnter: this.handleClose, onClick: this.handleClose }) : null
            );
        }
    }]);
    return Nav;
}(_react.Component);

Nav.defaultProps = {
    customs: [],
    onChange: undefined,
    dataSource: [],
    showAll: true,
    onClick: undefined,
    iconWidth: 40,
    itemWidth: 200,
    itemHeight: 40 };
exports.default = Nav;