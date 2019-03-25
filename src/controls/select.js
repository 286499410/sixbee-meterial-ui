/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import _ from 'lodash';
import style from '../style'
import utils from '../utils';
import Text from './text';

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
        cancel: false               //是否取消选择
    };

    indent = {
        small: 24,
        default: 28,
        large: 32,
    };

    state = {
        value: undefined,
        dataSource: [],
        filterText: '',
        open: false,
        anchorEl: undefined
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
        if (props.value !== undefined) {
            this.state.value = props.value;
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue = (value) => {
        this.setState({value: value});
        if (this.props.onChange) {
            this.props.onChange(value, this);
        }
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

    handleChange = (data) => {
        if (this.props.multiple === false) {
            this.state.open = false;
        }
        this.setValue(data);
    };

    handleFilter = (value) => {
        this.state.filterText = value;
        this.refs.options.setDataSource(this.getOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]));
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    render() {
        let value = this.getValue();
        let styleProps = _.merge(style.getStyle('select', this.props), this.props.styleProps);
        let label = this.props.label;
        let options = this.getOptions(this.state.dataSource, 1, this.props.indent || this.indent[this.props.size]);
        let selectValue = (this.props.multiple && this.props.carryKey) ? (value || []).map((n) => (_.get(n, this.props.dataSourceConfig.value))) : value;
        return <div className="relative" style={{overflow: 'hidden'}}>
            <div className="relative cursor-pointer" onClick={(event) => {
                if (!this.props.disabled) {
                    this.setState({
                        open: true,
                        anchorEl: event.currentTarget,
                    })
                }
            }}>
                <SelectField value={selectValue}
                             name={this.props.name || this.props.dataKey || utils.uuid()}
                             floatingLabelText={label}
                             multiple={this.props.multiple}
                             fullWidth={this.props.fullWidth}
                             disabled={this.props.disabled}
                             hintText={this.props.hintText}
                             errorText={this.props.errorText}
                             floatingLabelFixed={this.props.labelFixed}
                             underlineShow={this.props.borderShow}
                             {...styleProps}
                >
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
                </SelectField>
                <div className="full-screen"></div>
            </div>
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: "left", vertical: "bottom"}}
                targetOrigin={{horizontal: "left", vertical: "top"}}
                style={{width: this.state.anchorEl ? this.state.anchorEl.clientWidth : 'auto'}}
                onRequestClose={this.handleRequestClose}>
                {
                    this.props.hasFilter ? <div style={{marginTop: 12, paddingLeft: 16, paddingRight: 16}}>
                        <Text hintText="输入关键字筛选" value={this.state.filterText} onChange={this.handleFilter}/>
                    </div> : null
                }
                <Options
                    ref="options"
                    dataSource={options}
                    styleProps={styleProps}
                    onChange={this.handleChange}
                    value={value}
                    multiple={this.props.multiple}
                    carryKey={this.props.carryKey}
                    dataSourceConfig={this.props.dataSourceConfig}
                    cancel={this.props.cancel}
                />
            </Popover>
        </div>
    }

}

class Options extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.state.dataSource = props.dataSource;
    }

    setDataSource(dataSource) {
        this.setState({dataSource: dataSource});
    }

    handleItemClick = (event, menuItem, index) => {
        let data = this.state.dataSource[index];
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
        return <Menu style={this.props.styleProps.dropDownMenuProps}
                     listStyle={this.props.styleProps.listStyle}
                     menuItemStyle={this.props.styleProps.menuItemStyle}
                     onItemClick={this.handleItemClick}>
            {this.state.dataSource.map((option, index) => {
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
    }
}
