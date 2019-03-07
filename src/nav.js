import React, {Component} from 'react';
import Icon from './icon';
import Sortable from 'react-sortablejs';


const style = {
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        color: '#485065'
    },
    wrapper: {
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        height: '100%',
        transition: 'width .3s linear',
    },
    removeIcon: {
        position: 'absolute',
        right: 6,
        top: 0,
        color: '#969db0'
    }
};

/**
 * 菜单组件
 */
export default class Nav extends Component {

    static defaultProps = {
        customs: [],                //自定义菜单列表
        onChange: undefined,        //自定义菜单改变后触发
        dataSource: [],             //数据源
        showAll: true,              //是否显示所有菜单
        onClick: undefined,         //点击触发
        iconWidth: 40,              //菜单宽度
        itemWidth: 200,             //展开宽度
        itemHeight: 40,             //自定义菜单项高度
    };

    dataMap = {};

    state = {
        width: 40,
        customs: [],
        open: false,
        anchorEl: {},
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    handleChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state.customs);
        }
    }

    initData(props) {
        if (props.customs !== undefined) {
            this.state.customs = props.customs;
        }
        this.state.width = this.props.iconWidth;
    }

    /**
     * 鼠标按键类型
     * @param event
     * @returns {*}，0左键，1滚轮建，2右键
     */
    getClickType(event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    }

    findIndex(item) {
        return _.findIndex(this.state.customs, (n) => {
            return n.id == item.id;
        });
    }


    /**
     * 点击所有菜单
     * @param event
     */
    handleAllMenuClick = (event) => {
        this.setState({showAll: !this.state.showAll});
    };

    /**
     * 点击菜单项
     * @param data
     * @returns {Function}
     */
    handleClick = (data) => (event) => {
        let clickType = this.getClickType(event);
        if (this.props.onClick) {
            this.props.onClick(data, clickType);
        }
        this.handleClose(event);
    };

    /**
     *
     * @param event
     */
    handleOpen = (event) => {
        this.setState({open: true});
    };

    handleClose = (event) => {
        this.setState({
            open: false,
            showAll: false
        });
    };

    /**
     * 删除自定义菜单
     * @param key
     * @returns {Function}
     */
    handleRemove = (custom) => (event) => {
        event.stopPropagation();
        let clickType = this.getClickType(event);
        if (clickType == 0) {
            _.remove(this.state.customs, (n) => {
                return n.id == custom.id;
            });
            this.forceUpdate();
            this.handleChange();
        }
    };

    /**
     * 添加自定义菜单
     * @param key
     * @returns {Function}
     */
    handleAdd = (item) => (event) => {
        event.stopPropagation();
        let clickType = this.getClickType(event);
        if (clickType == 0) {
            if (this.findIndex(item) == -1) {
                this.state.customs.push(item);
                this.forceUpdate();
                this.handleChange();
            }
        }
    };

    renderAll() {
        let dataSource = this.props.dataSource;
        let nodes = [];
        dataSource.map((row, i) => {
            if(row.children && row.children.length > 0) {
                nodes.push(<div key={i} auth-key={row.dataKey} style={{width: 164, marginBottom: 16, marginLeft: 8}}>
                    <div className="text-bold text-default" style={{padding: 8}}>{row.label}</div>
                    <div>
                        {row.children.map((child, j) => {
                            let index = this.findIndex(child);
                            return <div key={j} className="flex middle hover-bg hover cursor-pointer relative text-small"
                                        style={{padding: 8, userSelect: 'none'}}
                                        onClick={this.handleClick(child)}
                            >
                                <div>{child.label}</div>
                                {
                                    index >= 0 ?
                                        <div className="text-primary" style={{position: 'absolute', right: 0}}>
                                            <Icon type="button"
                                                  name="star-fill"
                                                  size={16}
                                                  onClick={this.handleRemove(child)}
                                            />
                                        </div> :
                                        <div className="text-primary hover-show" style={{position: 'absolute', right: 0}}>
                                            <Icon type="button"
                                                  name="star"
                                                  size={16}
                                                  onClick={this.handleAdd(child)}
                                            />
                                        </div>
                                }
                            </div>
                        })}
                    </div>
                </div>);
            }
        });
        return <div className="flex" style={{
            padding: 20,
            lineHeight: 1.4,
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: 550,
            width: 970
        }}>
            <div style={{position: 'absolute', right: 8, top: 8, lineHeight: 1}}>
                <Icon type="button"
                      name="close"
                      onClick={this.handleClose}/>
            </div>
            {nodes}
        </div>
    }

    handleOrder = (order, sortable, evt) => {
        let hash = {}, customs = [];
        this.state.customs.map(custom => hash[custom.id] = custom);
        order.map(id => {
            customs.push(hash[id]);
        });
        this.setState({customs: customs});
        this.handleChange();
    };

    render() {
        return <div style={style.container}>
            <div className="border-right-primary"
                 style={{...style.wrapper, width: this.state.open ? this.props.itemWidth : this.props.iconWidth}}
                 onMouseEnter={this.handleOpen}>
                <div className="flex middle cursor-pointer hover-bg"
                     style={{height: this.props.itemHeight, width: this.props.itemWidth}}
                     onClick={this.handleAllMenuClick}>
                    <div className="flex middle center"
                         style={{width: this.props.iconWidth, height: this.props.itemHeight}}>
                        <Icon name="menu" size={20}/>
                    </div>
                    <div className="relative" style={{width: this.props.itemWidth - this.props.iconWidth}}>
                        所有菜单
                        <div style={style.removeIcon}>
                            <Icon size={16} name="right"/>
                        </div>
                    </div>
                </div>
                <Sortable onChange={this.handleOrder}>
                    {
                        this.state.customs.map((custom, index) => {
                            return <div key={index} className="flex middle cursor-pointer hover hover-bg"
                                        data-id={custom.id}
                                        style={{height: this.props.itemHeight, width: this.props.itemWidth}}
                                        onClick={this.handleClick(custom)}>
                                <div className="flex middle center"
                                     style={{width: this.props.iconWidth, height: this.props.itemHeight}}>
                                    <Icon name={custom.icon} size={20}/>
                                </div>
                                <div className="relative" style={{width: this.props.itemWidth - this.props.iconWidth}}>
                                    {custom.label}
                                    <div className="hover-show" style={style.removeIcon}>
                                        <Icon type="button" size={16} name="close" padding={2}
                                              onClick={this.handleRemove(custom)}/>
                                        <Icon type="button" size={16} name="drag" padding={2}/>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </Sortable>
            </div>
            {
                this.state.showAll ? <div style={{
                    position: 'absolute',
                    zIndex: 10,
                    left: this.props.itemWidth,
                    bottom: 0,
                    top: 0,
                    cursor: 'default'
                }} className="bg-white border-right-primary" onClick={(event) => {
                    event.stopPropagation();
                }}>
                    {this.renderAll()}
                </div> : null
            }
            {
                this.state.open ? <div style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9
                }} onMouseEnter={this.handleClose} onClick={this.handleClose}></div> : null
            }
        </div>
    }

}
