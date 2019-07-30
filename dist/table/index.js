'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _pager = require('./pager');

var _pager2 = _interopRequireDefault(_pager);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = false;

var Table = function (_Component) {
    (0, _inherits3.default)(Table, _Component);
    (0, _createClass3.default)(Table, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                Table: this,
                state: this.state,
                props: this.props,
                setTableState: this.setTableState.bind(this),
                handleStateChange: this.handleStateChange.bind(this),
                getDataRows: this.getDataRows.bind(this),
                cellRender: this.cellRender.bind(this)
            };
        }
    }]);

    function Table(props) {
        (0, _classCallCheck3.default)(this, Table);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, props));

        _this.state = {
            containerWidth: undefined,
            tableWidth: undefined,
            columnWidths: {},
            dataColumns: [],
            dataSource: [],
            dataRows: [],
            selectedRow: undefined,
            mode: 'fetch',
            headerColumns: [],
            checked: {},
            collapsed: {},
            collapsedHidden: {},
            iconEvents: {},
            iconEventsBehavior: 'columnHover',
            filterConfig: {},
            filterData: {},
            sortData: {},
            extraColumnWidth: 0,
            scrollTop: 0,
            scrollLeft: 0,
            headerHeight: undefined,
            footerHeight: undefined,
            pagerHeight: undefined,
            bodyHeight: undefined };

        _this.handleScroll = function (event) {
            (0, _jquery2.default)(_this.refs.header.refs.container).scrollLeft((0, _jquery2.default)(event.target).scrollLeft());
            if (_this.refs.footer) {
                (0, _jquery2.default)(_this.refs.footer.refs.container).scrollLeft((0, _jquery2.default)(event.target).scrollLeft());
            }
            _this.state.scrollLeft = (0, _jquery2.default)(event.target).scrollLeft();
            _this.state.scrollTop = (0, _jquery2.default)(event.target).scrollTop();
            _this.handleStateChange();
            if (_this.props.onScroll) {
                _this.props.onScroll(event);
            }
        };

        _this.setDataSource = function (dataSource) {
            if (dataSource instanceof _promise2.default) {
                _this.showBodyMasker();
                dataSource.then(function (dataSource) {
                    _this.hideBodyMasker();
                    if (_lodash2.default.isArray(dataSource)) {
                        _this.refs.body.setDataSource(dataSource);
                    }
                });
            } else if (_lodash2.default.isArray(dataSource)) {
                _this.refs.body.setDataSource(dataSource);
            }
        };

        _this.setColumns = function (columns, columnWidths) {
            _this.state.headerColumns = [];
            _this.state.dataColumns = [];
            _this.state.columnWidths = columnWidths || _this.props.columnWidths || {};
            _this.detect(_lodash2.default.cloneDeep(columns));
            _this.handleStateChange();
            _this.forceUpdate();
        };

        _this.setFooterData = function (footerData) {
            _this.refs.footer.setFooterData(footerData);
        };

        _this.updatePager = function () {
            if (_this.state.pager && _this.refs.pager) {
                _this.refs.pager.forceUpdate();
            }
        };

        _this.showBodyMasker = function () {
            _this.refs.body.showMasker();
        };

        _this.hideBodyMasker = function () {
            _this.refs.body.hideMasker();
        };

        _this.initData(props);
        _this.detect(_lodash2.default.cloneDeep(props.columns));
        return _this;
    }

    (0, _createClass3.default)(Table, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);

            if (!_lodash2.default.isEqual(this.props.columns, nextProps.columns)) {
                this.state.headerColumns = [];
                this.state.dataColumns = [];
                this.detect(_lodash2.default.cloneDeep(nextProps.columns));
            }
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            var nextProps = {
                containerWidth: props.tableWidth,
                tableWidth: props.tableWidth,
                columnWidths: (0, _extends3.default)({}, props.columnWidths),
                dataSource: props.dataSource,
                mode: props.mode,
                headerColumns: props.headerColumns,
                checked: (0, _extends3.default)({}, props.checked),
                collapsed: props.collapsed,
                collapsedHidden: (0, _extends3.default)({}, props.collapsedHidden),
                iconEvents: props.iconEvents,
                iconEventsBehavior: props.iconEventsBehavior,
                filter: props.filter || {},
                filterData: (0, _extends3.default)({}, props.filterData),
                sortData: (0, _extends3.default)({}, props.sortData)
            };
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(nextProps)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

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
            this.state.dataRows = this.state.dataSource;
        }
    }, {
        key: 'cellRender',
        value: function cellRender(data, column) {
            if (_lodash2.default.isFunction(this.props.cellRender)) {
                return this.props.cellRender(data, column, this);
            } else {
                return _utils2.default.render(data, column);
            }
        }
    }, {
        key: 'handleStateChange',
        value: function handleStateChange(state) {
            (0, _assign2.default)(this.state, state);
            if (this.props.onStateChange) {
                this.props.onStateChange({
                    containerWidth: this.state.containerWidth,
                    tableWidth: this.state.tableWidth,
                    columnWidths: this.state.columnWidths,
                    checked: this.state.checked,
                    filterData: this.state.filterData,
                    sortData: this.state.sortData,
                    scrollLeft: this.state.scrollLeft,
                    scrollTop: this.state.scrollTop,
                    collapsed: this.state.collapsed
                });
            }
        }
    }, {
        key: 'setTableState',
        value: function setTableState(state) {
            this.handleStateChange(state);
            this.forceUpdate();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.state.containerWidth = (0, _jquery2.default)(this.refs.container).outerWidth() || '100%';
            this.state.tableWidth = this.state.tableWidth || this.state.containerWidth;
            this.componentDidUpdate();
        }
    }, {
        key: 'getCheckboxColumnWidth',
        value: function getCheckboxColumnWidth() {
            return this.props.showCheckboxes ? this.props.checkboxColumnWidth : 0;
        }
    }, {
        key: 'handleColumnWidths',
        value: function handleColumnWidths() {
            var _this2 = this;

            var undefinedWidthColumns = [],
                widthSum = 0;
            this.state.dataColumns.map(function (column) {
                if (_this2.state.columnWidths[column.key] === undefined) {
                    undefinedWidthColumns.push(column.key);
                } else {
                    widthSum += _this2.state.columnWidths[column.key];
                }
            });
            undefinedWidthColumns.map(function (key) {
                _this2.state.columnWidths[key] = (0, _jquery2.default)(_this2.refs.container).find('.table-header th[data-key=' + key + ']').outerWidth();
            });
            if (undefinedWidthColumns.length == 0 && widthSum != this.state.tableWidth) {
                var remainWidth = this.state.tableWidth - this.getCheckboxColumnWidth();
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(this.state.columnWidths)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
                            key = _step2$value[0],
                            width = _step2$value[1];

                        this.state.columnWidths[key] = Math.round(width / widthSum * (this.state.tableWidth - this.getCheckboxColumnWidth()));
                        remainWidth -= this.state.columnWidths[key];
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                this.state.columnWidths[this.state.dataColumns[this.state.dataColumns.length - 1].key] += remainWidth;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var oldColumnWidths = (0, _extends3.default)({}, this.state.columnWidths);
            this.handleColumnWidths();
            if (this.props.containerHeight) {
                var containerHeight = (0, _jquery2.default)(this.refs.container).height();
                this.state.headerHeight = (0, _jquery2.default)(this.refs.container).find('.table-header').height() || 0;
                this.state.footerHeight = (0, _jquery2.default)(this.refs.container).find('.table-footer').height() || 0;
                this.state.pagerHeight = (0, _jquery2.default)(this.refs.container).find('.table-pager').height() || 0;
                this.state.bodyHeight = containerHeight - this.state.headerHeight - this.state.pagerHeight - this.state.footerHeight;
            }
            if (this.state.bodyHeight) {
                (0, _jquery2.default)(this.refs.container).find('.table-body').css({ height: this.state.bodyHeight });
            }
            (0, _jquery2.default)(this.refs.container).find('.table-body .table').css({ width: this.state.tableWidth });
            if (!_lodash2.default.isEqual(oldColumnWidths, this.state.columnWidths)) {
                this.forceUpdate();
            }
        }
    }, {
        key: 'detect',
        value: function detect(columns) {
            var _this3 = this;

            var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var colSpan = 0;
            columns.map(function (column) {
                if (column.filter) {
                    _this3.state.filter[column.key] = column.filter;
                }
                column.parent = parent;
                if (!_this3.state.headerColumns[level]) {
                    _this3.state.headerColumns[level] = [];
                }
                _this3.state.headerColumns[level].push(column);
                if (column.children && column.children.length > 0) {
                    column.colSpan = _this3.detect(column.children, column, level + 1);
                    colSpan += column.colSpan;
                } else {
                    if (_lodash2.default.isArray(column.key)) {
                        column.colSpan = column.key.length;
                        _this3.state.dataColumns = _this3.state.dataColumns.concat(column);
                    } else {
                        column.colSpan = 1;
                        _this3.state.dataColumns.push(column);
                    }
                    colSpan += column.colSpan;
                }
            });
            return colSpan;
        }
    }, {
        key: 'checkRow',
        value: function checkRow(data) {
            for (var key in data) {
                var filterConfig = _lodash2.default.get(this.state.filterConfig[key], 'fields[0]');
                if (filterConfig) {
                    var filterValue = this.state.filterData[key];
                    if (filterConfig && filterValue !== undefined) {
                        if (filterConfig.onCheck) {
                            if (!filterConfig.onCheck(data, key, filterValue)) {
                                return false;
                            }
                        } else if (!this.checkValue(data, key, filterConfig)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
    }, {
        key: 'checkValue',
        value: function checkValue(data, key, filterConfig) {
            var value = _lodash2.default.get(data, key);
            var filterValue = _lodash2.default.isObject(this.state.filterData[key]) ? (0, _values2.default)(this.state.filterData[key])[0] : this.state.filterData[key];
            switch (filterConfig.type) {
                case 'text':
                    return value.toString().indexOf(filterValue) >= 0;
                case 'radio':
                    return value == filterValue;
                case 'checkbox':
                    return !_lodash2.default.isArray(filterValue) || filterValue.length == 0 || _lodash2.default.findIndex(filterValue, function (o) {
                        return o == value;
                    }) >= 0;
            }
            return true;
        }
    }, {
        key: 'getFilteredRows',
        value: function getFilteredRows(dataSource) {
            var _this4 = this;

            var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var rows = [];
            dataSource.map(function (data) {
                var indentData = {};
                indentData[_this4.state.dataColumns[0].key + '_indent'] = indent;
                var parent = (0, _assign2.default)(indentData, data);
                var children = [];
                if (data.children && data.children.length > 0) {
                    children = _this4.getFilteredRows(data.children, indent + 16);
                }
                if (_this4.checkRow(parent) || children.length > 0) {
                    rows.push(parent);
                    rows = rows.concat(children);
                }
            });
            return rows;
        }
    }, {
        key: 'getDataRows',
        value: function getDataRows() {
            var _this5 = this;

            this.state.dataRows = this.getFilteredRows(this.state.dataSource);
            var rows = [];
            if (this.state.mode == 'local') {
                var _page$limit$state$pag = (0, _extends3.default)({
                    page: 1,
                    limit: 100000
                }, this.state.pager),
                    page = _page$limit$state$pag.page,
                    limit = _page$limit$state$pag.limit;

                var offset = (page - 1) * limit;
                var total = this.state.dataRows.length;
                var pages = Math.ceil(total / limit);
                for (var i = offset; i < offset + limit; i++) {
                    if (this.state.dataRows[i]) {
                        rows.push(this.state.dataRows[i]);
                    }
                }
                var _onChange = this.state.pager && this.state.pager.onChange ? this.state.pager.onChange : undefined;
                this.state.pager = (0, _extends3.default)({}, this.state.pager, {
                    page: page,
                    limit: limit,
                    pages: pages,
                    total: total,
                    onChange: function onChange(data) {
                        (0, _assign2.default)(_this5.state.pager, data);
                        if (_onChange) {
                            _onChange(data);
                        }
                        _this5.forceUpdate();
                    }
                });
                setTimeout(function () {
                    _this5.updatePager();
                }, 50);
            } else {
                rows = this.state.dataRows;
                setTimeout(function () {
                    _this5.updatePager();
                }, 50);
            }
            return rows;
        }
    }, {
        key: 'setChecked',
        value: function setChecked(checked) {
            this.state.checked = checked;
            if (this.props.onCheck) {
                this.props.onCheck(this.state.checked);
            }
            this.handleStateChange();
            this.forceUpdate();
        }
    }, {
        key: 'scrollTop',
        value: function scrollTop(top) {
            this.state.scrollTop = top;
            this.handleStateChange();
            this.forceUpdate();
        }
    }, {
        key: 'render',
        value: function render() {
            var className = "table-container";
            if (this.props.bordered) className += ' bordered';
            if (!this.props.containerBordered) className += ' none-outside-border';
            if (this.props.className) className += ' ' + this.props.className;
            return _react2.default.createElement(
                'div',
                { ref: 'container',
                    className: className,
                    style: (0, _extends3.default)({
                        overflow: 'hidden',
                        width: this.props.containerWidth,
                        height: this.props.containerHeight
                    }, this.props.style) },
                _react2.default.createElement(_header2.default, { ref: 'header' }),
                _react2.default.createElement(_body2.default, { ref: 'body' }),
                this.props.pager ? _react2.default.createElement(_pager2.default, null) : null
            );
        }
    }]);
    return Table;
}(_react.Component);

Table.childContextTypes = {
    Table: _propTypes2.default.object,
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setTableState: _propTypes2.default.func,
    handleStateChange: _propTypes2.default.func,
    getDataRows: _propTypes2.default.func,
    cellRender: _propTypes2.default.func
};
Table.defaultProps = {
    headerTextAlign: 'center',
    emptyDataTip: '没有找到相关数据',
    emptyDataImage: '/image/nodata.png',
    height: 'auto',
    rowSelected: false,
    onRowSelect: undefined,
    primaryKey: 'id',
    parentKey: 'parent_id',
    condensed: false,
    collapsible: false,
    hideScrollBar: false,
    bordered: true,
    striped: true,
    containerBordered: true,
    containerWidth: '100%',
    containerHeight: undefined,
    tableWidth: undefined,
    columnWidths: {},
    checked: {},
    filterData: {},
    sortData: {},
    scrollTop: 0,
    scrollLeft: 0,
    headerRowHeight: undefined,
    bodyRowHeight: 32,
    dataSource: [],
    onFilter: undefined,
    onSort: undefined,
    pager: undefined,
    onCheck: undefined,
    showCheckboxes: true,
    rowCheckboxEnabled: undefined,
    bodyCellMultiLine: false,
    checkboxColumnWidth: 50,
    resize: false,
    cellRender: undefined,
    loading: false,
    footerFixed: false,
    checkboxStyle: {
        style: {
            marginLeft: 15,
            marginRight: 15
        },
        iconStyle: {
            left: 0,
            width: 20,
            height: 20
        }
    }
};
exports.default = Table;

var TableFooter = function (_Component2) {
    (0, _inherits3.default)(TableFooter, _Component2);

    function TableFooter(props) {
        (0, _classCallCheck3.default)(this, TableFooter);

        var _this6 = (0, _possibleConstructorReturn3.default)(this, (TableFooter.__proto__ || (0, _getPrototypeOf2.default)(TableFooter)).call(this, props));

        _this6.setFooterData = function (footerData) {
            _this6.state.footerData = footerData;
            _this6.forceUpdate();
        };

        _this6.state = state[props.stateKey];
        return _this6;
    }

    (0, _createClass3.default)(TableFooter, [{
        key: 'render',
        value: function render() {
            debug && console.log('render table footer');
            return _react2.default.createElement(
                'div',
                { ref: 'container',
                    className: 'table-footer',
                    style: (0, _extends3.default)({ overflow: 'hidden', width: this.state.containerWidth }, this.props.style) },
                _react2.default.createElement(
                    'table',
                    {
                        className: 'table ' + (this.props.bordered ? 'bordered' : '') + ' ' + (this.props.condensed ? 'condensed' : ''),
                        style: { width: this.state.tableWidth || '100%' } },
                    _react2.default.createElement(TableBodyColGroup, { ref: 'colGroup',
                        stateKey: this.props.stateKey,
                        showCheckboxes: this.props.showCheckboxes }),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.state.footerData.map(function (row, i) {
                            return _react2.default.createElement(
                                'tr',
                                { key: i },
                                row.map(function (col, j) {
                                    return _react2.default.createElement(
                                        'td',
                                        { key: j, colSpan: col.colSpan || 1, rowSpan: col.rowSpan || 1,
                                            style: { textAlign: col.textAlign || 'left' } },
                                        col.content
                                    );
                                })
                            );
                        })
                    )
                )
            );
        }
    }]);
    return TableFooter;
}(_react.Component);