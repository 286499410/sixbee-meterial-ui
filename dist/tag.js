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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function (_Component) {
    (0, _inherits3.default)(Tag, _Component);

    function Tag() {
        (0, _classCallCheck3.default)(this, Tag);
        return (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).apply(this, arguments));
    }

    (0, _createClass3.default)(Tag, [{
        key: 'getClass',
        value: function getClass() {
            var _this2 = this;

            var className = 'default';
            this.props.dataSource.map(function (data) {
                if (data.value == _this2.props.value && data.tag) {
                    className = data.tag;
                }
            });
            return 'tag tag-' + className + (this.props.size !== 'default' ? ' tag-' + this.props.size : '');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                { className: this.getClass() },
                this.props.text
            );
        }
    }]);
    return Tag;
}(_react.Component);

Tag.defaultProps = {
    size: 'default',
    text: undefined,
    value: undefined,
    dataSource: [] };
exports.default = Tag;