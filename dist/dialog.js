'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = function (_Component) {
    (0, _inherits3.default)(Dialog, _Component);

    function Dialog(props) {
        (0, _classCallCheck3.default)(this, Dialog);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Dialog.__proto__ || (0, _getPrototypeOf2.default)(Dialog)).call(this, props));

        _this.state = {
            style: {
                textAlign: 'center',
                zIndex: 1500,
                left: -10000,
                top: 0
            },
            startPosition: {
                x: 0,
                y: 0
            },
            open: false
        };

        _this.handleClose = function (event) {
            event.stopPropagation();
            _this.hide();
            if (typeof _this.props.onClose == 'function') {
                _this.props.onClose();
            }
        };

        _this.handleMouseDown = function (event) {
            var position = _utils2.default.getMousePosition(event);
            var lastStyle = (0, _assign2.default)({}, _this.state.style);
            _this.state.startPosition = position;
            (0, _jquery2.default)(document).mousemove(function (event) {
                var position = _utils2.default.getMousePosition(event);
                var offsetX = position.x - _this.state.startPosition.x;
                var offsetY = position.y - _this.state.startPosition.y;
                _this.state.style.left = lastStyle.left + offsetX;
                _this.state.style.top = lastStyle.top + offsetY;
                _this.forceUpdate();
            });
            (0, _jquery2.default)(document).mouseup(function (event) {
                (0, _jquery2.default)(document).unbind("mousemove");
            });
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Dialog, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'initData',
        value: function initData(props) {
            this.state.open = props.open || false;
            if (this.state.open) {
                this.state.style.left = 0;
            }
        }
    }, {
        key: 'show',
        value: function show() {
            this.state.style.left = 0;
            this.setState({ open: true });
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.state.style.left = -10000;
            this.setState({ open: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var title = _react2.default.createElement(
                'div',
                { style: { position: 'relative', fontSize: 14, zIndex: 1 } },
                _react2.default.createElement(
                    'div',
                    { style: (0, _extends3.default)({ backgroundColor: '#F6F7FB', color: '#333', lineHeight: '40px', paddingLeft: 8 }, this.props.titleStyle), onMouseDown: this.handleMouseDown },
                    this.props.title
                ),
                _react2.default.createElement(
                    'div',
                    { style: { position: 'absolute', right: 2, top: '50%', marginTop: -17, zIndex: 1, lineHeight: 1 } },
                    _react2.default.createElement(_icon2.default, { size: 18,
                        name: 'close',
                        color: '#666',
                        hoverColor: '#5c8feb',
                        type: 'button',
                        onClick: this.handleClose
                    })
                )
            );
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    bodyClassName: 'dialogBody',
                    ref: "dialog",
                    style: (0, _extends3.default)({}, this.state.style, this.props.style),
                    contentStyle: { width: 'auto', maxWidth: 'auto', textAlign: 'left', display: 'inline-block' },
                    bodyStyle: { padding: '1px 0 0', fontSize: 15, maxHeight: 800 },
                    title: this.props.title ? title : undefined,
                    titleStyle: { padding: 0, cursor: 'move' },
                    overlayStyle: { backgroundColor: 'rgba(0,0,0, 0.2)' },
                    open: this.state.open,
                    autoScrollBodyContent: true
                },
                this.props.children
            );
        }
    }]);
    return Dialog;
}(_react.Component);

Dialog.defaultProps = {
    open: false
};
exports.default = Dialog;