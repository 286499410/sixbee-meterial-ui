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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tool = require('../../lib/tool');

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Col = function (_Component) {
    (0, _inherits3.default)(Col, _Component);

    function Col(props) {
        (0, _classCallCheck3.default)(this, Col);
        return (0, _possibleConstructorReturn3.default)(this, (Col.__proto__ || (0, _getPrototypeOf2.default)(Col)).call(this, props));
    }

    (0, _createClass3.default)(Col, [{
        key: 'getStyle',
        value: function getStyle() {
            var style = (0, _extends3.default)({}, this.props.style);
            var spaceX = _.get(this.context, 'Row.props.spaceX');
            if (spaceX && !(spaceX % 4 == 0 && spaceX <= 40)) {
                style.paddingLeft = style.paddingRight = spaceX / 2;
            }
            var spaceY = _.get(this.context, 'Row.props.spaceY');
            if (spaceY && !(spaceY % 4 == 0 && spaceY <= 40)) {
                style.paddingTop = style.paddingBottom = spaceY / 2;
            }
            var space = _.get(this.context, 'Row.props.space');
            if (space && !(space % 4 == 0 && space <= 40)) {
                style.padding = space / 2;
            }
            return style;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: (0, _tool.joinBlankSpace)("col", "col-" + this.props.cols, this.props.className), style: this.getStyle() },
                this.props.children
            );
        }
    }]);
    return Col;
}(_react.Component);

Col.defaultProps = {
    cols: 1,
    className: undefined,
    style: undefined
};
Col.contextTypes = {
    Row: _propTypes2.default.object
};
exports.default = Col;


_Row2.default.propTypes = {
    cols: _propTypes2.default.number,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object
};