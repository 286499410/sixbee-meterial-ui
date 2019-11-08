'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _sort = require('./sort');

var _sort2 = _interopRequireDefault(_sort);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function (_Component) {
    (0, _inherits3.default)(TableHeader, _Component);

    function TableHeader(props) {
        (0, _classCallCheck3.default)(this, TableHeader);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TableHeader.__proto__ || (0, _getPrototypeOf2.default)(TableHeader)).call(this, props));

        _initialiseProps.call(_this);

        return _this;
    }

    (0, _createClass3.default)(TableHeader, [{
        key: 'setInc',
        value: function setInc(col, inc) {
            var columnWidths = this.context.state.columnWidths;
            columnWidths[col.key] += inc;
            this.setParentInc(col, inc);
            this.setChildrenInc(col, inc);
        }
    }, {
        key: 'setParentInc',
        value: function setParentInc(col, inc) {
            if (col.parent) {
                this.context.state.columnWidths[col.parent.key] += inc;
                this.setParentInc(col.parent, inc);
            }
        }
    }, {
        key: 'setChildrenInc',
        value: function setChildrenInc(col, inc) {
            var _this2 = this;

            if (col.children) {
                col.children.map(function (child) {
                    var childInc = inc / col.colSpan * child.colSpan;
                    _this2.context.state.columnWidths[child.key] += childInc;
                    _this2.setChildrenInc(child, childInc);
                });
            }
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            var props = this.context.props;
            var state = this.context.state;
            var checked = state.checked;
            var dataRows = state.dataRows;
            var unCheckNum = 0;
            dataRows.map(function (data) {
                if (props.showCheckbox && !props.rowCheckboxEnabled(data)) {
                    unCheckNum++;
                }
            });
            return (0, _keys2.default)(checked).length == dataRows.length - unCheckNum && dataRows.length - unCheckNum != 0;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var props = this.context.props;
            var state = this.context.state;
            var filterData = state.filterData;
            var className = 'table';
            if (props.bordered) className += ' bordered';
            if (props.condensed) className += ' condensed';
            return _react2.default.createElement(
                'div',
                { ref: 'container',
                    className: 'table-header',
                    style: (0, _extends3.default)({
                        overflow: 'hidden',
                        width: this.props.width || props.containerWidth
                    }, props.headerStyle) },
                _react2.default.createElement(
                    'table',
                    { className: className, style: { width: this.props.width || state.tableWidth, tableLayout: 'fixed' } },
                    _react2.default.createElement(
                        'thead',
                        null,
                        state.headerColumns.map(function (rows, i) {
                            var columns = [];
                            if (_lodash2.default.isArray(_this3.props.showColumns)) {
                                rows.map(function (col) {
                                    if (_this3.props.showColumns.indexOf(col.key) >= 0) {
                                        columns.push(col);
                                    }
                                });
                            } else {
                                columns = rows;
                            }
                            return _react2.default.createElement(
                                'tr',
                                { key: i },
                                props.showCheckboxes && _this3.props.showCheckboxes && i == 0 ? _react2.default.createElement(
                                    'th',
                                    { className: 'th-checkbox', rowSpan: state.headerColumns.length,
                                        'data-key': 'checkbox',
                                        style: {
                                            width: props.checkboxColumnWidth,
                                            height: props.headerRowHeight + 1
                                        } },
                                    _react2.default.createElement(_Checkbox2.default, (0, _extends3.default)({ checked: _this3.isChecked(),
                                        onCheck: _this3.handleCheck }, props.checkboxStyle))
                                ) : null,
                                props.showSeries && _this3.props.showSeries && i == 0 ? _react2.default.createElement(
                                    'th',
                                    { rowSpan: state.headerColumns.length,
                                        style: {
                                            width: props.seriesColumnWidth,
                                            height: props.headerRowHeight,
                                            textAlign: props.headerTextAlign
                                        } },
                                    '\u5E8F\u53F7'
                                ) : null,
                                columns.map(function (col, j) {
                                    var style = {};
                                    col.key = col.key || i + '-' + j;
                                    if (state.columnWidths[col.key] || col.width) {
                                        style.width = state.columnWidths[col.key] || col.width;
                                    }
                                    style.textAlign = col.headerTextAlign || props.headerTextAlign;
                                    if (props.headerRowHeight) {
                                        style.height = props.headerRowHeight;
                                    }
                                    return _react2.default.createElement(
                                        'th',
                                        { key: j, 'data-key': col.key,
                                            rowSpan: col.children && col.children.length > 0 ? 1 : state.headerColumns.length - i,
                                            colSpan: col.colSpan, style: style },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'flex middle center' },
                                            _react2.default.createElement(
                                                'div',
                                                null,
                                                col.label
                                            ),
                                            col.filter ? _react2.default.createElement(_filter2.default, { field: col.filter === true ? col : (0, _extends3.default)({}, col, col.filter),
                                                onFilter: _this3.handleFilter(col),
                                                value: _lodash2.default.get(filterData, col.formKey || col.key) }) : null,
                                            col.sortable ? _react2.default.createElement(_sort2.default, { field: col, onSort: _this3.handleSort(col) }) : null
                                        ),
                                        props.resize ? _react2.default.createElement('div', { className: 'resize',
                                            onMouseDown: _this3.handleResize(col) }) : null
                                    );
                                }),
                                state.extraColumnWidth > 0 && i == 0 ? _react2.default.createElement('th', {
                                    className: 'extra',
                                    rowSpan: state.headerColumns.length,
                                    colSpan: 1,
                                    'data-key': '_extra',
                                    style: { width: state.extraColumnWidth } }) : null
                            );
                        })
                    )
                )
            );
        }
    }]);
    return TableHeader;
}(_react.Component);

TableHeader.defaultProps = {
    width: undefined,
    showColumns: undefined,
    showCheckboxes: true,
    showSeries: true
};
TableHeader.contextTypes = {
    state: _propTypes2.default.object,
    props: _propTypes2.default.object,
    setTableState: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.handleResize = function (col) {
        return function (event) {
            var props = _this4.context.props;
            var state = _this4.context.state;
            var root = col;
            var key = root.key;
            var startPosition = _utils2.default.getMousePosition(event);
            var tableWidth = state.tableWidth || state.containerWidth;
            var columnWidth = state.columnWidths[key];
            var onResize = props.onResize;

            window.document.onmousemove = function (event) {
                var position = _utils2.default.getMousePosition(event);
                var offsetX = parseInt(position.x - startPosition.x);
                if (columnWidth + offsetX > 40) {
                    _this4.setInc(root, columnWidth + offsetX - state.columnWidths[key]);
                    _this4.context.setTableState({
                        columnWidths: state.columnWidths,
                        tableWidth: tableWidth + offsetX,
                        extraColumnWidth: state.extraColumnWidth - offsetX
                    });
                    if (onResize) {
                        onResize();
                    }
                }
            };

            window.document.onmouseup = function (event) {
                window.document.onmousemove = null;
                window.document.onmouseup = null;
            };
        };
    };

    this.handleCheck = function (event, isInputChecked) {
        var state = _this4.context.state;
        var props = _this4.context.props;
        var checked = state.checked;
        var primaryKey = props.primaryKey;
        var dataRows = state.dataRows;
        var onCheck = props.onCheck;
        var setCheck = function setCheck(data) {
            data.map(function (row) {
                if (isInputChecked && (!props.rowCheckboxEnabled || props.rowCheckboxEnabled(row))) {
                    checked[row[primaryKey]] = true;
                } else {
                    delete checked[row[primaryKey]];
                }
            });
        };
        setCheck(dataRows);
        if (onCheck) {
            onCheck(checked);
        }
        _this4.context.setTableState({ checked: checked });
    };

    this.handleFilter = function (col) {
        return function (value, field) {
            var props = _this4.context.props;
            var filterData = _this4.context.state.filterData;
            var key = col.formKey || col.key;
            if (value === undefined) {
                var keys = key.split('.');
                var len = keys.length;
                if (len == 1) {
                    delete filterData[keys[0]];
                } else if (len == 2) {
                    delete filterData[keys[0]][keys[1]];
                } else if (len == 3) {
                    delete filterData[keys[0]][keys[1]][keys[2]];
                } else if (len == 4) {
                    delete filterData[keys[0]][keys[1]][keys[2]][keys[3]];
                } else if (len == 5) {
                    delete filterData[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]];
                }
            } else {
                _lodash2.default.set(filterData, key, value);
            }
            if (props.onFilter) {
                props.onFilter(filterData);
            }
            _this4.context.setTableState({ filterData: filterData });
        };
    };

    this.handleSort = function (col) {
        return function (direction) {
            var props = _this4.context.props;
            var sortData = {};
            if (direction !== undefined) {
                sortData = {
                    field: col,
                    direction: direction
                };
            }
            if (props.onSort) {
                props.onSort(sortData);
            }
            _this4.context.setTableState({ sortData: sortData });
        };
    };
};

exports.default = TableHeader;