/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Scrollbars} from 'react-custom-scrollbars';
import Header from './header';
import Body from './body';
import Control from '../control';

export default class List extends Component {

    static childContextTypes = {
        List: PropTypes.object,
        state: PropTypes.object,
        props: PropTypes.object,
        setListState: PropTypes.func,
    };

    getChildContext() {
        return {
            List: this,
            state: this.state,
            props: this.props,
            setListState: this.setListState.bind(this)
        }
    }

    static defaultProps = {
        bordered: true,                 //是否显示边框
        title: undefined,               //header标题
        width: 320,                     //宽度
        height: '100%',                 //高度
        rowHeight: 20,                  //行高
        filter: false,
        headerIconEvents: [],           //header的icon事件
        iconEvents: [],                 //body的icon事件
        hasCollapsed: true,             //是否可折叠
        defaultCollapsed: false,        //默认全部折叠/打开
        dataSource: [],                 //数据源
        dataSourceConfig: {text: 'text', value: 'value'},
        onFilter: undefined,            //过滤函数
        onSelect: undefined,            //选中触发事件
        multiple: false,                //是否多选
        hasFilterText: false
    };

    state = {
        unCollapsed: {},                //打开的
        collapsed: {},                  //折叠的
        filterText: undefined,          //过滤条件
        selected: {},                   //选中的
        scrollLeft: 0,                  //
        scrollTop: 0,                   //
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        let nextProps = {
            unCollapsed: props.unCollapsed,
            collapsed: props.collapsed,
            filterData: props.filterData,
            selected: props.selected,
            scrollLeft: props.scrollLeft,
            scrollTop: props.scrollTop,
        };
        for (let [key, value] of Object.entries(nextProps)) {
            if (value === undefined) {
                delete nextProps[key];
            }
        }
        Object.assign(this.state, nextProps);
    }

    handleStateChange(state) {
        Object.assign(this.state, state);
        if (this.props.onStateChange) {
            this.props.onStateChange({
                filterData: this.state.filterData,
                scrollLeft: this.state.scrollLeft,
                scrollTop: this.state.scrollTop,
                collapsed: this.state.collapsed,
                unCollapsed: this.state.unCollapsed,
                selected: this.state.selected
            });
        }
    }

    setListState(state) {
        this.handleStateChange(state);
        this.forceUpdate();
    }

    render() {
        return <div className={`list ${this.props.bordered ? 'bordered' : ''} ${this.props.className}`}
                    ref="container"
                    style={{width: this.props.width, height: this.props.height}}>
            <Header ref="header"/>
            {this.props.hasFilterText && <div style={{margin: "0 16px"}}><Control type="text" borderStyle="underline" hintText="输入科目名称查询" onChange={(value) => {this.setState({filterText: value})}}/></div>}
            <Body ref="body"/>
        </div>
    }
}








