'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openWidth = 200;
var narrowWidth = 40;

var style = {
    container: {
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 5,
        backgroundColor: '#fff',
        transition: 'width .3s linear'
    },
    menuItem: {
        position: 'relative',
        color: '#485065',
        height: 40,
        lineHeight: '40px',
        width: openWidth
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
            customs: [],
            selectedKey: undefined,
            open: false,
            showAll: false,
            anchorEl: {},
            currentContextMenu: {}
        };

        _this.getDataSource = function () {
            return new _promise2.default(function (resolve, reject) {
                var dataSource = _this.props.dataSource;
                if (_.isArray(dataSource)) {
                    resolve(dataSource);
                } else if (_.isFunction(dataSource)) {
                    dataSource = dataSource();
                    if (_.isArray(dataSource)) {
                        resolve(dataSource);
                    } else if (dataSource instanceof _promise2.default) {
                        dataSource.then(function (data) {
                            if (_.isArray(data)) {
                                resolve(data);
                            }
                        });
                    }
                } else if (dataSource instanceof _promise2.default) {
                    dataSource.then(function (data) {
                        if (_.isArray(data)) {
                            resolve(data);
                        }
                    });
                }
            });
        };

        _this.updateDataSource = function (dataSource) {
            _this.state.dataSource = dataSource;
            _this.dataMap = {};
            dataSource.map(function (row) {
                _this.dataMap[row.dataKey] = row;
            });
            _this.forceUpdate();
        };

        _this.handleLink = function (data) {
            return function (event) {
                var clickType = _this.getClickType(event);
                var url = App.request.getRoot() + data.url;
                switch (clickType) {
                    case 0:
                        App.history.push(url);
                        _this.handleClose();
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                }
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

        _this.handleRemove = function (key) {
            return function (event) {
                event.stopPropagation();
                var clickType = _this.getClickType(event);
                if (clickType == 0) {
                    _.remove(_this.state.favorites, function (n) {
                        return n == key;
                    });
                    var target = (0, _jquery2.default)(_this.refs.container).find('.nav2-item[data-key=' + key + ']');
                    target.fadeOut(function () {
                        _this.updateFavorites();
                    });
                }
            };
        };

        _this.handleAdd = function (key) {
            return function (event) {
                event.stopPropagation();
                var clickType = _this.getClickType(event);
                if (clickType == 0) {
                    if (_this.state.favorites.indexOf(key) == -1) {
                        _this.state.favorites.push(key);
                        _this.updateFavorites();
                    }
                }
            };
        };

        _this.handleOpenNewTab = function (event, menu) {
            var url = menu.url;
            if (url.indexOf('?') < 0) {
                url += '?t=' + new Date().getTime();
            } else {
                url += '&t=' + new Date().getTime();
            }
            App.history.push(url);
        };

        if (props.dataSource) {
            _this.getDataSource().then(function (dataSource) {
                _this.updateDataSource(dataSource);
            });
        }
        return _this;
    }

    (0, _createClass3.default)(Nav, [{
        key: 'initData',
        value: function initData(props) {
            if (props.customs !== undefined) {
                this.state.customs = props.customs;
            }
        }
    }, {
        key: 'getFavorites',
        value: function getFavorites() {
            var favorites = App.lib('storage').local(this.props.favoriteKey);
            if (!favorites) {
                favorites = this.props.default;
                App.lib('storage').local(this.props.favoriteKey, favorites);
            }
            return favorites;
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
        key: 'updateFavorites',
        value: function updateFavorites() {
            App.lib('storage').local(this.props.favoriteKey, this.state.favorites);
            this.forceUpdate();
        }
    }, {
        key: 'renderAll',
        value: function renderAll() {
            var _this2 = this;

            var dataSource = App.lib('tool').toTree(this.state.dataSource);
            var nodes = [];
            dataSource.map(function (row, i) {
                nodes.push(_react2.default.createElement(
                    'div',
                    { key: i, 'auth-key': row.dataKey, style: { width: 164, marginBottom: 16, marginLeft: 8 } },
                    _react2.default.createElement(
                        'div',
                        { className: 'text-bold text-default', style: { padding: 8 } },
                        row.title
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        row.children.map(function (child, j) {
                            return _react2.default.createElement(
                                'div',
                                { key: j, className: 'hover-bg hover cursor-pointer relative text-small',
                                    'auth-key': child.dataKey,
                                    style: { padding: 8, userSelect: 'none' },
                                    onClick: _this2.handleLink(child)
                                },
                                _react2.default.createElement(
                                    ContextMenuTrigger,
                                    { id: 'navContextMenu', collect: function collect() {
                                            return child;
                                        } },
                                    child.title,
                                    _this2.state.favorites.indexOf(child.dataKey) >= 0 ? _react2.default.createElement(
                                        'div',
                                        { className: 'text-primary',
                                            style: { position: 'absolute', right: 3, top: 3, zIndex: 1 } },
                                        _react2.default.createElement(_icon2.default, { type: 'button', className: 'icon-shoucang-2', size: 14,
                                            onMouseDown: function onMouseDown(event) {
                                                event.stopPropagation();
                                            },
                                            onClick: _this2.handleRemove(child.dataKey),
                                            style: { padding: 6, lineHeight: 1 } })
                                    ) : _react2.default.createElement(
                                        'div',
                                        { className: 'text-primary hover-show',
                                            style: { position: 'absolute', right: 3, top: 3, zIndex: 1 } },
                                        _react2.default.createElement(_icon2.default, { type: 'button', className: 'icon-shoucang-1', size: 14,
                                            onMouseDown: function onMouseDown(event) {
                                                event.stopPropagation();
                                            },
                                            onClick: _this2.handleAdd(child.dataKey),
                                            style: { padding: 6, lineHeight: 1 } })
                                    )
                                )
                            );
                        })
                    )
                ));
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
                        className: 'icon-reject',
                        onClick: this.handleClose,
                        style: { padding: 4 } })
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
                { ref: 'container', style: (0, _extends3.default)({ width: this.state.open ? openWidth : narrowWidth }, style.container),
                    className: 'border-right-primary', onMouseEnter: this.handleOpen, onMouseLeave: this.handleClose },
                _react2.default.createElement(
                    ContextMenu,
                    { id: 'navContextMenu2',
                        ref: 'navContextMenu',
                        style: { background: '#fff', boxShadow: '0 0 6px #888', padding: '6px 0', zIndex: 2 } },
                    _react2.default.createElement(
                        MenuItem,
                        { onClick: this.handleOpenNewTab },
                        '\u65B0\u6807\u7B7E\u9875\u6253\u5F00'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: style.menuItem,
                        className: 'nav2-item cursor-pointer flex middle hover-bg', onClick: function onClick() {
                            _this3.setState({ showAll: !_this3.state.showAll });
                        } },
                    _react2.default.createElement(
                        'div',
                        { style: { width: narrowWidth }, className: 'icon text-center' },
                        _react2.default.createElement(_icon2.default, { className: 'icon-caidan',
                            size: 20 })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'text' },
                        '\u6240\u6709\u83DC\u5355'
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: style.removeIcon },
                        _react2.default.createElement(_icon2.default, { size: 16, className: 'icon-oneRight' })
                    ),
                    this.state.showAll ? _react2.default.createElement(
                        'div',
                        { style: {
                                position: 'fixed',
                                left: openWidth,
                                bottom: 0,
                                top: 48,
                                cursor: 'default'
                            }, className: 'bg-white border-right-primary', onClick: function onClick(event) {
                                event.stopPropagation();
                            } },
                        this.renderAll()
                    ) : null
                ),
                _react2.default.createElement(
                    Drag,
                    { onDragEnd: function onDragEnd() {
                            var keys = [];
                            (0, _jquery2.default)('.nav2-item').each(function () {
                                var key = (0, _jquery2.default)(this).attr('data-key');
                                key && keys.push(key);
                            });
                            _this3.state.favorites = keys;
                            _this3.updateFavorites();
                        } },
                    this.state.favorites.map(function (dataKey, index) {
                        var data = _this3.dataMap[dataKey];
                        if (data) {
                            return _react2.default.createElement(
                                'div',
                                { key: dataKey, style: style.menuItem,
                                    className: 'nav2-item cursor-pointer flex middle cursor-pointer hover hover-bg',
                                    'data-key': dataKey,
                                    'auth-key': dataKey,
                                    onMouseEnter: function onMouseEnter(event) {
                                        if (!_this3.state.open) {
                                            _this3.setState({ open: true });
                                        }
                                    },
                                    onClick: _this3.handleLink(data)
                                },
                                _react2.default.createElement(
                                    'div',
                                    { style: { width: narrowWidth }, className: 'icon text-center' },
                                    _react2.default.createElement(_icon2.default, { className: data.icon, size: 16 })
                                ),
                                _react2.default.createElement(
                                    ContextMenuTrigger,
                                    { id: 'navContextMenu', collect: function collect() {
                                            return data;
                                        } },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'text text-small' },
                                        data.title
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'hover-show', style: style.removeIcon },
                                    _react2.default.createElement(_icon2.default, { type: 'button',
                                        size: 16,
                                        title: '\u5220\u9664',
                                        className: 'icon-reject',
                                        onMouseDown: function onMouseDown(event) {
                                            event.stopPropagation();
                                        },
                                        onClick: _this3.handleRemove(dataKey) }),
                                    _react2.default.createElement(_icon2.default, { type: 'button',
                                        size: 16,
                                        title: '\u62D6\u52A8',
                                        className: 'icon-tuodong',
                                        style: { cursor: 'move' },
                                        onMouseDown: function onMouseDown(event) {
                                            event.stopPropagation();
                                        },
                                        onClick: function onClick(event) {
                                            event.stopPropagation();
                                        } })
                                )
                            );
                        }
                    })
                )
            );
        }
    }]);
    return Nav;
}(_react.Component);

Nav.defaultProps = {
    customs: [],
    onChange: undefined,
    dataSource: [] };
exports.default = Nav;