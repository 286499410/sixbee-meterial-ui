/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import {Scrollbars} from 'react-custom-scrollbars';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import _ from 'lodash';
import Dialog from '../dialog';
import style from '../style'
import utils from '../utils';
import Table from '../table';
import Button from "../button";
import Icon from '../icon';

const selectStyle = {
    wrapper: {},
    filter: {marginTop: 12, paddingLeft: 16, paddingRight: 16}
};

export default class Select extends Component {

    static defaultProps = {
        borderShow: true,           //是否显示下划线
        openOnFocus: true,          //获取焦点时是否显示选项
        hasClear: true,             //最右边是否显示清除按钮
        labelFixed: false,          //是否固定标签
        disabled: false,            //是否禁止输入
        immutable: false,           //是否不可更改
        dataSourceConfig: {text: 'text', value: 'value'}, //数据配置，text支持多参数，例如{text: '[code] [name]', value: 'value'},
        hasFilter: false,           //是否支持过滤
        reloadDataSource: false,    //是否重载dataSource，主要应用于异步获取数据源，如果是true，dataSource必须为函数
        dataSource: [],             //数据源，支持函数，数组，Promise
        hintText: undefined,        //输入提示
        errorText: undefined,       //错误提示
        maxSearchResults: undefined,//最大的搜索结果
        multiple: false,            //是否多选
        carryKey: true,             //多选时，值是否携带KEY
        rows: 1,                    //行数
        fullWidth: true,            //宽度100%显示
        size: 'default',
        cancel: false,              //是否取消选择
        menuWidth: 'auto',
        mode: 'inline',             //选择模式，inline，dialog
        tableProps: undefined,      //若传了该参数，这启用表格模式选择，要穿columns,columnWidths等
        footer: undefined,
        emptyTip: '没有数据',
    };

    indent = {
        small: 24,
        default: 28,
        large: 32,
    };

    state = {
        value: undefined,
        dataSource: [],
        tableState: {},
        filterText: '',
        open: false,
        anchorEl: undefined
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        this.setDataSource(props.dataSource);
        if (props.hasOwnProperty('value')) {
            this.state.value = props.value;
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue = (value) => {
        this.state.value = value;
        if (this.props.onChange) {
            this.props.onChange(value, this);
        }
        this.forceUpdate();
    };

    /**
     * 获取值
     * @returns {*}
     */
    getValue() {
        let value = (this.state.value === undefined ? this.props.defaultValue : this.state.value);
        return value === undefined ? (this.props.multiple ? [] : undefined) : value;
    }

    /**
     * 清除所有值
     */
    clearValue = () => {
        if (this.props.multiple) {
            this.setValue([]);
        } else {
            this.setValue(null);
        }
    };

    /**
     * 设置数据源
     * @param dataSource
     */
    setDataSource = (dataSource = this.props.dataSource) => {
        utils.getDataSource(undefined, dataSource, this.props.dataSourceConfig, this).then((dataSource) => {
            this.setState({dataSource: dataSource});
        });
    };

    /**
     * 获取下拉菜单选项
     * @param data
     * @param level
     * @param indent
     * @returns {Array}
     */
    getOptions = (data, level = 1, indent = 0) => {
        let dataSourceConfig = this.props.dataSourceConfig;
        let options = [];
        data.map((row) => {
            let selectText = _.get(row, dataSourceConfig.searchText || dataSourceConfig.text);
            if (this.props.hasFilter && this.state.filterText !== '' && selectText.indexOf(this.state.filterText) == -1) {
                return;
            }
            options.push({
                text: _.get(row, dataSourceConfig.text),
                value: row[dataSourceConfig.value],
                selectText: selectText,
                indent: (level - 1) * indent,
                disabled: row.disabled
            });
            if (row.children && row.children.length > 0) {
                let children = this.getOptions(row.children, level + 1, indent);
                options = options.concat(children);
            }
        });
        return options;
    };

    /**
     * 获取过滤的数据源
     */
    getFilterDataSource = (data) => {
        let dataSourceConfig = this.props.dataSourceConfig;
        let dataSource = [];
        data.map((row) => {
            let selectText = _.get(row, dataSourceConfig.searchText || dataSourceConfig.text);
            if (this.props.hasFilter && this.state.filterText !== '' && selectText.indexOf(this.state.filterText) == -1) {
                return;
            }
            dataSource.push(row);
            if (row.children && row.children.length > 0) {
                let children = this.getFilterDataSource(row.children);
                dataSource = dataSource.concat(children);
            }
        });
        return dataSource;
    };

    /**
     * 获取所有下拉菜单选项
     * @param data
     * @param level
     * @param indent
     * @returns {Array}
     */
    getAllOptions = (data, level = 1, indent = 0) => {
        let dataSourceConfig = this.props.dataSourceConfig;
        let options = [];
        data.map((row) => {
            let selectText = _.get(row, dataSourceConfig.searchText || dataSourceConfig.text);
            options.push({
                text: _.get(row, dataSourceConfig.text),
                value: row[dataSourceConfig.value],
                selectText: selectText,
                indent: (level - 1) * indent,
                disabled: row.disabled
            });
            if (row.children && row.children.length > 0) {
                let children = this.getOptions(row.children, level + 1, indent);
                options = options.concat(children);
            }
        });
        return options;
    };

    /**
     * 根据value获取data
     * @param value
     * @returns {*}
     */
    getData(value) {
        let index = _.findIndex(this.state.dataSource, (o) => {
            return _.get(o, this.props.dataSourceConfig.value) == value;
        });
        return index >= 0 ? this.state.dataSource[index] : undefined;
    }

    handleClick = (event) => {
        if (!this.props.disabled) {
            this.setState({
                open: true,
                anchorEl: event.currentTarget,
            })
        }
    };

    handleChange = (data) => {
        if (this.props.multiple === false) {
            this.state.open = false;
        }
        this.setValue(data);
    };

    handleFilter = (event) => {
        this.state.filterText = event.target.value;
        this.setState({filterText: event.target.value});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleDelete = (value) => (event) => {
        let originValue = this.state.value;
        if (this.props.multiple) {
            originValue.splice(this.indexOf(value), 1);
        } else {
            originValue = value;
        }
        this.setValue(originValue);
    };

    indexOf(value, data = this.state.value) {
        return _.findIndex(data, (n) => {
            return this.props.carryKey ? _.get(n, this.props.dataSourceConfig.value) == value : n == value;
        });
    }

    /**
     * 是否已选
     * @param value
     * @returns {boolean}
     */
    isChecked(value) {
        if (this.props.multiple) {
            return this.indexOf(value) >= 0;
        } else {
            return this.state.value == value;
        }
    }

    /**
     * 获取已选择的文本
     */
    getSelectedText() {
        let selectedText = [];
        let value = this.getValue();
        let options = this.getAllOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]);
        options.map((data) => {
            if (this.props.multiple) {
                if (value.indexOf(data.value) >= 0) {
                    selectedText.push(data.selectText || data.text);
                }
            } else if (value === data.value) {
                selectedText.push(data.selectText || data.text);
            }
        });
        return selectedText.join(',');
    }

    handleStateChange = (state) => {
        let dataSource = this.getFilterDataSource(this.state.dataSource);
        let originValue = _.cloneDeep(this.getValue());
        Object.keys(state.checked || {}).map(id => {
            let data = _.find(dataSource, {id: parseInt(id)});
            let value = _.get(data, this.props.dataSourceConfig.value);
            if (data && !this.isChecked(value)) {
                if (this.props.carryKey) {
                    value = {};
                    _.set(value, this.props.dataSourceConfig.value, data.value);
                }
                originValue.push(value);
            }
        });
        dataSource.map(data => {
            let value = _.get(data, this.props.dataSourceConfig.value);
            if (!state.checked[data.id]) {
                //未选的，在原值中删除
                if (this.isChecked(value)) {
                    originValue.splice(this.indexOf(value, originValue), 1);
                }
            }
        });
        this.state.tableState = state;
        this.setValue(originValue);
    };

    getContent() {
        let value = this.getValue();
        let styleProps = _.merge(style.getStyle('select', this.props), this.props.styleProps);
        let options = this.getOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]);
        let menuWidth = this.state.anchorEl && this.props.fullWidth ? this.state.anchorEl.clientWidth : this.props.menuWidth;
        if (this.props.tableProps === undefined) {
            return <div>
                {
                    this.props.hasFilter ? <div style={selectStyle.filter}>
                        <TextField hintText="输入关键字筛选"
                                   name="filterText"
                                   fullWidth
                                   value={this.state.filterText}
                                   autoComplete={"off"}
                                   onChange={this.handleFilter}/>
                    </div> : null
                }
                <div className="flex">
                    <div style={{width: menuWidth}}>
                        <Options
                            dataSource={options}
                            styleProps={styleProps}
                            onChange={this.handleChange}
                            value={value}
                            defaultValue={this.props.defaultValue}
                            multiple={this.props.multiple}
                            carryKey={this.props.carryKey}
                            dataSourceConfig={this.props.dataSourceConfig}
                            cancel={this.props.cancel}
                            footer={this.props.footer}
                            context={this}
                            emptyTip={this.props.emptyTip}
                        />
                    </div>
                    {
                        this.props.hasFilter && this.props.multiple && _.isArray(value) && value.length > 0 ?
                            <div style={{padding: '0 4px', width: menuWidth, minWidth: 160}}>
                                <div style={{marginBottom: 3}}>已选</div>
                                <Scrollbars style={{maxHeight: 400}} autoHeight>
                                    {(value || []).map((value, index) => {
                                        let data = this.getData(this.props.carryKey ? _.get(value, this.props.dataSourceConfig.value) : value);
                                        return <div key={index} className="tag tag-default flex middle between"
                                                    style={{marginRight: 4, marginBottom: 4}}>
                                            <div style={{marginRight: 12}}
                                                 className="text-ellipsis">{_.get(data, this.props.dataSourceConfig.text)}</div>
                                            <div className="cursor-pointer" onClick={this.handleDelete(value)}><i
                                                className="iconfont icon-close text-small"></i></div>
                                        </div>
                                    })}
                                </Scrollbars>
                            </div> : null
                    }
                </div>
            </div>
        } else {
            let checked = {};
            let dataSource = this.getFilterDataSource(this.state.dataSource);
            dataSource.map(data => {
                let value = _.get(data, this.props.dataSourceConfig.value);
                if (this.isChecked(value)) {
                    checked[data.id] = true;
                }
            });
            return <div className="relative space">
                <div className="flex">
                    <div>
                        {
                            this.props.hasFilter ? <div>
                                <TextField hintText="输入关键字筛选"
                                           name="filterText"
                                           fullWidth
                                           value={this.state.filterText}
                                           autoComplete={"off"}
                                           onChange={this.handleFilter}/>
                            </div> : null
                        }
                        <Table
                            containerHeight={300}
                            {...this.props.tableProps}
                            dataSource={dataSource}
                            {...this.state.tableState}
                            checked={checked}
                            onStateChange={this.handleStateChange}
                        />
                    </div>
                    <div style={{paddingLeft: 12, width: menuWidth, minWidth: 160}}>
                        <div className="flex between" style={{marginBottom: 10, marginTop: 20}}>
                            <div>已选</div>
                            <div className="text-primary cursor-pointer" onClick={this.clearValue}>全不选</div>
                        </div>
                        <Scrollbars style={{maxHeight: 400}} autoHeight>
                            {(value || []).map((value, index) => {
                                let data = this.getData(this.props.carryKey ? _.get(value, this.props.dataSourceConfig.value) : value);
                                return <div key={index} className="tag tag-default flex middle between"
                                            style={{marginRight: 4, marginBottom: 4}}>
                                    <div style={{marginRight: 12}}
                                         className="text-ellipsis">{_.get(data, this.props.dataSourceConfig.text)}</div>
                                    <div className="cursor-pointer" onClick={this.handleDelete(value)}>
                                        <i className="iconfont icon-close text-small"></i>
                                    </div>
                                </div>
                            })}
                        </Scrollbars>
                    </div>
                </div>
                <div style={{height: 52}}></div>
                <div className="bg-white space"
                     style={{
                         position: 'absolute',
                         bottom: 0,
                         left: 0,
                         right: 0,
                         textAlign: 'right',
                         boxShadow: '0 -1px 5px #ddd',
                         zIndex: 2,
                     }}>
                    <Button type="primary" label="确定" onClick={this.handleRequestClose}/>
                </div>
            </div>
        }
    }

    render() {
        let borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
        let value = this.getValue();
        let styleProps = _.merge(style.getStyle('select', this.props), this.props.styleProps);
        let label = this.props.label;
        let selectValue = (this.props.multiple && this.props.carryKey) ? (value || []).map((n) => (_.get(n, this.props.dataSourceConfig.value))) : value;
        let selectField;
        if (borderStyle !== 'underline') {
            selectField =
                <div className={"flex middle between full-width" + (this.props.disabled ? ' text-disabled' : '')}>
                    <div style={{textAlign: this.props.textAlign || 'left', flexGrow: 1}}>{this.getSelectedText()}</div>
                    <div style={{width: 16, textAlign: 'right'}}>
                        <i className="iconfont icon-caret-down" style={{fontSize: 12, color: 'rgba(0,0,0,0.3)'}}/>
                    </div>
                </div>;
        } else {
            selectField = <SelectField value={selectValue}
                                       name={this.props.name || this.props.dataKey || utils.uuid()}
                                       floatingLabelText={label}
                                       multiple={this.props.multiple}
                                       fullWidth={this.props.fullWidth}
                                       disabled={this.props.disabled}
                                       hintText={this.props.hintText}
                                       errorText={borderStyle === "underline" ? this.props.errorText : undefined}
                                       floatingLabelFixed={this.props.labelFixed}
                                       underlineShow={borderStyle === 'underline' && this.props.borderShow}
                                       {...styleProps}>
                {this.getAllOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]).map((option, index) => {
                    return <MenuItem key={index}
                                     value={option.value}
                                     label={option.text}
                                     primaryText={option.selectText || option.label}
                                     disabled={option.disabled}
                                     innerDivStyle={styleProps.menuItemStyle.innerDivStyle}
                                     style={{textIndent: option.indent}}
                    />
                })}
            </SelectField>;
        }
        let content = this.getContent();
        return <div className="flex middle relative" style={{overflow: 'hidden', ...this.props.style, ...this.props.rootStyle}}>
            <div style={{flexGrow: 1}}
                 className={"relative" + (this.props.disabled ? ' text-disabled' : ' cursor-pointer')}
                 onClick={this.handleClick}>
                {
                    borderStyle === 'border' && this.props.borderShow ? <div className="full-width">
                        <div
                            className={"control-border" + (this.state.focus || this.state.open ? ' focus' : '') + (this.props.errorText ? ' error' : '')}>{selectField}</div>
                        <div className="text-small text-danger" style={{marginTop: 2}}>{this.props.errorText}</div>
                    </div> : <div>{selectField}
                        <div className="full-screen"></div>
                    </div>
                }
            </div>
            {
                this.props.events ?
                    <div style={{
                        position: 'relative',
                        top: borderStyle === "underline" ? 18 : 0,
                        paddingLeft: 6,
                        width: this.props.events.length * 20 + 6,
                        paddingBottom: 1,
                        height: 30
                    }}
                         className="flex middle center">
                        {
                            this.props.events.map((event) => {
                                return <IconButton iconStyle={{color: '#aaa', fontSize: 20, ...event.iconStyle}}
                                                   title={event.title}
                                                   key={event.icon}
                                                   iconClassName={"iconfont icon-" + event.icon}
                                                   onClick={event.onClick.bind(this, this)}
                                                   style={event.style}
                                />
                            })
                        }
                    </div> : null
            }
            {
                this.props.mode == 'inline' ? <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: "left", vertical: "bottom"}}
                    targetOrigin={{horizontal: "left", vertical: "top"}}
                    onRequestClose={this.handleRequestClose}>
                    {content}
                </Popover> : (this.state.open ? <Dialog
                    title={label}
                    open={this.state.open}
                    modal={true}
                    onClose={this.handleRequestClose}>
                    {content}
                </Dialog> : null)
            }

        </div>
    }

}

class Options extends Component {

    state = {};

    constructor(props) {
        super(props);
    }

    handleItemClick = (event, menuItem, index) => {
        let data = this.props.dataSource[index];
        if (data) {
            let value = data.value, originValue = this.props.value || [];
            if (this.props.multiple) {
                if (this.isChecked(value)) {
                    originValue.splice(this.indexOf(value), 1);
                } else {
                    if (this.props.carryKey) {
                        value = {};
                        _.set(value, this.props.dataSourceConfig.value, data.value);
                    }
                    originValue.push(value);
                }
            } else {
                originValue = value;
            }
            if (this.props.onChange) {
                this.props.onChange(originValue);
            }
        } else {
            if (this.props.onChange) {
                this.props.onChange(this.props.multiple ? [] : null);
            }
        }
    };

    indexOf(value) {
        return _.findIndex(this.props.value, (n) => {
            return this.props.carryKey ? _.get(n, this.props.dataSourceConfig.value) == value : n == value;
        });
    }

    isChecked(value) {
        if (this.props.multiple) {
            return this.indexOf(value) >= 0;
        } else {
            return this.props.value == value;
        }
    }

    render() {
        return <div>
            {
                this.props.dataSource.length > 0 ? <Scrollbars style={{maxHeight: 300}} autoHeight>
                    <Menu style={this.props.styleProps.dropDownMenuProps}
                          listStyle={this.props.styleProps.listStyle}
                          menuItemStyle={this.props.styleProps.menuItemStyle}
                          disableAutoFocus={true}
                          onItemClick={this.handleItemClick}>
                        {this.props.dataSource.map((option, index) => {
                            let style = {textIndent: option.indent};
                            if (this.isChecked(option.value)) {
                                style.color = '#FF0099';
                            }
                            return <MenuItem key={index}
                                             value={option.value}
                                             label={option.text}
                                             primaryText={option.selectText || option.label}
                                             disabled={option.disabled}
                                             innerDivStyle={this.props.styleProps.menuItemStyle.innerDivStyle}
                                             style={style}
                            />
                        })}
                        {
                            this.props.cancel ? <MenuItem value={null}
                                                          primaryText={"取消选择"}
                                                          innerDivStyle={this.props.styleProps.menuItemStyle.innerDivStyle}
                                                          style={{color: '#9b9b9b'}}
                            /> : null
                        }
                    </Menu>
                </Scrollbars> : <div className="space-small text-muted">{this.props.emptyTip}</div>
            }
            {
                this.props.footer ? <div>
                    <Divider/>
                    <div className="flex center middle text-primary hover-bg border-top cursor-pointer relative"
                         style={{height: 40}}
                         onClick={() => {
                             this.props.context.setState({open: false});
                             this.props.footer.onClick(this.props.context);
                         }}>
                        <Icon name={this.props.footer.icon}/>
                        <div>{this.props.footer.title}</div>
                    </div>
                </div> : null
            }
        </div>
    }
}
