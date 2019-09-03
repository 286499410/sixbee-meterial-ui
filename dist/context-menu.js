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

var _popover = require('./popover');

var _popover2 = _interopRequireDefault(_popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContextMenu = function (_Component) {
    (0, _inherits3.default)(ContextMenu, _Component);

    function ContextMenu(props) {
        (0, _classCallCheck3.default)(this, ContextMenu);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ContextMenu.__proto__ || (0, _getPrototypeOf2.default)(ContextMenu)).call(this, props));

        _this.state = {
            open: false
        };
        return _this;
    }

    (0, _createClass3.default)(ContextMenu, [{
        key: 'handleContextMenu',
        value: function handleContextMenu(event) {
            console.log(event);
            event.preventDefault();
            this.setState({
                open: true,
                target: event.target
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: this.props.style, onContextMenu: this.handleContextMenu },
                this.props.children,
                _react2.default.createElement(
                    _popover2.default,
                    { open: this.state.open },
                    _react2.default.createElement('div', null)
                )
            );
        }
    }]);
    return ContextMenu;
}(_react.Component);

ContextMenu.defaultProps = {
    style: undefined
};
exports.default = ContextMenu;