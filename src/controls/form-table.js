/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '../table';
import Control from '../control';
import utils from '../utils';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class FormTable extends Component {

    static childContextTypes = {
        FormTable: PropTypes.object,
    };

    getChildContext() {
        return {
            FormTable: this
        }
    }

    static defaultProps = {
        bordered: true,                         //是否有表格边框
        controlBorderShow: false,               //控件是否有边框显示
        containerWidth: '100%',                 //容器宽度
        containerHeight: undefined,                //容器高度
        tableWidth: undefined,                  //表实际宽度,不传时默认等于容器宽度
        hasSeriesNumber: true,                  //是否有自动序号
        hasAction: true,                        //是否有操作事件
        showCheckboxes: false,                  //是否显示复选框
        rowCheckboxEnabled: undefined,          //逐行检查是否启用/禁用复选框
        seriesNumberWidth: 60,                  //序号列宽度
        actionWidth: 140,                       //操作事件列宽度
        defaultRows: 4,                         //默认显示多少行
        minRows: 1,                             //最小行数
        seriesNumberText: '序号',                //序号列标题
        styleProps: {},                         //
        columns: [],                            //列定义
        columnWidths: {},                       //列宽度定义
        immutable: false,                       //是否不可编辑
        actions: ['add', 'up', 'down', 'delete'],//操作事件
        scrollTop: 0,                           //滚动条初始位置
        scrollLeft: 0,                          //滚动条初始位置
        value: undefined,                       //值
        defaultValue: undefined,                //默认值
        defaultRowData: {},                     //默认行数据
        tableClassName: "text-small control",   //表样式类
        style: {},                              //样式
        hasPager: false,                        //是否有分页
        bodyHeaderData: undefined,              //
        bodyFooterData: undefined,              //
        onActionClick: undefined,               //操作点击后触发事件
        headerRowHeight: undefined,             //表头行高
        bodyRowHeight: undefined,               //表体行高
        controlSize: 'default',                 //控件大小

        onStateChange: undefined,               //状态改变后触发：table，pager，currentRow
    };

    state = {
        value: [],
        currentRow: undefined,
        pager: {
            page: 1,
            limit: 50
        },
        tableState: {},
        controls: {}
    };

    constructor(props) {
        super(props);
        this.initData(props);
        if (this.state.value.length == 0 && this.props.defaultRows > 0) {
            for (let i = 0; i < this.props.defaultRows; i++) {
                this.addDataRow(undefined, props.defaultData, false);
            }
        }
        this.checkMinRow(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
        this.checkMinRow(nextProps);
    }

    initData(props) {
        if (props.value !== undefined) {
            this.state.value = props.value;
        }
    }

    /**
     * 检查行是否满足最小行数配置，不满足自动补上
     * @param props
     */
    checkMinRow(props = this.props) {
        if (this.state.value.length < props.minRows) {
            for (let i = this.state.value.length; i < props.minRows; i++) {
                this.addDataRow(i, this.props.defaultData, false);
            }
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue(value) {
        this.setState({value: value});
        if (this.props.onChange) {
            this.props.onChange(value, this);
        }
    }

    /**
     * 获取值
     * @returns {*|Array}
     */
    getValue() {
        return (this.state.value === undefined ? this.props.defaultValue : this.state.value) || [];
    }

    /**
     * 新增行(前面插入）
     * @param row
     * @param defaultData
     */
    addRow(row, defaultData = this.props.defaultRowData) {
        if (row === undefined) row = this.getCurrentRow();
        this.addDataRow(row, defaultData);
    }

    /**
     * 删除行
     * @param row
     */
    deleteRow(row) {
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

    /**
     * 复制行
     * @param row
     */
    copyRow(row) {
        if (row === undefined) row = this.getCurrentRow();
        let data = this.getRowData(row);
        this.state.value.splice(row + 1, 0, {...data, _key: utils.uuid()});
        this.setValue(this.state.value);
    }

    /**
     * 上移
     * @param row
     */
    upRow(row) {
        if (row === undefined) row = this.getCurrentRow();
        if (row > 0) {
            let data = this.state.value[row];
            let prev = this.state.value[row - 1];
            this.state.value.splice(row - 1, 2, data);
            this.state.value.splice(row, 0, prev);
            this.setValue(this.state.value);
            this.setCurrentRow(row - 1);
        }
    }

    /**
     * 下移
     * @param row
     */
    downRow(row) {
        if (row === undefined) row = this.getCurrentRow();
        if (row < this.state.value.length - 1) {
            let data = this.state.value[row];
            let next = this.state.value[row + 1];
            this.state.value.splice(row, 2, next);
            this.state.value.splice(row + 1, 0, data);
            this.setValue(this.state.value);
            this.setCurrentRow(row + 1);
        }
    }

    /**
     * 设置当前行
     * @param row
     */
    setCurrentRow(row) {
        this.setState({currentRow: row});
        if (this.props.onRowSelect) {
            let data = this.getRowData(row);
            this.props.onRowSelect(row, data);
        }
        this.setTableState({
            currentRow: row
        });
    }

    /**
     * 当前操作行
     * @returns {number}
     */
    getCurrentRow() {
        //默认选择最后一行
        return this.state.currentRow === undefined ? this.state.value.length - 1 : this.state.currentRow;
    };

    /**
     * 控件获取焦点事件
     * @param row 第几行
     * @param column
     * @returns {Function}
     */
    handleFocus = (row, column) => (event, control) => {
        if (this.state.currentRow !== row) {
            this.setCurrentRow(row);
        }
        if (this.props.onFocus) {
            this.props.onFocus(row, column, control, this);
        }
    };

    /**
     * 控件失去焦点事件
     * @param row 第几行
     * @param column
     * @returns {Function}
     */
    handleBlur = (row, column) => (event, control) => {
        if (this.props.onBlur) {
            this.props.onBlur(row, column, control, this);
        }
    };

    /**
     * 控件键盘输入后事件
     * @param row 第几行
     * @param column
     * @returns {Function}
     */
    handleKeyUp = (row, column) => (event, control) => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(row, column, control, this);
        }
    };

    /**
     * 数据变化事件
     * @param row 第几行
     * @param column
     * @returns {Function}
     */
    handleChange = (row, column) => (value, control) => {
        _.set(this.state.value[row], column.key, value);
        if (column.onChange) {
            column.onChange(value, control, this, row);
        }
        if(this.props.onChange) {
            this.props.onChange(this.state.value, this);
        }
    };

    /**
     * 新增一行数据处理
     * @param row
     * @param defaultData
     */
    addDataRow(row, defaultData = this.props.defaultRowData, update = true) {
        let data = {}, value = this.state.value;
        this.props.columns.map((column) => {
            data[column.key] = "";
        });
        data = {...data, ...defaultData, _key: utils.uuid()};
        if (row == null) {
            value.push(data);
        } else {
            value.splice(row, 0, data);
        }
        if (update) {
            this.setValue(value);
        }
    }

    /**
     * 获取指定行数据
     * @param row
     * @returns {*|{}}
     */
    getRowData(row) {
        return this.state.value[row] || {};
    }

    /**
     * 修改单行数据
     * @param row
     * @param data
     */
    setRowData(row, data) {
        let value = this.state.value;
        Object.assign(value[row], data);
        this.setValue(value);
    }

    /**
     * 获取最后一行数据
     * @returns {false}
     */
    getLastRowData() {
        return this.state.value.length == 0 ? undefined : this.state.value[this.state.value.length - 1];
    }

    /**
     * 列定义
     * @param fields
     * @returns {Array}
     */
    getColumns(columns) {
        let tableColumns = [];
        if (this.props.hasSeriesNumber) {
            tableColumns.push({
                dataKey: 'series_number',
                type: 'text',
                label: this.props.seriesNumberText,
                width: this.props.seriesNumberWidth,
                textAlign: 'center'
            });
        }
        let columnWidths = this.getColumnsWidth();
        columns.map((column) => {
            tableColumns.push({...column, render: false, width: columnWidths[column.key]});
        });
        if (this.props.hasAction) {
            tableColumns.push({
                key: 'action',
                dataKey: 'action',
                label: '操作',
                icon: 'icon-add',
                iconEvent: () => {
                    this.addRow(null);
                },
                width: this.props.actionWidth
            });
        }
        return tableColumns;
    }

    /**
     * 字段宽度定义
     * @returns {*}
     */
    getColumnsWidth = () => {
        if (_.isFunction(this.props.columnWidths)) {
            return this.props.columnWidths(this);
        } else {
            return this.props.columnWidths;
        }
    };

    /**
     * 操作点击事件
     * @param actionKey
     * @param row
     */
    handleActionClick = (actionKey, row) => {
        if (this.props.onActionClick) {
            if (this.props.onActionClick(actionKey, row, this) === false) {
                //return false时，阻止后续操作
                return;
            }
        }
        switch (actionKey) {
            case 'add':
                this.addRow(row);
                break;
            case 'up':
                this.upRow(row);
                break;
            case 'down':
                this.downRow(row);
                break;
            case 'delete':
                this.deleteRow(row);
                break;
        }
    };

    getAction(key, row) {
        let style = {
            width: 28,
            height: 28,
            padding: 4,
        };
        let iconStyle = {
            width: 20,
            height: 20,
            fontSize: 16,
            padding: 2
        };
        let hoverColor = "#1890ff";
        switch (key) {
            case 'add':
                return <IconButton
                    style={style}
                    iconStyle={iconStyle}
                    title="插入"
                    onClick={this.handleActionClick.bind(this, 'add', row)}>
                    <FontIcon className="iconfont icon-plus" hoverColor={hoverColor}/>
                </IconButton>;
            case 'up':
                return <IconButton
                    style={style}
                    iconStyle={iconStyle}
                    title="上移"
                    onClick={this.handleActionClick.bind(this, 'up', row)}>
                    <FontIcon className="iconfont icon-arrowup" hoverColor={hoverColor}/>
                </IconButton>;
            case 'down':
                return <IconButton
                    style={style}
                    iconStyle={iconStyle}
                    title="下移"
                    onClick={this.handleActionClick.bind(this, 'down', row)}>
                    <FontIcon className="iconfont icon-arrowdown" hoverColor={hoverColor}/>
                </IconButton>;
            case 'delete':
                return <IconButton
                    style={style}
                    iconStyle={iconStyle}
                    title="删除"
                    onClick={this.handleActionClick.bind(this, 'delete', row)}>
                    <FontIcon className="iconfont icon-delete" hoverColor={hoverColor}/>
                </IconButton>;
        }
    }

    getTableDataRow(row) {
        let data = this.state.value[row];
        if (!this.state.controls[row]) {
            this.state.controls[row] = {};
        }
        let dataRow = {};
        dataRow.id = data.id || data._key;
        if (this.props.hasSeriesNumber) {
            dataRow['series_number'] = <i>{row + 1}</i>;
        } else {
            dataRow['series_number'] = row + 1;
        }
        this.props.columns.map((column, index) => {
            let value = _.get(data, column.key);
            if (column.convert) {
                value = column.convert(data);
            }
            dataRow[column.key] = <Control
                key={data._key}
                {...column}
                label={false}
                immutable={this.props.immutable}
                borderShow={this.props.controlBorderShow}
                value={value}
                size={this.props.controlSize}
                onFocus={this.handleFocus(row, column)}
                onBlur={this.handleBlur(row, column)}
                onKeyUp={this.handleKeyUp(row, column)}
                onChange={this.handleChange(row, column)}
            />
        });
        if (this.props.hasAction) {
            let actions = this.props.actions;
            dataRow.action = <div className="flex center">
                {
                    actions.map((action, index) => {
                        return <span key={index}>{this.getAction(action, row)}</span>
                    })
                }
            </div>;
        }
        return dataRow;
    }

    /**
     * 获取表数据源
     * @returns {Array}
     */
    getDataSource() {
        let dataSource = [];
        if (this.props.bodyHeaderData) {
            if (_.isFunction(this.props.bodyHeaderData)) {
                dataSource.push(this.props.bodyHeaderData(this));
            } else {
                dataSource.push(this.props.bodyHeaderData);
            }
        }
        this.state.value.map((data, row) => {
            let dataRow = this.getTableDataRow(row);
            dataSource.push(dataRow);
        });
        if (this.props.bodyFooterData) {
            if (_.isFunction(this.props.bodyFooterData)) {
                dataSource.push(this.props.bodyFooterData(this));
            } else {
                dataSource.push(this.props.bodyFooterData);
            }
        }
        return dataSource;
    }

    /**
     * 行选中
     * @param data
     */
    handleRowSelect = (data) => {
        if (data.series_number) {
            let row = (_.isNumber(data.series_number) ? data.series_number : data.series_number.props.children) - 1;
            this.setCurrentRow(row);
        }
    };

    /**
     * table状态更改
     * @param state
     */
    handleStateChange = (state) => {
        this.setTableState({
            tableState: state
        })
    };

    /**
     * 页码改变触发事件
     * @param data
     */
    handlePageChange = (data) => {
        this.setTableState({
            pager: data
        })
    };

    /**
     * table状态更改
     * @param state
     */
    setTableState(state) {
        Object.assign(this.state, state);
        if (this.props.onStateChange) {
            this.props.onStateChange({
                tableState: this.state.tableState,
                currentRow: this.state.currentRow,
                pager: this.state.pager
            });
        }
    }

    render() {
        this.state.controls = [];
        let dataSource = this.getDataSource();
        let pager = false;
        let tableState = this.state.tableState;
        if (this.props.hasPager == true) {
            pager = {
                page: 1,
                limit: 50,
                rows: dataSource.length,
                pages: Math.ceil(dataSource.length / 50),
                onChange: this.handlePageChange,
                autoUpdateState: false,
                ...this.state.pager
            }
        }
        return <div style={{marginTop: 16, ...this.props.style}}>
            <Table ref="table"
                   className={this.props.tableClassName}
                   bordered={this.props.bordered}
                   rowSelected={this.props.rowSelected}
                   onRowSelect={this.handleRowSelect}
                   columns={this.getColumns(this.props.columns)}
                   dataSource={dataSource}
                   containerHeight={this.props.containerHeight}
                   containerWidth={this.props.containerWidth}
                   tableWidth={this.props.tableWidth}
                   headerRowHeight={this.props.headerRowHeight}
                   bodyRowHeight={this.props.bodyRowHeight}
                   footerData={this.props.footerData ? this.props.footerData(this) : undefined}
                   headerTextAlign="center"
                   showCheckboxes={this.props.showCheckboxes}
                   rowCheckboxEnabled={this.props.rowCheckboxEnabled}
                   emptyDataTip="还没添加数据"
                   pager={pager}
                   mode={pager ? 'local' : undefined}
                   {...tableState}
                   onStateChange={this.handleStateChange}
            />
        </div>
    }

}
