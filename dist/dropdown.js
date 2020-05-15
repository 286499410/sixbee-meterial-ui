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

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = function (_Component) {
    (0, _inherits3.default)(Dropdown, _Component);

    function Dropdown(props) {
        (0, _classCallCheck3.default)(this, Dropdown);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call(this, props));

        _this.state = {
            open: false
        };

        _this.handleOpen = function (event) {
            _this.setState({
                open: true,
                anchorEl: event.currentTarget
            });
        };

        _this.handleClick = function (item) {
            return function (event) {
                _this.setState({
                    open: false
                });
                if (_this.props.onClick) {
                    _this.props.onClick(item);
                }
                if (item.onClick) {
                    item.onClick(item, _this.props.context);
                }
            };
        };

        _this.handleRequestClose = function (event) {
            _this.setState({ open: false });
        };

        return _this;
    }

    (0, _createClass3.default)(Dropdown, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var styleProps = _style2.default.getStyle('dropdown', this.props);
            return _react2.default.createElement(
                'div',
                { style: { display: 'table' } },
                _react2.default.createElement(
                    'div',
                    { onClick: this.handleOpen, style: { cursor: 'pointer' } },
                    this.props.children
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        style: { marginTop: 8, left: -10000 },
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: this.props.anchorOrigin,
                        targetOrigin: this.props.targetOrigin,
                        onRequestClose: this.handleRequestClose
                    },
                    _react2.default.createElement(
                        _Menu2.default,
                        styleProps.menuStyle,
                        this.props.dataSource.map(function (item, index) {
                            if (item.type == 'divider') {
                                return _react2.default.createElement(_Divider2.default, { key: index });
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
    return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {
    anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
    targetOrigin: { horizontal: 'left', vertical: 'top' }
};
exports.default = Dropdown;