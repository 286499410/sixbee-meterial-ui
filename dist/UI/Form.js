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

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

var _tool = require('../lib/tool');

var _validator = require('../lib/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = function (_Component) {
    (0, _inherits3.default)(Form, _Component);
    (0, _createClass3.default)(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                Form: this
            };
        }
    }]);

    function Form(props) {
        (0, _classCallCheck3.default)(this, Form);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this, props));

        _this._observers = [];
        _this.controls = {};
        _this.state = {
            data: {},
            errorText: {} };

        _this.handleChange = function (_ref) {
            var key = _ref.key,
                value = _ref.value,
                control = _ref.control;

            if ((0, _tool.isEmpty)(key)) {
                if (_lodash2.default.isObject(value)) {
                    _this.state.data = (0, _extends3.default)({}, _this.state.data, value);
                }
            } else {
                _lodash2.default.set(_this.state.data, key, value);
            }
            var form = _this,
                data = _this.getAllData();
            _this.props.onChange && _this.props.onChange({ form: form, data: data });
            _this.publish('change', { key: key, value: value, control: control });
        };

        _this.getInitialValue = function (key) {
            return _lodash2.default.get(_this.props.initialData, key);
        };

        _this.getValue = function (key) {
            return _lodash2.default.get(_this.state.data, key, _this.getInitialValue(key));
        };

        _this.getErrorText = function (key) {
            return _lodash2.default.get(_this.state.errorText, key);
        };

        _this.getAllData = function () {
            return _lodash2.default.mergeWith({}, _this.props.initialData, _this.state.data, function (obj, src) {
                if (_lodash2.default.isArray(obj)) {
                    return src;
                }
            });
        };

        _this.check = function (data) {
            if (_this.props.validator instanceof _validator2.default) {
                if (_this.props.validator.check(data)) {
                    var errorText = _this.props.validator.getError();
                    if (!_lodash2.default.isEqual(_this.state.errorText, errorText)) {
                        _this.setState({ errorText: errorText });
                    }
                    return true;
                } else {
                    _this.setState({ errorText: _this.props.validator.getError() });
                    return false;
                }
            }
            return true;
        };

        _this.reset = function () {
            _this.setState({ data: {} });
            var form = _this;
            if (_this.props.onReset) {
                _this.props.onReset({ form: form });
            }
            _this.publish('reset');
        };

        _this.submit = function () {
            var data = _this.getAllData(),
                form = _this;
            if (_this.check(data)) {
                if (_this.props.onSubmit) {
                    _this.props.onSubmit({ data: data, form: form });
                }
                _this.publish('submit');
            }
        };

        return _this;
    }

    (0, _createClass3.default)(Form, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unsubscribe();
        }
    }, {
        key: 'getEventName',
        value: function getEventName(name) {
            return 'form_' + name;
        }
    }, {
        key: 'setControl',
        value: function setControl(control) {
            this.controls[control.props.name] = control;
        }
    }, {
        key: 'getControl',
        value: function getControl(name) {
            return this.controls[name];
        }
    }, {
        key: 'subscribe',
        value: function subscribe(eventName, fn) {
            var _this2 = this;

            var token = _pubsubJs2.default.subscribe(this.getEventName(eventName), fn);
            this._observers.push(token);
            return function () {
                _this2.unsubscribe(token);
            };
        }
    }, {
        key: 'publish',
        value: function publish(eventName) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _pubsubJs2.default.publish(this.getEventName(eventName), data);
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (token) {
                _pubsubJs2.default.unsubscribe(token);
            } else {
                this._observers.map(function (token) {
                    _pubsubJs2.default.unsubscribe(token);
                });
            }
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.state.data;
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("render Form");
            return _react2.default.createElement(
                'div',
                { className: (0, _tool.joinBlankSpace)("form", this.props.className, this.props.inline && 'form-inline'),
                    style: this.props.style },
                this.props.children
            );
        }
    }]);
    return Form;
}(_react.Component);

Form.childContextTypes = {
    Form: _propTypes2.default.object
};
Form.defaultProps = {
    onSubmit: undefined,
    onReset: undefined,
    initialData: {},
    validator: undefined,
    style: undefined,
    className: undefined
};
exports.default = Form;


Form.propTypes = {
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    initialData: _propTypes2.default.object,
    onSubmit: _propTypes2.default.func,
    onReset: _propTypes2.default.func
};