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

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function (_Tag) {
    (0, _inherits3.default)(Tag, _Tag);

    function Tag(props) {
        (0, _classCallCheck3.default)(this, Tag);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).call(this, props));

        _this.state = {
            value: undefined
        };

        _this.handleChange = function (value) {
            _this.setValue(value);
        };

        _this.handleClick = function (data) {
            return function (event) {
                var value = _lodash2.default.get(data, _this.props.dataSourceConfig.value);
                if (_this.props.multiple) {
                    if (_lodash2.default.isArray(_this.state.value)) {
                        var indexOf = _this.state.value.indexOf(value);
                        if (indexOf >= 0) {
                            _this.state.value = _this.state.value.splice(indexOf, 1);
                        } else {
                            _this.state.value.push(value);
                        }
                    } else {
                        _this.state.value = [value];
                    }
                } else {
                    if (_this.state.value !== value) {
                        _this.state.value = value;
                    } else {
                        _this.state.value = '';
                    }
                }
                _this.setValue(_this.state.value);
            };
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Tag, [{
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
            var value = this.state.value === undefined ? this.props.defaultValue : this.state.value;
            return value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var label = this.props.label;
            return _react2.default.createElement(
                'div',
                null,
                label === false ? null : _react2.default.createElement(
                    'div',
                    { style: styleProps.labelStyle },
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
                    { className: 'flex' },
                    this.props.dataSource.map(function (data, index) {
                        var style = {
                            background: '#f1f1f1',
                            padding: '4px 8px',
                            marginRight: 8,
                            color: '#222'
                        };
                        var value = _lodash2.default.get(data, _this2.props.dataSourceConfig.value);
                        if (_this2.state.value === value || _lodash2.default.isArray(_this2.state.value) && _this2.state.value.indexOf(value)) {
                            style.background = '#5bc0de';
                            style.color = '#fff';
                        }
                        var text = _utils2.default.replaceText(_this2.props.dataSourceConfig.text, data);
                        return _react2.default.createElement(
                            'div',
                            { key: index, style: style, onClick: _this2.handleClick(data) },
                            text
                        );
                    })
                )
            );
        }
    }]);
    return Tag;
}(Tag);

Tag.defaultProps = {
    label: undefined,
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' },
    multiple: false };
exports.default = Tag;