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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Static = function (_Component) {
    (0, _inherits3.default)(Static, _Component);

    function Static(props) {
        (0, _classCallCheck3.default)(this, Static);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Static.__proto__ || (0, _getPrototypeOf2.default)(Static)).call(this, props));

        _this.state = {
            value: undefined
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Static, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
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
            this.forceUpdate();
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.value;
        }
    }, {
        key: 'render',
        value: function render() {
            var data = {};
            var key = this.props.formKey || this.props.dataKey;
            _.set(data, key, this.props.value);
            return _utils2.default.render(data, (0, _extends3.default)({}, this.props, {
                key: key,
                type: this.props.staticType || 'text'
            })) || null;
        }
    }]);
    return Static;
}(_react.Component);

exports.default = Static;