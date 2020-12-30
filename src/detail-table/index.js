import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Checkbox from "./checkbox";
import utils from "../utils";
import {Scrollbars} from 'react-custom-scrollbars';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import Pager from "./pager";


export default class Table extends Component {

    static childContextTypes = {
        Table: PropTypes.object,
    };

    static defaultProps = {

        emptyDataTip: '没有找到相关数据',         //空数据时提示的文本内容
        emptyDataImage: '/image/nodata.png',    //空数据展示的图片
        hasHeader: true,
        columns: [],                            //字段定义
        dataSource: [],                         //数据源
        primaryKey: "id",                       //主键
        detailKey: "details",                   //明细数据
        mainInfo: {                             //主信息
            primaryKey: "id",                   //主键
            columns: [],
            actionWidth: 0,
            action: [],
            showCheckboxes: true
        },
        showCheckboxes: false,                  //是否显示复选框
        spacey: 14,                             //间距
        pager: {},
        fixedCheckbox: true,                    //固定选择框
        fixedLeftCols: 0,

        checked: {},
        detailChecked: {},
        scrollLeft: 0,
        scrollTop: 0,
        checkboxColumnWidth: 50,                //复选框列的宽度
        containerWidth: 0,
        extraWidth: 0,
        columnWidths: {}
    };

    state = {
        containerWidth: 0,
        extraWidth: 0,
    };

    getChildContext() {
        return {
            Table: this,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            key: new Date().getTime(),
            scrollLeft: props.scrollLeft,
            scrollTop: props.scrollTop,
            checked: props.checked,
            detailChecked: props.detailChecked,
            columnWidths: props.columnWidths,
            checkboxColumnWidth: props.checkboxColumnWidth,
        };
    }


    componentDidMount() {
        let forceUpdate = 0;
        if (this.refs.container) {
            let state = this.state;
            $(this.refs.container).find(".table-header th").each(function () {
                const key = $(this).attr("col-key");
                if (key) {
                    state.columnWidths[key] = $(this).outerWidth();
                }
            });
            this.state.containerWidth = $(this.refs.container).outerWidth();
            const tableWidth = this.getTableWidth();
            const mainInfoWidth = this.getMainInfoWidth();
            this.state.extraWidth = mainInfoWidth - tableWidth;
            if (this.state.containerWidth > tableWidth) forceUpdate = 1;
            if (this.state.extraWidth > 0) forceUpdate = 1;
        }
        this.state.checkboxColumnWidth = this.props.checkboxColumnWidth;
        if (this.refs.checkboxAll) {
            if (this.state.checkboxColumnWidth !== $(this.refs.checkboxAll).outerWidth()) {
                this.state.checkboxColumnWidth = $(this.refs.checkboxAll).outerWidth();
                forceUpdate = 1;
            }
        }
        if (this.refs.header) {
            $(this.refs.header).scrollLeft(this.props.scrollLeft);
        }
        setTimeout(() => {
            this.refs.Content.scrollTop(this.props.scrollTop);
            this.refs.Content.scrollLeft(this.props.scrollLeft);
        }, 1200);

        if (forceUpdate) {
            this.forceUpdate();
        }
    }

    subscribe(eventKey, fn) {
        return PubSub.subscribe(this.state.key + "_" + eventKey, fn);
    }

    unsubscribe(token) {
        return PubSub.unsubscribe(token);
    }

    publish(eventKey) {
        return PubSub.publish(this.state.key + "_" + eventKey);
    }

    getColumnWidths() {
        return {
            ...this.props.columns.reduce((acc, {width, key}) => {
                width && (acc[key] = width);
                return acc;
            }, {}),
            ...this.state.columnWidths,
        };
    }

    /**
     * 是否全选
     */
    isAllChecked() {
        const checkedLength = Object.values(this.state.checked).filter(item => item == 1).length;
        if (this.props.dataSource.length === 0 || (checkedLength === 0 && Object.values(this.state.checked).filter(item => item == 2).length === 0)) {
            return 0;
        }
        if (this.props.dataSource.length === checkedLength) {
            return 1;
        }
        return 2;
    }

    /**
     * 表格宽度
     * @returns {*}
     */
    getTableWidth(props = this.props) {
        let columnWidths = _.cloneDeep(this.getColumnWidths());
        Object.keys(this.getColumnWidths()).forEach(key => {
            if (_.findIndex(props.columns, {key}) < 0) {
                delete columnWidths[key];
            }
        });
        let tableWidth = Object.values(columnWidths).reduce((total, num) => total + num, 0);
        if (this.props.showCheckboxes) tableWidth += this.props.checkboxColumnWidth;
        return tableWidth;
    }

    /**
     * 主信息宽度
     * @param props
     * @returns {any}
     */
    getMainInfoWidth(props = this.props) {
        const marginLeft = 24;
        let width = props.mainInfo.columns.reduce((total, column) => total + ((column.width || 0) + marginLeft), 0);
        if (this.props.showCheckboxes) width += this.state.checkboxColumnWidth || this.props.checkboxColumnWidth;
        width += (props.mainInfo.actionWidth || 0);
        return width;
    }

    /**
     * 全选
     * @param event
     * @param isInputChecked
     */
    handleCheckAll = (event, isInputChecked) => {
        let checked = {};
        let detailChecked = {};
        const {primaryKey = "id"} = this.props.mainInfo;
        if (isInputChecked) {
            this.props.dataSource.forEach(data => {
                checked[_.get(data, primaryKey)] = 1;
                const details = _.get(data, this.props.detailKey) || [];
                details.forEach(detail => {
                    detailChecked[_.get(detail, this.props.primaryKey)] = 1;
                });
            });
        }
        this.setChecked(checked, detailChecked);
    };

    setChecked(checked = this.state.checked, detailChecked = this.state.detailChecked) {
        this.handleStateChange({checked, detailChecked});
        this.forceUpdate();
    }

    handleStateChange(state) {
        Object.assign(this.state, state);
        if (this.props.onStateChange) {
            this.props.onStateChange({
                scrollLeft: this.state.scrollLeft,
                scrollTop: this.state.scrollTop,
                checked: this.state.checked,
                detailChecked: this.state.detailChecked,
                columnWidths: this.state.columnWidths,
                checkboxColumnWidth: this.state.checkboxColumnWidth
            });
        }
    }

    handleScroll = (event) => {
        const scrollLeft = $(event.target).scrollLeft();
        const scrollTop = $(event.target).scrollTop();
        if (this.state.scrollLeft !== scrollLeft) {
            if (this.refs.header) {
                $(this.refs.header).scrollLeft(scrollLeft);
            }
            this.state.scrollLeft = scrollLeft;
            this.publish("scrollLeftChange");
        }
        if (this.state.scrollTop !== scrollTop) {
            this.state.scrollTop = scrollTop;
            this.publish("scrollTopChange");
        }
        this.handleStateChange({});
    };

    render() {
        const tableWidth = this.getTableWidth();
        const mainInfoWidth = this.getMainInfoWidth();
        const columnWidths = this.getColumnWidths();
        const width = Math.max(tableWidth, mainInfoWidth, this.state.containerWidth);
        const {showCheckboxes = true} = this.props.mainInfo;
        return (
            <div ref="container" className="table-container bordered full-height text-small relative"
                 style={{overflow: "hidden"}}>
                {this.props.fixedCheckbox && <FixedCheckbox/>}
                {this.props.hasHeader && <div
                    ref="header"
                    className="table-header"
                    style={{
                        width: "calc(100% + 2px)",
                        overflow: "hidden",
                        height: 38
                    }}>
                    <table className="table bordered"
                           style={{
                               width: Math.max(tableWidth, this.state.containerWidth) + this.state.extraWidth,
                               tableLayout: 'fixed',
                               minWidth: "100%"
                           }}>
                        <thead>
                        <tr>
                            {
                                (this.props.showCheckboxes || showCheckboxes) &&
                                <th ref="checkboxAll" style={{
                                    width: this.state.checkboxColumnWidth || this.props.checkboxColumnWidth,
                                    textAlign: "center",
                                    lineHeight: 1
                                }}>
                                    <Checkbox checked={this.isAllChecked()} onCheck={this.handleCheckAll}/>
                                </th>
                            }
                            {
                                this.props.columns.map((column, index) => {
                                    return <th key={index}
                                               col-key={column.key}
                                               style={{
                                                   width: columnWidths[column.key],
                                                   textAlign: "center"
                                               }}>{column.label}</th>
                                })
                            }
                            {
                                this.state.extraWidth > 0 && <th style={{width: this.state.extraWidth}}></th>
                            }
                        </tr>
                        </thead>
                    </table>
                </div>}
                <div style={{flexGrow: 1}}>
                    <Scrollbars ref="Content" onScroll={this.handleScroll} style={{
                        width: '100%',
                        height: '100%',
                    }}>
                        {
                            this.props.dataSource.map((data, index) => {
                                return <Content key={index} data={data} width={width}
                                                extraWidth={this.state.extraWidth}/>
                            })
                        }
                    </Scrollbars>
                </div>
                {
                    this.props.pager ? <Pager/> : null
                }
            </div>
        );
    }

}

class Action extends React.Component {

    static contextTypes = {
        Table: PropTypes.object,
    };

    static defaultProps = {
        width: 0,
        style: {},
        actions: [],
        data: {}
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.token = this.context.Table.subscribe("scrollLeftChange", () => {
            const {scrollLeft = 0} = this.context.Table.state;
            this.refs.container.style.right = (0 - scrollLeft) + "px";
        });
    }

    componentWillUnmount() {
        this.context.Table.unsubscribe(this.token);
    }

    render() {
        const {scrollLeft = 0} = this.context.Table.state;
        return (
            <div ref={"container"} className="table-header-bg" style={{
                width: this.props.width,
                position: "absolute",
                right: 0 - scrollLeft,
                borderLeft: "1px solid rgba(0,0,0,0.08)",
                ...this.props.style
            }}>
                <div className="flex center middle" style={{height: 32}}>
                    {
                        this.props.actions.map((action, index) => {
                            return <div key={index} className="text-primary cursor-pointer"
                                        style={{marginRight: index === this.props.actions.length - 1 ? 0 : 12}}
                                        onClick={action.onClick.bind(this, this.props.data)}>
                                {action.label}
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }

}

class MainInfo extends React.Component {

    static contextTypes = {
        Table: PropTypes.object,
    };

    static defaultProps = {
        columns: [],
        columnWidths: {},
        data: {},
        actionWidth: 0,
        actionStyle: {},
        actions: []
    };

    constructor(props) {
        super(props);
    }

    getValue(column) {
        return column.render ? column.render(this.props.data) : utils.render(this.props.data, column);
    }

    render() {
        return (
            <div className="flex middle">
                {this.props.columns.map((column, index) => {
                    return <div className="text-ellipsis" key={index} style={{width: column.width, marginRight: 24}}>
                        {
                            column.label && <span className="text-muted">{column.label}：</span>
                        }
                        <span>{this.getValue(column)}</span>
                    </div>
                })}
                {
                    this.props.actions.length > 0 &&
                    <Action data={this.props.data} width={this.props.actionWidth} actions={this.props.actions}
                            style={this.props.actionStyle}/>
                }
            </div>
        );
    }

}

class Content extends React.Component {

    static defaultProps = {
        onlyShowCheckbox: false
    };

    static contextTypes = {
        Table: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this.token = this.context.Table.subscribe("checkboxColumnWidthChange", () => {
        //     if(this.refs.checkbox) {
        //         $(this.refs.checkbox).width(this.context.Table.state.checkboxColumnWidth);
        //     }
        // });
    }

    componentWillUnmount() {
        // this.context.Table.unsubscribe(this.token);
    }

    getValue(column, Content) {
        return column.render ? column.render(Content) : utils.render(Content, column);
    }

    isChecked() {
        const {checked} = this.context.Table.state;
        const {mainInfo} = this.context.Table.props;
        const {primaryKey = "id"} = mainInfo;
        return checked[_.get(this.props.data, primaryKey)] || 0;
    }

    isDetailChecked(detail) {
        const {detailChecked} = this.context.Table.state;
        const {primaryKey} = this.context.Table.props;
        return detailChecked[_.get(detail, primaryKey)] || 0;
    }

    handleCheck = (event, isInputCheck) => {
        const {props, state} = this.context.Table;
        const {checked, detailChecked} = state;
        const {primaryKey} = props;
        const details = _.get(this.props.data, props.detailKey) || [];
        if (isInputCheck) {
            checked[_.get(this.props.data, primaryKey)] = 1;
            details.forEach(detail => {
                detailChecked[_.get(detail, primaryKey)] = 1;
            });
        } else {
            delete checked[_.get(this.props.data, primaryKey)];
            details.forEach(detail => {
                delete detailChecked[_.get(detail, primaryKey)];
            });
        }
        this.context.Table.setChecked(checked, detailChecked);
    };

    handleDetailCheck = (detail) => (event, isInputCheck) => {
        const {props, state} = this.context.Table;
        const {checked, detailChecked} = state;
        const {primaryKey} = props;
        const details = _.get(this.props.data, props.detailKey) || [];
        if (isInputCheck) {
            detailChecked[_.get(detail, primaryKey)] = 1;
        } else {
            delete detailChecked[_.get(detail, primaryKey)];
        }
        const detailCheckedLength = details.reduce((total, item) => total + (detailChecked[_.get(item, primaryKey)] === 1 ? 1 : 0), 0);
        if (details.length === detailCheckedLength) {
            checked[_.get(this.props.data, primaryKey)] = 1;
        } else if (detailCheckedLength === 0) {
            delete checked[_.get(this.props.data, primaryKey)];
        } else {
            checked[_.get(this.props.data, primaryKey)] = 2;
        }
        this.context.Table.setChecked(checked, detailChecked);
    };

    render() {
        const {props, state} = this.context.Table;
        const details = _.get(this.props.data, props.detailKey) || [];
        const {columns, mainInfo, checkboxColumnWidth, spacey} = props;
        const {showCheckboxes = true} = mainInfo;
        const columnWidths = this.context.Table.getColumnWidths();
        return (
            <div className="table-container bordered" style={{
                marginBottom: spacey,
                marginTop: spacey,
                width: this.props.width,
                borderLeft: 0,
                borderRight: 0,
                minWidth: "100%",
                overflow: "hidden"
            }}>
                <div className="flex middle table-header-bg" style={{height: 32}}>
                    {
                        showCheckboxes &&
                        <div ref="checkbox" className="text-center"
                             style={{width: state.checkboxColumnWidth, minWidth: state.checkboxColumnWidth, marginRight: 4}}>
                            <Checkbox checked={this.isChecked()} onCheck={this.handleCheck}/>
                        </div>
                    }
                    {
                        !this.props.onlyShowCheckbox &&
                        <div style={{flexGrow: 1}}>{_.isFunction(mainInfo) ? mainInfo(this.props.data) :
                            <MainInfo {...mainInfo} data={this.props.data}/>}</div>
                    }
                </div>
                {
                    details.length > 0 && <div className="table-body relative" style={{width: "calc(100% + 2px)"}}>
                        <table className="table bordered"
                               style={{width: this.props.width, tableLayout: 'fixed', minWidth: "100%"}}>
                            <tbody>
                            {
                                details.map((detail, index) => {
                                    return <tr key={index}>
                                        {
                                            (showCheckboxes || props.showCheckboxes) && <td className="text-center"
                                                                                            style={{width: state.checkboxColumnWidth || checkboxColumnWidth}}>
                                                {props.showCheckboxes ? <Checkbox checked={this.isDetailChecked(detail)} onCheck={this.handleDetailCheck(detail)}/> : index + 1}
                                            </td>
                                        }
                                        {

                                            !this.props.onlyShowCheckbox && columns.map((column, index) => {
                                                return <td key={index}
                                                           style={{
                                                               width: columnWidths[column.key],
                                                               textAlign: column.textAlign
                                                           }}>{this.getValue(column, detail)}</td>
                                            })
                                        }
                                        {
                                            this.props.extraWidth > 0 &&
                                            <td style={{width: this.props.extraWidth}}></td>
                                        }
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

class FixedCheckbox extends React.Component {

    static contextTypes = {
        Table: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.token1 = this.context.Table.subscribe("scrollLeftChange", () => {
            this.forceUpdate();
        });
        this.token2 = this.context.Table.subscribe("scrollTopChange", () => {
            $(this.refs.Content).scrollTop(this.context.Table.state.scrollTop);
        });
        $(this.refs.Content).scrollTop(this.context.Table.state.scrollTop);
    }

    componentDidUpdate() {
        $(this.refs.Content).scrollTop(this.context.Table.state.scrollTop);
    }

    componentWillUnmount() {
        this.context.Table.unsubscribe(this.token1);
        this.context.Table.unsubscribe(this.token2);
    }

    render() {
        const {Table} = this.context;
        const {state, props} = Table;
        const checkboxColumnWidth = state.checkboxColumnWidth || props.checkboxColumnWidth;
        const {showCheckboxes = true} = props.mainInfo;
        let containerStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 3,
            width: checkboxColumnWidth - 2,
            backgroundColor: '#fff',
            overflow: 'hidden',
            bottom: props.pager ? 32 : 0
        };
        if (state.scrollLeft && state.scrollLeft > 0) {
            containerStyle.boxShadow = '6px 0 6px rgba(0,0,0,0.1)';
        }
        if (props.dataSource.length == 0 || (showCheckboxes === false && props.showCheckboxes === false) || state.scrollLeft == 0) {
            return null;
        }
        return (
            <div style={containerStyle}>
                <div className="table-container full-height text-small" style={{overflow: "hidden"}}>
                    {props.hasHeader && <div
                        ref="header"
                        className="table-header"
                        style={{
                            width: "calc(100% + 2px)",
                            overflow: "hidden",
                            height: 38,
                            minHeight: 38
                        }}>
                        <table className="table bordered"
                               style={{tableLayout: 'fixed', width: checkboxColumnWidth}}>
                            <thead>
                            <tr>
                                <th style={{width: checkboxColumnWidth, textAlign: "center", lineHeight: 1}}>
                                    <Checkbox checked={Table.isAllChecked()} onCheck={Table.handleCheckAll}/>
                                </th>
                            </tr>
                            </thead>
                        </table>
                    </div>}
                    <div ref="Content" style={{flexGrow: 1, overflow: "hidden",}}>
                        {
                            props.dataSource.map((data, index) => {
                                return <Content key={index} data={data} width={checkboxColumnWidth}
                                                onlyShowCheckbox={true} fixedLeftCols={props.fixedLeftCols}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

}