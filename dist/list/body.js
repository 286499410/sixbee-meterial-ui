'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Body = function (_Component) {
    (0, _inherits3.default)(Body, _Component);

    function Body(props) {
        (0, _classCallCheck3.default)(this, Body);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Body.__proto__ || (0, _getPrototypeOf2.default)(Body)).call(this, props));

        _this.parent = {};
        _this.children = {};

        _this.handleClick = function (data) {
            return function (event) {
                _this.context.setListState({ selected: data });
                if (_this.context.props.onSelect) {
                    _this.context.props.onSelect(_this.getValue(data), data);
                }
            };
        };

        _this.handleCheck = function (data) {
            return function (isCheck) {
                var selected = _this.context.state.selected;
                var key = _this.getValue(data);
                var childKeys = _this.getChildKeys(data);
                var parentKeys = _this.getParentKeys(key);

                isCheck ? selected[key] = true : delete selected[key];

                childKeys.map(function (key) {
                    isCheck ? selected[key] = true : delete selected[key];
                });

                parentKeys.map(function (key) {
                    var childkeys = _this.getChildKeys(key);
                    console.log(key, childkeys);
                    if (_this.isCheckAll(childkeys, selected)) {
                        selected[key] = true;
                    } else {
                        delete selected[key];
                    }
                });

                _this.context.setListState({ selected: selected });
                if (_this.context.props.onSelect) {
                    _this.context.props.onSelect(data);
                }
            };
        };

        _this.filterData = function (dataSource) {
            var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var rows = [];
            dataSource.map(function (data) {
                var value = _this.getValue(data);
                var parentValue = parent ? _this.getValue(parent) : null;
                _this.parent[value] = parentValue;
                var parent2 = (0, _assign2.default)({ indent: indent }, data);
                var children = [];
                if (data.children && data.children.length > 0) {
                    _this.children[value] = data.children.map(function (row) {
                        return _this.getData(row);
                    });
                    children = _this.filterData(data.children, indent + 16, data);
                }
                if (_this.checkData(parent2) || children.length > 0) {
                    rows.push(parent2);
                    rows = rows.concat(children);
                }
            });
            return rows;
        };

        _this.checkData = function (data) {
            var filterText = _this.context.state.filterText;
            if (filterText !== undefined) {
                var text = _utils2.default.replaceText(_this.context.props.dataSourceConfig.text, data);
                return text.indexOf(filterText) >= 0;
            } else {
                return true;
            }
        };

        _this.handleCollapse = function (data, isCollapsed) {
            return function (event) {
                event.stopPropagation();
                var unCollapsed = _this.context.state.unCollapsed;
                var collapsed = _this.context.state.collapsed;
                var value = _this.getValue(data);
                if (isCollapsed) {
                    collapsed[value] = true;
                    delete unCollapsed[value];
                } else {
                    unCollapsed[value] = true;
                    delete collapsed[value];
                }
                _this.context.setListState({
                    collapsed: collapsed,
                    unCollapsed: unCollapsed
                });
            };
        };

        _this.handleScroll = function (event) {
            var scrollLeft = (0, _jquery2.default)(event.target).scrollLeft();
            var scrollTop = (0, _jquery2.default)(event.target).scrollTop();
            _this.context.setListState({
                scrollLeft: scrollLeft,
                scrollTop: scrollTop
            });
        };

        return _this;
    }

    (0, _createClass3.default)(Body, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.refs.scrollBar) {
                if (this.context.state.scrollTop) {
                    this.refs.scrollBar.scrollTop(this.state.scrollTop);
                }
                if (this.context.state.scrollLeft) {
                    this.refs.scrollBar.scrollLeft(this.state.scrollLeft);
                }
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.context.state.selected;

            return _.get(data, this.context.props.dataSourceConfig.value);
        }
    }, {
        key: 'getData',
        value: function getData(value) {
            var _this2 = this;

            var index = _.findIndex(this.context.props.dataSource, function (o) {
                return _.get(o, _this2.context.props.dataSourceConfig.value) == value;
            });
            return index >= 0 ? this.context.props.dataSource[index] : undefined;
        }
    }, {
        key: 'isCheck',
        value: function isCheck(data) {
            var selected = this.context.state.selected;
            return selected[data.id] ? true : false;
        }
    }, {
        key: 'getParentKeys',
        value: function getParentKeys(childKey) {
            var keys = [];
            if (this.parent[childKey]) {
                keys.push(this.parent[childKey]);
                keys = keys.concat(this.getParentKeys(this.parent[childKey]));
            }
            return keys;
        }
    }, {
        key: 'getChildKeys',
        value: function getChildKeys(parentKey) {
            var _this3 = this;

            var keys = [];
            (_.get(data, 'children') || []).map(function (row) {
                keys.push(row[_this3.context.props.dataSourceConfig.value]);
                if (row.children && row.children.length > 0) {
                    keys = keys.concat(_this3.getChildKeys(row));
                }
            });
            return keys;
        }
    }, {
        key: 'isCheckAll',
        value: function isCheckAll(keys) {
            var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context.state.selected;

            for (var i = 0; i < keys.length; i++) {
                if (!selected[keys[i]]) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'handleData',
        value: function handleData() {
            this.parent = {};
            this.children = {};
            return this.filterData(this.context.props.dataSource);
        }
    }, {
        key: 'isHide',
        value: function isHide(value) {
            return this.parent[value] ? this.isCollapsed(this.parent[value]) || this.isHide(this.parent[value]) : false;
        }
    }, {
        key: 'isCollapsed',
        value: function isCollapsed(value) {
            if (this.context.props.defaultCollapsed) {
                return this.context.state.unCollapsed[value] ? false : true;
            } else {
                return this.context.state.collapsed[value] ? true : false;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var dataSource = this.handleData();
            var selectedValue = this.getValue(this.context.state.selected);
            var props = this.context.props;
            return _react2.default.createElement(
                'div',
                { className: 'list-body', ref: 'container', style: { height: 'calc(100% - 40px)' } },
                _react2.default.createElement(
                    _reactCustomScrollbars.Scrollbars,
                    { ref: 'scrollBar', style: { height: '100%' }, onScroll: this.handleScroll },
                    dataSource.map(function (data, index) {
                        var value = _this4.getValue(data);
                        var isCollapsed = _this4.isCollapsed(value);
                        var content = _.isFunction(props.dataSourceConfig.text) ? props.dataSourceConfig.text(data) : _react2.default.createElement(
                            'div',
                            null,
                            _utils2.default.replaceText(props.dataSourceConfig.text, data)
                        );
                        return _react2.default.createElement(
                            _item2.default,
                            { key: value,
                                data: data,
                                selected: value == selectedValue,
                                onClick: props.multiple ? undefined : _this4.handleClick(data),
                                hide: _this4.isHide(value) },
                            _react2.default.createElement(
                                'div',
                                { className: "flex middle",
                                    style: { paddingLeft: data.indent, height: _this4.context.props.rowHeight } },
                                props.hasCollapsed ? _react2.default.createElement(_icon2.default, { type: 'button',
                                    name: isCollapsed ? "plus-square" : "minus-square",
                                    size: 14,
                                    buttonStyle: { opacity: data.children && data.children.length > 0 ? 1 : 0 },
                                    onClick: _this4.handleCollapse(data, !isCollapsed) }) : null,
                                props.multiple ? _react2.default.createElement(
                                    'div',
                                    { className: 'flex middle' },
                                    _react2.default.createElement(_control2.default, { type: 'checkbox', size: 'small', styleProps: { style: { marginTop: 0 } }, onChange: _this4.handleCheck(data), value: _this4.isCheck(data) }),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        content
                                    )
                                ) : content
                            )
                        );
                    })
                )
            );
        }
    }]);
    return Body;
}(_react.Component);

Body.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setListState: _propTypes2.default.func
};
exports.default = Body;