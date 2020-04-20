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

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _contextMenu = require('./context-menu');

var _contextMenu2 = _interopRequireDefault(_contextMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = _layout2.default.Container,
    Content = _layout2.default.Content;

var Windows = function (_Component) {
    (0, _inherits3.default)(Windows, _Component);

    function Windows(props) {
        (0, _classCallCheck3.default)(this, Windows);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Windows.__proto__ || (0, _getPrototypeOf2.default)(Windows)).call(this, props));

        _this.state = {
            pages: [],
            track: []
        };

        _this.handleClick = function (page) {
            return function (event) {
                if (_this.getCurrentUrl() !== page.url) {
                    _this.addTrack(page.url);
                    _this.props.history.replace(page.url);
                }
            };
        };

        _this.closeWindow = function () {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { url: _this.getCurrentUrl() };
            var handleChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (_.isFunction(_this.props.shouldWindowRemove) && _this.props.shouldWindowRemove(page) === false) {
                return false;
            }
            _.remove(_this.state.pages, function (n) {
                return n.url == page.url;
            });
            _.remove(_this.state.track, function (n) {
                return n == page.url;
            });
            if (page.url == _this.getCurrentUrl()) {
                _this.handleClick(_.find(_this.state.pages, { url: _.last(_this.state.track) }))(event);
            }
            if (_this.props.onRequestClose) {
                _this.props.onRequestClose(page);
            }
            if (handleChange) _this.handleChange();
            _this.refs.tabs.forceUpdate();
            return true;
        };

        _this.closeOtherWindow = function () {
            var currentPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { url: _this.getCurrentUrl() };

            var pages = _.cloneDeep(_this.state.pages);
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (currentPage.url !== page.url) {
                    if (_this.closeWindow(page, false) === false) {
                        _this.handleChange();
                        return false;
                    }
                }
            }
            _this.handleChange();
            return true;
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Windows, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            this.state.pages = props.pages || [];
            this.state.track = props.track || [];
            var currentUrl = this.getCurrentUrl();
            var currentPage = _.find(this.state.pages, { url: currentUrl });
            if (!currentPage) {
                this.addPage({
                    url: currentUrl,
                    title: window.document.title,
                    state: {}
                });
            }
            this.addTrack(currentUrl);
        }
    }, {
        key: 'getCurrentUrl',
        value: function getCurrentUrl() {
            return window.location.pathname + window.location.search;
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                window: this
            };
        }
    }, {
        key: 'addPage',
        value: function addPage(page) {
            this.state.pages.push(page);
        }
    }, {
        key: 'addTrack',
        value: function addTrack(url) {
            _.remove(this.state.track, function (n) {
                return n == url;
            });
            this.state.track.push(url);
            this.handleChange();
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                Container,
                { direction: 'column', style: { flexGrow: 1 } },
                _react2.default.createElement(WindowTabs, {
                    ref: "tabs",
                    currentUrl: this.getCurrentUrl(),
                    pages: this.state.pages,
                    closeWindow: this.closeWindow,
                    closeOtherWindow: this.closeOtherWindow,
                    handleClick: this.handleClick
                }),
                _react2.default.createElement(
                    Content,
                    { className: this.props.contentClassName, style: { height: 0 } },
                    this.props.children
                )
            );
        }
    }]);
    return Windows;
}(_react.Component);

Windows.defaultProps = {
    maxTabs: 8,
    pages: [],
    shouldWindowRemove: undefined,
    onChange: undefined,
    track: [],
    history: undefined,
    onRequestClose: undefined,
    contentClassName: undefined
};
Windows.childContextTypes = {
    window: _propTypes2.default.object
};
exports.default = Windows;

var WindowTabs = function (_Component2) {
    (0, _inherits3.default)(WindowTabs, _Component2);

    function WindowTabs() {
        var _ref;

        var _temp, _this2, _ret;

        (0, _classCallCheck3.default)(this, WindowTabs);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = WindowTabs.__proto__ || (0, _getPrototypeOf2.default)(WindowTabs)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
            left: 20
        }, _this2.handleClickLeftArrow = function (event) {
            _this2.state.left += 100;
            _this2.state.left = Math.min(_this2.state.left, 20);
            _this2.forceUpdate();
        }, _this2.handleClickRightArrow = function (event) {
            var containerWidth = _this2.refs.container.clientWidth;
            var contentWidth = _this2.refs.content.clientWidth;
            if (contentWidth > containerWidth) {
                _this2.state.left -= 100;
                _this2.state.left = Math.max(_this2.state.left, -(contentWidth - containerWidth + 20));
                _this2.forceUpdate();
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
    }

    (0, _createClass3.default)(WindowTabs, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { ref: 'container', className: 'windows' },
                _react2.default.createElement(
                    'div',
                    { ref: 'content', className: 'window-content', style: {
                            left: this.state.left
                        } },
                    this.props.pages.map(function (page, index) {
                        return _react2.default.createElement(
                            'div',
                            { key: index, className: 'window-tab flex middle' + (page.url == _this3.props.currentUrl ? ' active text-primary' : '') },
                            _react2.default.createElement(
                                _contextMenu2.default,
                                { style: { width: '100%' }, dataSource: [{ label: '关闭其他窗口', onClick: _this3.props.closeOtherWindow.bind(_this3, page) }] },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'label', onClick: _this3.props.handleClick(page),
                                        title: page.title },
                                    page.title
                                )
                            ),
                            _this3.props.pages.length > 1 ? _react2.default.createElement(
                                'div',
                                { className: 'window-close', onMouseOver: function onMouseOver(event) {
                                        var target = event.target;
                                        if (target.tagName == 'I') {
                                            target = target.parentNode;
                                        }
                                        target.style.background = 'rgba(0,0,0,0.2)';
                                    }, onMouseOut: function onMouseOut(event) {
                                        var target = event.target;
                                        if (target.tagName == 'I') {
                                            target = target.parentNode;
                                        }
                                        target.style.background = 'none';
                                    },
                                    onClick: _this3.props.closeWindow.bind(_this3, page) },
                                _react2.default.createElement('i', { className: 'iconfont icon-close', style: { fontSize: 12 } })
                            ) : null
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'left-arrow', onClick: this.handleClickLeftArrow },
                    _react2.default.createElement('i', { className: 'iconfont icon-left' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'right-arrow', onClick: this.handleClickRightArrow },
                    _react2.default.createElement('i', { className: 'iconfont icon-right' })
                )
            );
        }
    }]);
    return WindowTabs;
}(_react.Component);

WindowTabs.defaultProps = {
    pages: [],
    currentUrl: undefined
};