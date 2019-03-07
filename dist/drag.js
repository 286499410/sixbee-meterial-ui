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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    dragItem: { background: 'transparent' },
    placeholder: {
        width: 200,
        height: 40,
        border: '1px solid #000'
    }
};

var Drag = function (_Component) {
    (0, _inherits3.default)(Drag, _Component);

    function Drag(props) {
        (0, _classCallCheck3.default)(this, Drag);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Drag.__proto__ || (0, _getPrototypeOf2.default)(Drag)).call(this, props));

        _this.state = {
            dragElement: undefined,
            dragIndex: undefined,
            dragElementOffset: {},
            moveIndex: undefined };

        _this.handleMouseDown = function (index) {
            return function (event) {
                _this.setState({
                    moveIndex: index,
                    dragIndex: index,
                    dragElement: _this.refs[index]
                });
                var position = _utils2.default.getMousePosition(event);
                var offset = (0, _jquery2.default)(_this.refs[index]).offset();
                _this.state.dragElementOffset = {
                    left: offset.left,
                    top: offset.top
                };
                var startPosition = position;
                (0, _jquery2.default)(document).mousemove(function (event) {
                    var position = _utils2.default.getMousePosition(event);
                    var offsetX = position.x - startPosition.x;
                    var offsetY = position.y - startPosition.y;
                    _this.state.dragElementOffset.left = offset.left + offsetX;
                    _this.state.dragElementOffset.top = offset.top + offsetY;

                    var length = _this.props.children.length;
                    for (var i = 0; i < length; i++) {
                        var top = (0, _jquery2.default)(_this.refs[i]).offset().top;
                        var height = (0, _jquery2.default)(_this.refs[i]).height();
                        if (i == 0) {
                            if (_this.state.dragElementOffset.top < top + height / 2) {
                                _this.state.moveIndex = i;
                            }
                        } else {
                            var prevTop = (0, _jquery2.default)(_this.refs[i - 1]).offset().top;
                            var prevHeight = (0, _jquery2.default)(_this.refs[i - 1]).height();
                            if (_this.state.dragElementOffset.top < top + height / 2 && _this.state.dragElementOffset.top > prevTop + prevHeight / 2) {
                                _this.state.moveIndex = i;
                            } else if (i == length - 1 && _this.state.dragElementOffset.top > top + height / 2) {
                                _this.state.moveIndex = i;
                            }
                        }
                    }
                    _this.forceUpdate();
                });
                (0, _jquery2.default)(document).mouseup(function (event) {
                    _this.setState({
                        moveIndex: undefined,
                        dragIndex: undefined,
                        dragElement: undefined
                    });
                    (0, _jquery2.default)(document).unbind("mousemove");
                });
            };
        };

        return _this;
    }

    (0, _createClass3.default)(Drag, [{
        key: 'initData',
        value: function initData() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var remains = [];
            this.props.children.map(function (data, index) {
                if (index != _this2.state.dragIndex) {
                    remains.push({ data: data, index: index });
                }
            });
            if (this.state.dragElement) {
                remains.splice(this.state.moveIndex, 0, { data: this.props.placeholder, index: this.state.dragIndex });
            }
            return _react2.default.createElement(
                'div',
                { key: new Date().getTime() },
                remains.map(function (remain) {
                    if (_this2.props.inline) {
                        style.dragItem.display = 'inline';
                    }
                    return _react2.default.createElement(
                        'div',
                        { ref: remain.index,
                            key: remain.index,
                            style: style.dragItem,
                            onMouseDown: _this2.handleMouseDown(remain.index) },
                        remain.data
                    );
                }),
                this.state.dragElement ? _react2.default.createElement(
                    'div',
                    { className: 'cursor-pointer', style: (0, _extends3.default)({
                            position: 'fixed',
                            zIndex: 10 }, this.state.dragElementOffset) },
                    _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: (0, _jquery2.default)(this.state.dragElement).html() } })
                ) : null
            );
        }
    }]);
    return Drag;
}(_react.Component);

Drag.defaultProps = {
    onDragStart: undefined,
    onDragEnd: undefined,
    placeholder: _react2.default.createElement('div', { style: style.placeholder })
};
exports.default = Drag;