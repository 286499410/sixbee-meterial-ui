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

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function (_Component) {
    (0, _inherits3.default)(Container, _Component);

    function Container(props) {
        (0, _classCallCheck3.default)(this, Container);
        return (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call(this, props));
    }

    (0, _createClass3.default)(Container, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                {
                    className: 'layout ' + this.props.className + ' ' + (this.props.fullScreen ? 'full-screen' : '') + ' direction-' + this.props.direction,
                    style: (0, _extends3.default)({}, this.props.style) },
                this.props.children
            );
        }
    }]);
    return Container;
}(_react.Component);

Container.defaultProps = {
    fullScreen: false,
    direction: 'row'
};

var Header = function (_Component2) {
    (0, _inherits3.default)(Header, _Component2);

    function Header(props) {
        (0, _classCallCheck3.default)(this, Header);
        return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).call(this, props));
    }

    (0, _createClass3.default)(Header, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'header ' + this.props.className, style: (0, _extends3.default)({}, this.props.style) },
                this.props.children
            );
        }
    }]);
    return Header;
}(_react.Component);

var Sidebar = function (_Component3) {
    (0, _inherits3.default)(Sidebar, _Component3);

    function Sidebar(props) {
        (0, _classCallCheck3.default)(this, Sidebar);
        return (0, _possibleConstructorReturn3.default)(this, (Sidebar.__proto__ || (0, _getPrototypeOf2.default)(Sidebar)).call(this, props));
    }

    (0, _createClass3.default)(Sidebar, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'sidebar ' + this.props.className,
                    style: (0, _extends3.default)({ width: this.props.width, minWidth: this.props.width }, this.props.style) },
                this.props.children
            );
        }
    }]);
    return Sidebar;
}(_react.Component);

Sidebar.defaultProps = {
    width: 200
};

var Content = function (_Component4) {
    (0, _inherits3.default)(Content, _Component4);

    function Content(props) {
        (0, _classCallCheck3.default)(this, Content);
        return (0, _possibleConstructorReturn3.default)(this, (Content.__proto__ || (0, _getPrototypeOf2.default)(Content)).call(this, props));
    }

    (0, _createClass3.default)(Content, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.init(nextProps);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.transition();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.transition();
        }
    }, {
        key: 'transition',
        value: function transition() {
            switch (this.props.transition) {
                case 'fade':
                    this.fadeIn();
                    break;
            }
        }
    }, {
        key: 'fadeIn',
        value: function fadeIn() {
            (0, _jquery2.default)(this.refs.container).animate({ opacity: 1 }, 350, 'linear');
        }
    }, {
        key: 'init',
        value: function init(props) {
            switch (props.transition) {
                case 'fade':
                    (0, _jquery2.default)(this.refs.container).css({ opacity: 0.1 });
                    break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var style = {};
            switch (this.props.transition) {
                case 'fade':
                    style.opacity = 0.1;
                    break;
            }
            return _react2.default.createElement(
                'div',
                { ref: 'container', className: 'content',
                    style: (0, _extends3.default)({}, this.props.style, style) },
                _react2.default.createElement(
                    _reactCustomScrollbars.Scrollbars,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'full-height ' + this.props.className },
                        this.props.children
                    )
                )
            );
        }
    }]);
    return Content;
}(_react.Component);

Content.defaultProps = {
    transition: 'fade'
};

var Footer = function (_Component5) {
    (0, _inherits3.default)(Footer, _Component5);

    function Footer(props) {
        (0, _classCallCheck3.default)(this, Footer);
        return (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || (0, _getPrototypeOf2.default)(Footer)).call(this, props));
    }

    (0, _createClass3.default)(Footer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'footer ' + this.props.className, style: (0, _extends3.default)({}, this.props.style) },
                this.props.children
            );
        }
    }]);
    return Footer;
}(_react.Component);

exports.default = {
    Container: Container,
    Header: Header,
    Sidebar: Sidebar,
    Footer: Footer,
    Content: Content
};