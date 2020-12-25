/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TableHeader from './header';
import TableBody from './body';
import TableFooter from './footer';
import FixedCol from './fixed-col';
import Pager from './pager';
import $ from 'jquery';
import utils from '../utils';

let debug = false;

export default class Table extends Component {

    static childContextTypes = {
        Table: PropTypes.object,
        state: PropTypes.object,
        props: PropTypes.object,
        setTableState: PropTypes.func,
        handleStateChange: PropTypes.func,
        getDataRows: PropTypes.func,
        cellRender: PropTypes.func,
        getTableWidth: PropTypes.func
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
        collapsibleKey: undefined,              //控制折叠字段，默认第一列
        defaultCollapsible: false,              //折叠默认状态，false打开，true收起
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
        sortData: {},                           //排序数据
        scrollTop: 0,                           //滚动条初始位置
        scrollLeft: 0,                          //滚动条初始位置
        headerRowHeight: 32,                    //表头行高
        bodyRowHeight: 32,                      //表内容行高
        dataSource: [],                         //数据源
        onFilter: undefined,                    //过滤自定义事件
        onSort: undefined,                      //排序自定义事件
        pager: undefined,                       //分页
        onCheck: undefined,                     //勾选后触发事件
        showCheckboxes: true,                   //是否显示复选框
        rowCheckboxEnabled: undefined,          //逐行检查是否启用/禁用复选框
        bodyCellMultiLine: false,               //表内容单元格是否允许多行显示
        checkboxColumnWidth: 50,                //复选框列的宽度
        resize: true,                           //列宽度是否可拖动更改
        cellRender: undefined,                  //单元格渲染处理函数
        loading: false,                         //是否显示loading
        footerFixed: false,                     //footer是否固定底部
        fixedCheckbox: false,                   //是否固定选择框列
        fixedLeftColumns: [],                   //左边列固定字段
        fixedRightColumns: [],                  //右边列固定字段
        showSeries: false,                      //是否显示序号
        seriesColumnWidth: 50,                  //序号列宽度
        showEllipsis: true,                     //显示省略内容
        autoResponse: false,                    //自适应
        rowStyle: undefined,                    //行样式
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
        }
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
        iconEvents: {},                         //图标事件
        iconEventsBehavior: 'columnHover',      //图标事件出现的方式：columnHover移至当前列后显示，rowHover移至当前行后显示
        filterConfig: {},                       //过滤条件配置
        filterData: {},                         //过滤条件数据
        sortData: {},                           //排序数据
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
            getTableWidth: this.getTableWidth.bind(this)
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

    /**
     * 表格宽度
     * @returns {*}
     */
    getTableWidth(props = this.props) {
        let hasChildren = {};
        this.state.dataColumns.map((column) => {
            if (column.parent) hasChildren[column.parent.key] = true;
        });
        const columnWidths = Object.entries(this.state.columnWidths).map(([key, value]) => {
            if (hasChildren[key]) return 0;
            return value;
        });
        return props.tableWidth ||
            Math.max(
                this.getCheckboxColumnWidth() + this.getSeriesColumnWidth() + (columnWidths.length > 0 ? columnWidths.reduce((total, num) => total + num, 0) : 0),
                _.isString(this.state.containerWidth) ? 0 : this.state.containerWidth,
                props.tableMinWidth || 0
            );
    }

    initData(props) {
        let nextProps = {
            containerWidth: this.state.containerWidth || props.containerWidth,
            columnWidths: {...props.columnWidths},
            dataSource: props.dataSource,
            mode: props.mode,
            headerColumns: props.headerColumns,
            checked: {...props.checked},
            collapsed: props.collapsed,
            iconEvents: props.iconEvents,
            iconEventsBehavior: props.iconEventsBehavior,
            filter: props.filter || {},
            filterData: {...props.filterData},
            sortData: {...props.sortData},
            selectedRow: this.state.selectedRow || props.selectedRow
        };
        for (let [key, value] of Object.entries(nextProps)) {
            if (value === undefined) {
                delete nextProps[key];
            }
        }
        Object.assign(this.state, nextProps);
        this.state.tableWidth = this.getTableWidth(nextProps);
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
                sortData: this.state.sortData,
                scrollLeft: this.state.scrollLeft,
                scrollTop: this.state.scrollTop,
                collapsed: this.state.collapsed,
                selectedRow: this.state.selectedRow
            });
        }
    }

    setTableState(state) {
        this.handleStateChange(state);
        this.forceUpdate();
    }

    componentDidMount() {
        let containerWidth = $(this.refs.container).outerWidth() || '100%';
        if(this.state.containerWidth !== containerWidth) {
            this.state.containerWidth = containerWidth;
            this.refs.fixedLeft && this.refs.fixedLeft.forceUpdate();
            this.refs.fixedRight && this.refs.fixedRight.forceUpdate();
        }
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
     * 序号列宽度
     * @returns {number}
     */
    getSeriesColumnWidth() {
        return this.props.showSeries ? this.props.seriesColumnWidth : 0;
    }

    /**
     * 处理列宽
     */
    handleColumnWidths() {
        let undefinedColumnWidths = [];
        for (let [key, width] of Object.entries(this.state.columnWidths)) {
            if (_.findIndex(this.state.dataColumns, {key: key}) < 0) {
                delete this.state.columnWidths[key];
            }
        }
        this.state.dataColumns.map((column) => {
            if (this.state.columnWidths[column.key] === undefined) {
                undefinedColumnWidths.push(column.key);
            }
            if (column.parent) {
                this.state.columnWidths[column.parent.key] = 0;
            }
        });
        this.state.dataColumns.map((column) => {
            //上级列宽度等于下级列之和
            if (column.parent && this.state.columnWidths[column.key]) {
                this.state.columnWidths[column.parent.key] += this.state.columnWidths[column.key];
            }
        });
        undefinedColumnWidths.map((key) => {
            //未定义宽度列，宽度等于页面宽度
            this.state.columnWidths[key] = $(this.refs.container).find(`.table-header th[data-key=${key}]`).outerWidth();
        });
    }

    componentDidUpdate() {
        let oldColumnWidths = {...this.state.columnWidths};
        let state = this.state;
        let props = this.props;
        this.handleColumnWidths();
        this.state.tableWidth = this.getTableWidth();
        if (this.props.containerHeight) {
            let containerHeight = $(this.refs.container).outerHeight();
            this.state.headerHeight = props.headerRowHeight * state.headerColumns.length + state.headerColumns.length || $(this.refs.container).find('.table-header').height() || 0;
            this.state.footerHeight = $(this.refs.container).find('.table-footer').height() || 0;
            this.state.pagerHeight = $(this.refs.container).find('.table-pager').height() || 0;
            this.state.bodyHeight = containerHeight - this.state.headerHeight - this.state.pagerHeight - this.state.footerHeight;
        }
        if (this.state.bodyHeight) {
            $(this.refs.container).find('.table-body').css({height: this.state.bodyHeight});
        }
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
        if (_.get(this.refs, 'fixedLeft.refs.body')) {
            $(this.refs.fixedLeft.refs.body.refs.container).scrollTop(this.state.scrollTop);
            this.refs.fixedLeft.forceUpdate();
        }
        if (_.get(this.refs, 'fixedRight.refs.body')) {
            $(this.refs.fixedRight.refs.body.refs.container).scrollTop(this.state.scrollTop);
            this.refs.fixedRight.forceUpdate();
        }
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
    getFilteredRows(dataSource, indent = 0, parent = null) {
        let rows = [];
        let collapsibleKey = this.props.collapsibleKey || _.get(this.state.dataColumns, "0.key");
        dataSource.map((data) => {
            let indentData = {};
            indentData[`${collapsibleKey}_indent`] = indent;
            let current = Object.assign(indentData, data);
            let children = [];
            if (data.children && data.children.length > 0) {
                children = this.getFilteredRows(data.children, indent + 16, current);
            }
            if (this.checkRow(current) || children.length > 0) {
                rows.push({...current, _parent: parent});
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
        this.setTableState(this.state);
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
                     position: 'relative',
                     width: this.props.containerWidth,
                     height: this.props.containerHeight,
                     ...this.props.style
                 }}>
                {
                    this.props.fixedCheckbox || this.props.fixedLeftColumns.length > 0 ?
                        <FixedCol ref="fixedLeft" position="left" columns={this.props.fixedLeftColumns}/> : null
                }
                {
                    this.props.fixedRightColumns.length > 0 ?
                        <FixedCol ref="fixedRight" position="right" columns={this.props.fixedRightColumns}/> : null
                }
                <TableHeader ref="header"/>
                <TableBody
                    ref="body"
                    onScroll={this.handleScroll}
                    rowSelected={this.props.rowSelected}
                    onRowSelect={this.props.onRowSelect}
                />
                {
                    this.props.footerData && this.props.footerData.length > 0 ? <TableFooter ref="footer"/> : null
                }
                {
                    this.props.pager ? <Pager/> : null
                }
            </div>
        )
    }
}

