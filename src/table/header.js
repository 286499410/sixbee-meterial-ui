import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox';
import Icon from '../icon';
import _ from 'lodash';
import Filter from './filter';
import Sort from './sort';
import utils from '../utils';


export default class TableHeader extends Component {

    static defaultProps = {
        width: undefined,
        showColumns: undefined,
        showCheckboxes: true,
        showSeries: true,
    };

    static contextTypes = {
        state: PropTypes.object,
        props: PropTypes.object,
        setTableState: PropTypes.func,
        getTableWidth: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    /**
     * 设置列增量
     * @param col
     * @param inc
     */
    setInc(col, inc) {
        let columnWidths = this.context.state.columnWidths;
        columnWidths[col.key] += inc;
        this.setParentInc(col, inc);
        this.setChildrenInc(col, inc);
    }

    /**
     * 设置上级增量
     * @param col
     * @param inc
     */
    setParentInc(col, inc) {
        if (col.parent) {
            console.log("parent", col.parent.key, this.context.state.columnWidths[col.parent.key]);
            this.context.state.columnWidths[col.parent.key] += inc;
            this.setParentInc(col.parent, inc);
        }
    }

    /**
     * 设置下级增量
     * @param col
     * @param inc
     */
    setChildrenInc(col, inc) {
        if (col.children) {
            col.children.map((child) => {
                let childInc = inc / col.colSpan * child.colSpan;
                this.context.state.columnWidths[child.key] += childInc;
                this.setChildrenInc(child, childInc);
            });
        }
    }

    /**
     * 调整列宽度
     * @param col
     * @returns {Function}
     */
    handleResize = (col) => (event) => {
        let props = this.context.props;
        let state = this.context.state;
        let root = col;
        let key = root.key;
        let startPosition = utils.getMousePosition(event);
        let tableWidth = this.props.width || this.context.getTableWidth();
        let columnWidth = state.columnWidths[key];
        let onResize = props.onResize;

        window.document.onmousemove = (event) => {
            let position = utils.getMousePosition(event);
            let offsetX = parseInt(position.x - startPosition.x);
            if (columnWidth + offsetX > 40) {
                this.setInc(root, columnWidth + offsetX - state.columnWidths[key]);
                this.context.setTableState({
                    columnWidths: state.columnWidths,
                    tableWidth: tableWidth + offsetX,
                    extraColumnWidth: state.extraColumnWidth - offsetX
                });
                if (onResize) {
                    onResize();
                }
            }
        };

        window.document.onmouseup = (event) => {
            window.document.onmousemove = null;
            window.document.onmouseup = null;
        };

    };

    /**
     * 全选
     * @param event
     */
    handleCheck = (event, isInputChecked) => {
        let state = this.context.state;
        let props = this.context.props;
        let checked = state.checked;
        let primaryKey = props.primaryKey;
        let dataRows = state.dataRows;
        let onCheck = props.onCheck;
        let setCheck = (data) => {
            data.map((row) => {
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
        this.context.setTableState({checked: checked});
    };

    /**
     * 是否勾选
     * @returns {boolean}
     */
    isChecked() {
        let props = this.context.props;
        let state = this.context.state;
        let checked = state.checked;
        let dataRows = state.dataRows;
        let unCheckNum = 0;
        dataRows.map((data) => {
            if (props.showCheckbox && !props.rowCheckboxEnabled(data)) {
                unCheckNum++;
            }
        });
        return Object.keys(checked).length == dataRows.length - unCheckNum && dataRows.length - unCheckNum != 0;
    }

    /**
     * 过滤处理
     * @param value
     * @param field
     */
    handleFilter = (col) => (value, field) => {
        let props = this.context.props;
        let filterData = this.context.state.filterData;
        let key = col.filterKey || col.formKey || col.key;
        if(value === undefined || value === '') {
            let keys = key.split('.');
            if(_.get(filterData, key) !== undefined) {
                let len = keys.length;
                if(len == 1) {
                    delete filterData[keys[0]];
                } else if(len == 2) {
                    delete filterData[keys[0]][keys[1]];
                } else if(len == 3) {
                    delete filterData[keys[0]][keys[1]][keys[2]];
                } else if(len == 4) {
                    delete filterData[keys[0]][keys[1]][keys[2]][keys[3]];
                } else if(len == 5) {
                    delete filterData[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]];
                }
            }
        } else {
            _.set(filterData, key, value);
        }
        if (props.onFilter) {
            props.onFilter(filterData);
        }
        this.context.setTableState({filterData: filterData});
    };

    /**
     * 排序处理
     * @param col
     * @returns {Function}
     */
    handleSort = (col) => (direction) => {
        let props = this.context.props;
        let sortData = {};
        if (direction !== undefined) {
            sortData = {
                field: col,
                direction: direction
            };
        }
        if (props.onSort) {
            props.onSort(sortData);
        }
        this.context.setTableState({sortData: sortData});
    };

    render() {
        let props = this.context.props;
        let state = this.context.state;
        let filterData = state.filterData;
        let className = 'table';
        if (props.bordered) className += ' bordered';
        if (props.condensed) className += ' condensed';
        const tableWidth = this.props.width || this.context.getTableWidth();
        return <div ref="container"
                    className="table-header"
                    style={{
                        overflow: 'hidden',
                        width: "calc(100% + 2px)",
                        ...props.headerStyle
                    }}>
            <table className={className} style={{width: tableWidth, tableLayout: 'fixed'}}>
                <thead>
                {
                    state.headerColumns.map((rows, i) => {
                        let columns = [];
                        if(_.isArray(this.props.showColumns)) {
                            rows.map(col => {
                                if(this.props.showColumns.indexOf(col.key) >= 0) {
                                    columns.push(col);
                                }
                            })
                        } else {
                            columns = rows;
                        }
                        return (
                            <tr key={i}>
                                {
                                    props.showCheckboxes && this.props.showCheckboxes && i == 0 ?
                                        <th className="th-checkbox" rowSpan={state.headerColumns.length}
                                            data-key="checkbox"
                                            style={{
                                                width: props.checkboxColumnWidth,
                                                height: state.headerHeight || props.headerRowHeight * state.headerColumns.length + state.headerColumns.length || undefined
                                            }}>
                                            <Checkbox checked={this.isChecked()}
                                                      onCheck={this.handleCheck} {...props.checkboxStyle}/>
                                        </th> : null
                                }
                                {
                                    props.showSeries && this.props.showSeries && i == 0 ?
                                        <th rowSpan={state.headerColumns.length}
                                            style={{
                                                width: props.seriesColumnWidth,
                                                height: state.headerHeight - 1 || undefined,
                                                textAlign: props.headerTextAlign
                                            }}>序号
                                        </th> : null
                                }
                                {
                                    columns.map((col, j) => {
                                        let style = {};
                                        let rowSpan = (col.children && col.children.length > 0) ? 1 : state.headerColumns.length - i;
                                        col.key = col.key || `${i}-${j}`;
                                        if (state.columnWidths[col.key] || col.width) {
                                            style.width = state.columnWidths[col.key] || col.width;
                                        }
                                        style.textAlign = col.headerTextAlign || props.headerTextAlign;
                                        if (props.headerRowHeight) {
                                            style.height = props.headerRowHeight * rowSpan + rowSpan || undefined;
                                        }
                                        return (
                                            <th key={j} data-key={col.key}
                                                rowSpan={rowSpan}
                                                colSpan={col.colSpan} style={style}>
                                                <div className="flex middle center">
                                                    {
                                                        col.required ? <span className="text-danger">*</span> : null
                                                    }
                                                    <div>{col.label}</div>
                                                    {col.filter ?
                                                        <Filter field={col.filter === true ? col : {...col, ...col.filter}}
                                                                onFilter={this.handleFilter(col)}
                                                                value={_.get(filterData, col.filterKey || col.formKey || col.key)}/> : null}
                                                    {col.sortable ?
                                                        <Sort field={col} onSort={this.handleSort(col)}/> : null}
                                                    {
                                                        col.icon ? <Icon {...col.icon}/> : null
                                                    }
                                                </div>
                                                {
                                                    props.resize && i == 0?
                                                        <div className="resize"
                                                             onMouseDown={this.handleResize(col)}></div> : null
                                                }
                                            </th>
                                        )
                                    })
                                }
                                {
                                    state.extraColumnWidth > 0 && i == 0 ? <th
                                        className="extra"
                                        rowSpan={state.headerColumns.length}
                                        colSpan={1}
                                        data-key="_extra"
                                        style={{width: state.extraColumnWidth}}></th> : null
                                }
                            </tr>
                        )
                    })}
                </thead>
            </table>
        </div>
    }
}