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

var _pace = require('pace');

var _pace2 = _interopRequireDefault(_pace);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Guide = function (_Component) {
    (0, _inherits3.default)(Guide, _Component);

    function Guide() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Guide);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Guide.__proto__ || (0, _getPrototypeOf2.default)(Guide)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            link: '',
            closeWindowLabel: '暂不使用',
            buttonLabel: '前往',
            title: '提示',
            content: '',
            open: false,
            onClick: undefined,
            linkState: {}
        }, _this.handleClick = function (event) {
            if (_this.state.onClick) {
                _this.state.onClick();
            } else if (_this.state.link) {
                _pace2.default.history.push(_this.state.link, _this.state.linkState);
                _this.setState({
                    open: false,
                    onClick: undefined,
                    linkState: {}
                });
            }
        }, _this.handleCloseWindow = function (event) {
            _this.setState({ open: false });
            _pace2.default.lib('windows.finance').getComponent().removeWindow();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Guide, [{
        key: 'render',
        value: function render() {
            var actions = [_react2.default.createElement(_FlatButton2.default, {
                label: this.state.closeWindowLabel,
                primary: true,
                onClick: this.handleCloseWindow
            }), _react2.default.createElement(_FlatButton2.default, {
                label: this.state.buttonLabel,
                primary: true,
                onClick: this.handleClick
            })];
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        title: this.state.title,
                        actions: actions,
                        modal: true,
                        open: this.state.open
                    },
                    this.state.content
                )
            );
        }
    }]);
    return Guide;
}(_react.Component);

exports.default = Guide;