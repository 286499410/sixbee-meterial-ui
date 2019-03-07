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

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Detail = function (_Component) {
    (0, _inherits3.default)(Detail, _Component);

    function Detail() {
        (0, _classCallCheck3.default)(this, Detail);
        return (0, _possibleConstructorReturn3.default)(this, (Detail.__proto__ || (0, _getPrototypeOf2.default)(Detail)).apply(this, arguments));
    }

    (0, _createClass3.default)(Detail, [{
        key: 'renderFields',
        value: function renderFields(fields) {
            var _this2 = this;

            return fields.map(function (field, index) {
                if (field.type === 'group') {
                    return _react2.default.createElement(
                        'div',
                        { className: 'col col-full', key: index },
                        _react2.default.createElement(
                            'div',
                            { className: 'text-bold', style: { fontSize: 16, marginTop: 16 } },
                            field.label
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row', cols: field.cols || _this2.props.cols },
                            _this2.renderFields(field.fields || [])
                        )
                    );
                } else {
                    var text = _utils2.default.render(_this2.props.data, field);
                    return _react2.default.createElement(
                        'div',
                        { key: index, className: 'col col-' + (field.cols || 1), style: { marginTop: 12, marginBottom: 8 } },
                        _react2.default.createElement(
                            'div',
                            { className: 'text-muted text-small', style: { marginBottom: 6 } },
                            field.label
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: "text-normal",
                                style: { minHeight: 20 } },
                            field.render ? field.render(_this2.props.data) : text === '' || text === undefined || text === null ? '-' : text,
                            ' '
                        )
                    );
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'row', cols: this.props.cols },
                this.renderFields(this.props.fields)
            );
        }
    }]);
    return Detail;
}(_react.Component);

Detail.defaultProps = {
    data: {},
    cols: 2,
    fields: []
};
exports.default = Detail;