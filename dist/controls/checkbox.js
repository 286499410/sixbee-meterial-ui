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

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function (_Component) {
    (0, _inherits3.default)(Checkbox, _Component);

    function Checkbox(props) {
        (0, _classCallCheck3.default)(this, Checkbox);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).call(this, props));

        _this.state = {
            value: undefined,
            dataSource: []
        };

        _this.setDataSource = function () {
            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.dataSource;

            _utils2.default.getDataSource(undefined, dataSource, _this.props.dataSourceConfig).then(function (dataSource) {
                _this.setState({ dataSource: dataSource });
            });
        };

        _this.getOptions = function (data) {
            var dataSourceConfig = _this.props.dataSourceConfig;
            var options = [];
            data.map(function (row) {
                options.push({
                    text: _lodash2.default.get(row, dataSourceConfig.text),
                    value: _lodash2.default.get(row, dataSourceConfig.value),
                    disabled: row.disabled
                });
            });
            return options;
        };

        _this.handleChange = function (value) {
            _this.setValue(value);
        };

        _this.handleCheck = function (row) {
            return function (event, isInputChecked) {
                if (_this.props.immutable) {
                    return;
                }
                var originValue = _this.getValue();
                if (_this.props.multiple) {
                    var value = row.value;
                    if (_this.props.carryKey) {
                        value = {};
                        value[_this.props.dataSourceConfig.value] = row.value;
                    }
                    if (isInputChecked) {
                        originValue.push(value);
                    } else {
                        _lodash2.default.remove(originValue, function (n) {
                            return _this.props.carryKey ? n[_this.props.dataSourceConfig.value] == row.value : n == row.value;
                        });
                    }
                    originValue = _lodash2.default.uniq(originValue);
                } else {
                    originValue = isInputChecked ? 1 : 0;
                }
                _this.setValue(originValue);
            };
        };

        _this.isChecked = function (value) {
            var valueArr = _this.getValue();
            var indexOf = _lodash2.default.findIndex(valueArr, function (n) {
                return _this.props.carryKey ? n[_this.props.dataSourceConfig.value] == value : n == value;
            });
            if (indexOf >= 0) {
                return true;
            }
            return false;
        };

        _this.setDataSource();
        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Checkbox, [{
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
            this.state.value = value;
            this.forceUpdate();
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

            var index = _lodash2.default.findIndex(this.state.dataSource, function (o) {
                return _lodash2.default.get(o, _this2.props.dataSourceConfig.value) == value;
            });
            return index >= 0 ? this.state.dataSource[index] : undefined;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var value = this.getValue();
            var label = this.props.label;
            var styleProps = _lodash2.default.merge({}, _style2.default.getStyle('checkbox', this.props), this.props.styleProps);
            var options = this.getOptions(this.state.dataSource);
            if (options && options.length > 0) {
                return _react2.default.createElement(
                    'div',
                    { style: (0, _extends3.default)({}, this.props.style, this.props.rootStyle) },
                    _react2.default.createElement(
                        'div',
                        { style: (0, _extends3.default)({}, styleProps.labelStyle) },
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
                        { className: 'row', cols: this.props.cols },
                        options.map(function (row, index) {
                            return _react2.default.createElement(
                                'div',
                                { key: index, className: 'col', style: { marginTop: 4 } },
                                _react2.default.createElement(_Checkbox2.default, {
                                    name: _this3.props.name || _this3.props.dataKey || _utils2.default.uuid(),
                                    key: index,
                                    label: row.text,
                                    checked: _this3.isChecked(row.value),
                                    onCheck: _this3.handleCheck(row)
                                })
                            );
                        })
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { style: (0, _extends3.default)({}, this.props.style, this.props.rootStyle) },
                    _react2.default.createElement(_Checkbox2.default, (0, _extends3.default)({
                        label: label,
                        disabled: this.props.disabled,
                        name: this.props.name || this.props.dataKey || _utils2.default.uuid()
                    }, styleProps, {
                        checked: value == 1,
                        onCheck: this.handleCheck()
                    }))
                );
            }
        }
    }]);
    return Checkbox;
}(_react.Component);

Checkbox.defaultProps = {
    label: undefined,
    defaultChecked: false,
    errorText: undefined,
    immutable: false,
    dataSource: [],
    carryKey: true,
    dataSourceConfig: { text: 'text', value: 'value' },
    cols: undefined };
exports.default = Checkbox;