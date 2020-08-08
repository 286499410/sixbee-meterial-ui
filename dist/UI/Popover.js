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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tool = require('./tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Popover = function (_Component) {
    (0, _inherits3.default)(Popover, _Component);

    function Popover(props) {
        (0, _classCallCheck3.default)(this, Popover);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Popover.__proto__ || (0, _getPrototypeOf2.default)(Popover)).call(this, props));

        _this.content = _react2.default.createRef();
        _this.state = {
            id: "popover" + new Date().getTime()
        };
        return _this;
    }

    (0, _createClass3.default)(Popover, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.componentDidUpdate();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.open) {
                this.renderPopoverContent();
            } else if (this.content && this.content.current) {
                this.content.current.unmount();
            }
        }
    }, {
        key: 'renderPopoverContent',
        value: function renderPopoverContent() {
            _reactDom2.default.render(_react2.default.createElement(PopoverContent, (0, _extends3.default)({ ref: this.content }, this.props, { id: this.state.id })), document.getElementById(this.state.id));
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            var id = prevState.id;
            if (nextProps.open === true && !document.getElementById(id)) {
                var div = document.createElement("div");
                div.id = id;
                document.body.appendChild(div);
            }
            return null;
        }
    }]);
    return Popover;
}(_react.Component);

Popover.defaultProps = {
    open: false,
    onRequestClose: undefined,
    className: undefined,
    anchorEl: undefined,
    anchorOrigin: "left bottom",
    targetOrigin: "left top",
    scaleX: 0,
    scaleY: 0,
    style: {
        width: undefined,
        height: undefined },
    zIndex: 1000
};
exports.default = Popover;

var PopoverContent = function (_Component2) {
    (0, _inherits3.default)(PopoverContent, _Component2);

    function PopoverContent(props) {
        (0, _classCallCheck3.default)(this, PopoverContent);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (PopoverContent.__proto__ || (0, _getPrototypeOf2.default)(PopoverContent)).call(this, props));

        _this2.state = { open: false };

        _this2.unmount = function () {
            var containerDOM = _reactDom2.default.findDOMNode(_this2.containerRef.current);
            containerDOM.style.opacity = "0";
            containerDOM.style.transform = 'scale(' + _this2.props.scaleX + ', ' + _this2.props.scaleY + ')';
            setTimeout(function () {
                var node = document.getElementById(_this2.props.id);
                _reactDom2.default.unmountComponentAtNode(node);
                node.parentNode.removeChild(node);
            }, 300);
        };

        _this2.handleRequestClose = function (event) {
            event.stopPropagation();
            if (_this2.props.onRequestClose) {
                _this2.props.onRequestClose(event);
            }
        };

        _this2.containerRef = _react2.default.createRef();
        return _this2;
    }

    (0, _createClass3.default)(PopoverContent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var containerDOM = _reactDom2.default.findDOMNode(this.containerRef.current);
            if (containerDOM && this.props.open === true) {
                setTimeout(function () {
                    var position = _this3.getPosition();
                    containerDOM.style.left = position.left + "px";
                    containerDOM.style.top = position.top + "px";
                    containerDOM.style.opacity = "1";
                    containerDOM.style.transform = "scale(1, 1)";
                });
            }
            if (this.state.open === true && this.props.open === false) {
                containerDOM.style.opacity = "0";
                containerDOM.style.transform = 'scale(' + this.props.scaleX + ', ' + this.props.scaleY + ')';
                setTimeout(function () {
                    _this3.setState({ open: _this3.props.open });
                }, 300);
            }
        }
    }, {
        key: 'getAnchorPosition',
        value: function getAnchorPosition() {
            var position = {};
            var el = this.props.anchorEl;
            if (el && el.getBoundingClientRect) {
                var rect = el.getBoundingClientRect();
                position = {
                    top: rect.top,
                    left: rect.left,
                    width: el.offsetWidth,
                    height: el.offsetHeight
                };
                position.right = rect.right || position.left + position.width;
                position.bottom = rect.bottom || position.top + position.height;
                position.middle = position.left + (position.right - position.left) / 2;
                position.center = position.top + (position.bottom - position.top) / 2;
            }
            return position;
        }
    }, {
        key: 'getTargetPosition',
        value: function getTargetPosition() {
            var targetEl = this.containerRef.current && _reactDom2.default.findDOMNode(this.containerRef.current);
            return {
                left: 0,
                middle: targetEl ? targetEl.offsetWidth / 2 : 0,
                right: targetEl ? targetEl.offsetWidth : 0,
                top: 0,
                center: targetEl ? targetEl.offsetHeight / 2 : 0,
                bottom: targetEl ? targetEl.offsetHeight : 0,
                width: targetEl ? targetEl.offsetWidth : undefined,
                height: targetEl ? targetEl.offsetHeight : undefined
            };
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            var anchorOrigin = this.props.anchorOrigin.split(' ');
            var targetOrigin = this.props.targetOrigin.split(' ');
            var anchorPosition = this.getAnchorPosition();
            var targetPosition = this.getTargetPosition();
            return {
                left: anchorPosition[anchorOrigin[0]] - targetPosition[targetOrigin[0]],
                top: anchorPosition[anchorOrigin[1]] - targetPosition[targetOrigin[1]],
                width: _.get(this.props, 'style.width', targetPosition.width),
                opacity: 0,
                transform: 'scale(' + this.props.scaleX + ', ' + this.props.scaleY + ')',
                transformOrigin: this.props.targetOrigin.replace('middle', 'center')
            };
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.open) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('div', { className: 'full-screen-fixed', style: { zIndex: this.props.zIndex - 1 },
                        onClick: this.handleRequestClose }),
                    _react2.default.createElement(
                        'div',
                        { ref: this.containerRef, className: (0, _tool.joinBlankSpace)("popover", this.props.className),
                            style: (0, _extends3.default)({}, this.props.style, this.getPosition()) },
                        this.props.children
                    )
                );
            } else {
                return null;
            }
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps.open === true && prevState.open === false) {
                return { open: true };
            }
            return null;
        }
    }]);
    return PopoverContent;
}(_react.Component);