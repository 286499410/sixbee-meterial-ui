import React, {Component} from 'react';
import {forEach, getDataSource, joinBlankSpace, replaceText} from "./tool";
import Icon from "./Icon";
import Popover from "./Popover";

export default class Menu extends Component {

    static defaultProps = {
        dataSource: [],
        dataSourceConfig: {text: 'text', value: 'value'},
        value: undefined,
        onSelect: undefined,
        virtual: false,
        indent: 14,
        childrenShowMethod: undefined,          //popover 弹出，fold 折叠
        clickParentShowChildren: false,         //点击父级显示子级
        defaultFolded: false,                   //默认是否折叠
    };

    state = {
        scrollTop: 0,
        rowHeight: 32,
        height: 300,
        foldSet: new Set(),
        unFoldSet: new Set(),
        poppedSet: {}
    };

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.className && nextProps.className.toString().indexOf('text-small') >= 0) {
            return {rowHeight: 24};
        }
        return null;
    }

    componentDidMount() {
        if (this.containerRef.current) {
            this.state.height = _.get(this.containerRef.current, 'clientHeight') || this.state.height;
            this.state.rowHeight = _.get(this.containerRef.current, 'children[1].clientHeight') || this.state.rowHeight;
            this.initScrollTop();
        }
    }

    componentDidUpdate() {

    }

    initScrollTop() {
        let index = _.findIndex(this.props.dataSource, {value: this.props.value});
        let scrollTop = Math.max((index + 1) * this.state.rowHeight - this.state.height / 2, 0);
        this.containerRef.current.scrollTop = scrollTop;
    }

    handleScroll = (event) => {
        this.isVirtual() && this.setState({scrollTop: event.target.scrollTop});
    };

    handleClick = (data) => (event) => {
        if (data.disabled) return;
        const value = this.getValue(data);
        if (this.props.childrenShowMethod === "popover") {
            Object.values(this.state.poppedSet).map(row => row.open = false);
            this.forceUpdate();
        }
        if (this.props.onSelect) {
            this.props.onSelect({value, data, event});
        }
    };

    isVirtual() {
        return this.props.virtual;
    }

    getVirtualTopSpace() {
        let {startRow} = this.getShowRows();
        return <div style={{height: startRow * this.state.rowHeight}}></div>
    }

    getVirtualBottomSpace() {
        let {endRow} = this.getShowRows();
        let rows = this.props.dataSource.length;
        return <div style={{height: (rows - 1 - endRow) * this.state.rowHeight}}></div>
    }

    getShowRows() {
        let startRow = parseInt(this.state.scrollTop / this.state.rowHeight);
        let endRow = Math.min(startRow + Math.ceil(this.state.height / this.state.rowHeight), this.props.dataSource.length - 1);
        return {startRow, endRow};
    }

    getDataSource() {
        if (this.isVirtual()) {
            let {startRow, endRow} = this.getShowRows();
            return this.props.dataSource.slice(startRow, endRow);
        } else {
            return this.props.dataSource;
        }
    }

    getText(data) {
        if (!_.isObject(data)) {
            return data;
        }
        return replaceText(data, this.props.dataSourceConfig.text);
    }

    getValue(data) {
        if (!_.isObject(data)) {
            return data;
        }
        return _.get(data, this.props.dataSourceConfig.value);
    }

    hasChildren(data) {
        return data.children && data.children.length > 0;
    }

    /**
     * 显示子级
     * @param data
     * @returns {Function}
     */
    showChildren = (data) => (event) => {
        switch (this.props.childrenShowMethod) {
            case "fold":
                this.handleFoldClick(data)(event);
                break;
            case "popover":
                this.handlePopoverClick(data)(event);
                break;
        }
    };

    /**
     * 节点是否折叠的
     * @param data
     * @returns {boolean}
     */
    isFolded(data) {
        let value = this.getValue(data);
        return this.state.foldSet.has(value) || (this.props.defaultFolded && !this.state.unFoldSet.has(value));
    }

    handleFoldClick = (data) => (event) => {
        event.stopPropagation();
        let value = this.getValue(data);
        if (this.isFolded(data)) {
            this.state.foldSet.delete(value);
            this.state.unFoldSet.add(value);
        } else {
            this.state.foldSet.add(value);
            this.state.unFoldSet.delete(value);
        }
        this.forceUpdate();
    };

    /**
     * 弹出
     * @param data
     * @returns {Function}
     */
    handlePopoverClick = (data) => (event) => {
        event.stopPropagation();
        let value = this.getValue(data);
        this.state.poppedSet = {
            [value]: {
                open: true,
                anchorEl: event.target,
            }
        };
        this.forceUpdate();
    };

    /**
     * 弹出层关闭处理事件
     * @param data
     * @returns {Function}
     */
    handlePopoverClose = (data) => (event) => {
        let value = this.getValue(data);
        this.state.poppedSet = {
            [value]: {
                open: false,
            }
        };
        this.forceUpdate();
    };

    renderMenuItem(dataSource, level = 1) {
        let menuItems = [];
        dataSource.map((data, index) => {
            let value = this.getValue(data);
            let hasChildren = this.hasChildren(data);
            let isFolded = this.isFolded(data);
            const key = value || index;
            menuItems.push(<div
                className={joinBlankSpace("menu-item flex middle between", this.props.value === value && 'text-primary', data.disabled && 'menu-item-disabled')}
                style={{height: hasChildren ? 'auto' : undefined}}
                key={key}
                onClick={hasChildren && this.props.clickParentShowChildren ? this.showChildren(data) : this.handleClick(data)}>
                <div className="menu-item-label">
                    {this.getText(data)}
                </div>
                {
                    hasChildren && this.props.childrenShowMethod === "fold" && <div className="menu-item-icon">
                        <Icon name={isFolded ? "caret-up" : "caret-down"} onClick={this.showChildren(data)}/>
                    </div>
                }
                {
                    hasChildren && this.props.childrenShowMethod === "popover" && <div className="menu-item-icon">
                        <Icon name={"caret-right"} onClick={this.showChildren(data)}/>
                    </div>
                }
            </div>);
            if (hasChildren) {
                let content = <div key={'parent' + key}
                                   className="menu"
                                   style={{marginLeft: this.props.childrenShowMethod === "popover" ? undefined : this.props.indent}}>
                    {this.renderMenuItem(data.children, level + 1)}
                </div>;
                switch (this.props.childrenShowMethod) {
                    case "fold":
                        if (!isFolded) menuItems.push(content);
                        break;
                    case "popover":
                        menuItems.push(<Popover
                            style={{width: _.get(this.containerRef, "current.offsetWidth")}}
                            key={'parent' + value}
                            {...this.state.poppedSet[value]}
                            zIndex={1000 + level}
                            anchorOrigin={"right top"}
                            targetOrigin={"left top"}
                            onRequestClose={this.handlePopoverClose(data)}
                        >
                            {content}
                        </Popover>);
                        break;
                    default:
                        menuItems.push(content);
                }
            }
        });
        return menuItems;
    }

    render() {

        return (
            <div ref={this.containerRef}
                 className={joinBlankSpace("menu", this.props.className)}
                 style={this.props.style}
                 onScroll={this.handleScroll}>
                {this.isVirtual() && this.getVirtualTopSpace()}
                {this.renderMenuItem(this.getDataSource())}
                {this.isVirtual() && this.getVirtualBottomSpace()}
            </div>
        );
    }

}