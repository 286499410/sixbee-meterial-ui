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

var _pace = require('pace');

var _pace2 = _interopRequireDefault(_pace);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = function (_Component) {
    (0, _inherits3.default)(Filter, _Component);

    function Filter(props) {
        (0, _classCallCheck3.default)(this, Filter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Filter.__proto__ || (0, _getPrototypeOf2.default)(Filter)).call(this, props));

        _this.state = {
            open: false,
            label: undefined
        };

        _this.handleOpen = function (event) {
            _this.setState({
                open: true,
                anchorEl: event.currentTarget
            });
        };

        _this.handleRequestClose = function (event) {
            _this.setState({ open: false });
        };

        _this.handleFilter = function (data) {
            _this.setState({
                open: false
            });
            if (_this.props.onFilter) {
                _this.props.onFilter(data, _this);
            }
        };

        _this.handleReset = function () {
            if (_this.props.onReset) {
                _this.props.onReset(_this);
            }
        };

        return _this;
    }

    (0, _createClass3.default)(Filter, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { display: 'table' } },
                _react2.default.createElement(_button2.default, { style: { marginTop: 0 },
                    type: 'default',
                    iconClass: 'icon-search',
                    labelPosition: 'before',
                    label: this.state.label || this.props.label,
                    onClick: this.handleOpen }),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        style: { marginTop: 8, left: -2000 },
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: this.handleRequestClose
                    },
                    _react2.default.createElement(_form2.default, {
                        scene: this.props.scene,
                        model: this.props.model,
                        reset: this.props.reset,
                        useScrollbars: this.props.useScrollbars || false,
                        submitLabel: '\u67E5\u8BE2',
                        actionStyle: { boxShadow: 'none' },
                        onReset: this.handleReset,
                        onSubmit: this.handleFilter })
                )
            );
        }
    }]);
    return Filter;
}(_react.Component);

Filter.defaultProps = {
    label: '查询',
    scene: "filter"
};
exports.default = Filter;