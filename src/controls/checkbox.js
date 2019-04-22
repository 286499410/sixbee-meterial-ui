/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';
import _ from 'lodash';
import style from '../style';
import utils from "../utils";

export default class Checkbox extends Component {

    static defaultProps = {
        label: undefined,           //标签
        defaultChecked: false,      //默认是否勾选
        errorText: undefined,       //错误提示
        immutable: false,           //是否不可更改
        dataSource: [],             //数据源，选项,
        carryKey: true,             //多选时，值是否携带KEY
        dataSourceConfig: {text: 'text', value: 'value'},
        cols: undefined,                    //一行多少列
    };

    state = {
        value: undefined,
        dataSource: []
    };

    constructor(props) {
        super(props);
        this.setDataSource();
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (props.value !== undefined) {
            this.state.value = props.value;
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue(value) {
        this.setState({value: value});
        if (this.props.onChange) {
            this.props.onChange(value, this);
        }
    }

    /**
     * 获取值
     * @returns {*}
     */
    getValue() {
        return (this.state.value === undefined ? this.props.defaultValue : this.state.value) || (this.props.multiple ? [] : undefined);
    };

    /**
     * 设置数据源
     * @param dataSource
     */
    setDataSource = (dataSource = this.props.dataSource) => {
        utils.getDataSource(undefined, dataSource, this.props.dataSourceConfig).then((dataSource) => {
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

    /**
     * 获取选项
     * @param data
     * @param level
     * @param indent
     * @returns {Array}
     */
    getOptions = (data) => {
        let dataSourceConfig = this.props.dataSourceConfig;
        let options = [];
        data.map((row) => {
            options.push({
                text: _.get(row, dataSourceConfig.text),
                value: _.get(row, dataSourceConfig.value),
                disabled: row.disabled
            });
        });
        return options;
    };

    handleChange = (value) => {
        this.setValue(value);
    };

    handleCheck = (row) => (event, isInputChecked) => {
        if(this.props.immutable) {
            return;
        }
        let originValue = this.getValue();
        if (this.props.multiple) {
            //多选
            let value = row.value;
            if (this.props.carryKey) {
                value = {};
                value[this.props.dataSourceConfig.value] = row.value;
            }
            if (isInputChecked) {
                originValue.push(value);
            } else {
                _.remove(originValue, (n) => {
                    return this.props.carryKey ? n[this.props.dataSourceConfig.value] == row.value : n == row.value;
                });
            }
            originValue = _.uniq(originValue);
        } else {
            originValue = isInputChecked ? 1 : 0
        }
        this.setValue(originValue);
    };

    isChecked = (value) => {
        let valueArr = this.getValue();
        let indexOf = _.findIndex(valueArr, (n) => {
            return this.props.carryKey ? n[this.props.dataSourceConfig.value] == value : n == value;
        });
        if (indexOf >= 0) {
            return true;
        }
        return false;
    };

    render() {
        let value = this.getValue();
        let label = this.props.label;
        let styleProps = _.merge({}, style.getStyle('checkbox', this.props), this.props.styleProps);
        let options = this.getOptions(this.state.dataSource);
        if (options && options.length > 0) {
            return <div style={{width: '100%'}}>
                <div style={{...styleProps.labelStyle}}>
                    <span style={{
                        transform: "scale(0.75)",
                        transformOrigin: 'left top 0px',
                        color: 'rgba(0,0,0,0.3)',
                        fontSize: 15,
                        display: 'inline-block'
                    }}>{label}</span>
                </div>
                <div className="row" cols={this.props.cols}>
                    {options.map((row, index) => {
                        return <div key={index} className="col" style={{marginTop: 4}}>
                            <MaterialCheckbox
                                name={this.props.name || this.props.dataKey || utils.uuid()}
                                key={index}
                                label={row.text}
                                checked={this.isChecked(row.value)}
                                onCheck={this.handleCheck(row)}
                            />
                        </div>
                    })}
                </div>
            </div>
        } else {
            return <div style={{width: '100%', ...this.props.style}}>
                <MaterialCheckbox
                    label={label}
                    disabled={this.props.disabled}
                    name={this.props.name || this.props.dataKey || utils.uuid()}
                    {...styleProps}
                    checked={value == 1}
                    onCheck={this.handleCheck()}
                />
            </div>
        }
    }
}
