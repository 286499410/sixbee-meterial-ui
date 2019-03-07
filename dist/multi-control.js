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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultiControl = function (_Component) {
    (0, _inherits3.default)(MultiControl, _Component);

    function MultiControl(props) {
        (0, _classCallCheck3.default)(this, MultiControl);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MultiControl.__proto__ || (0, _getPrototypeOf2.default)(MultiControl)).call(this, props));

        _this.state = {};

        _this.handleChange = function (field) {
            return function (value, data) {
                var control = _this.refs[field.key];
                if (field.onChange) {
                    field.onChange(value, control, _this);
                }
                if (_this.props.onChange) {
                    var changeData = {};
                    changeData[control.key] = value;
                    _this.props.onChange(changeData, null, true);
                }
            };
        };

        _this.getControl = function (key) {
            return _this.refs[key].getControl();
        };

        return _this;
    }

    (0, _createClass3.default)(MultiControl, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'row-space large', cols: this.props.fields.length, style: { position: 'relative' } },
                this.props.fields.map(function (field, index) {
                    var value = _lodash2.default.get(_this2.props.value, field.key);
                    return _react2.default.createElement(
                        'div',
                        { key: index, className: 'col' },
                        _react2.default.createElement(_control2.default, (0, _extends3.default)({
                            ref: field.key,
                            key: index,
                            value: value
                        }, field, {
                            onChange: _this2.handleChange(field)
                        }))
                    );
                }),
                _react2.default.createElement(
                    'div',
                    { style: { position: 'absolute', left: '50%', top: 10, marginLeft: -4, color: '#ccc' } },
                    '-'
                )
            );
        }
    }]);
    return MultiControl;
}(_react.Component);

MultiControl.defaultProps = {
    fields: [] };
exports.default = MultiControl;