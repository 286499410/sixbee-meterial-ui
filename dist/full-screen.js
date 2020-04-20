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

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    fullScreen: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 36
    },
    exitIcon: {
        position: 'absolute',
        top: 0,
        right: 0
    }
};

var FullScreen = function (_Component) {
    (0, _inherits3.default)(FullScreen, _Component);

    function FullScreen(props) {
        (0, _classCallCheck3.default)(this, FullScreen);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FullScreen.__proto__ || (0, _getPrototypeOf2.default)(FullScreen)).call(this, props));

        _this.state = {
            open: false
        };

        _this.handleOpen = function (event) {
            _this.setState({ open: true });
        };

        _this.handleClose = function (event) {
            _this.setState({ open: false });
        };

        return _this;
    }

    (0, _createClass3.default)(FullScreen, [{
        key: 'render',
        value: function render() {
            if (this.state.open) {
                return _react2.default.createElement(
                    'div',
                    { style: style.fullScreen },
                    _react2.default.createElement(
                        'div',
                        { style: style.exitIcon },
                        _react2.default.createElement(_icon2.default, { size: 20, type: 'button', name: 'fullscreen-exit', onClick: this.handleClose })
                    ),
                    this.props.children
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { style: { lineHeight: 1 } },
                    _react2.default.createElement(_icon2.default, { type: 'button', name: 'fullscreen', onClick: this.handleOpen })
                );
            }
        }
    }]);
    return FullScreen;
}(_react.Component);

exports.default = FullScreen;