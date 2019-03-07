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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = function (_Component) {
    (0, _inherits3.default)(Filter, _Component);

    function Filter(props) {
        (0, _classCallCheck3.default)(this, Filter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Filter.__proto__ || (0, _getPrototypeOf2.default)(Filter)).call(this, props));

        _this.state = {
            open: false,
            value: undefined,
            anchorEl: undefined
        };

        _this.handleClick = function (event) {
            event.preventDefault();
            _this.setState({
                open: true,
                value: _this.getValue(),
                anchorEl: event.currentTarget
            });
        };

        _this.handleRequestClose = function (event) {
            _this.setState({ open: false });
        };

        _this.getValue = function () {
            return _this.context.state.filterText;
        };

        _this.setValue = function (value) {
            _this.setState({ value: value });
            _this.context.setListState({
                filterText: value
            });
        };

        _this.handleChange = function (value) {
            _this.setState({ value: value });
        };

        _this.handleKeyUp = function (event) {
            if (event.keyCode == 13) {
                _this.handleConfirm();
            }
        };

        return _this;
    }

    (0, _createClass3.default)(Filter, [{
        key: 'handleConfirm',
        value: function handleConfirm() {
            this.handleRequestClose(event);
            this.setValue(this.state.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.getValue();
            return _react2.default.createElement(
                'div',
                { ref: 'container', className: 'icon-events', style: { display: 'inline-block', right: 'auto' } },
                _react2.default.createElement(_icon2.default, { ref: 'filterIcon',
                    type: 'button',
                    name: 'filter',
                    color: value !== undefined && value !== '' ? '#1890ff' : undefined,
                    onClick: this.handleClick
                }),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        open: this.state.open,
                        style: { left: -10000 },
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: this.props.anchorOrigin,
                        targetOrigin: this.props.targetOrigin,
                        onRequestClose: this.handleRequestClose
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'flex middle', style: { width: 180, height: 50, padding: 8 } },
                        _react2.default.createElement(
                            'div',
                            { className: 'border-primary', style: { width: 128, padding: '0 4px' } },
                            _react2.default.createElement(_control2.default, {
                                borderShow: false,
                                ref: 'control',
                                name: 'filter',
                                type: 'text',
                                value: this.state.value,
                                hintText: "输入筛选内容",
                                size: "small",
                                onKeyUp: this.handleKeyUp,
                                onChange: this.handleChange
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text-primary cursor-pointer', onClick: this.handleConfirm.bind(this), style: { marginLeft: 8 } },
                            '\u786E\u5B9A'
                        )
                    )
                )
            );
        }
    }]);
    return Filter;
}(_react.Component);

Filter.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setListState: _propTypes2.default.func
};
Filter.defaultProps = {
    anchorOrigin: { "horizontal": "left", "vertical": "bottom" },
    targetOrigin: { "horizontal": "left", "vertical": "top" }
};
exports.default = Filter;