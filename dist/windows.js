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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WindowTabs = function (_Component) {
    (0, _inherits3.default)(WindowTabs, _Component);

    function WindowTabs(props) {
        (0, _classCallCheck3.default)(this, WindowTabs);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WindowTabs.__proto__ || (0, _getPrototypeOf2.default)(WindowTabs)).call(this, props));

        _this.state = {
            currentKey: ''
        };

        _this.removeOtherWindows = function (event, data) {
            var windows = _this.lib.getWindows();
            var key = data.key;
            for (var i = windows.length - 1; i >= 0; i--) {
                var window = windows[i];
                if (window.key != key) {
                    if (_this.props.shouldWindowRemove && _this.props.shouldWindowRemove(window.key, window.state) == false) {
                        return false;
                    }
                    _this.lib.removeWindow(window.key);
                }
            }
            _this.lib.saveSession();
            if (_this.state.currentKey != key) {
                _this.lib.switchWindow(key);
            }
            _this.forceUpdate();
        };

        _this.handleClick = function (window) {
            return function (event) {
                if (_this.state.currentKey != window.key) {
                    _this.state.currentKey = window.key;
                    _this.props.context.showMasker();
                    _this.forceUpdate();
                    setTimeout(function () {
                        _this.lib.switchWindow(window.key);
                    }, 50);
                }
            };
        };

        _this.lib = props.context.lib;
        _this.state.currentKey = props.currentKey;
        _this.lib.subscribe(function () {
            var windows = _this.lib.getWindows();
            windows.map(function (window) {
                if (window.state.title == '') {
                    window.state.title = _this.lib.getTitle(window.key);
                }
            });
            _this.forceUpdate();
        });
        return _this;
    }

    (0, _createClass3.default)(WindowTabs, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.state.currentKey = nextProps.currentKey;
        }
    }, {
        key: 'removeWindow',
        value: function removeWindow() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lib.getCurrentKey();

            if (this.props.shouldWindowRemove) {
                var window = this.lib.getWindow(key);
                if (this.props.shouldWindowRemove(key, window.state) == false) {
                    return false;
                }
            }
            this.lib.removeWindow(key);
            if (this.lib.getCurrentKey() == key) {
                var order = this.lib.getOrder();
                var lastKey = _.last(order);
                this.handleClick(this.lib.getWindow(lastKey))();
            }
            this.forceUpdate();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var width = 98 / this.lib.getWindowsNumber();
            var windows = this.lib.getWindows();
            return _react2.default.createElement(
                'div',
                { className: 'windows' },
                windows.map(function (window, index) {
                    return _react2.default.createElement(
                        'div',
                        { key: index,
                            className: 'window-tab flex middle ' + (window.key == _this2.state.currentKey ? 'active text-primary' : ''),
                            style: { width: width + '%' } },
                        _react2.default.createElement(
                            'div',
                            { className: 'label', onClick: _this2.handleClick(window), title: window.state.title },
                            _react2.default.createElement(
                                ContextMenuTrigger,
                                { id: 'contextMenu', ref: 'contextMenuTrigger', collect: function collect() {
                                        return window;
                                    } },
                                window.state.title
                            )
                        ),
                        windows.length > 1 ? _react2.default.createElement(
                            'div',
                            { className: 'window-close', onClick: _this2.removeWindow.bind(_this2, window.key) },
                            _react2.default.createElement('i', { className: 'iconfont icon-reject' })
                        ) : null
                    );
                }),
                _react2.default.createElement(
                    ContextMenu,
                    { id: 'contextMenu',
                        ref: 'contextMenu',
                        style: { background: '#fff', boxShadow: '0 0 6px #888', padding: '6px 0', zIndex: 2 } },
                    _react2.default.createElement(
                        MenuItem,
                        { onClick: this.removeOtherWindows },
                        '\u5173\u95ED\u5176\u4ED6\u7A97\u53E3'
                    )
                )
            );
        }
    }]);
    return WindowTabs;
}(_react.Component);

var Windows = function (_Component2) {
    (0, _inherits3.default)(Windows, _Component2);
    (0, _createClass3.default)(Windows, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                window: this.lib
            };
        }
    }]);

    function Windows(props) {
        (0, _classCallCheck3.default)(this, Windows);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (Windows.__proto__ || (0, _getPrototypeOf2.default)(Windows)).call(this, props));

        _this3.removeWindow = function () {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.lib.getCurrentKey();

            _this3.refs.tabs.removeWindow(key);
        };

        _this3.showMasker = function () {
            _this3.hasMasker = true;
            $(_this3.refs.masker).show();
        };

        _this3.hideMasker = function () {
            _this3.hasMasker = false;
            $(_this3.refs.masker).hide();
        };

        _this3.sessionKey = 'windows.' + props.group;
        _this3.lib = App.lib(_this3.sessionKey);
        _this3.lib.setComponent(_this3);
        _this3.componentInit(props);
        return _this3;
    }

    (0, _createClass3.default)(Windows, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.componentInit(nextProps);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.hideMasker();
        }
    }, {
        key: 'componentInit',
        value: function componentInit(props) {
            var currentUrl = props.location.pathname + props.location.search;
            var key = currentUrl;
            var currentWindow = this.lib.getWindow(key);
            if (currentWindow) {
                currentWindow.url = currentUrl;
                this.lib.setCurrentKey(key);
            } else {
                currentWindow = {
                    key: currentUrl,
                    url: currentUrl,
                    state: {
                        title: this.lib.getTitle(props.location.pathname.replace(App.request.getRoot(), ''), currentUrl.replace(App.request.getRoot(), ''))
                    }
                };
                this.lib.addWindow(currentWindow);
            }
            this.lib.setCurrentKey(key);
        }
    }, {
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
    maxTabs: 8
};
Windows.childContextTypes = {
    window: PropTypes.object
};
exports.default = Windows;