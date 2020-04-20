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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function (_Component) {
    (0, _inherits3.default)(Tabs, _Component);

    function Tabs(props) {
        (0, _classCallCheck3.default)(this, Tabs);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).call(this, props));

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

    (0, _createClass3.default)(Tabs, [{
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
    return Tabs;
}(_react.Component);

exports.default = Tabs;