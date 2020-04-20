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
import Checkbox from './checkbox';

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
        fullWidth: true,            //宽度100%显示
        size: 'default',
        menuWidth: 'auto',
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

    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(this.state, nextState) && _.isEqual(this.props, nextProps)) {
            return false;
        }
        return true;
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
        return value === undefined || value === null ? [] : value;
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

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleDelete = (value) => (event) => {
        let originValue = this.state.value;
        originValue.splice(this.indexOf(value), 1);
        this.setValue(originValue);
    };

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
        let values = this.getValue();
        this.state.dataSource.map(data => {
            let text = _.get(data, this.props.dataSourceConfig.text);
            let value = _.get(data, this.props.dataSourceConfig.value);
            if(values.indexOf(value) >= 0) {
                selectedText.push(text);
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

    handleCheck = (value) => (isChecked) => {
        let values = this.getValue();
        let index = values.indexOf(value);
        if(isChecked) {
            if(index < 0) {
                values.push(value);
            }
        } else {
            if(index >= 0) {
                values.splice(index, 1);
            }
        }
        this.setValue(values.length == 0 ? null : values);
    };

    handleCheckAll = (event) => {
        let values = [];
        this.state.dataSource.map(data => {
            let value = _.get(data, this.props.dataSourceConfig.value);
            values.push(value);
        });
        this.setValue(values);
    };

    handleUnCheckAll = (event) => {
        this.setValue(null);
    };

    render() {
        let borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
        let values = this.getValue();
        let content = <div className={"flex middle between full-width" + (this.props.disabled ? ' text-disabled' : '')}>
            <div className="text-ellipsis" style={{textAlign: this.props.textAlign || 'left', flexGrow: 1}}>{this.getSelectedText()}</div>
            <div style={{width: 16, textAlign: 'right'}}>
                <i className="iconfont icon-caret-down" style={{fontSize: 12, color: 'rgba(0,0,0,0.3)'}}/>
            </div>
        </div>;
        return <div className="flex middle relative" style={{overflow: 'hidden', ...this.props.style, ...this.props.rootStyle}}>
            <div style={{flexGrow: 1, width: 0}}
                 className={"relative" + (this.props.disabled ? ' text-disabled' : ' cursor-pointer')}
                 onClick={this.handleClick}>
                {
                    borderStyle === 'border' && this.props.borderShow ? <div className="full-width">
                        <div
                            className={"control-border" + (this.state.focus || this.state.open ? ' focus' : '') + (this.props.errorText ? ' error' : '')}>{content}</div>
                        <div className="text-small text-danger" style={{marginTop: 2}}>{this.props.errorText}</div>
                    </div> : <div>
                        {content}
                        <div className="full-screen"></div>
                    </div>
                }
            </div>
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: "left", vertical: "bottom"}}
                targetOrigin={{horizontal: "left", vertical: "top"}}
                onRequestClose={this.handleRequestClose}>
                <div style={{width: this.state.anchorEl ? this.state.anchorEl.clientWidth : 'auto', padding: '6px 2px'}}>
                    {
                        this.state.dataSource.map((data, index) => {
                            let text = _.get(data, this.props.dataSourceConfig.text);
                            let value = _.get(data, this.props.dataSourceConfig.value);
                            let isChecked = values.indexOf(value) >= 0;
                            return <div className="hover-bg" key={index}>
                                <Checkbox label={text} styleProps={{style: {marginTop: 0}}} value={isChecked} onChange={this.handleCheck(value)}/>
                            </div>
                        })
                    }
                    <div className="flex text-muted text-small" style={{marginLeft: 4}}>
                        <div className="cursor-pointer" style={{padding: 4}} onClick={this.handleCheckAll}>全选</div>
                        <div className="cursor-pointer" style={{padding: 4}} onClick={this.handleUnCheckAll}>全不选</div>
                    </div>
                </div>
            </Popover>

        </div>
    }

}
