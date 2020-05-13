'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDateRange = require('react-date-range');

require('react-date-range/dist/styles.css');

require('react-date-range/dist/theme/default.css');

var _locale = require('react-date-range/dist/locale');

var rdrLocales = _interopRequireWildcard(_locale);

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateRange = function (_Component) {
    (0, _inherits3.default)(DateRange, _Component);

    function DateRange(props) {
        (0, _classCallCheck3.default)(this, DateRange);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateRange.__proto__ || (0, _getPrototypeOf2.default)(DateRange)).call(this, props));

        _this.state = {
            startDate: undefined,
            endDate: undefined,
            anchorEl: {},
            open: false,
            clickNum: 0
        };

        _this.handleChange = function (ranges) {
            _this.state.clickNum++;
            var startDate = ranges.selection.startDate ? _utils2.default.dateToStr(ranges.selection.startDate) : undefined;
            var endDate = ranges.selection.endDate ? _utils2.default.dateToStr(ranges.selection.endDate) : undefined;
            var originValue = _this.getValue();
            originValue[0] = startDate;
            originValue[1] = endDate;
            if (_this.props.timestamp) {
                _this.setValue([!_this.isEmpty(originValue[0]) ? _utils2.default.strToTime(originValue[0]) : undefined, !_this.isEmpty(originValue[1]) ? _utils2.default.strToTime(originValue[1]) : undefined]);
            } else {
                _this.setValue(originValue);
            }
            if (_this.state.clickNum % 2 == 0) {
                setTimeout(function () {
                    _this.handleRequestClose();
                }, 300);
            }
        };

        _this.openCalendar = function (event) {
            _this.setState({
                open: true,
                anchorEl: _this.refs.container
            });
        };

        _this.handleRequestClose = function (event) {
            _this.setState({ open: false });
        };

        _this.handleClear = function (event) {
            event.stopPropagation();
            _this.setValue([null, null]);
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(DateRange, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (_lodash2.default.isArray(props.value) && props.value.length == 2) {
                var value = props.value;

                var _convertValue = this.convertValue(value);

                var _convertValue2 = (0, _slicedToArray3.default)(_convertValue, 2);

                this.state.startDate = _convertValue2[0];
                this.state.endDate = _convertValue2[1];
            } else if (props.hasOwnProperty('value') && (props.value === undefined || props.value === null)) {
                this.state.startDate = undefined;
                this.state.endDate = undefined;
            }
        }
    }, {
        key: 'convertValue',
        value: function convertValue(value) {
            var _value = (0, _slicedToArray3.default)(value, 2),
                startDate = _value[0],
                endDate = _value[1];

            if (this.props.timestamp) {
                if (!this.isEmpty(startDate)) {
                    startDate = _utils2.default.date('Y-m-d', startDate);
                }
                if (!this.isEmpty(endDate)) {
                    endDate = _utils2.default.date('Y-m-d', endDate);
                }
            }
            return [startDate, endDate];
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(value) {
            return value === undefined || value === '' || value === null;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var _ref = value === undefined ? [undefined, undefined] : this.convertValue(value),
                _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                startDate = _ref2[0],
                endDate = _ref2[1];

            this.state.startDate = startDate;
            this.state.endDate = endDate;
            if (this.props.onChange) {
                if (this.isEmpty(startDate) && this.isEmpty(endDate)) {
                    this.props.onChange(undefined, this);
                } else if (this.props.timestamp) {
                    this.props.onChange([!this.isEmpty(startDate) ? _utils2.default.strToTime(startDate) : undefined, !this.isEmpty(endDate) ? _utils2.default.strToTime(endDate) + 86400 - 1 : undefined], this);
                } else {
                    this.props.onChange([startDate, endDate], this);
                }
            }
            this.forceUpdate();
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            if (this.state.startDate === undefined && this.state.endDate === undefined && this.props.defaultValue !== undefined && _lodash2.default.isArray(this.props.defaultValue) && this.props.defaultValue.length == 2) {
                return this.convertValue(this.props.defaultValue);
            } else {
                return [this.state.startDate, this.state.endDate];
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var label = this.props.label;

            var _getValue = this.getValue(),
                _getValue2 = (0, _slicedToArray3.default)(_getValue, 2),
                startDate = _getValue2[0],
                endDate = _getValue2[1];

            var borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
            var content = _react2.default.createElement(
                'div',
                { ref: 'container', className: 'flex middle relative full-width cursor-pointer hover',
                    onClick: this.openCalendar },
                _react2.default.createElement(
                    'div',
                    { className: 'flex middle relative', style: { width: 'calc(100% - 16px)', height: 40, fontSize: 13 } },
                    _react2.default.createElement(
                        'div',
                        { style: {
                                width: 'calc(50% - 10px)',
                                minWidth: 'calc(50% - 10px)',
                                textAlign: 'center'
                            } },
                        startDate
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'text-center', style: { color: '#ccc', width: 20, minWidth: 20 } },
                        '-'
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: {
                                width: 'calc(50% - 10px)',
                                minWidth: 'calc(50% - 10px)',
                                textAlign: 'center'
                            } },
                        endDate
                    )
                ),
                borderStyle === 'underline' && this.props.borderShow ? _react2.default.createElement('hr', { 'aria-hidden': 'true',
                    style: {
                        borderTop: "none rgb(224, 224, 224)",
                        borderLeft: "none rgb(224, 224, 224)",
                        borderRight: "none rgb(224, 224, 224)",
                        borderBottom: "1px solid rgb(224, 224, 224)",
                        bottom: 6,
                        boxSizing: "content-box",
                        margin: 0,
                        position: "absolute",
                        width: "100%"
                    } }) : null,
                startDate ? _react2.default.createElement(
                    'div',
                    { className: 'relative', style: { width: 16 } },
                    _react2.default.createElement(
                        'div',
                        { className: 'hover-hide' },
                        _react2.default.createElement('i', { className: 'iconfont icon-calendar' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'hover-show', onClick: this.handleClear },
                        _react2.default.createElement('i', {
                            className: 'iconfont icon-close-circle-fill', style: { color: 'rgba(0,0,0,0.3)' } })
                    )
                ) : _react2.default.createElement(
                    'div',
                    { className: 'relative', style: { width: 16 } },
                    _react2.default.createElement('i', { className: 'iconfont icon-calendar' })
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        ref: 'popover',
                        style: {
                            left: -10000,
                            boxShadow: '0 1px 10px #888',
                            marginTop: 10,
                            marginLeft: -6
                        },
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        onRequestClose: this.handleRequestClose },
                    _react2.default.createElement(_reactDateRange.DateRangePicker, {
                        ranges: [{
                            startDate: startDate ? _utils2.default.strToDate(startDate) : new Date(),
                            endDate: endDate ? _utils2.default.strToDate(endDate) : new Date(),
                            key: 'selection'
                        }],
                        showSelectionPreview: false,
                        showMonthAndYearPickers: true,
                        showDateDisplay: false,
                        staticRanges: [],
                        inputRanges: [],
                        locale: rdrLocales['zhCN'],
                        months: 2,
                        direction: 'horizontal',
                        onChange: this.handleChange
                    })
                )
            );
            return _react2.default.createElement(
                'div',
                { style: this.props.rootStyle },
                label === false ? null : _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        { style: {
                                transform: "scale(0.75)",
                                transformOrigin: 'left top 0px',
                                color: 'rgba(0,0,0,0.3)',
                                fontSize: 15,
                                display: 'inline-block'
                            } },
                        label
                    )
                ),
                borderStyle === 'border' && this.props.borderShow ? _react2.default.createElement(
                    'div',
                    { className: 'control-border' },
                    content
                ) : content
            );
        }
    }]);
    return DateRange;
}(_react.Component);

DateRange.defaultProps = {
    label: undefined,
    borderShow: true,
    hasClear: true,
    disabled: false,
    immutable: false,
    fullWidth: true,
    hintText: undefined,
    errorText: undefined,
    defaultValue: undefined,
    activeStartDate: _utils2.default.date('Y-m-d', new Date().getTime() / 1000),
    minDate: undefined,
    maxDate: undefined,
    timestamp: false };
DateRange.contextTypes = {
    muiTheme: _propTypes2.default.object
};
exports.default = DateRange;