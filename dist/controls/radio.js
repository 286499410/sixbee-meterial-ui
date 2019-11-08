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
            value: undefined,
            dataSource: []
        };

        _this.handleChange = function (event, value) {
            _this.setValue(value);
        };

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
            this.refs.container.getElementsByClassName('row')[0].setAttribute('cols', this.props.cols || this.props.dataSource.length);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.hasOwnProperty('value')) {
                this.state.value = props.value;
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.state.value = value;
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
            this.forceUpdate();
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value === undefined ? this.props.defaultValue : this.state.value;
        }
    }, {
        key: 'setDataSource',
        value: function setDataSource() {
            var _this2 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.dataSource;

            _utils2.default.getDataSource(undefined, dataSource, this.props.dataSourceConfig).then(function (dataSource) {
                _this2.setState({ dataSource: dataSource });
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
                { ref: "container", style: styleProps.rootStyle },
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
                                display: 'inline-block' } },
                        label
                    )
                ),
                _react2.default.createElement(
                    _RadioButton.RadioButtonGroup,
                    {
                        name: this.props.name || this.props.dataKey || _utils2.default.uuid(),
                        className: 'row',
                        valueSelected: value,
                        style: { width: this.props.width },
                        onChange: this.handleChange },
                    this.state.dataSource.map(function (row, index) {
                        return _react2.default.createElement(_RadioButton.RadioButton, { className: 'col',
                            key: index,
                            label: row.text,
                            value: row.value });
                    })
                )
            );
        }
    }]);
    return Radio;
}(_react.Component);

Radio.defaultProps = {
    label: undefined,
    defaultChecked: false,
    errorText: undefined,
    cols: undefined,
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' },
    size: 'default',
    multiLine: false
};
exports.default = Radio;