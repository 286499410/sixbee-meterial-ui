'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _reactCustomScrollbars = require('react-custom-scrollbars');

var _RefreshIndicator = require('material-ui/RefreshIndicator');

var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableBody = function (_Component) {
    (0, _inherits3.default)(TableBody, _Component);

    function TableBody(props) {
        (0, _classCallCheck3.default)(this, TableBody);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TableBody.__proto__ || (0, _getPrototypeOf2.default)(TableBody)).call(this, props));

        _this.handleScroll = function (event) {
            var scrollTop = _this.refs.scrollBar.getScrollTop();
            var scrollLeft = _this.refs.scrollBar.getScrollLeft();
            _this.refs.tbody.showData(scrollTop);
            _this.context.handleStateChange({
                scrollTop: scrollTop,
                scrollLeft: scrollLeft
            });
            if (_this.props.onScroll) {
                _this.props.onScroll(event);
            }
        };

        _this.showMasker = function () {
            _this.hasMasker = true;
            (0, _jquery2.default)(_this.refs.masker).fadeIn();
        };

        _this.hideMasker = function () {
            _this.hasMasker = false;
            (0, _jquery2.default)(_this.refs.masker).fadeOut();
        };

        return _this;
    }

    (0, _createClass3.default)(TableBody, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.refs.scrollBar) {
                if (this.context.props.scrollTop) {
                    this.refs.scrollBar.scrollTop(this.context.props.scrollTop);
                }
                if (this.context.props.scrollLeft) {
                    this.refs.scrollBar.scrollLeft(this.context.props.scrollLeft);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var state = this.context.state;
            var props = this.context.props;
            var className = 'table';
            if (props.bordered) className += ' bordered';
            if (props.condensed) className += ' condensed';
            if (props.bodyCellMultiLine) className += ' multi-line';
            if (props.striped) className += ' striped';
            if (props.className) className += ' ' + props.className;
            var table = _react2.default.createElement(
                'table',
                {
                    ref: 'table',
                    className: className,
                    style: { tableLayout: 'fixed', width: state.tableWidth } },
                _react2.default.createElement(TableBodyColGroup, { ref: 'thead' }),
                _react2.default.createElement(TableBodyContent, { ref: 'tbody' })
            );
            return _react2.default.createElement(
                'div',
                { ref: 'container',
                    className: 'table-body',
                    style: (0, _extends3.default)({
                        overflow: 'hidden',

                        width: state.containerWidth,
                        height: state.bodyHeight,
                        marginTop: -1
                    }, props.bodyStyle),
                    onScroll: this.handleScroll },
                props.loading ? _react2.default.createElement(
                    'div',
                    { ref: 'masker', className: 'masker', style: { zIndex: 1 } },
                    _react2.default.createElement(
                        'div',
                        { className: 'position-center' },
                        _react2.default.createElement(_RefreshIndicator2.default, { size: 50,
                            left: -25,
                            top: -25,
                            percentage: 100,
                            status: 'loading',
                            loadingColor: '#28a7e1',
                            style: { backgroundColor: 'transparent', boxShadow: 'none' }
                        })
                    )
                ) : null,
                state.dataSource.length == 0 && !props.loading ? _react2.default.createElement(
                    'div',
                    { className: 'position-center text-center', style: { zIndex: 1 } },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('img', { src: props.emptyDataImage, style: { width: 200 } })
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: { marginLeft: -8 } },
                            props.emptyDataTip
                        )
                    )
                ) : null,
                props.containerHeight || state.bodyHeight ? _react2.default.createElement(
                    _reactCustomScrollbars.Scrollbars,
                    { ref: 'scrollBar',
                        renderTrackHorizontal: function renderTrackHorizontal(_ref) {
                            var style = _ref.style,
                                props = (0, _objectWithoutProperties3.default)(_ref, ['style']);
                            return _react2.default.createElement('div', (0, _extends3.default)({}, props, { style: (0, _extends3.default)({}, style, {
                                    height: 12,
                                    bottom: 2,
                                    left: 2,
                                    right: 2,
                                    borderRadius: 3,
                                    zIndex: 1
                                }) }));
                        },
                        renderThumbHorizontal: function renderThumbHorizontal(_ref2) {
                            var style = _ref2.style,
                                props = (0, _objectWithoutProperties3.default)(_ref2, ['style']);
                            return _react2.default.createElement(
                                'div',
                                (0, _extends3.default)({}, props, { style: (0, _extends3.default)({}, style, {
                                        height: 12,
                                        cursor: 'pointer',
                                        borderRadius: 'inherit'
                                    }) }),
                                _react2.default.createElement('div', { style: {
                                        position: 'relative',
                                        top: 4,
                                        height: 8,
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                        borderRadius: 'inherit'
                                    } })
                            );
                        },
                        renderTrackVertical: function renderTrackVertical(_ref3) {
                            var style = _ref3.style,
                                props = (0, _objectWithoutProperties3.default)(_ref3, ['style']);
                            return _react2.default.createElement('div', (0, _extends3.default)({}, props, { style: (0, _extends3.default)({}, style, {
                                    width: 12,
                                    right: 2,
                                    bottom: 2,
                                    top: 2,
                                    borderRadius: 3,
                                    zIndex: 1
                                }) }));
                        },
                        renderThumbVertical: function renderThumbVertical(_ref4) {
                            var style = _ref4.style,
                                props = (0, _objectWithoutProperties3.default)(_ref4, ['style']);
                            return _react2.default.createElement(
                                'div',
                                (0, _extends3.default)({}, props, { style: (0, _extends3.default)({}, style, {
                                        width: 12,
                                        cursor: 'pointer',
                                        borderRadius: 'inherit'
                                    }) }),
                                _react2.default.createElement('div', { style: {
                                        position: 'relative',
                                        left: 4,
                                        width: 8,
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                        borderRadius: 'inherit'
                                    } })
                            );
                        },
                        style: {
                            width: '100%',
                            height: '100%'
                        },
                        autoHeight: false
                    },
                    table
                ) : table
            );
        }
    }]);
    return TableBody;
}(_react.Component);

TableBody.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setTableState: _propTypes2.default.func,
    handleStateChange: _propTypes2.default.func,
    getDataRows: _propTypes2.default.func
};
exports.default = TableBody;

var TableBodyContent = function (_Component2) {
    (0, _inherits3.default)(TableBodyContent, _Component2);

    function TableBodyContent(props) {
        (0, _classCallCheck3.default)(this, TableBodyContent);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (TableBodyContent.__proto__ || (0, _getPrototypeOf2.default)(TableBodyContent)).call(this, props));

        _initialiseProps.call(_this2);

        return _this2;
    }

    (0, _createClass3.default)(TableBodyContent, [{
        key: 'handleRowHeight',
        value: function handleRowHeight(list) {
            var _this3 = this;

            var state = this.context.state;
            var props = this.context.props;
            this.state.isSameHeight = true;
            this.state.rowHeight = {};
            list.map(function (data) {
                var height = props.bodyRowHeight;
                state.dataColumns.map(function (column) {
                    if (column.groupKey) {
                        var group = _lodash2.default.get(data, column.groupKey);
                        height = Math.max(height, group.length * props.bodyRowHeight);
                    }
                });
                if (height != props.bodyRowHeight) {
                    _this3.state.isSameHeight = false;
                }
                _this3.state.rowHeight[data[props.primaryKey]] = height;
            });
        }
    }, {
        key: 'isChecked',
        value: function isChecked(data) {
            var state = this.context.state;
            var props = this.context.props;
            return state.checked[data[props.primaryKey]] || false;
        }
    }, {
        key: 'handleShowRows',
        value: function handleShowRows() {
            var _this4 = this;

            var scrollTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.scrollTop;

            var state = this.context.state;
            var props = this.context.props;
            var list = this.handleCollapsedData();
            this.handleRowHeight(list);
            var rows = list.length;
            var showMinRows = 0,
                showMaxRows = Math.max(rows - 1, 0);
            if (this.state.isSameHeight) {
                if (props.bodyRowHeight * rows < 2000) {
                    this.state.showMinRows = showMinRows;
                    this.state.showMaxRows = showMaxRows;
                    this.state.scrollTop = scrollTop;
                    return true;
                }
                var bodyHeight = state.bodyHeight || (0, _jquery2.default)(window).height();
                var showRows = parseInt(bodyHeight / props.bodyRowHeight) + 8;
                showMinRows = Math.max(parseInt(scrollTop / props.bodyRowHeight) - 4, 0);
                showMaxRows = Math.min(showMinRows + showRows, list.length - 1);
            } else {
                var height = 0;
                showMinRows = list.length;
                showMaxRows = -1;
                list.map(function (row, rowIndex) {
                    var top = height;
                    height += _this4.state.rowHeight[row[props.primaryKey]];
                    var bottom = height;
                    if (Math.abs(top - scrollTop) <= 1500 || Math.abs(bottom - scrollTop) <= 1500 || top < scrollTop && bottom > scrollTop) {
                        showMinRows = Math.min(showMinRows, rowIndex);
                        showMaxRows = Math.max(showMaxRows, rowIndex);
                    }
                });
            }
            var diff = Math.abs(this.state.scrollTop - scrollTop);
            if (diff <= 2 && diff > 0 || this.state.showMinRows == showMinRows && this.state.showMaxRows == showMaxRows) {
                return false;
            }
            this.state.scrollTop = scrollTop;
            this.state.showMinRows = showMinRows;
            this.state.showMaxRows = showMaxRows;
            return true;
        }
    }, {
        key: 'handleCollapsedData',
        value: function handleCollapsedData() {
            var _this5 = this;

            var data = [];
            var state = this.context.state;
            state.dataRows.map(function (row) {
                if (!state.collapsedHidden[row[_this5.context.props.primaryKey]]) {
                    data.push(row);
                }
            });
            return data;
        }
    }, {
        key: 'showData',
        value: function showData(scrollTop) {
            if (this.handleShowRows(scrollTop)) {
                this.forceUpdate();
            }
        }
    }, {
        key: 'isRowShow',
        value: function isRowShow(rowIndex) {
            return rowIndex >= this.state.showMinRows && rowIndex <= this.state.showMaxRows;
        }
    }, {
        key: 'getTopHeight',
        value: function getTopHeight(list) {
            var height = 0;
            for (var i = 0; i < this.state.showMinRows && i < list.length; i++) {
                var data = list[i];
                height += this.state.rowHeight[data[this.context.props.primaryKey]];
            }
            return height;
        }
    }, {
        key: 'getBottomHeight',
        value: function getBottomHeight(list) {
            var height = 0;
            for (var i = this.state.showMaxRows + 1; i < list.length; i++) {
                var data = list[i];
                height += this.state.rowHeight[data[this.context.props.primaryKey]];
            }
            return height;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var state = this.context.state;
            var props = this.context.props;
            var hasChildren = false;
            var rows = this.context.getDataRows();
            rows.map(function (row) {
                if (row.children && row.children.length > 0) {
                    hasChildren = true;
                }
            });
            var list = this.handleCollapsedData();
            this.handleShowRows();
            this.handleRowHeight(list);
            var topHeight = this.getTopHeight(list);
            var bottomHeight = this.getBottomHeight(list);
            var topHideNum = 0;
            for (var i = 0; i < list.length; i++) {
                if (!this.isRowShow(i)) {
                    topHideNum++;
                } else {
                    break;
                }
            }
            return _react2.default.createElement(
                'tbody',
                { ref: 'tbody' },
                topHeight > 0 ? _react2.default.createElement(
                    'tr',
                    null,
                    this.props.showCheckboxes ? _react2.default.createElement('td', { style: { height: topHeight, padding: 0 } }) : null,
                    state.dataColumns.map(function (column, colIndex) {
                        return _react2.default.createElement('td', { key: colIndex,
                            style: { height: topHeight, padding: 0 } });
                    })
                ) : null,
                topHeight > 0 && topHideNum % 2 == 0 ? _react2.default.createElement('tr', null) : null,
                list.map(function (data, rowIndex) {
                    if (!_this6.isRowShow(rowIndex)) {
                        return null;
                    }
                    var checked = _this6.isChecked(data);
                    return _react2.default.createElement(
                        'tr',
                        { key: data[props.primaryKey] + '' + rowIndex,
                            'data-key': data[props.primaryKey],
                            className: '' + props.iconEventsBehavior,
                            onClick: _this6.handleRowSelect(data)
                        },
                        props.showCheckboxes ? _react2.default.createElement(
                            'td',
                            { className: 'td-checkbox' },
                            !props.rowCheckboxEnabled || props.rowCheckboxEnabled(data) ? _react2.default.createElement(_Checkbox2.default, (0, _extends3.default)({ checked: checked,
                                onCheck: _this6.handleCheck(data) }, props.checkboxStyle)) : _react2.default.createElement('div', { style: {
                                    display: 'inline-block',
                                    width: 16,
                                    height: 16,
                                    background: '#b9b9b9',
                                    opacity: 0.65,
                                    borderRadius: 2,
                                    cursor: 'not-allowed'
                                } })
                        ) : null,
                        state.dataColumns.map(function (column, colIndex) {
                            var content = function content() {
                                var value = _lodash2.default.get(data, column.dataKey || column.key);
                                if (column.groupKey) {
                                    var group = _lodash2.default.get(data, column.groupKey);
                                    return _react2.default.createElement(
                                        'div',
                                        { style: { width: '100%', overflow: 'hidden' } },
                                        group.map(function (row, index) {
                                            if (rowIndex < _this6.state.showMinRows || rowIndex > _this6.state.showMaxRows) {
                                                return _react2.default.createElement('div', { key: index, className: 'td', style: {
                                                        height: props.bodyRowHeight,
                                                        lineHeight: props.bodyRowHeight - 12 + 'px'
                                                    } });
                                            }
                                            return _react2.default.createElement(
                                                'div',
                                                { key: index, className: 'td', style: {
                                                        height: props.bodyRowHeight,
                                                        lineHeight: props.bodyRowHeight - 12 + 'px'
                                                    } },
                                                column.render ? column.render(row, column, _this6.context.Table) : _this6.context.cellRender(row, column)
                                            );
                                        })
                                    );
                                } else if (column.render) {
                                    return column.render(data, column, _this6.context.Table);
                                } else if (_lodash2.default.isObject(value)) {
                                    return value;
                                } else {
                                    return _this6.context.cellRender(data, column);
                                }
                            };
                            return _react2.default.createElement(
                                'td',
                                { key: colIndex, className: column.iconEvents ? 'icons-event-td' : '',
                                    style: (0, _extends3.default)({
                                        textAlign: column.textAlign || 'left',
                                        height: props.bodyRowHeight
                                    }, column.groupKey ? { padding: 0 } : {}, _lodash2.default.isFunction(column.style) ? column.style(data) : column.style || {}) },
                                function () {
                                    if (column.onClick) {
                                        return _react2.default.createElement(
                                            'span',
                                            { className: 'text-primary cursor-pointer',
                                                onClick: column.onClick ? column.onClick.bind(_this6, data) : undefined },
                                            content()
                                        );
                                    } else if (hasChildren && data[column.key + '_indent'] !== undefined || !hasChildren && data[column.key + '_indent'] > 0) {
                                        var indent = data[column.key + '_indent'];
                                        var text = _react2.default.createElement(
                                            'span',
                                            { style: {
                                                    display: 'table-cell',
                                                    verticalAlign: 'middle',
                                                    lineHeight: 1
                                                }, onClick: column.onClick ? column.onClick.bind(_this6, data) : undefined },
                                            content()
                                        );
                                        return _react2.default.createElement(
                                            'div',
                                            {
                                                className: '' + (column.onClick ? 'text-primary cursor-pointer' : ''),
                                                style: { paddingLeft: indent, lineHeight: 1 } },
                                            props.collapsible ? _react2.default.createElement(
                                                'div',
                                                { className: 'flex middle' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { style: { opacity: data.children.length > 0 ? 1 : 0 } },
                                                    _react2.default.createElement(_icon2.default, { type: 'button',
                                                        name: state.collapsed[data[props.primaryKey]] ? "plus-square" : "minus-square",
                                                        size: 14,
                                                        padding: 4,
                                                        onClick: _this6.handleCollapse(data)
                                                    })
                                                ),
                                                text
                                            ) : text
                                        );
                                    } else {
                                        return content();
                                    }
                                }(),
                                function () {
                                    if (column.iconEvents) {
                                        var label = {
                                            add: '新增',
                                            edit: '修改',
                                            delete: '删除',
                                            setting: '设置'
                                        };
                                        var events = [];
                                        if (_lodash2.default.isFunction(column.iconEvents)) {
                                            events = column.iconEvents(data, column);
                                        } else {
                                            events = column.iconEvents;
                                        }
                                        return _react2.default.createElement(
                                            'div',
                                            { className: 'icons-event' },
                                            events.map(function (event, key) {
                                                return _react2.default.createElement(_icon2.default, { key: key,
                                                    type: 'button',
                                                    name: 'icon-' + event,
                                                    title: label[event],
                                                    onClick: props.iconEvents[event].bind(_this6, data, column, _this6.context.Table) });
                                            })
                                        );
                                    } else {
                                        return null;
                                    }
                                }()
                            );
                        }),
                        state.extraColumnWidth > 0 ? _react2.default.createElement('td', { className: 'extra' }) : null
                    );
                }),
                bottomHeight > 0 ? _react2.default.createElement(
                    'tr',
                    null,
                    props.showCheckboxes ? _react2.default.createElement('td', { style: { height: bottomHeight, padding: 0 } }) : null,
                    state.dataColumns.map(function (column, colIndex) {
                        return _react2.default.createElement('td', { key: colIndex,
                            style: { height: bottomHeight, padding: 0 } });
                    })
                ) : null
            );
        }
    }]);
    return TableBodyContent;
}(_react.Component);

TableBodyContent.contextTypes = {
    Table: _propTypes2.default.object,
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setTableState: _propTypes2.default.func,
    getDataRows: _propTypes2.default.func,
    cellRender: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
    var _this8 = this;

    this.state = {
        showMinRows: 0,
        showMaxRows: 30,
        scrollTop: 0,
        rowHeight: {},
        isSameHeight: true
    };

    this.handleCollapse = function (data) {
        return function (event) {
            var state = _this8.context.state;
            var primaryKey = _this8.context.props.primaryKey;
            var collapsed = state.collapsed[data[primaryKey]];
            if (collapsed) {
                delete state.collapsed[data[primaryKey]];
            } else {
                state.collapsed[data[primaryKey]] = true;
            }

            var displayChildren = function displayChildren(children, collapsed) {
                children.map(function (child) {
                    if (collapsed) {
                        state.collapsedHidden[child[primaryKey]] = true;
                    } else {
                        delete state.collapsedHidden[child[primaryKey]];
                    }
                    if (child.children && child.children.length > 0) {
                        displayChildren(child.children, collapsed || state.collapsed[child[primaryKey]]);
                    }
                });
            };
            if (data.children && data.children.length > 0) {
                displayChildren(data.children, !collapsed);
            }
            _this8.context.setTableState({ collapsed: state.collapsed, collapsedHidden: state.collapsedHidden });
        };
    };

    this.handleRowSelect = function (data) {
        return function (event) {
            var props = _this8.context.props;
            if (props.rowSelect) {
                if (data) {
                    _this8.context.setTableState({
                        selectedRow: data
                    });
                    if (props.onRowSelect) {
                        props.onRowSelect(data);
                    }
                }
            }
        };
    };

    this.handleCheck = function (data) {
        return function (event, isInputChecked) {
            var state = _this8.context.state;
            var props = _this8.context.props;
            if (isInputChecked) {
                state.checked[data[props.primaryKey]] = true;
            } else {
                delete state.checked[data[props.primaryKey]];
            }
            if (props.onCheck) {
                props.onCheck(state.checked);
            }
            _this8.context.setTableState({
                checked: state.checked
            });
        };
    };
};

var TableBodyColGroup = function (_Component3) {
    (0, _inherits3.default)(TableBodyColGroup, _Component3);

    function TableBodyColGroup(props) {
        (0, _classCallCheck3.default)(this, TableBodyColGroup);
        return (0, _possibleConstructorReturn3.default)(this, (TableBodyColGroup.__proto__ || (0, _getPrototypeOf2.default)(TableBodyColGroup)).call(this, props));
    }

    (0, _createClass3.default)(TableBodyColGroup, [{
        key: 'render',
        value: function render() {
            var state = this.context.state;
            var props = this.context.props;
            var nodes = [];
            if (props.showCheckboxes) {
                nodes.push(_react2.default.createElement('th', { span: 1,
                    key: -1,
                    style: { width: props.checkboxColumnWidth, padding: 0, height: 0 } }));
            }
            nodes = nodes.concat(state.dataColumns.map(function (column, index) {
                var key = column.key;
                var width = state.columnWidths[key] || 'auto';
                return _react2.default.createElement('th', { span: 1,
                    key: index,
                    style: {
                        width: width,
                        maxWidth: width,
                        padding: 0,
                        height: 0
                    } });
            }));
            if (state.extraColumnWidth > 0) {
                nodes.push(_react2.default.createElement('th', { span: 1,
                    key: state.dataColumns.length,
                    style: { width: 'auto', padding: 0, height: 0 } }));
            }
            return _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                    'tr',
                    null,
                    nodes
                )
            );
        }
    }]);
    return TableBodyColGroup;
}(_react.Component);

TableBodyColGroup.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setTableState: _propTypes2.default.func
};