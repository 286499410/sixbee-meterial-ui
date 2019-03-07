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

var Page = function (_Component) {
    (0, _inherits3.default)(Page, _Component);

    function Page() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Page);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call(this, props));

        _this.state = {
            value: undefined,
            page: undefined,
            limit: undefined
        };

        _this.handleChange = function (page, limit) {
            page = parseInt(page || _this.getPage());
            limit = parseInt(limit || _this.getLimit());
            if (page > 0 && page <= _this.props.pages) {
                _this.setState({ value: page, page: page, limit: limit });
                if (_this.props.onChange) {
                    _this.props.onChange({
                        page: page,
                        limit: limit
                    });
                }
            }
        };

        _this.nextPage = function () {
            _this.handleChange(_this.getPage() + 1);
        };

        _this.prevPage = function () {
            _this.handleChange(_this.getPage() - 1);
        };

        _this.firstPage = function () {
            _this.handleChange(1);
        };

        _this.lastPage = function () {
            _this.handleChange(_this.props.pages);
        };

        _this.handleSelectChange = function (event) {
            var value = event.target.value;
            _this.handleChange(1, value);
        };

        _this.handleBlur = function (event) {
            var value = event.target.value;
            if (value != _this.state.page) {
                _this.handleChange(value);
            }
        };

        _this.handleInputChange = function (event) {
            var value = event.target.value;
            _this.setState({ value: value });
        };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(Page, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (props.page !== undefined) {
                this.state.page = props.page;
            }
            if (props.limit !== undefined) {
                this.state.limit = props.limit;
            }
        }
    }, {
        key: 'getPage',
        value: function getPage() {
            return parseInt(this.state.page || this.props.page);
        }
    }, {
        key: 'getLimit',
        value: function getLimit() {
            return parseInt(this.state.limit || this.props.limit);
        }
    }, {
        key: 'render',
        value: function render() {
            var page = this.getPage();
            var limit = this.getLimit();
            var value = this.state.value || page;
            return _react2.default.createElement(
                'div',
                { className: 'page' },
                _react2.default.createElement(_icon2.default, { type: 'button',
                    name: 'doubleleft',
                    disabled: page == 1,
                    onClick: this.firstPage,
                    title: '\u9996\u9875' }),
                _react2.default.createElement(_icon2.default, { type: 'button',
                    name: 'left',
                    disabled: page == 1,
                    onClick: this.prevPage,
                    title: '\u4E0A\u4E00\u9875' }),
                _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('input', { value: value,
                        onBlur: this.handleBlur,
                        onChange: this.handleInputChange }),
                    '\xA0\u9875 / ',
                    this.props.pages,
                    '\u9875'
                ),
                _react2.default.createElement(_icon2.default, { type: 'button',
                    name: 'right',
                    disabled: page == this.props.pages,
                    onClick: this.nextPage,
                    title: '\u4E0B\u4E00\u9875' }),
                _react2.default.createElement(_icon2.default, { type: 'button',
                    name: 'doubleright',
                    disabled: page == this.props.pages,
                    onClick: this.lastPage,
                    title: '\u5C3E\u9875' }),
                _react2.default.createElement(
                    'span',
                    null,
                    '\xA0\u6BCF\u9875\u663E\u793A\xA0'
                ),
                _react2.default.createElement(
                    'select',
                    { onChange: this.handleSelectChange, defaultValue: limit },
                    this.props.eachPageRows.map(function (limit, key) {
                        return _react2.default.createElement(
                            'option',
                            { key: key, value: limit },
                            limit
                        );
                    })
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    '\xA0\u884C'
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    '\xA0\u5171',
                    this.props.rows,
                    '\u6761\u8BB0\u5F55'
                )
            );
        }
    }]);
    return Page;
}(_react.Component);

Page.defaultProps = {
    eachPageRows: [20, 50, 100, 200, 500, 1000],
    page: 1,
    limit: 20,
    pages: 1,
    rows: 0,
    onChange: undefined
};
exports.default = Page;