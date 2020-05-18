import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Scrollbars} from "react-custom-scrollbars";
import Icon from "../icon";
import utils from '../utils';
import Item from './item';
import $ from 'jquery';
import Control from '../control';

export default class Body extends Component {

    static contextTypes = {
        state: PropTypes.object,
        props: PropTypes.object,
        setListState: PropTypes.func
    };

    parent = {};

    children = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.refs.scrollBar) {
            if (this.context.state.scrollTop) {
                this.refs.scrollBar.scrollTop(this.state.scrollTop);
            }
            if (this.context.state.scrollLeft) {
                this.refs.scrollBar.scrollLeft(this.state.scrollLeft);
            }
        }
    }

    /**
     * 获取值
     * @param data
     * @returns {T | ActiveX.IXMLDOMNode | Promise<any> | V | any | string | IDBRequest | MediaKeyStatus | FormDataEntryValue}
     */
    getValue(data = this.context.state.selected) {
        return _.get(data, this.context.props.dataSourceConfig.value);
    }

    /**
     * 根据value获取data
     * @param value
     * @returns {*}
     */
    getData(value) {
        let index = _.findIndex(this.context.props.dataSource, (o) => {
            return _.get(o, this.context.props.dataSourceConfig.value) == value;
        });
        return index >= 0 ? this.context.props.dataSource[index] : undefined;
    }

    /**
     * 选中事件
     * @param data
     * @returns {Function}
     */
    handleClick = (data) => (event) => {
        if(!this.props.multiple) {
            this.context.setListState({selected: data});
            if (this.context.props.onSelect) {
                this.context.props.onSelect(this.getValue(data), data);
            }
        }
    };

    /**
     * 是否勾选
     * @param data
     * @returns {boolean}
     */
    isCheck(data) {
        let selected = this.context.state.selected;
        return selected[data.id] ? true : false;
    }

    /**
     * 获取所有上级
     * @param childKey
     * @returns {Array}
     */
    getParentKeys(childKey) {
        let keys = [];
        if(this.parent[childKey]) {
            keys.push(this.parent[childKey]);
            keys = keys.concat(this.getParentKeys(this.parent[childKey]))
        }
        return keys;
    }

    /**
     * 获取所有下级
     * @param parentKey
     * @returns {Array}
     */
    getChildKeys(parentKey) {
        let keys = [];
        keys = keys.concat(this.children[parentKey] || []);
        (this.children[parentKey] || []).map((childKey) => {
            keys = keys.concat(this.getChildKeys(childKey));
        });
        return keys;
    }

    /**
     * 是否已选取选中
     * @param keys
     * @param selected
     */
    isCheckAll(keys, selected = this.context.state.selected) {
        for(let i = 0; i < keys.length; i++) {
            if(!selected[keys[i]]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 勾选事件
     * @param data
     * @returns {Function}
     */
    handleCheck = (data) => (isCheck) => {
        let selected = this.context.state.selected;
        let key = this.getValue(data);
        let childKeys = this.getChildKeys(key);
        let parentKeys = this.getParentKeys(key);
        //处理自己
        isCheck ? selected[key] = true : delete selected[key];
        //处理下级
        childKeys.map(key => {
            isCheck ? selected[key] = true : delete selected[key];
        });
        //处理上级
        parentKeys.map(key => {
            let childkeys = this.getChildKeys(key);
            if(this.isCheckAll(childkeys, selected)) {
                selected[key] = true;
            } else {
                delete selected[key];
            }
        });
        this.context.setListState({selected: selected});
        if (this.context.props.onSelect) {
            this.context.props.onSelect(selected)
        }
    };

    /**
     * 过滤处理
     * @param dataSource
     * @param indent
     * @param parent
     * @returns {Array}
     */
    filterData = (dataSource, indent = 0, parent = {}) => {
        let rows = [];
        dataSource.map((data) => {
            let value = this.getValue(data);
            let parentValue = parent ? this.getValue(parent) : null;
            this.parent[value] = parentValue;
            let parent2 = Object.assign({indent: indent}, data);
            let children = [];
            if (data.children && data.children.length > 0) {
                this.children[value] = data.children.map((row) => (this.getValue(row)));
                children = this.filterData(data.children, indent + 16, data);
            }
            if (this.checkData(parent2) || children.length > 0) {
                rows.push(parent2);
                rows = rows.concat(children);
            }
        });
        return rows;
    };

    handleData() {
        this.parent = {};
        this.children = {};
        return this.filterData(this.context.props.dataSource);
    }

    checkData = (data) => {
        let filterText = this.context.state.filterText;
        if (filterText !== undefined) {
            let text = utils.replaceText(this.context.props.dataSourceConfig.text, data);
            return text.indexOf(filterText) >= 0;
        } else {
            return true;
        }
    };

    /**
     * 是否隐藏
     * @param data
     * @returns {*}
     */
    isHide(value) {
        return this.parent[value] ? this.isCollapsed(this.parent[value]) || this.isHide(this.parent[value]) : false;
    }

    /**
     * 是否折叠的
     * @param key
     * @returns {boolean}
     */
    isCollapsed(value) {
        if (this.context.props.defaultCollapsed) {
            return this.context.state.unCollapsed[value] ? false : true;
        } else {
            return this.context.state.collapsed[value] ? true : false;
        }
    }

    /**
     * 折叠处理
     * @param data
     * @param isCollapsed
     * @returns {Function}
     */
    handleCollapse = (data, isCollapsed) => (event) => {
        event.stopPropagation();
        let unCollapsed = this.context.state.unCollapsed;
        let collapsed = this.context.state.collapsed;
        let value = this.getValue(data);
        if (isCollapsed) {
            collapsed[value] = true;
            delete unCollapsed[value];
        } else {
            unCollapsed[value] = true;
            delete collapsed[value];
        }
        this.context.setListState({
            collapsed: collapsed,
            unCollapsed: unCollapsed
        });
    };

    handleScroll = (event) => {
        let scrollLeft = $(event.target).scrollLeft();
        let scrollTop = $(event.target).scrollTop();
        this.context.setListState({
            scrollLeft: scrollLeft,
            scrollTop: scrollTop
        });
    };

    render() {
        let dataSource = this.handleData();
        let selectedValue = this.getValue(this.context.state.selected);
        let props = this.context.props;
        return <div className="list-body" ref="container" style={{height: 'calc(100% - 40px)'}}>
            <Scrollbars ref="scrollBar" style={{height: '100%'}} onScroll={this.handleScroll}>
                {
                    dataSource.map((data, index) => {
                        let value = this.getValue(data);
                        let isCollapsed = this.isCollapsed(value);
                        let content = _.isFunction(props.dataSourceConfig.text) ? props.dataSourceConfig.text(data) :
                            <div>{utils.replaceText(props.dataSourceConfig.text, data)}</div>;
                        return (
                            <Item key={value}
                                  data={data}
                                  selected={value == selectedValue}
                                  onClick={props.multiple ? undefined : this.handleClick(data)}
                                  hide={this.isHide(value)}>
                                <div className={"flex middle"}
                                     style={{paddingLeft: data.indent, height: this.context.props.rowHeight}}>
                                    {
                                        props.hasCollapsed ? <Icon type="button"
                                                                   name={isCollapsed ? "plus-square" : "minus-square"}
                                                                   size={14}
                                                                   buttonStyle={{opacity: data.children && data.children.length > 0 ? 1 : 0}}
                                                                   onClick={this.handleCollapse(data, !isCollapsed)}/> : null
                                    }
                                    {
                                        props.multiple ? <div className="flex middle">
                                            <Control type="checkbox" size="small" styleProps={{style: {marginTop: 0}}} onChange={this.handleCheck(data)} value={this.isCheck(data)}/>
                                            <div>{content}</div>
                                        </div> : content
                                    }
                                </div>
                            </Item>
                        )
                    })
                }
            </Scrollbars>
        </div>
    }
}