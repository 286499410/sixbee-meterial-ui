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

var _auto = require('./controls/auto');

var _auto2 = _interopRequireDefault(_auto);

var _checkbox = require('./controls/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _date = require('./controls/date');

var _date2 = _interopRequireDefault(_date);

var _datetime = require('./controls/datetime');

var _datetime2 = _interopRequireDefault(_datetime);

var _dateRange = require('./controls/date-range');

var _dateRange2 = _interopRequireDefault(_dateRange);

var _file = require('./controls/file');

var _file2 = _interopRequireDefault(_file);

var _money = require('./controls/money');

var _money2 = _interopRequireDefault(_money);

var _moneyRange = require('./controls/money-range');

var _moneyRange2 = _interopRequireDefault(_moneyRange);

var _radio = require('./controls/radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('./controls/select');

var _select2 = _interopRequireDefault(_select);

var _text = require('./controls/text');

var _text2 = _interopRequireDefault(_text);

var _number = require('./controls/number');

var _number2 = _interopRequireDefault(_number);

var _time = require('./controls/time');

var _time2 = _interopRequireDefault(_time);

var _image = require('./controls/image');

var _image2 = _interopRequireDefault(_image);

var _editor = require('./controls/editor');

var _editor2 = _interopRequireDefault(_editor);

var _selectTag = require('./controls/select-tag');

var _selectTag2 = _interopRequireDefault(_selectTag);

var _selectCheck = require('./controls/select-check');

var _selectCheck2 = _interopRequireDefault(_selectCheck);

var _static = require('./controls/static');

var _static2 = _interopRequireDefault(_static);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Control = function (_Component) {
    (0, _inherits3.default)(Control, _Component);

    function Control(props) {
        (0, _classCallCheck3.default)(this, Control);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Control.__proto__ || (0, _getPrototypeOf2.default)(Control)).call(this, props));

        _this.controls = {
            text: _text2.default,
            password: _text2.default,
            number: _number2.default,
            mobile: _text2.default,
            textarea: _text2.default,
            money: _money2.default,
            select: _select2.default,
            date: _date2.default,
            'date-range': _dateRange2.default,
            'money-range': _moneyRange2.default,
            datetime: _datetime2.default,
            time: _time2.default,
            auto: _auto2.default,
            checkbox: _checkbox2.default,
            radio: _radio2.default,
            file: _file2.default,
            image: _image2.default,
            editor: _editor2.default,
            selectTag: _selectTag2.default,
            'select-check': _selectCheck2.default,
            static: _static2.default
        };
        return _this;
    }

    (0, _createClass3.default)(Control, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.onComponentDidMount) {
                this.props.onComponentDidMount(this);
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            return this.getControl().setValue(value);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.getControl().getValue();
        }
    }, {
        key: 'getControl',
        value: function getControl() {
            return this.refs.control;
        }
    }, {
        key: 'focus',
        value: function focus() {
            if (this.getControl()) {
                this.getControl().focus();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var props = (0, _extends3.default)({}, this.props);
            var type = props.type;
            var Component = this.controls[type];
            if (typeof props.disabled === 'function') {
                props.disabled = props.disabled(props.data, props.context);
            }
            delete props.type;
            switch (type) {
                case 'text':
                case 'password':
                case 'number':
                case 'mobile':
                    props.type = type;
                    break;
                case 'textarea':
                    props.multiLine = true;
                    break;
                case 'render':
                    Component = props.render;
                    break;
                case 'component':
                    Component = props.component;
                    break;
            }
            return _react2.default.createElement(Component, (0, _extends3.default)({ ref: type === 'render' ? undefined : "control" }, props));
        }
    }]);
    return Control;
}(_react.Component);

Control.defaultProps = {
    type: 'text',
    size: 'default'
};
exports.default = Control;