'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function (_Component) {
    (0, _inherits3.default)(Text, _Component);

    function Text(props) {
        (0, _classCallCheck3.default)(this, Text);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).call(this, props));

        _this.state = {
            value: undefined,
            errorText: ''
        };

        _this.setValue = function (value) {
            if (_this.props.onChange) {
                _this.props.onChange(value, _this);
            }
            _this.setState({ value: value });
        };

        _this.handleChange = function (event) {
            var value = event.target.value;
            if (!_this.props.immutable) {
                switch (_this.props.type) {
                    case 'number':
                        if (!/^-?\d*((\.\d*)?)$/.test(value)) {
                            return;
                        }
                        break;
                    case 'mobile':
                        if (!/^\d*$/.test(value)) {
                            return;
                        }
                        break;
                }
                _this.setValue(value);
            }
        };

        _this.handleBlur = function (event) {
            if (_this.props.onBlur) {
                _this.props.onBlur(event, _this);
            }
        };

        _this.handleFocus = function (event) {
            if (_this.props.onFocus) {
                _this.props.onFocus(event, _this);
            }
        };

        _this.handleKeyUp = function (event) {
            if (_this.props.onKeyUp) {
                _this.props.onKeyUp(event, _this);
            }
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Text, [{
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
        key: 'getValue',
        value: function getValue() {
            return this.state.value === undefined ? this.props.defaultValue === undefined ? '' : this.props.defaultValue : this.state.value;
        }
    }, {
        key: 'getStyleProps',
        value: function getStyleProps() {
            var styleProps = _style2.default.getStyle('text', this.props);
            if (this.props.textAlign) {
                styleProps.inputStyle = (0, _assign2.default)({}, styleProps.inputStyle, { textAlign: this.props.textAlign });
            }
            return _lodash2.default.merge(styleProps, this.props.styleProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.getValue();
            var label = this.props.label;
            var styleProps = this.getStyleProps();
            var type = this.props.type;
            if (type == 'number' || type == 'mobile') {
                type = 'text';
            }
            return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
                name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                fullWidth: this.props.fullWidth,
                floatingLabelText: label,
                type: type,
                value: value == null ? '' : value,
                disabled: this.props.disabled,
                onChange: this.handleChange,
                onBlur: this.handleBlur,
                onFocus: this.handleFocus,
                onKeyUp: this.handleKeyUp,
                multiLine: this.props.multiLine,
                rows: this.props.rows,
                hintText: this.props.hintText,
                errorText: this.props.errorText,
                floatingLabelFixed: this.props.labelFixed,
                underlineShow: this.props.borderShow,
                autoComplete: this.props.autoComplete
            }, styleProps));
        }
    }]);
    return Text;
}(_react.Component);

Text.defaultProps = {
    label: undefined,
    defaultValue: undefined,
    type: 'text',
    disabled: false,
    immutable: false,
    multiLine: false,
    borderShow: true,
    rows: 1,
    fullWidth: true,
    hintText: undefined,
    errorText: undefined,
    labelFixed: false,
    autoComplete: "off",
    textAlign: undefined,
    styleProps: {} };
exports.default = Text;