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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _money = require('./money');

var _money2 = _interopRequireDefault(_money);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateRange = function (_Component) {
    (0, _inherits3.default)(DateRange, _Component);

    function DateRange(props) {
        (0, _classCallCheck3.default)(this, DateRange);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateRange.__proto__ || (0, _getPrototypeOf2.default)(DateRange)).call(this, props));

        _this.state = {
            startMoney: undefined,
            endMoney: undefined
        };

        _this.handleChange = function (index) {
            return function (value) {
                var originValue = _this.getValue();
                originValue[index] = value;
                _this.setValue(originValue);
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

                var _value = (0, _slicedToArray3.default)(value, 2);

                this.state.startMoney = _value[0];
                this.state.endMoney = _value[1];
            }
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(value) {
            return value === undefined || value === '' || value === null;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var _value2 = (0, _slicedToArray3.default)(value, 2),
                startMoney = _value2[0],
                endMoney = _value2[1];

            if (this.props.onChange) {
                if (this.isEmpty(startMoney) && this.isEmpty(endMoney)) {
                    this.props.onChange(undefined, this);
                } else {
                    this.props.onChange([startMoney, endMoney], this);
                }
            }
            this.setState({
                startMoney: startMoney,
                endMoney: endMoney
            });
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            if (this.state.startMoney === undefined && this.state.endMoney === undefined && this.props.defaultValue !== undefined && _lodash2.default.isArray(this.props.defaultValue) && this.props.defaultValue.length == 2) {
                return this.props.defaultValue;
            } else {
                return [this.state.startMoney, this.state.endMoney];
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var label = this.props.label;

            var _getValue = this.getValue(),
                _getValue2 = (0, _slicedToArray3.default)(_getValue, 2),
                startMoney = _getValue2[0],
                endMoney = _getValue2[1];

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
                _react2.default.createElement(
                    'div',
                    { className: 'flex middle' },
                    _react2.default.createElement(
                        'div',
                        { style: { width: 'calc(50% - 10px)', minWidth: 'calc(50% - 10px)' } },
                        _react2.default.createElement(_money2.default, {
                            borderShow: this.props.borderShow,
                            disabled: this.props.disabled,
                            immutable: this.props.immutable,
                            fullWidth: this.props.fullWidth,
                            value: startMoney,
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
                        _react2.default.createElement(_money2.default, {
                            borderShow: this.props.borderShow,
                            disabled: this.props.disabled,
                            immutable: this.props.immutable,
                            fullWidth: this.props.fullWidth,
                            value: endMoney,
                            onChange: this.handleChange(1)
                        })
                    )
                )
            );
        }
    }]);
    return DateRange;
}(_react.Component);

DateRange.defaultProps = {
    label: undefined,
    borderShow: true,
    disabled: false,
    immutable: false,
    fullWidth: true,
    hintText: undefined,
    errorText: undefined,
    defaultValue: undefined };
exports.default = DateRange;