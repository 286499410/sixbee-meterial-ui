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

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectTag = function (_Component) {
    (0, _inherits3.default)(SelectTag, _Component);

    function SelectTag(props) {
        (0, _classCallCheck3.default)(this, SelectTag);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SelectTag.__proto__ || (0, _getPrototypeOf2.default)(SelectTag)).call(this, props));

        _this.state = {
            value: undefined
        };

        _this.handleChange = function (value) {
            _this.setValue(value);
        };

        _this.handleClick = function (data) {
            return function (event) {
                if (data.disabled) {
                    return;
                }
                var clickValue = _lodash2.default.get(data, _this.props.dataSourceConfig.value);
                var value = clickValue;
                var originValue = _this.getValue();
                if (_this.props.multiple) {
                    if (_this.props.carryKey) {
                        value = {};
                        value[_this.props.dataSourceConfig.value] = _lodash2.default.get(data, _this.props.dataSourceConfig.value);
                    }
                    var indexOf = _lodash2.default.findIndex(originValue, function (n) {
                        return _this.props.carryKey ? n[_this.props.dataSourceConfig.value] == clickValue : n == clickValue;
                    });
                    if (indexOf >= 0) {
                        originValue.splice(indexOf, 1);
                    } else {
                        originValue.push(value);
                    }
                } else {
                    if (originValue != value) {
                        originValue = value;
                    } else {
                        originValue = '';
                    }
                }
                _this.setValue(originValue);
            };
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(SelectTag, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.value !== undefined) {
                this.state.value = props.value;
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.setState({ value: value });
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return (this.state.value === undefined ? this.props.defaultValue : this.state.value) || (this.props.multiple ? [] : undefined);
        }
    }, {
        key: 'getData',
        value: function getData(value) {
            var _this2 = this;

            var index = _lodash2.default.findIndex(this.props.dataSource, function (o) {
                return _lodash2.default.get(o, _this2.props.dataSourceConfig.value) == value;
            });
            return index >= 0 ? this.props.dataSource[index] : undefined;
        }
    }, {
        key: 'isChecked',
        value: function isChecked(value) {
            var _this3 = this;

            var valueArr = this.getValue();
            if (this.props.multiple) {
                var indexOf = _lodash2.default.findIndex(valueArr, function (n) {
                    return _this3.props.carryKey ? n[_this3.props.dataSourceConfig.value] == value : n == value;
                });
                if (indexOf >= 0) {
                    return true;
                }
                return false;
            } else {
                return valueArr == value;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var label = this.props.label;
            return _react2.default.createElement(
                'div',
                { style: (0, _extends3.default)({ marginTop: 12 }, this.props.style) },
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
                    { className: 'flex', style: { flexWrap: 'wrap' } },
                    this.props.dataSource.map(function (data, index) {
                        var style = {
                            background: '#f1f1f1',
                            padding: '4px 8px',
                            marginRight: 8,
                            marginBottom: 8,
                            color: '#222'
                        };
                        var value = _lodash2.default.get(data, _this4.props.dataSourceConfig.value);
                        if (_this4.isChecked(value)) {
                            style.background = '#5bc0de';
                            style.color = '#fff';
                        }
                        if (data.disabled) {
                            style.opacity = 0.3;
                            style.cursor = 'not-allowed';
                        }
                        var text = _utils2.default.replaceText(_this4.props.dataSourceConfig.text, data);
                        return _react2.default.createElement(
                            'div',
                            { className: 'cursor-pointer', key: index, style: style,
                                onClick: _this4.handleClick(data) },
                            text
                        );
                    })
                )
            );
        }
    }]);
    return SelectTag;
}(_react.Component);

SelectTag.defaultProps = {
    label: undefined,
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' },
    multiple: false,
    carryKey: true,
    disabled: [],
    style: {}
};
exports.default = SelectTag;