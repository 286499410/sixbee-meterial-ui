'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _table = require('../table');

var _table2 = _interopRequireDefault(_table);

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    label: {
        transform: "scale(0.75)",
        transformOrigin: 'left top 0px',
        color: 'rgba(0,0,0,0.3)',
        fontSize: 15,
        display: 'inline-block'
    },
    footerAction: { marginTop: -1 }
};

var FormTable = function (_Component) {
    (0, _inherits3.default)(FormTable, _Component);
    (0, _createClass3.default)(FormTable, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                FormTable: this
            };
        }
    }]);

    function FormTable(props) {
        (0, _classCallCheck3.default)(this, FormTable);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FormTable.__proto__ || (0, _getPrototypeOf2.default)(FormTable)).call(this, props));

        _this.state = {
            value: [],
            currentRow: undefined,
            pager: {
                page: 1,
                limit: 50
            },
            tableState: {},
            controls: []
        };

        _this.setControlValue = function (row, key, value) {
            _this.getControl(row, key).setValue(value);
        };

        _this.handleFocus = function (row, column) {
            return function (event, control) {
                if (_this.state.currentRow !== row) {
                    _this.setCurrentRow(row);
                }
                if (_this.props.onFocus) {
                    _this.props.onFocus(row, column, control, _this);
                }
            };
        };

        _this.handleBlur = function (row, column) {
            return function (event, control) {
                if (column.onBlur) {
                    var value = _lodash2.default.get(_this.getRowData(row), column.dataKey);
                    column.onBlur(value, control, _this, row);
                }
                if (_this.props.onBlur) {
                    _this.props.onBlur(row, column, control, _this);
                }
            };
        };

        _this.handleKeyUp = function (row, column) {
            return function (event, control) {
                if (_this.props.onKeyUp) {
                    _this.props.onKeyUp(row, column, control, _this);
                }
            };
        };

        _this.handleChange = function (row, column) {
            return function (value, control) {
                _lodash2.default.set(_this.state.value[row], column.formKey || column.key, value);
                if (_this.props.onChange) {
                    _this.props.onChange(_this.state.value, _this);
                }
                if (column.onChange) {
                    column.onChange(value, control, _this, row);
                }
            };
        };

        _this.getColumnsWidth = function () {
            if (_lodash2.default.isFunction(_this.props.columnWidths)) {
                return _this.props.columnWidths(_this);
            } else {
                return _this.props.columnWidths;
            }
        };

        _this.handleActionClick = function (actionKey, row) {
            if (_this.props.onActionClick) {
                if (_this.props.onActionClick(actionKey, row, _this) === false) {
                    return;
                }
            }
            switch (actionKey) {
                case 'add':
                    _this.addRow(row);
                    break;
                case 'up':
                    _this.upRow(row);
                    break;
                case 'down':
                    _this.downRow(row);
                    break;
                case 'delete':
                    _this.deleteRow(row);
                    break;
            }
        };

        _this.handleRowSelect = function (data) {
            if (data.series_number) {
                var row = (_lodash2.default.isNumber(data.series_number) ? data.series_number : data.series_number.props.children) - 1;
                _this.setCurrentRow(row);
            }
        };

        _this.handleStateChange = function (state) {
            _this.setTableState({
                tableState: state
            });
        };

        _this.handlePageChange = function (data) {
            _this.setTableState({
                pager: data
            });
        };

        _this.initData(props);
        if (_this.state.value.length == 0 && _this.props.defaultRows > 0) {
            for (var i = 0; i < _this.props.defaultRows; i++) {
                _this.addDataRow(undefined, _this.getDefaultRowData(props), false);
            }
        }
        _this.checkMinRow(props);
        return _this;
    }

    (0, _createClass3.default)(FormTable, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initData(nextProps);
            this.checkMinRow(nextProps);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {}
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return true;
        }
    }, {
        key: 'initData',
        value: function initData(props) {
            if (_lodash2.default.isArray(props.value)) {
                this.state.value = props.value;
            } else if (props.value === undefined) {
                this.state.value = [];
            }
        }
    }, {
        key: 'getDefaultRowData',
        value: function getDefaultRowData() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            return _lodash2.default.isFunction(props.defaultRowData) ? props.defaultRowData(this) : props.defaultRowData;
        }
    }, {
        key: 'checkMinRow',
        value: function checkMinRow() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            if (this.state.value.length < props.minRows) {
                for (var i = this.state.value.length; i < props.minRows; i++) {
                    this.addDataRow(i, this.getDefaultRowData(props), false);
                }
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var _this2 = this;

            if (_lodash2.default.isArray(value) && this.props.autoSortField) {
                value.map(function (row, index) {
                    row.sort = _this2.props.autoSortType == 'desc' ? value.length - index : index + 1;
                });
            }
            this.state.value = value;
            this.forceUpdate();
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return (this.state.value === undefined ? this.props.defaultValue : this.state.value) || [];
        }
    }, {
        key: 'getControl',
        value: function getControl(row, key) {
            return this.state.controls[row][key];
        }
    }, {
        key: 'addRow',
        value: function addRow(row) {
            var defaultData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getDefaultRowData();

            if (row === undefined) row = this.getCurrentRow();
            this.addDataRow(row, defaultData);
        }
    }, {
        key: 'deleteRow',
        value: function deleteRow(row) {
            if (row === undefined) row = this.getCurrentRow();
            this.state.value.splice(row, 1);
            if (this.state.value.length < this.props.minRows) {
                this.addDataRow(this.state.value.length);
            } else {
                this.setValue(this.state.value);
            }
            if (row > this.state.value.length - 1) {
                this.setCurrentRow(this.state.value.length - 1);
            } else {
                this.setCurrentRow(row);
            }
        }
    }, {
        key: 'copyRow',
        value: function copyRow(row) {
            if (row === undefined) row = this.getCurrentRow();
            var data = this.getRowData(row);
            this.state.value.splice(row + 1, 0, (0, _extends3.default)({}, data, { _key: _utils2.default.uuid() }));
            this.setValue(this.state.value);
        }
    }, {
        key: 'upRow',
        value: function upRow(row) {
            if (row === undefined) row = this.getCurrentRow();
            if (row > 0) {
                var data = this.state.value[row];
                var prev = this.state.value[row - 1];
                this.state.value.splice(row - 1, 2, data);
                this.state.value.splice(row, 0, prev);
                this.setValue(this.state.value);
                this.setCurrentRow(row - 1);
            }
        }
    }, {
        key: 'downRow',
        value: function downRow(row) {
            if (row === undefined) row = this.getCurrentRow();
            if (row < this.state.value.length - 1) {
                var data = this.state.value[row];
                var next = this.state.value[row + 1];
                this.state.value.splice(row, 2, next);
                this.state.value.splice(row + 1, 0, data);
                this.setValue(this.state.value);
                this.setCurrentRow(row + 1);
            }
        }
    }, {
        key: 'setCurrentRow',
        value: function setCurrentRow(row) {
            this.setState({ currentRow: row });
            if (this.props.onRowSelect) {
                var data = this.getRowData(row);
                this.props.onRowSelect(row, data);
            }
            this.setTableState({
                currentRow: row
            });
        }
    }, {
        key: 'getCurrentRow',
        value: function getCurrentRow() {
            return this.state.currentRow === undefined ? this.state.value.length - 1 : this.state.currentRow;
        }
    }, {
        key: 'addDataRow',
        value: function addDataRow(row) {
            var defaultData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getDefaultRowData();
            var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var data = {},
                value = this.state.value;
            this.props.columns.map(function (column) {
                data[column.key] = "";
            });
            data = (0, _extends3.default)({}, data, defaultData, { _key: _utils2.default.uuid() });
            if (row == null) {
                value.push(data);
            } else {
                value.splice(row, 0, data);
            }
            if (update) {
                this.setValue(value);
            }
        }
    }, {
        key: 'getRowData',
        value: function getRowData(row) {
            return this.state.value[row] || {};
        }
    }, {
        key: 'setRowData',
        value: function setRowData(row, data) {
            var forceUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var value = this.state.value;
            (0, _assign2.default)(value[row], data);
            if (forceUpdate) {
                this.setValue(value);
            }
        }
    }, {
        key: 'getLastRowData',
        value: function getLastRowData() {
            return this.state.value.length == 0 ? undefined : this.state.value[this.state.value.length - 1];
        }
    }, {
        key: 'getColumns',
        value: function getColumns(columns) {
            var _this3 = this;

            var tableColumns = [];
            if (this.props.hasSeriesNumber) {
                tableColumns.push({
                    dataKey: 'series_number',
                    type: 'text',
                    label: this.props.seriesNumberText,
                    width: this.props.seriesNumberWidth,
                    textAlign: 'center'
                });
            }
            var columnWidths = this.getColumnsWidth();
            columns.map(function (column) {
                var style = void 0;
                if (!column.static && column.type != 'static' && ['text', 'auto', 'money', 'number', 'date', 'datetime', 'select', 'time', 'calendar'].indexOf(column.type) >= 0) {
                    style = _this3.props.editableStyle;
                }
                tableColumns.push((0, _extends3.default)({}, column, {
                    style: style,
                    dataKey: undefined,
                    render: false,
                    width: columnWidths[column.key]
                }));
            });
            if (this.props.hasAction) {
                tableColumns.push({
                    key: 'action',
                    dataKey: 'action',
                    label: '操作',
                    icon: 'icon-add',
                    iconEvent: function iconEvent() {
                        _this3.addRow(null);
                    },
                    width: this.props.actionWidth
                });
            }
            return tableColumns;
        }
    }, {
        key: 'getAction',
        value: function getAction(key, row) {
            var style = {
                width: 28,
                height: 28,
                padding: 4
            };
            var iconStyle = {
                width: 20,
                height: 20,
                fontSize: 16,
                padding: 2
            };
            var hoverColor = "#1890ff";
            switch (key) {
                case 'add':
                    return _react2.default.createElement(
                        _IconButton2.default,
                        {
                            style: style,
                            iconStyle: iconStyle,
                            title: '\u63D2\u5165',
                            onClick: this.handleActionClick.bind(this, 'add', row) },
                        _react2.default.createElement(_FontIcon2.default, { className: 'iconfont icon-plus', hoverColor: hoverColor })
                    );
                case 'up':
                    return _react2.default.createElement(
                        _IconButton2.default,
                        {
                            style: style,
                            iconStyle: iconStyle,
                            title: '\u4E0A\u79FB',
                            onClick: this.handleActionClick.bind(this, 'up', row) },
                        _react2.default.createElement(_FontIcon2.default, { className: 'iconfont icon-arrowup', hoverColor: hoverColor })
                    );
                case 'down':
                    return _react2.default.createElement(
                        _IconButton2.default,
                        {
                            style: style,
                            iconStyle: iconStyle,
                            title: '\u4E0B\u79FB',
                            onClick: this.handleActionClick.bind(this, 'down', row) },
                        _react2.default.createElement(_FontIcon2.default, { className: 'iconfont icon-arrowdown', hoverColor: hoverColor })
                    );
                case 'delete':
                    return _react2.default.createElement(
                        _IconButton2.default,
                        {
                            style: style,
                            iconStyle: iconStyle,
                            title: '\u5220\u9664',
                            onClick: this.handleActionClick.bind(this, 'delete', row) },
                        _react2.default.createElement(_FontIcon2.default, { className: 'iconfont icon-delete', hoverColor: hoverColor })
                    );
            }
        }
    }, {
        key: 'getTableDataRow',
        value: function getTableDataRow(row) {
            var _this4 = this;

            var data = this.state.value[row];
            if (!this.state.controls[row]) {
                this.state.controls[row] = {};
            }
            var dataRow = {};
            dataRow.id = data.id || data._key;
            if (this.props.hasSeriesNumber) {
                dataRow['series_number'] = _react2.default.createElement(
                    'i',
                    null,
                    row + 1
                );
            } else {
                dataRow['series_number'] = row + 1;
            }
            this.props.columns.map(function (column, index) {
                var value = _lodash2.default.get(data, column.formKey || column.key);
                if (column.convert) {
                    value = column.convert(data);
                }
                dataRow[column.key] = _react2.default.createElement(_control2.default, (0, _extends3.default)({
                    key: data._key
                }, column, {
                    label: false,
                    immutable: _this4.props.immutable,
                    borderShow: _this4.props.controlBorderShow,
                    value: value,
                    size: _this4.props.controlSize,
                    onFocus: _this4.handleFocus(row, column),
                    onBlur: _this4.handleBlur(row, column),
                    onKeyUp: _this4.handleKeyUp(row, column),
                    onChange: _this4.handleChange(row, column),
                    context: _this4,
                    onComponentDidMount: function onComponentDidMount(context) {
                        _this4.state.controls[row][column.key] = context;
                    },
                    position: {
                        row: row,
                        col: index
                    }
                }));
            });
            if (this.props.hasAction) {
                var actions = this.props.actions;
                dataRow.action = _react2.default.createElement(
                    'div',
                    { className: 'flex center' },
                    actions.map(function (action, index) {
                        return _react2.default.createElement(
                            'span',
                            { key: index },
                            _this4.getAction(action, row)
                        );
                    })
                );
            }
            return dataRow;
        }
    }, {
        key: 'getDataSource',
        value: function getDataSource() {
            var _this5 = this;

            var dataSource = [];
            if (this.props.bodyHeaderData) {
                if (_lodash2.default.isFunction(this.props.bodyHeaderData)) {
                    dataSource.push(this.props.bodyHeaderData(this));
                } else {
                    dataSource.push(this.props.bodyHeaderData);
                }
            }
            this.state.value.map(function (data, row) {
                var dataRow = _this5.getTableDataRow(row);
                dataSource.push(dataRow);
            });
            if (this.props.bodyFooterData) {
                if (_lodash2.default.isFunction(this.props.bodyFooterData)) {
                    dataSource.push(this.props.bodyFooterData(this));
                } else {
                    dataSource.push(this.props.bodyFooterData);
                }
            }
            return dataSource;
        }
    }, {
        key: 'setTableState',
        value: function setTableState(state) {
            (0, _assign2.default)(this.state, state);
            if (this.props.onStateChange) {
                this.props.onStateChange({
                    tableState: this.state.tableState,
                    currentRow: this.state.currentRow,
                    pager: this.state.pager
                }, this, this.props.context);
            }
        }
    }, {
        key: 'setChecked',
        value: function setChecked(checked) {
            this.state.tableState.checked = checked;
            this.setTableState({
                tableState: this.state.tableState
            });
            this.forceUpdate();
        }
    }, {
        key: 'render',
        value: function render() {
            var dataSource = this.getDataSource();
            var pager = false;
            var tableState = this.state.tableState;
            if (this.props.hasPager == true) {
                pager = (0, _extends3.default)({
                    page: 1,
                    limit: 50,
                    rows: dataSource.length,
                    pages: Math.ceil(dataSource.length / 50),
                    onChange: this.handlePageChange,
                    autoUpdateState: false
                }, this.state.pager);
            }
            var footerData = this.props.footerData ? this.props.footerData(this) : null;
            return _react2.default.createElement(
                'div',
                { style: (0, _extends3.default)({ marginBottom: 16 }, this.props.style, this.props.rootStyle) },
                this.props.label === false ? null : _react2.default.createElement(
                    'div',
                    { style: this.props.labelStyle },
                    _react2.default.createElement(
                        'span',
                        { style: style.label },
                        this.props.label
                    )
                ),
                _react2.default.createElement(_table2.default, (0, _extends3.default)({ ref: 'table',
                    className: this.props.tableClassName,
                    bordered: this.props.bordered,
                    rowSelected: this.props.rowSelected,
                    onRowSelect: this.handleRowSelect,
                    columns: this.getColumns(this.props.columns),
                    dataSource: dataSource,
                    containerHeight: this.props.containerHeight,
                    containerWidth: this.props.containerWidth,
                    tableWidth: this.props.tableWidth,
                    headerRowHeight: this.props.headerRowHeight,
                    bodyRowHeight: this.props.bodyRowHeight,
                    footerData: footerData,
                    headerTextAlign: 'center',
                    showCheckboxes: this.props.showCheckboxes,
                    rowCheckboxEnabled: this.props.rowCheckboxEnabled,

                    emptyDataTip: '\u8FD8\u6CA1\u6DFB\u52A0\u6570\u636E',
                    pager: pager,
                    mode: pager ? 'local' : undefined
                }, tableState, {
                    onStateChange: this.handleStateChange
                })),
                this.props.hasFooterAddAction ? _react2.default.createElement(
                    'div',
                    {
                        className: 'border-primary text-center cursor-pointer',
                        style: style.footerAction,
                        onClick: this.addRow.bind(this, this.state.value.length, this.getDefaultRowData(), true) },
                    _react2.default.createElement(_FontIcon2.default, { className: 'iconfont icon-plus' })
                ) : null
            );
        }
    }]);
    return FormTable;
}(_react.Component);

FormTable.childContextTypes = {
    FormTable: _propTypes2.default.object
};
FormTable.defaultProps = {
    bordered: true,
    controlBorderShow: false,
    containerWidth: '100%',
    containerHeight: undefined,
    tableWidth: undefined,
    hasSeriesNumber: true,
    hasAction: true,
    hasFooterAddAction: false,
    showCheckboxes: false,
    autoSortField: false,
    autoSortType: 'desc',
    rowCheckboxEnabled: undefined,
    seriesNumberWidth: 60,
    actionWidth: 140,
    defaultRows: 4,
    minRows: 1,
    seriesNumberText: '序号',
    styleProps: {},
    columns: [],
    columnWidths: {},
    immutable: false,
    actions: ['add', 'up', 'down', 'delete'],
    scrollTop: 0,
    scrollLeft: 0,
    value: undefined,
    defaultValue: undefined,
    defaultRowData: {},
    tableClassName: "text-small control",
    style: {},
    hasPager: false,
    bodyHeaderData: undefined,
    bodyFooterData: undefined,
    onActionClick: undefined,
    headerRowHeight: undefined,
    bodyRowHeight: undefined,
    controlSize: 'default',
    onStateChange: undefined,
    editableStyle: { background: '#fffdf5' } };
exports.default = FormTable;