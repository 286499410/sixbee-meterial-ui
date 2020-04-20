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
            if (height && grandson.length == 0) {
                $(this).css('max-height', height);
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
            if(_.isFunction(dataSource)) {
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
            let children = [], selected = false;
            item.children.map((subitem, index) => {
                let col = parseInt(index / 7);
                let ret = this.renderNavItem(subitem, key);
                if(!children[col]) {
                    children[col] = [];
                }
                children[col].push(ret.component);
                selected = selected || ret.selected;
            });
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
                    onClick={this.handleFold(item, parentKey)}>
                    {
                        children.map((data, index) => {
                            return <ul key={index} className="sub-nav">{data}</ul>
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
                    this.props.icon ? <Icon name={this.props.icon} classPrefix={this.props.iconPrefix} iconStyle={{paddingRight: 6}}/> : null
                }
                <span className="label">{this.props.label}</span>
                <i className="arrow"></i>
            </label>
            <div className="sub-nav-container">
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
        return <li className={`nav-item${this.props.selected ? ' selected' : ''}`} data-key={this.props.itemKey}
                   auth-key={this.props.itemKey}>
            <label onClick={this.handleClick}>
                {
                    this.props.icon ? <Icon name={this.props.icon} classPrefix={this.props.iconPrefix} style={{paddingRight: 6}}/> : null
                }
                <span className="label">{this.props.label}</span>
            </label>
        </li>
    }
}


