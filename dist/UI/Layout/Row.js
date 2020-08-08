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

var _tool = require('../../lib/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = function (_Component) {
    (0, _inherits3.default)(Row, _Component);
    (0, _createClass3.default)(Row, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                Row: this
            };
        }
    }]);

    function Row(props) {
        (0, _classCallCheck3.default)(this, Row);
        return (0, _possibleConstructorReturn3.default)(this, (Row.__proto__ || (0, _getPrototypeOf2.default)(Row)).call(this, props));
    }

    (0, _createClass3.default)(Row, [{
        key: 'getStyle',
        value: function getStyle() {
            var style = (0, _extends3.default)({}, this.props.style);
            if (this.props.spaceX && !(this.props.spaceX % 4 == 0 && this.props.spaceX <= 40)) {
                style.width = 'calc(100% + ' + this.props.spaceX + 'px)';
                style.marginLeft = style.marginRight = -this.props.space / 2;
            }
            if (this.props.spaceY && !(this.props.spaceY % 4 == 0 && this.props.spaceY <= 40)) {
                style.marginTop = style.marginBottom = -this.props.space / 2;
            }
            if (this.props.space && !(this.props.space % 4 == 0 && this.props.space <= 40)) {
                style.width = 'calc(100% + ' + this.props.space + 'px)';
                style.margin = -this.props.space / 2;
            }
            return style;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: (0, _tool.joinBlankSpace)('row', this.props.className),
                    cols: this.props.cols,
                    space: this.props.space,
                    spacex: this.props.spaceX,
                    spacey: this.props.spaceY,
                    style: this.getStyle() },
                this.props.children
            );
        }
    }]);
    return Row;
}(_react.Component);

Row.defaultProps = {
    cols: 1,
    className: undefined,
    space: undefined
};
Row.childContextTypes = {
    Row: _propTypes2.default.object
};
exports.default = Row;


Row.propTypes = {
    cols: _propTypes2.default.number,
    space: _propTypes2.default.number,
    className: _propTypes2.default.string
};