'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    content: {
        marginTop: 12,
        fontSize: 14
    }
};

var Alert = function (_Component) {
    (0, _inherits3.default)(Alert, _Component);
    (0, _createClass3.default)(Alert, [{
        key: 'show',
        value: function show(message) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
            var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;

            this.setState({
                open: true,
                message: message,
                type: type,
                autoHideDuration: duration
            });
        }
    }]);

    function Alert(props) {
        (0, _classCallCheck3.default)(this, Alert);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Alert.__proto__ || (0, _getPrototypeOf2.default)(Alert)).call(this, props));

        _this.state = {
            open: false,
            message: '',
            type: 'info',
            autoHideDuration: 4000
        };
        _this.icon = {
            info: 'info-circle',
            error: 'close-circle',
            success: 'check-circle'
        };

        _this.handleClick = function (event) {
            event.stopPropagation();
        };

        _this.handleClose = function () {
            _this.setState({ open: false });
            document.removeEventListener('click', _this.handleClose);
        };

        return _this;
    }

    (0, _createClass3.default)(Alert, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refs.container.addEventListener('click', this.handleClick);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.interval) {
                clearInterval(this.interval);
            }
            if (this.state.open) {
                this.interval = setInterval(function () {
                    _this2.handleClose();
                }, this.state.autoHideDuration);
                document.addEventListener('click', this.handleClose);
            }
            return _react2.default.createElement(
                'div',
                { ref: 'container',
                    className: 'alert center',
                    style: { display: this.state.open ? 'block' : 'none' },
                    onClick: this.handleClick },
                _react2.default.createElement(
                    'div',
                    { className: 'text-center' },
                    this.icon[this.state.type] ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_icon2.default, { name: this.icon[this.state.type], size: 50 })
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { style: style.content },
                        this.state.message
                    )
                )
            );
        }
    }]);
    return Alert;
}(_react.Component);

exports.default = Alert;