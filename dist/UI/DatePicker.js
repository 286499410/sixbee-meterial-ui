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

require('react-date-range/dist/styles.css');

require('react-date-range/dist/theme/default.css');

var _reactDateRange = require('react-date-range');

var _tool = require('../lib/tool');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function (_Component) {
    (0, _inherits3.default)(DatePicker, _Component);

    function DatePicker(props) {
        (0, _classCallCheck3.default)(this, DatePicker);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this, props));

        _this.state = {
            open: false,
            anchorEl: {}
        };

        _this.handleClick = function (event) {
            _this.setState({
                open: true,
                anchorEl: _this.ref.current
            });
        };

        _this.handleClose = function (event) {
            _this.setState({ open: false });
        };

        _this.handleChange = function (date) {
            var dateStr = _lodash2.default.isDate(date) ? (0, _tool.dateToStr)(date) : date;
            _this.handleClose();
            var value = dateStr ? _this.props.timestamp ? (0, _tool.strToTime)(dateStr) : dateStr : '';
            _this.props.onChange && _this.props.onChange({ value: value });
        };

        _this.handleClear = function (event) {
            event.stopPropagation();
            _this.handleChange('');
        };

        _this.ref = _react2.default.createRef();
        return _this;
    }

    (0, _createClass3.default)(DatePicker, [{
        key: 'getDateStr',
        value: function getDateStr() {
            if (this.props.timestamp) {
                if (parseInt(this.props.value) == this.props.value) {
                    return (0, _tool.date)("Y-m-d", this.props.value);
                }
                return '';
            }
            return this.props.value || '';
        }
    }, {
        key: 'getStyle',
        value: function getStyle() {
            var style = (0, _extends3.default)({}, this.props.style);
            return style;
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("render DatePicker");
            var date = this.getDateStr();
            return _react2.default.createElement(
                'div',
                { ref: this.ref },
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _tool.joinBlankSpace)("flex middle between form-control cursor-pointer hover", this.props.className),
                        style: this.getStyle(),
                        onClick: this.handleClick
                    },
                    (0, _tool.isEmpty)(date) ? _react2.default.createElement(
                        'div',
                        null,
                        this.props.placeholder ? _react2.default.createElement(
                            'span',
                            { className: 'text-muted' },
                            this.props.placeholder
                        ) : null
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'text-ellipsis' },
                        date
                    ),
                    (0, _tool.isEmpty)(date) ? _react2.default.createElement(
                        'div',
                        { className: 'text-muted' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(_Icon2.default, { name: 'calendar' })
                        )
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'text-muted' },
                        _react2.default.createElement(
                            'div',
                            { className: 'hover-show' },
                            _react2.default.createElement(_Icon2.default, { name: 'close-circle-fill', onClick: this.handleClear })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'hover-hide' },
                            _react2.default.createElement(_Icon2.default, { name: 'calendar' })
                        )
                    )
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    (0, _extends3.default)({}, this.props.popoverProps, {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: this.handleClose,
                        style: { width: 'auto' },
                        scaleX: 1 }),
                    _react2.default.createElement(_reactDateRange.Calendar, {
                        date: date ? (0, _tool.strToDate)(date) : new Date(),
                        onChange: this.handleChange,
                        minDate: this.props.minDate ? (0, _tool.strToDate)(this.props.minDate) : undefined,
                        maxDate: this.props.maxDate ? (0, _tool.strToDate)(this.props.maxDate) : undefined
                    })
                )
            );
        }
    }]);
    return DatePicker;
}(_react.Component);

DatePicker.defaultProps = {
    value: undefined,
    timestamp: false,
    onChange: undefined
};
exports.default = DatePicker;