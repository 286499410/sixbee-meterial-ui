/**
 * Created by zhengzhaowei on 2018/5/22.
 */
import React, {Component} from 'react';
import Icon from './icon';
import $ from 'jquery';
import _ from 'lodash';

/**
 * 菜单组件
 */
export default class Nav2 extends Component {

    static defaultProps = {
        parentKey: 'parent_id',
        mode: 'vertical',
        theme: 'light',
        onClick: undefined,
        selectedKey: undefined,
        iconPrefix: 'iconfont icon-'
    };

    mode = [
        'horizontal',
        'vertical',
        'vertical-pop'
    ];

    theme = [
        'light',
        'dark'
    ];

    state = {
        dataSource: [],
        selectedKey: undefined,
        unFoldedKeySet: new Set(),
        foldedKeySet: new Set()
    };

    constructor(props) {
        super(props);
        if (props.selectedKey) {
            this.state.selectedKey = props.selectedKey;
        }
        if (props.dataSource) {
            this.getDataSource().then((dataSource) => {
                this.updateDataSource(dataSource);
            });
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        $(this.refs.container).find('>.nav-item>.sub-nav-container').each(function () {
            let height = $(this)[0].scrollHeight;
            let grandson = $(this).find('.sub-nav-container');
            if (height && grandson.length == 0 && !$(this)[0].style.maxHeight) {
                $(this).css('max-height', height);
            }
            $(this).css("width", $(this).find(".sub-nav").last().offset().left - $(this).find(".sub-nav").first().offset().left + $(this).find(".sub-nav").last().width() + 36);
            if($(window).height() - $(this).parent().offset().top < height) {
                $(this).css("top", $(window).height() - $(this).parent().offset().top - height - 20);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedKey) {
            this.state.selectedKey = nextProps.selectedKey;
        }
        if (nextProps.dataSource) {
            this.getDataSource().then((dataSource) => {
                this.updateDataSource(dataSource);
            });
        }
    }

    getDataSource = () => {
        return new Promise((resolve, reject) => {
            let dataSource = this.props.dataSource;
            if (_.isFunction(dataSource)) {
                dataSource = dataSource();
            }
            if (_.isArray(dataSource)) {
                resolve(dataSource);
            } else if (_.isFunction(dataSource)) {
                dataSource = dataSource();
                if (_.isArray(dataSource)) {
                    resolve(dataSource);
                } else if (dataSource instanceof Promise) {
                    dataSource.then((data) => {
                        if (_.isArray(data)) {
                            resolve(data);
                        }
                    })
                }
            } else if (dataSource instanceof Promise) {
                dataSource.then((data) => {
                    if (_.isArray(data)) {
                        resolve(data);
                    }
                })
            }
        })
    };

    updateDataSource = (dataSource) => {
        this.state.dataSource = dataSource;
        if (this.state.selectedKey) {
            this.initFold();
        }
        this.forceUpdate();
    };

    initFold(dataSource = this.state.dataSource, parent) {
        let parentKey = parent ? parent.key || parent.dataKey : '';
        dataSource.map((item) => {
            let key = item.key || item.dataKey;
            if (item.url == this.state.selectedKey) {
                if (parent) {
                    this.state.unFoldedKeySet.add(parentKey);
                }
            }
            if (item.children) {
                this.initFold(item.children, item);
                if (this.state.unFoldedKeySet.has(key) && parent) {
                    this.state.unFoldedKeySet.add(parentKey);
                }
            }
        });
    }

    getRootRef = (key) => {
        let ref = this.refs[key];
        if (ref && ref.props.parentKey) {
            return this.getRootRef(ref.props.parentKey);
        }
        return ref;
    };

    isCollapsed = () => {
        return this.props.collapsed || false;
    };

    isSelected = (item) => {
        let selectedKey = this.state.selectedKey === undefined ? this.props.defaultSelectedKey : this.state.selectedKey;
        let key = item.key || item.dataKey;
        return key == selectedKey || item.url == selectedKey;
    };

    isFolded = (item) => {
        let key = item.key || item.dataKey;
        if (this.state.unFoldedKeySet.has(key)) {
            return false;
        }
        return item.open === false || this.state.foldedKeySet.has(key) || this.props.defaultFolded;
    };

    handleSelect = (item) => (event) => {
        let key = item.key || item.dataKey;
        if (this.state.selectedKey != key) {
            if (this.props.onClick) {
                this.props.onClick(item);
            }
            this.setState({selectedKey: key});
        }
        if (this.props.mode == 'vertical-pop') {
            let ref = this.getRootRef(key);
            if (ref) {
                ref.setState({popHidden: true});
            }
        }
    };

    handleFold = (item, parentKey) => (event) => {
        let key = item.key || item.dataKey;
        if (this.props.mode == 'vertical') {
            if (!parentKey) {
                this.state.dataSource.map((data) => {
                    this.state.foldedKeySet.delete(data.key || data.dataKey);
                    this.state.unFoldedKeySet.delete(data.key || data.dataKey);
                });
            }
            if ($(event.target).parent().is('.folded') || $(event.target).parent().parent().is('.folded')) {
                this.state.foldedKeySet.delete(key);
                this.state.unFoldedKeySet.add(key);
            } else {
                this.state.foldedKeySet.add(key);
                this.state.unFoldedKeySet.delete(key);
            }
            this.forceUpdate();
        }
    };

    renderNavItem = (item, parentKey = 0) => {
        let key = item.key || item.dataKey;
        if (_.isArray(item.children) && item.children.length > 0) {
            let children = [], selected = false, groups = [];
            item.children.map((subItem, index) => {
                if (groups.indexOf(subItem.group_name) < 0) {
                    groups.push(subItem.group_name);
                }
                let col = parseInt(index / 7);
                let ret = this.renderNavItem(subItem, key);
                if (!children[col]) {
                    children[col] = [];
                }
                children[col].push(ret.component);
                selected = selected || ret.selected;
            });
            const hasGroups = groups.length > 2 || (groups.length == 1 && groups[1]);
            return {
                component: <Subnav
                    key={key}
                    parentKey={parentKey}
                    itemKey={key}
                    label={item.label || item.title}
                    icon={item.icon}
                    iconPrefix={this.props.iconPrefix}
                    folded={this.isFolded(item)}
                    selected={selected}
                    containerStyle={hasGroups ? {
                        maxHeight: 400,
                        flexWrap: "wrap",
                        flexDirection: "column",
                        ...item.subStyle
                    } : undefined}
                    onClick={this.handleFold(item, parentKey)}>
                    {
                        !hasGroups ? children.map((data, index) => {
                            return <ul key={index} className="sub-nav">{data}</ul>
                        }) : groups.map((group_name, index) => {
                            return <ul key={index} className="sub-nav">
                                <li className="text-primary" style={{fontSize: 16, paddingLeft: 14}}>
                                    {
                                        _.get(item, `groupHelperText.${group_name}`) ? <div className="flex middle">
                                            <div>{group_name}</div>
                                            <div><Icon type="button" name="question-circle" tooltip={_.get(item, `groupHelperText.${group_name}`)} color="#222"/></div>
                                        </div> : group_name
                                    }
                                </li>
                                {item.children.filter(subItem => subItem.group_name == group_name).map(subItem => {
                                    return this.renderNavItem(subItem, key).component;
                                })}
                            </ul>
                        })
                    }
                </Subnav>,
                selected: selected
            }
        } else {
            let selected = this.isSelected(item);
            return {
                component: <NavItem
                    key={key}
                    parentKey={parentKey}
                    itemKey={key}
                    selected={this.isSelected(item)}
                    onClick={this.handleSelect(item)}
                    icon={item.icon}
                    iconPrefix={this.props.iconPrefix}
                    helperText={item.helper_text}
                    label={item.label || item.title}/>,
                selected: selected
            }
        }
    };

    render() {
        return <ul ref="container"
                   className={`nav ${this.props.mode} ${this.props.theme} ${this.isCollapsed() ? 'collapsed' : ''}`}
                   style={this.props.style}>
            {
                this.state.dataSource.map((item) => {
                    return this.renderNavItem(item).component;
                })
            }
        </ul>
    }

}

class Subnav extends Component {

    state = {
        popHidden: false
    };

    handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    handleDoubleClick = (event) => {
        if (this.props.onDoubleClick) {
            this.props.onDoubleClick(event);
        }
    };

    handleMouseEnter = (event) => {
        if (this.state.popHidden == true) {
            this.setState({popHidden: false});
        }
    };

    render() {
        return <li auth-key={this.props.itemKey}
                   className={`nav-item${this.props.folded ? ' folded' : ''}${this.props.selected ? ' as-selected' : ''}${this.state.popHidden ? ' pop-hidden' : ''}`}>
            <label className="folder" onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}
                   onMouseEnter={this.handleMouseEnter}>
                {
                    this.props.icon ? <Icon name={this.props.icon} classPrefix={this.props.iconPrefix}
                                            iconStyle={{paddingRight: 6}}/> : null
                }
                <span className="label">{this.props.label}</span>
                <i className="arrow"></i>
            </label>
            <div className="sub-nav-container" style={this.props.containerStyle}>
                {this.props.children}
            </div>
        </li>
    }
}

class NavItem extends Component {

    handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    render() {
        return <li className={`nav-item ${this.props.selected ? ' selected' : ''}`} data-key={this.props.itemKey}
                   auth-key={this.props.itemKey}>
            <label onClick={this.handleClick}>
                {
                    this.props.icon ? <Icon name={this.props.icon} classPrefix={this.props.iconPrefix}
                                            style={{paddingRight: 6}}/> : null
                }
                <span className="label" style={this.props.selected && this.props.helperText ? {transform: "none"} : undefined}>
                    {
                        this.props.helperText ? <div className="flex middle">
                            <div>{this.props.label}</div>
                            <Icon type="button" name="question-circle" tooltip={this.props.helperText} color="#222"/>
                        </div> : this.props.label
                    }
                </span>

            </label>

        </li>
    }
}


