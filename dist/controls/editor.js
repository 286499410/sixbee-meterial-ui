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

var _RadioButton = require('material-ui/RadioButton');

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function (_Component) {
    (0, _inherits3.default)(Radio, _Component);

    function Radio(props) {
        (0, _classCallCheck3.default)(this, Radio);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Radio.__proto__ || (0, _getPrototypeOf2.default)(Radio)).call(this, props));

        _this.state = {
            id: undefined,
            ue: undefined,
            value: undefined
        };

        _this.state.id = _utils2.default.uuid();
        _this.initData(props);
        _this.setDataSource();
        return _this;
    }

    (0, _createClass3.default)(Radio, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.state.ue = UE.getEditor(this.state.id, this.props.options);
            this.state.ue.addListener('contentChange', function () {
                _this2.state.value = _this2.state.ue.getContent();
                if (_this2.props.onChange) {
                    _this2.props.onChange(_this2.state.value, _this2);
                }
            });
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
            this.state.ue.setContent(value);
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value === undefined ? this.props.defaultValue : this.state.value;
        }
    }, {
        key: 'setDataSource',
        value: function setDataSource() {
            var _this3 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.dataSource;

            _utils2.default.getDataSource(undefined, dataSource, this.props.dataSourceConfig).then(function (dataSource) {
                _this3.setState({ dataSource: dataSource });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.getValue();
            var label = this.props.label;
            var styleProps = _style2.default.getStyle('radio', this.props);
            return _react2.default.createElement(
                'div',
                { style: (0, _extends3.default)({ width: '100%', zIndex: 1, position: 'relative' }, this.props.rootStyle) },
                label === false ? null : _react2.default.createElement(
                    'div',
                    { style: styleProps.labelStyle },
                    _react2.default.createElement(
                        'span',
                        { style: { display: 'inline-block', transform: "scale(0.75)" } },
                        label
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'script',
                        { id: this.state.id, name: this.props.name || this.props.dataKey, type: 'text/plain' },
                        value
                    )
                ),
                this.props.errorText ? _react2.default.createElement(
                    'div',
                    { className: 'text-danger text-small', style: { marginTop: 2 } },
                    this.props.errorText
                ) : null
            );
        }
    }]);
    return Radio;
}(_react.Component);

Radio.defaultProps = {
    label: undefined,
    errorText: undefined,
    size: 'default',
    options: {
        initialFrameWidth: '100%',
        initialFrameHeight: 320
    }
};
exports.default = Radio;