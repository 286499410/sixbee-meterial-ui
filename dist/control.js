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

var _date = require('./controls/date2');

var _date2 = _interopRequireDefault(_date);

var _checkbox = require('./controls/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _date3 = require('./controls/date');

var _date4 = _interopRequireDefault(_date3);

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

var _time = require('./controls/time');

var _time2 = _interopRequireDefault(_time);

var _image = require('./controls/image');

var _image2 = _interopRequireDefault(_image);

var _editor = require('./controls/editor');

var _editor2 = _interopRequireDefault(_editor);

var _selectTag = require('./controls/select-tag');

var _selectTag2 = _interopRequireDefault(_selectTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Control = function (_Component) {
    (0, _inherits3.default)(Control, _Component);

    function Control(props) {
        (0, _classCallCheck3.default)(this, Control);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Control.__proto__ || (0, _getPrototypeOf2.default)(Control)).call(this, props));

        _this.controls = {
            text: _text2.default,
            password: _text2.default,
            number: _text2.default,
            mobile: _text2.default,
            textarea: _text2.default,
            money: _money2.default,
            select: _select2.default,
            date: _date4.default,
            'date-range': _dateRange2.default,
            'money-range': _moneyRange2.default,
            datetime: _datetime2.default,
            time: _time2.default,
            date2: _date2.default,
            auto: _auto2.default,
            checkbox: _checkbox2.default,
            radio: _radio2.default,
            file: _file2.default,
            image: _image2.default,
            editor: _editor2.default,
            selectTag: _selectTag2.default
        };
        return _this;
    }

    (0, _createClass3.default)(Control, [{
        key: 'setValue',
        value: function setValue(value) {
            return this.refs.control.setValue(value);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.refs.control.getValue();
        }
    }, {
        key: 'render',
        value: function render() {
            var props = (0, _extends3.default)({}, this.props);
            var type = props.type;
            var Component = this.controls[type];
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
            return _react2.default.createElement(Component, (0, _extends3.default)({ ref: "control" }, props));
        }
    }]);
    return Control;
}(_react.Component);

Control.defaultProps = {
    type: 'text',
    size: 'default'
};
exports.default = Control;