/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TableHeader from './header';
import TableBody from './body';
import Pager from './pager';
import $ from 'jquery';
import utils from '../utils';
import Icon from "../icon";

let debug = false;

export default class Table extends Component {

    static childContextTypes = {
        Table: PropTypes.object,
        state: PropTypes.object,
        props: PropTypes.object,
        setTableState: PropTypes.func,
        handleStateChange: PropTypes.func,
        getDataRows: PropTypes.func,
        cellRender: PropTypes.func
    };

    static defaultProps = {
        headerTextAlign: 'center',              //表头对齐方式
        emptyDataTip: '没有找到相关数据',         //空数据时提示的文本内容
        emptyDataImage: '/image/nodata.png',    //空数据展示的图片
        height: 'auto',
        rowSelected: false,                     //是否支持行选择的
        onRowSelect: undefined,                 //选择行时触发事件
        primaryKey: 'id',                       //数据
        parentKey: 'parent_id',
        condensed: false,                       //是否紧凑的
        collapsible: false,                     //是否可折叠的
        hideScrollBar: false,                   //是否自动隐藏滚动条
        bordered: true,                         //是否显示边框
        striped: true,                          //是否有条纹
        containerBordered: true,                //最外部容器是否显示边框
        containerWidth: '100%',                 //容器宽度
        containerHeight: undefined,             //容器高度
        tableWidth: undefined,                  //表实际宽度,不传时默认等于容器宽度
        columnWidths: {},                       //列宽度
        checked: {},                            //选中项
        filterData: {},                         //过滤条件
        scrollTop: 0,                           //滚动条初始位置
        scrollLeft: 0,                          //滚动条初始位置
        headerRowHeight: undefined,             //表头行高
        bodyRowHeight: 32,                      //表内容行高
        dataSource: [],                         //数据源
        onFilter: undefined,                    //过滤自定义事件
        pager: undefined,                       //分页
        onCheck: undefined,                     //勾选后触发事件
        showCheckboxes: true,                   //是否显示复选框
        rowCheckboxEnabled: undefined,          //逐行检查是否启用/禁用复选框
        bodyCellMultiLine: false,               //表内容单元格是否允许多行显示
        checkboxColumnWidth: 50,                //复选框列的宽度
        resize: false,                          //列宽度是否可拖动更改
        cellRender: undefined,                  //单元格渲染处理函数
        loading: false,                         //是否显示loading
        footerFixed: false,                     //footer是否固定底部
        checkboxStyle: {
            style: {
                marginLeft: 15,
                marginRight: 15
            },
            iconStyle: {
                left: 0,
                width: 20,
                height: 20,
            }
        },
    };

    state = {
        containerWidth: undefined,              //表容器实际宽度
        tableWidth: undefined,                  //表实际宽度
        columnWidths: {},                       //列宽度
        dataColumns: [],                        //要显示的数据列
        dataSource: [],                         //数据源
        dataRows: [],                           //过滤后的数据
        selectedRow: undefined,                 //当前选中行，用于单选
        mode: 'fetch', //local, fetch           //取数模式，fetch通过接口再次获取，local从this.props.dataSource取数据
        headerColumns: [],                      //显示的表头列
        checked: {},                            //当前勾选中的行
        collapsed: {},                          //折叠中的行
        collapsedHidden: {},                    //折叠后被不显示的行
        iconEvents: {},                         //图标事件
        iconEventsBehavior: 'columnHover',      //图标事件出现的方式：columnHover移至当前列后显示，rowHover移至当前行后显示
        filterConfig: {},                       //过滤条件配置
        filterData: {},                         //过滤条件数据
        extraColumnWidth: 0,                    //扩展列
        scrollTop: 0,                           //滚动条初始位置
        scrollLeft: 0,                          //滚动条初始位置
        headerHeight: undefined,                //表头高度
        footerHeight: undefined,                //表尾高度
        pagerHeight: undefined,                 //页码高度
        bodyHeight: undefined,                  //表内容高度
    };

    getChildContext() {
        return {
            Table: this,
            state: this.state,
            props: this.props,
            setTableState: this.setTableState.bind(this),
            handleStateChange: this.handleStateChange.bind(this),
            getDataRows: this.getDataRows.bind(this),
            cellRender: this.cellRender.bind(this),
        }
    }

    constructor(props) {
        super(props);
        this.initData(props);
        this.detect(_.cloneDeep(props.columns));
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
        //列定义改变，重新探测
        if (!_.isEqual(this.props.columns, nextProps.columns)) {
            this.state.headerColumns = [];
            this.state.dataColumns = [];
            this.detect(_.cloneDeep(nextProps.columns));
        }
    }

    initData(props) {
        let nextProps = {
            containerWidth: props.tableWidth,
            tableWidth: props.tableWidth,
            columnWidths: {...props.columnWidths},
            dataSource: props.dataSource,
            mode: props.mode,
            headerColumns: props.headerColumns,
            checked: {...props.checked},
            collapsed: props.collapsed,
            collapsedHidden: {...props.collapsedHidden},
            iconEvents: props.iconEvents,
            iconEventsBehavior: props.iconEventsBehavior,
            filter: props.filter,
            filterData: {...props.filterData},
        };
        for (let [key, value] of Object.entries(nextProps)) {
            if (value === undefined) {
                delete nextProps[key];
            }
        }
        Object.assign(this.state, nextProps);
        this.state.dataRows = this.state.dataSource;
    }

    cellRender(data, column) {
        if (_.isFunction(this.props.cellRender)) {
            return this.props.cellRender(data, column, this);
        } else {
            return utils.render(data, column);
        }
    }

    handleStateChange(state) {
        Object.assign(this.state, state);
        if (this.props.onStateChange) {
            this.props.onStateChange({
                containerWidth: this.state.containerWidth,
                tableWidth: this.state.tableWidth,
                columnWidths: this.state.columnWidths,
                checked: this.state.checked,
                filterData: this.state.filterData,
                scrollLeft: this.state.scrollLeft,
                scrollTop: this.state.scrollTop,
                collapsed: this.state.collapsed,
            });
        }
    }

    setTableState(state) {
        this.handleStateChange(state);
        this.forceUpdate();
    }

    componentDidMount() {
        this.state.containerWidth = $(this.refs.container).outerWidth() || '100%';
        this.state.tableWidth = this.state.tableWidth || this.state.containerWidth;
        this.componentDidUpdate();
    }

    /**
     * 复选框列宽度
     * @returns {number}
     */
    getCheckboxColumnWidth() {
        return this.props.showCheckboxes ? this.props.checkboxColumnWidth : 0;
    }

    /**
     * 处理列宽
     */
    handleColumnWidths() {
        let undefinedWidthColumns = [], widthSum = 0;
        this.state.dataColumns.map((column) => {
            if (this.state.columnWidths[column.key] === undefined) {
                undefinedWidthColumns.push(column.key);
            } else {
                widthSum += this.state.columnWidths[column.key];
            }
        });
        undefinedWidthColumns.map((key) => {
            this.state.columnWidths[key] = $(this.refs.container).find(`.table-header th[data-key=${key}]`).outerWidth();
        });
        if (undefinedWidthColumns.length == 0 && widthSum != this.state.tableWidth) {
            //定义的列宽和不等于表宽，需重新分配宽度
            let remainWidth = this.state.tableWidth - this.getCheckboxColumnWidth();
            for (let [key, width] of Object.entries(this.state.columnWidths)) {
                this.state.columnWidths[key] = Math.round((width / widthSum) * (this.state.tableWidth - this.getCheckboxColumnWidth()));
                remainWidth -= this.state.columnWidths[key];
            }
            this.state.columnWidths[this.state.dataColumns[this.state.dataColumns.length - 1].key] += remainWidth;
        }
    }

    componentDidUpdate() {
        let oldColumnWidths = {...this.state.columnWidths};
        this.handleColumnWidths();
        if (this.props.containerHeight) {
            let containerHeight = $(this.refs.container).height();
            this.state.headerHeight = $(this.refs.container).find('.table-header').height() || 0;
            this.state.footerHeight = $(this.refs.container).find('.table-footer').height() || 0;
            this.state.pagerHeight = $(this.refs.container).find('.table-pager').height() || 0;
            this.state.bodyHeight = containerHeight - this.state.headerHeight - this.state.pagerHeight - this.state.footerHeight;
        }
        if(this.state.bodyHeight) {
            $(this.refs.container).find('.table-body').css({height: this.state.bodyHeight});
        }
        $(this.refs.container).find('.table-body .table').css({width: this.state.tableWidth});
        if (!_.isEqual(oldColumnWidths, this.state.columnWidths)) {
            this.forceUpdate();
        }
    }

    handleScroll = (event) => {
        $(this.refs.header.refs.container).scrollLeft($(event.target).scrollLeft());
        if (this.refs.footer) {
            $(this.refs.footer.refs.container).scrollLeft($(event.target).scrollLeft());
        }
        this.state.scrollLeft = $(event.target).scrollLeft();
        this.state.scrollTop = $(event.target).scrollTop();
        this.handleStateChange();
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    };

    /**
     * 列字段探测
     * @param columns
     * @param parent
     * @param level
     * @returns {number}
     */
    detect(columns, parent = undefined, level = 0) {
        let colSpan = 0;
        columns.map((column) => {
            if (column.filter) {
                this.state.filter[column.key] = column.filter;
            }
            column.parent = parent;
            if (!this.state.headerColumns[level]) {
                this.state.headerColumns[level] = [];
            }
            this.state.headerColumns[level].push(column);
            if (column.children && column.children.length > 0) {
                column.colSpan = this.detect(column.children, column, level + 1);
                colSpan += column.colSpan;
            } else {
                if (_.isArray(column.key)) {
                    column.colSpan = column.key.length;
                    this.state.dataColumns = this.state.dataColumns.concat(column);
                } else {
                    column.colSpan = 1;
                    this.state.dataColumns.push(column);
                }
                colSpan += column.colSpan;
            }
        });
        return colSpan;
    };

    /**
     * 检查单行数据是否显示
     * @param data
     * @returns {boolean}
     */
    checkRow(data) {
        for (let key in data) {
            let filterConfig = _.get(this.state.filterConfig[key], 'fields[0]');
            if (filterConfig) {
                let filterValue = this.state.filterData[key];
                if (filterConfig && filterValue !== undefined) {
                    if (filterConfig.onCheck) {
                        //自定义检查
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
    };

    /**
     * 检查单个值是否满足过滤条件
     * @param data
     * @param key
     * @param filterConfig
     * @returns {boolean}
     */
    checkValue(data, key, filterConfig) {
        let value = _.get(data, key);
        let filterValue = _.isObject(this.state.filterData[key]) ? Object.values(this.state.filterData[key])[0] : this.state.filterData[key];
        switch (filterConfig.type) {
            case 'text':
                return value.toString().indexOf(filterValue) >= 0;
            case 'radio':
                return value == filterValue;
            case 'checkbox':
                return !_.isArray(filterValue) || filterValue.length == 0 || _.findIndex(filterValue, (o) => {
                    return o == value
                }) >= 0;
        }
        return true;
    }

    /**
     * 获取所有满足过滤条件的
     * @param dataSource
     * @param indent
     * @returns {Array}
     */
    getFilteredRows(dataSource, indent = 0) {
        let rows = [];
        dataSource.map((data) => {
            let indentData = {};
            indentData[`${this.state.dataColumns[0].key}_indent`] = indent;
            let parent = Object.assign(indentData, data);
            let children = [];
            if (data.children && data.children.length > 0) {
                children = this.getFilteredRows(data.children, indent + 16);
            }
            if (this.checkRow(parent) || children.length > 0) {
                rows.push(parent);
                rows = rows.concat(children);
            }
        });
        return rows;
    }

    /**
     * 获取展示的数据
     * @returns {Array}
     */
    getDataRows() {
        this.state.dataRows = this.getFilteredRows(this.state.dataSource);
        let rows = [];
        if (this.state.mode == 'local') {
            //处理分页
            let {page, limit} = {
                page: 1,
                limit: 100000,
                ...this.state.pager
            };
            let offset = (page - 1) * limit;
            let total = this.state.dataRows.length;
            let pages = Math.ceil(total / limit);
            for (let i = offset; i < offset + limit; i++) {
                if (this.state.dataRows[i]) {
                    rows.push(this.state.dataRows[i]);
                }
            }
            let onChange = this.state.pager && this.state.pager.onChange ? this.state.pager.onChange : undefined;
            this.state.pager = {
                ...this.state.pager,
                page: page,
                limit: limit,
                pages: pages,
                total: total,
                onChange: (data) => {
                    Object.assign(this.state.pager, data);
                    if (onChange) {
                        onChange(data);
                    }
                    this.forceUpdate();
                }
            };
            setTimeout(() => {
                this.updatePager();
            }, 50);
        } else {
            rows = this.state.dataRows;
            setTimeout(() => {
                this.updatePager();
            }, 50);
        }
        return rows;
    };


    /**
     * 设置数据
     * @param dataSource
     */
    setDataSource = (dataSource) => {
        if (dataSource instanceof Promise) {
            this.showBodyMasker();
            dataSource.then((dataSource) => {
                this.hideBodyMasker();
                if (_.isArray(dataSource)) {
                    this.refs.body.setDataSource(dataSource);
                }
            })
        } else if (_.isArray(dataSource)) {
            this.refs.body.setDataSource(dataSource);
        }
    };

    /**
     * 设置列
     * @param columns
     */
    setColumns = (columns, columnWidths) => {
        this.state.headerColumns = [];
        this.state.dataColumns = [];
        this.state.columnWidths = columnWidths || this.props.columnWidths || {};
        this.detect(_.cloneDeep(columns));
        this.handleStateChange();
        this.forceUpdate();
    };

    //api end

    setFooterData = (footerData) => {
        this.refs.footer.setFooterData(footerData);
    };

    /**
     * 更新页码
     * @param pager
     */
    updatePager = () => {
        if (this.state.pager && this.refs.pager) {
            this.refs.pager.forceUpdate();
        }
    };

    /**
     * 显示蒙层
     */
    showBodyMasker = () => {
        this.refs.body.showMasker();
    };

    /**
     * 隐藏蒙层
     */
    hideBodyMasker = () => {
        this.refs.body.hideMasker();
    };

    /**
     * 设置选择项
     */
    setChecked(checked) {
        this.state.checked = checked;
        if (this.props.onCheck) {
            this.props.onCheck(this.state.checked);
        }
        this.handleStateChange();
        this.forceUpdate();
    }

    scrollTop(top) {
        this.state.scrollTop = top;
        this.handleStateChange();
        this.forceUpdate();
    }

    render() {
        let className = "table-container";
        if (this.props.bordered) className += ' bordered';
        if (!this.props.containerBordered) className += ' none-outside-border';
        if (this.props.className) className += ' ' + this.props.className;
        return (
            <div ref="container"
                 className={className}
                 style={{
                     overflow: 'hidden',
                     width: this.props.containerWidth,
                     height: this.props.containerHeight,
                     ...this.props.style
                 }}>
                <TableHeader ref="header"/>
                <TableBody ref="body"/>
                {
                    this.props.pager ? <Pager/> : null
                }
            </div>
        )
    }
}


class TableFooter extends Component {

    constructor(props) {
        super(props);
        this.state = state[props.stateKey];
    }

    setFooterData = (footerData) => {
        this.state.footerData = footerData;
        this.forceUpdate();
    };

    render() {
        debug && console.log('render table footer');
        return <div ref="container"
                    className="table-footer"
                    style={{overflow: 'hidden', width: this.state.containerWidth, ...this.props.style}}>
            <table
                className={`table ${this.props.bordered ? 'bordered' : ''} ${this.props.condensed ? 'condensed' : ''}`}
                style={{width: this.state.tableWidth || '100%'}}>
                <TableBodyColGroup ref="colGroup"
                                   stateKey={this.props.stateKey}
                                   showCheckboxes={this.props.showCheckboxes}/>
                <tbody>
                {this.state.footerData.map((row, i) => {
                    return <tr key={i}>
                        {row.map((col, j) => {
                            return <td key={j} colSpan={col.colSpan || 1} rowSpan={col.rowSpan || 1}
                                       style={{textAlign: col.textAlign || 'left'}}>{col.content}</td>
                        })}
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    }
}

/**
 * 过滤器
 */
class Filter extends Component {

    static defaultProps = {
        reset: true,
        submit: true,
        resetLabel: '重置',
        submitLabel: '确定'
    };

    state = {
        open: false,
        anchorEl: {},
        formData: {}
    };

    constructor(props) {
        super(props);
        this.key = `filter-${this.props.filterCondKey}`;
        this.tableState = state[props.stateKey];
        this.initFormData();
    }

    initFormData = () => {
        this.props.fields.map((field) => {
            if (this.tableState.filterData[field.key]) {
                this.state.formData[field.key] = _.get(this.tableState.filterData[field.key], 'like', this.tableState.filterData[field.key]);
            }
        });
    };

    handleOpen = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    handleReset = (event) => {
        this.refs.form.state.defaultData = {};
        this.refs.form.state.fieldDefaultData = {};
        this.refs.form.reset();
        this.handleSubmit(event);
    };

    handleSubmit = (event) => {
        let data = this.refs.form.getData('all');
        this.state.formData = data;
        this.props.fields.map((field) => {
            let value = _.get(data, field.dataKey);
            if (value === '' || value === undefined) {
                delete this.tableState.filterData[field.key];
                delete this.state.formData[field.key];
            } else {
                this.tableState.filterData[field.key] = (() => {
                    switch (field.type) {
                        case 'text':
                        default:
                            if (field.equal) {
                                return value;
                            }
                            return {like: value}
                    }
                })();
            }
        });
        if (this.tableState.onFilter) {
            this.tableState.onFilter(this.tableState.filterData, this.tableState.context);
        } else {
            this.tableState.context.refs.body.forceUpdate();
        }
        this.handleRequestClose();
        this.tableState.context.handleStateChange();
    };

    render() {
        let Popover = App.component('popover');
        let Form = App.component('form');
        let Button = App.component('button');
        return <div ref="container" style={{display: 'inline-block', position: 'relative'}}>
            <Icon ref="filterIcon"
                  type="button"
                  name="filter"
                  color={Object.keys(this.state.formData).length > 0 ? '#1890ff' : undefined}
                  onClick={this.handleOpen}/>
            <Popover style={{left: -10000}}
                     open={this.state.open}
                     anchorEl={this.state.anchorEl}
                     onRequestClose={this.handleRequestClose}>
                <div className="space-small" style={{width: this.props.width || 260}}>
                    <Form
                        ref="form"
                        labelFixed={true}
                        fields={this.props.fields}
                        defaultData={this.state.formData}
                    />
                    <div className="text-center" style={{marginTop: 16}}>
                        {this.props.reset ? <Button label={this.props.resetLabel} onClick={this.handleReset}
                                                    style={{width: 100}}/> : null}
                        {this.props.submit ?
                            <Button label={this.props.submitLabel} onClick={this.handleSubmit} type="primary"
                                    style={{width: 100, marginLeft: 20}}/> : null}
                    </div>
                </div>
            </Popover>
        </div>
    }
}
