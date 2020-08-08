import React, {Component} from 'react';
import Text from './Text';
import Popover from "./Popover";
import Menu from "./Menu";
import {getDataFromDataSourceByValue, getFilterDataSource, isEmpty, joinBlankSpace, replaceText} from "./tool";
import Icon from "./Icon";
import Divider from "./Divider";

export default class Auto extends Component {

    static defaultProps = {
        dataSource: [],
        dataSourceConfig: {text: 'text', value: 'value'},
        filter: undefined,
        forceSelect: true,          //强制从数据源选择
        onCreate: undefined,
        createLabel: undefined,
        updateDataSource: false     //输入内容是否更新数据源
    };

    state = {
        open: false,
        anchorEl: {},
        openType: 'focus',  //focus,pullDown
        dataSource: [],
        filterText: '',
    };

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.text = React.createRef();
        this.loadDataSource().then((dataSource) => {
            this.state.filterText = this.getCurrentText(dataSource);
            this.state.dataSource = dataSource;
            if (this.updater.isMounted(this)) {
                this.forceUpdate();
            }
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let dataSource = nextProps.dataSource;
        if (_.isArray(dataSource) && !_.isEqual(prevState.dataSource, dataSource)) {
            return {dataSource};
        }
        return null;
    }

    /**
     * 加载数据源
     * @returns {Promise<void>}
     */
    async loadDataSource() {
        let filterText = this.state.filterText;
        return _.isFunction(this.props.dataSource) ? await this.props.dataSource({filterText}) : this.props.dataSource;
    }

    focus() {
        if (this.text && this.text.current) {
            this.text.current.focus();
        }
    }

    /**
     * 输入事件
     * @param value
     */
    handleInputChange = ({value}) => {
        this.setState({filterText: value});
        if (this.props.updateDataSource && _.isFunction(this.props.dataSource)) {
            this.loadDataSource().then(dataSource => {
                this.setState({dataSource});
            });
        }
    };

    handleChange = (value) => {
        this.props.onChange && this.props.onChange({value});
    };

    /**
     * 获取焦点时，打开选项
     * @param event
     */
    handleFocus = (event) => {
        this.setState({
            openType: 'focus',
            open: true,
            anchorEl: this.ref.current
        });
    };

    /**
     * 下拉展示所有选项
     * @param event
     */
    handlePullDown = (event) => {
        event.stopPropagation();
        this.setState({
            openType: 'pullDown',
            open: true,
            anchorEl: this.ref.current
        });
    };

    /**
     * 收起选项
     * @param event
     */
    handleClose = (event) => {
        this.setState({open: false});
    };

    onRequestClose = (event) => {
        if (this.props.forceSelect) {
            if (this.state.filterText === '') {
                this.handleChange('');
            } else {
                this.setState({filterText: this.getCurrentText()});
            }
        } else {
            this.handleChange(this.state.filterText);
        }
        this.handleClose(event);
    };

    /**
     * 选择选项
     * @param value
     * @param data
     * @returns {Function}
     */
    handleSelect = ({value, data, event}) => {
        event.stopPropagation();
        this.handleClose(event);
        this.setState({filterText: this.getText(data)});
        this.handleChange(this.getValue(data));
    };

    handleCreate = (event) => {
        this.onRequestClose(event);
        setTimeout(() => {
            if (this.props.onCreate) {
                this.props.onCreate();
            }
        }, 100);
    };

    /**
     * 过滤器
     * @param data
     * @param filterText
     * @returns {*}
     */
    filter = (data, filterText) => {
        if (this.props.filter) {
            return this.props.filter(data, filterText);
        }
        let text = this.getText(data);
        return filterText === '' ? true : text.toString().indexOf(filterText) >= 0;
    };

    getDataSource() {
        if (this.state.openType === 'pullDown') {
            return this.state.dataSource;
        }
        return getFilterDataSource(this.state.filterText, this.state.dataSource, this.props.dataSourceConfig, this.filter);
    }

    getStyle() {
        let style = {...this.props.style};
        if (this.state.open) {
            style.position = 'relative';
            style.zIndex = _.get(this.props, 'popoverProps.zIndex', 1000);
        }
        return style;
    }

    getCurrentText(dataSource = this.state.dataSource) {
        let index = dataSource.indexOf(this.props.value);
        if (index >= 0) {
            return dataSource[index];
        }
        let data = getDataFromDataSourceByValue(this.props.value, dataSource, this.props.dataSourceConfig);
        return data ? this.getText(data) : (!this.props.forceSelect ? this.props.value : '');
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

    render() {
        return (
            <div ref={this.ref}>
                <div className={joinBlankSpace("flex middle between form-control", this.props.className)}
                     style={this.getStyle()} onClick={() => {
                    this.focus()
                }}>
                    <Text ref={this.text}
                          className="clear-style grow"
                          onFocus={this.handleFocus}
                          value={this.state.filterText}
                          onChange={this.handleInputChange}
                          placeholder={this.props.placeholder}
                    />
                    <div className="text-muted ripple cursor-pointer" onClick={this.handlePullDown}>
                        <Icon name="caret-down" className="text-small"/>
                    </div>
                </div>
                <Popover
                    {...this.props.popoverProps}
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    style={{
                        width: _.get(this.state.anchorEl, "offsetWidth")
                    }}
                    onRequestClose={this.onRequestClose}
                    scaleX={1}>
                    {
                        this.state.dataSource.length == 0 ? <div className="menu">
                            <div className="menu-item text-muted">没有数据</div>
                        </div> : <Menu
                            {...this.props.menuProps}
                            dataSource={this.getDataSource()}
                            dataSourceConfig={this.props.dataSourceConfig}
                            onSelect={this.handleSelect}
                            value={this.props.value}
                        />
                    }
                    {
                        this.props.onCreate && <div>
                            <Divider space={0}/>
                            <div className="menu">
                                <div className="text-primary cursor-pointer flex center middle menu-item"
                                     onClick={this.handleCreate}>
                                    <Icon name="plus"/>
                                    {this.props.createLabel}
                                </div>
                            </div>
                        </div>
                    }
                    {this.props.popoverAppend}
                </Popover>
            </div>
        );
    }

}