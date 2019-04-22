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

var _reactSwipeableViews = require('react-swipeable-views');

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _reactCustomScrollbars = require('react-custom-scrollbars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function (_Component) {
    (0, _inherits3.default)(Tabs, _Component);

    function Tabs(props) {
        (0, _classCallCheck3.default)(this, Tabs);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).call(this, props));

        _this.state = {
            activeIndex: undefined
        };
        _this.transition = {
            fade: FadeViews,
            slide: _reactSwipeableViews2.default
        };

        _this.handleChange = function (value) {
            return function (event) {
                _this.setState({
                    activeIndex: value
                });
                if (_this.props.onChange) {
                    _this.props.onChange(value);
                }
            };
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Tabs, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.activeIndex !== undefined) {
                this.state.activeIndex = props.activeIndex;
            }
        }
    }, {
        key: 'getActiveIndex',
        value: function getActiveIndex() {
            return this.state.activeIndex === undefined ? this.props.defaultActiveIndex : this.state.activeIndex;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            switch (this.props.transition) {
                case 'slide':
                    return _react2.default.createElement(
                        _reactSwipeableViews2.default,
                        { index: this.state.activeIndex },
                        this.props.dataSource.map(function (data, index) {
                            return _react2.default.createElement(
                                'div',
                                { key: index },
                                data.content
                            );
                        })
                    );
                case 'fade':
                default:
                    return _react2.default.createElement(
                        FadeViews,
                        { index: this.state.activeIndex },
                        this.props.dataSource.map(function (data, index) {
                            return _react2.default.createElement(
                                'div',
                                { key: index },
                                data.content
                            );
                        })
                    );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var Transition = this.transition[this.props.transition];
            var activeIndex = this.getActiveIndex();
            return _react2.default.createElement(
                'div',
                { ref: 'container', className: 'layout direction-column' },
                _react2.default.createElement(
                    'div',
                    { className: "tab " + this.props.tabClassName, style: this.props.labelStyle },
                    this.props.dataSource.map(function (data, index) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'tab-item ' + (activeIndex == index ? 'active' : ''), key: index, style: data.style,
                                onClick: _this2.handleChange(index) },
                            data.label
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'relative', style: (0, _extends3.default)({ flexGrow: 1, height: 0 }, this.props.contentStyle) },
                    _react2.default.createElement(
                        Transition,
                        { index: activeIndex },
                        this.props.dataSource.map(function (data, index) {
                            return _react2.default.createElement(
                                'div',
                                { key: index, style: { height: '100%' } },
                                data.content
                            );
                        })
                    )
                )
            );
        }
    }]);
    return Tabs;
}(_react.Component);

Tabs.defaultProps = {
    defaultActiveIndex: 0,
    activeIndex: undefined,
    transition: 'fade',
    contentStyle: {},
    tabClassName: undefined
};
exports.default = Tabs;

var FadeViews = function (_Component2) {
    (0, _inherits3.default)(FadeViews, _Component2);

    function FadeViews() {
        (0, _classCallCheck3.default)(this, FadeViews);
        return (0, _possibleConstructorReturn3.default)(this, (FadeViews.__proto__ || (0, _getPrototypeOf2.default)(FadeViews)).apply(this, arguments));
    }

    (0, _createClass3.default)(FadeViews, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            var children = _lodash2.default.isArray(this.props.children) ? this.props.children : [this.props.children];
            return _react2.default.createElement(
                'div',
                { ref: 'container', className: 'full-screen' },
                children.map(function (data, index) {
                    var isActive = index === _this4.props.index;
                    return _react2.default.createElement(
                        'div',
                        { className: 'tab-container full-screen', key: index,
                            style: {
                                transition: 'opacity .3s ease-out',
                                opacity: isActive ? 1 : 0,
                                height: '100%',
                                zIndex: isActive ? 2 : 1
                            } },
                        _react2.default.createElement(
                            _reactCustomScrollbars.Scrollbars,
                            null,
                            data
                        )
                    );
                })
            );
        }
    }]);
    return FadeViews;
}(_react.Component);