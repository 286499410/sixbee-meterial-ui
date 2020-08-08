"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tool = require("../lib/tool");

var _Row = require("./Layout/Row");

var _Row2 = _interopRequireDefault(_Row);

var _Col = require("./Layout/Col");

var _Col2 = _interopRequireDefault(_Col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function (_Component) {
    (0, _inherits3.default)(Radio, _Component);

    function Radio(props) {
        (0, _classCallCheck3.default)(this, Radio);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Radio.__proto__ || (0, _getPrototypeOf2.default)(Radio)).call(this, props));

        _this.handleClick = function (data) {
            return function (event) {
                var value = _this.getValue(data);
                if (_this.props.onChange) {
                    _this.props.onChange({ value: value });
                }
            };
        };

        return _this;
    }

    (0, _createClass3.default)(Radio, [{
        key: "getValue",
        value: function getValue(data) {
            return _.get(data, this.props.dataSourceConfig.value);
        }
    }, {
        key: "isChecked",
        value: function isChecked(data) {
            var value = this.getValue(data);
            return (this.props.value || []).indexOf(value) >= 0;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            console.log("render Radio");
            return _react2.default.createElement(
                "div",
                { className: (0, _tool.joinBlankSpace)("radio-group flex middle", this.props.className) },
                _react2.default.createElement(
                    _Row2.default,
                    { cols: this.props.cols },
                    this.props.dataSource.map(function (data) {
                        var value = _this2.getValue(data);
                        return _react2.default.createElement(
                            _Col2.default,
                            { key: value },
                            _react2.default.createElement(
                                "label",
                                { className: "flex middle cursor-pointer radio" },
                                _react2.default.createElement("input", { type: "radio",
                                    checked: _this2.isChecked(data), onChange: _this2.handleClick(data) }),
                                _react2.default.createElement(
                                    "div",
                                    null,
                                    (0, _tool.replaceText)(data, _this2.props.dataSourceConfig.text)
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);
    return Radio;
}(_react.Component);

Radio.defaultProps = {
    value: undefined,
    onChange: undefined,
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' },
    cols: 1
};
exports.default = Radio;