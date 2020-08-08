'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

require('react-date-range/dist/styles.css');

require('react-date-range/dist/theme/default.css');

var _reactDateRange = require('react-date-range');

var _tool = require('../lib/tool');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateRange = function (_Component) {
    (0, _inherits3.default)(DateRange, _Component);

    function DateRange(props) {
        (0, _classCallCheck3.default)(this, DateRange);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateRange.__proto__ || (0, _getPrototypeOf2.default)(DateRange)).call(this, props));

        _this.state = {
            value: undefined,
            open: false,
            anchorEl: {},
            clickNum: 0 };

        _this.handleClick = function (event) {
            _this.setState({
                open: true,
                anchorEl: _this.getAnchorEl()
            });
        };

        _this.handleClose = function (event) {
            _this.setState({ open: false, value: undefined });
        };

        _this.handleChange = function (ranges) {
            _this.state.clickNum++;
            var startDate = _.get(ranges, 'selection.startDate');
            var endDate = _.get(ranges, 'selection.endDate');
            var start = startDate ? (0, _tool.dateToStr)(startDate) : '';
            var end = endDate ? (0, _tool.dateToStr)(endDate) : '';
            if (_this.props.timestamp) {
                start = start ? (0, _tool.strToTime)(start) : '';
                end = end ? (0, _tool.strToTime)(end) : '';
            }
            var value = [start, end];
            _this.props.onChange && _this.props.onChange({ value: value });
            _this.setState({ value: value });
            if (_this.state.clickNum % 2 == 0) {
                _this.handleClose();
            }
        };

        _this.handleClear = function (event) {
            event.stopPropagation();
            _this.handleChange();
        };

        _this.ref = _react2.default.createRef();
        return _this;
    }

    (0, _createClass3.default)(DateRange, [{
        key: 'getAnchorEl',
        value: function getAnchorEl() {
            var className = this.ref.current.parentNode.parentNode.className;
            return className.indexOf("control-wrapper") >= 0 ? this.ref.current.parentNode.parentNode : this.ref.current;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var _ref = this.state.value || this.props.value,
                _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                _ref2$ = _ref2[0],
                start = _ref2$ === undefined ? '' : _ref2$,
                _ref2$2 = _ref2[1],
                end = _ref2$2 === undefined ? '' : _ref2$2;

            if (this.props.timestamp) {
                start = start ? (0, _tool.date)("Y-m-d", start) : '';
                end = end ? (0, _tool.date)("Y-m-d", end) : '';
            }
            return [start, end];
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
            console.log("render DateRange");

            var _getValue = this.getValue(),
                _getValue2 = (0, _slicedToArray3.default)(_getValue, 2),
                start = _getValue2[0],
                end = _getValue2[1];

            return _react2.default.createElement(
                'div',
                { ref: this.ref },
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _tool.joinBlankSpace)("flex middle between form-control cursor-pointer hover", this.props.className),
                        style: this.getStyle(),
                        onClick: this.handleClick },
                    (0, _tool.isEmpty)(start) || (0, _tool.isEmpty)(end) ? _react2.default.createElement(
                        'div',
                        null,
                        this.props.placeholder ? _react2.default.createElement(
                            'span',
                            { className: 'text-muted' },
                            this.props.placeholder
                        ) : null
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'flex between full-width relative' },
                        _react2.default.createElement(
                            'div',
                            { className: 'text-center', style: { width: 'calc(50% - 10px)' } },
                            start
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text-center', style: { width: 'calc(50% - 10px)' } },
                            end
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'date-range-separator flex middle center' },
                            '~'
                        )
                    ),
                    (0, _tool.isEmpty)(start) || (0, _tool.isEmpty)(end) ? _react2.default.createElement(
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
                    {
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: this.handleClose,
                        style: { width: 'auto' },
                        scaleX: 1 },
                    _react2.default.createElement(_reactDateRange.DateRangePicker, {
                        ranges: [{
                            startDate: start ? (0, _tool.strToDate)(start) : new Date(),
                            endDate: end ? (0, _tool.strToDate)(end) : new Date(),
                            key: 'selection'
                        }],
                        showSelectionPreview: false,
                        showMonthAndYearPickers: true,
                        showDateDisplay: false,
                        staticRanges: [],
                        inputRanges: [],
                        months: 2,
                        direction: 'horizontal',
                        onChange: this.handleChange
                    })
                )
            );
        }
    }]);
    return DateRange;
}(_react.Component);

DateRange.defaultProps = {
    value: undefined,
    timestamp: false,
    onChange: undefined
};
exports.default = DateRange;