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

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateRange = function (_Component) {
    (0, _inherits3.default)(DateRange, _Component);

    function DateRange(props) {
        (0, _classCallCheck3.default)(this, DateRange);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateRange.__proto__ || (0, _getPrototypeOf2.default)(DateRange)).call(this, props));

        _this.state = {
            startDate: undefined,
            endDate: undefined
        };

        _this.handleChange = function (index) {
            return function (value) {
                var originValue = _this.getValue();
                originValue[index] = value;
                if (_this.props.timestamp) {
                    _this.setValue([!_this.isEmpty(originValue[0]) ? _utils2.default.strToTime(originValue[0]) : undefined, !_this.isEmpty(originValue[1]) ? _utils2.default.strToTime(originValue[1]) : undefined]);
                } else {
                    _this.setValue(originValue);
                }
            };
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
            } else if (props.hasOwnProperty('value') && props.value === undefined) {
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
            var _convertValue3 = this.convertValue(value),
                _convertValue4 = (0, _slicedToArray3.default)(_convertValue3, 2),
                startDate = _convertValue4[0],
                endDate = _convertValue4[1];

            if (this.props.onChange) {
                if (this.isEmpty(startDate) && this.isEmpty(endDate)) {
                    this.props.onChange(undefined, this);
                } else if (this.props.timestamp) {
                    this.props.onChange([!this.isEmpty(startDate) ? _utils2.default.strToTime(startDate) : undefined, !this.isEmpty(endDate) ? _utils2.default.strToTime(endDate) + 86400 - 1 : undefined], this);
                } else {
                    this.props.onChange([startDate, endDate], this);
                }
            }
            this.setState({
                startDate: startDate,
                endDate: endDate
            });
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
                { className: 'flex middle' },
                _react2.default.createElement(
                    'div',
                    { style: { width: 'calc(50% - 10px)', minWidth: 'calc(50% - 10px)' } },
                    _react2.default.createElement(_date2.default, {
                        borderShow: this.props.borderShow && borderStyle === 'underline',
                        hasClear: this.props.hasClear,
                        disabled: this.props.disabled,
                        immutable: this.props.immutable,
                        fullWidth: this.props.fullWidth,
                        value: startDate,
                        maxDate: endDate,
                        onChange: this.handleChange(0)
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'text-center', style: { color: '#ccc', width: 20, minWidth: 20 } },
                    '-'
                ),
                _react2.default.createElement(
                    'div',
                    { style: { width: 'calc(50% - 10px)', minWidth: 'calc(50% - 10px)' } },
                    _react2.default.createElement(_date2.default, {
                        borderShow: this.props.borderShow && borderStyle === 'underline',
                        hasClear: this.props.hasClear,
                        disabled: this.props.disabled,
                        immutable: this.props.immutable,
                        fullWidth: this.props.fullWidth,
                        value: endDate,
                        minDate: startDate,
                        onChange: this.handleChange(1)
                    })
                )
            );
            return _react2.default.createElement(
                'div',
                null,
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
    activeStartDate: undefined,
    minDate: undefined,
    maxDate: undefined,
    timestamp: false };
DateRange.contextTypes = {
    muiTheme: _propTypes2.default.object
};
exports.default = DateRange;