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

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContextMenu = function (_Component) {
    (0, _inherits3.default)(ContextMenu, _Component);

    function ContextMenu(props) {
        (0, _classCallCheck3.default)(this, ContextMenu);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ContextMenu.__proto__ || (0, _getPrototypeOf2.default)(ContextMenu)).call(this, props));

        _this.state = {
            open: false,
            anchorEl: undefined
        };

        _this.handleContextMenu = function (event) {
            event.preventDefault();
            _this.setState({
                open: true,
                anchorEl: event.target
            });
        };

        _this.handleRequestClose = function (event) {
            _this.setState({ open: false });
        };

        _this.handleClick = function (item) {
            return function (event) {
                _this.setState({
                    open: false
                });
                if (item.onClick) {
                    item.onClick(item, _this.props.context);
                }
                if (_this.props.onClick) {
                    _this.props.onClick(item);
                }
            };
        };

        return _this;
    }

    (0, _createClass3.default)(ContextMenu, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var styleProps = _style2.default.getStyle('dropdown', this.props);
            return _react2.default.createElement(
                'div',
                { style: this.props.style, onContextMenu: this.handleContextMenu },
                this.props.children,
                _react2.default.createElement(
                    _popover2.default,
                    { style: { left: -10000 },
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: this.handleRequestClose },
                    _react2.default.createElement(
                        _Menu2.default,
                        styleProps.menuStyle,
                        this.props.dataSource.map(function (item, index) {
                            if (item.type == 'divider') {
                                return _react2.default.createElement(Divider, { key: index });
                            }
                            return _react2.default.createElement(_MenuItem2.default, {
                                key: index,
                                primaryText: item.label,
                                disabled: item.disabled,
                                onClick: _this2.handleClick(item)
                            });
                        })
                    )
                )
            );
        }
    }]);
    return ContextMenu;
}(_react.Component);

ContextMenu.defaultProps = {
    style: undefined,
    dataSource: [],
    onClick: undefined
};
exports.default = ContextMenu;