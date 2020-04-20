'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Component) {
    (0, _inherits3.default)(List, _Component);
    (0, _createClass3.default)(List, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                List: this,
                state: this.state,
                props: this.props,
                setListState: this.setListState.bind(this)
            };
        }
    }]);

    function List(props) {
        (0, _classCallCheck3.default)(this, List);

        var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this, props));

        _this.state = {
            unCollapsed: {},
            collapsed: {},
            filterText: undefined,
            selected: {},
            scrollLeft: 0,
            scrollTop: 0 };

        _this.initData(props);
        return _this;
    }

    (0, _createClass3.default)(List, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            var nextProps = {
                unCollapsed: props.unCollapsed,
                collapsed: props.collapsed,
                filterData: props.filterData,
                selected: props.selected,
                scrollLeft: props.scrollLeft,
                scrollTop: props.scrollTop
            };
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(nextProps)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref = _step.value;

                    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

                    var key = _ref2[0];
                    var value = _ref2[1];

                    if (value === undefined) {
                        delete nextProps[key];
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            (0, _assign2.default)(this.state, nextProps);
        }
    }, {
        key: 'handleStateChange',
        value: function handleStateChange(state) {
            (0, _assign2.default)(this.state, state);
            if (this.props.onStateChange) {
                this.props.onStateChange({
                    filterData: this.state.filterData,
                    scrollLeft: this.state.scrollLeft,
                    scrollTop: this.state.scrollTop,
                    collapsed: this.state.collapsed,
                    unCollapsed: this.state.unCollapsed,
                    selected: this.state.selected
                });
            }
        }
    }, {
        key: 'setListState',
        value: function setListState(state) {
            this.handleStateChange(state);
            this.forceUpdate();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'list ' + (this.props.bordered ? 'bordered' : '') + ' ' + this.props.className,
                    ref: 'container',
                    style: { width: this.props.width, height: this.props.height } },
                _react2.default.createElement(_header2.default, { ref: 'header' }),
                _react2.default.createElement(_body2.default, { ref: 'body' })
            );
        }
    }]);
    return List;
}(_react.Component);

List.childContextTypes = {
    List: _propTypes2.default.object,
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setListState: _propTypes2.default.func
};
List.defaultProps = {
    bordered: true,
    title: undefined,
    width: 320,
    height: '100%',
    rowHeight: 20,
    filter: false,
    headerIconEvents: [],
    iconEvents: [],
    hasCollapsed: true,
    defaultCollapsed: false,
    dataSource: [],
    dataSourceConfig: { text: 'text', value: 'value' },
    onFilter: undefined,
    onSelect: undefined };
exports.default = List;