'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

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

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _fixedCol = require('./fixed-col');

var _fixedCol2 = _interopRequireDefault(_fixedCol);

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
                cellRender: this.cellRender.bind(this),
                getTableWidth: this.getTableWidth.bind(this)
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
            if (_lodash2.default.get(_this.refs, 'fixedLeft.refs.body')) {
                (0, _jquery2.default)(_this.refs.fixedLeft.refs.body.refs.container).scrollTop(_this.state.scrollTop);
                _this.refs.fixedLeft.forceUpdate();
            }
            if (_lodash2.default.get(_this.refs, 'fixedRight.refs.body')) {
                (0, _jquery2.default)(_this.refs.fixedRight.refs.body.refs.container).scrollTop(_this.state.scrollTop);
                _this.refs.fixedRight.forceUpdate();
            }
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
        key: 'getTableWidth',
        value: function getTableWidth() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            var hasChildren = {};
            this.state.dataColumns.map(function (column) {
                if (column.parent) hasChildren[column.parent.key] = true;
            });
            var columnWidths = (0, _entries2.default)(this.state.columnWidths).map(function (_ref) {
                var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                if (hasChildren[key]) return 0;
                return value;
            });
            return props.tableWidth || Math.max(this.getCheckboxColumnWidth() + this.getSeriesColumnWidth() + (columnWidths.length > 0 ? columnWidths.reduce(function (total, num) {
                return total + num;
            }, 0) : 0), _lodash2.default.isString(this.state.containerWidth) ? 0 : this.state.containerWidth, props.tableMinWidth || 0);
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            var nextProps = {
                containerWidth: this.state.containerWidth || props.containerWidth,
                columnWidths: (0, _extends3.default)({}, props.columnWidths),
                dataSource: props.dataSource,
                mode: props.mode,
                headerColumns: props.headerColumns,
                checked: (0, _extends3.default)({}, props.checked),
                collapsed: props.collapsed,
                iconEvents: props.iconEvents,
                iconEventsBehavior: props.iconEventsBehavior,
                filter: props.filter || {},
                filterData: (0, _extends3.default)({}, props.filterData),
                sortData: (0, _extends3.default)({}, props.sortData),
                selectedRow: this.state.selectedRow || props.selectedRow
            };
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(nextProps)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref3 = _step.value;

                    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);

                    var key = _ref4[0];
                    var value = _ref4[1];

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
            this.state.tableWidth = this.getTableWidth(nextProps);
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
                    collapsed: this.state.collapsed,
                    selectedRow: this.state.selectedRow
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
            var containerWidth = (0, _jquery2.default)(this.refs.container).outerWidth() || '100%';
            if (this.state.containerWidth !== containerWidth) {
                this.state.containerWidth = containerWidth;
                this.refs.fixedLeft && this.refs.fixedLeft.forceUpdate();
                this.refs.fixedRight && this.refs.fixedRight.forceUpdate();
            }
            this.componentDidUpdate();
        }
    }, {
        key: 'getCheckboxColumnWidth',
        value: function getCheckboxColumnWidth() {
            return this.props.showCheckboxes ? this.props.checkboxColumnWidth : 0;
        }
    }, {
        key: 'getSeriesColumnWidth',
        value: function getSeriesColumnWidth() {
            return this.props.showSeries ? this.props.seriesColumnWidth : 0;
        }
    }, {
        key: 'handleColumnWidths',
        value: function handleColumnWidths() {
            var _this2 = this;

            var undefinedColumnWidths = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(this.state.columnWidths)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _ref5 = _step2.value;

                    var _ref6 = (0, _slicedToArray3.default)(_ref5, 2);

                    var key = _ref6[0];
                    var width = _ref6[1];

                    if (_lodash2.default.findIndex(this.state.dataColumns, { key: key }) < 0) {
                        delete this.state.columnWidths[key];
                    }
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

            this.state.dataColumns.map(function (column) {
                if (_this2.state.columnWidths[column.key] === undefined) {
                    undefinedColumnWidths.push(column.key);
                }
                if (column.parent) {
                    _this2.state.columnWidths[column.parent.key] = 0;
                }
            });
            this.state.dataColumns.map(function (column) {
                if (column.parent && _this2.state.columnWidths[column.key]) {
                    _this2.state.columnWidths[column.parent.key] += _this2.state.columnWidths[column.key];
                }
            });
            undefinedColumnWidths.map(function (key) {
                _this2.state.columnWidths[key] = (0, _jquery2.default)(_this2.refs.container).find('.table-header th[data-key=' + key + ']').outerWidth();
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var oldColumnWidths = (0, _extends3.default)({}, this.state.columnWidths);
            var state = this.state;
            var props = this.props;
            this.handleColumnWidths();
            this.state.tableWidth = this.getTableWidth();
            if (this.props.containerHeight) {
                var containerHeight = (0, _jquery2.default)(this.refs.container).outerHeight();
                this.state.headerHeight = props.headerRowHeight * state.headerColumns.length + state.headerColumns.length || (0, _jquery2.default)(this.refs.container).find('.table-header').height() || 0;
                this.state.footerHeight = (0, _jquery2.default)(this.refs.container).find('.table-footer').height() || 0;
                this.state.pagerHeight = (0, _jquery2.default)(this.refs.container).find('.table-pager').height() || 0;
                this.state.bodyHeight = containerHeight - this.state.headerHeight - this.state.pagerHeight - this.state.footerHeight;
            }
            if (this.state.bodyHeight) {
                (0, _jquery2.default)(this.refs.container).find('.table-body').css({ height: this.state.bodyHeight });
            }
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
            var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var rows = [];
            var collapsibleKey = this.props.collapsibleKey || _lodash2.default.get(this.state.dataColumns, "0.key");
            dataSource.map(function (data) {
                var indentData = {};
                indentData[collapsibleKey + '_indent'] = indent;
                var current = (0, _assign2.default)(indentData, data);
                var children = [];
                if (data.children && data.children.length > 0) {
                    children = _this4.getFilteredRows(data.children, indent + 16, current);
                }
                if (_this4.checkRow(current) || children.length > 0) {
                    rows.push((0, _extends3.default)({}, current, { _parent: parent }));
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
            this.setTableState(this.state);
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
                        position: 'relative',
                        width: this.props.containerWidth,
                        height: this.props.containerHeight
                    }, this.props.style) },
                this.props.fixedCheckbox || this.props.fixedLeftColumns.length > 0 ? _react2.default.createElement(_fixedCol2.default, { ref: 'fixedLeft', position: 'left', columns: this.props.fixedLeftColumns }) : null,
                this.props.fixedRightColumns.length > 0 ? _react2.default.createElement(_fixedCol2.default, { ref: 'fixedRight', position: 'right', columns: this.props.fixedRightColumns }) : null,
                _react2.default.createElement(_header2.default, { ref: 'header' }),
                _react2.default.createElement(_body2.default, {
                    ref: 'body',
                    onScroll: this.handleScroll,
                    rowSelected: this.props.rowSelected,
                    onRowSelect: this.props.onRowSelect
                }),
                this.props.footerData && this.props.footerData.length > 0 ? _react2.default.createElement(_footer2.default, { ref: 'footer' }) : null,
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
    cellRender: _propTypes2.default.func,
    getTableWidth: _propTypes2.default.func
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
    collapsibleKey: undefined,
    defaultCollapsible: false,
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
    headerRowHeight: 32,
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
    resize: true,
    cellRender: undefined,
    loading: false,
    footerFixed: false,
    fixedCheckbox: false,
    fixedLeftColumns: [],
    fixedRightColumns: [],
    showSeries: false,
    seriesColumnWidth: 50,
    showEllipsis: true,
    autoResponse: false,
    rowStyle: undefined,
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