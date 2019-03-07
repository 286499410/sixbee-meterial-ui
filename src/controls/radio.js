/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import style from '../style';
import utils from '../utils';

export default class Radio extends Component {

    static defaultProps = {
        label: undefined,           //标签
        defaultChecked: false,      //默认是否勾选
        errorText: undefined,       //错误提示
        cols: undefined,            //一行多少列
        dataSource: [],             //数据源，选项,
        dataSourceConfig: {text: 'text', value: 'value'},
        size: 'default'
    };

    state = {
        value: undefined,
        dataSource: []
    };

    constructor(props) {
        super(props);
        this.initData(props);
        this.setDataSource();
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    componentDidMount() {
        this.refs.container.getElementsByClassName('row')[0].setAttribute('cols', this.props.cols || this.props.dataSource.length);
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
        return this.state.value === undefined ? this.props.defaultValue : this.state.value;
    }

    /**
     * 设置数据源
     * @param dataSource
     */
    setDataSource(dataSource = this.props.dataSource) {
        utils.getDataSource(undefined, dataSource, this.props.dataSourceConfig).then((dataSource) => {
            this.setState({dataSource: dataSource});
        });
    }

    handleChange = (event, value) => {
        this.setValue(value);
    };

    render() {
        let value = this.getValue();
        let label = this.props.label;
        let styleProps = style.getStyle('radio', this.props);
        return <div ref={"container"} style={styleProps.rootStyle}>
            {
                label === false ? null : <div style={styleProps.labelStyle}>
                    <span style={{
                        transform: "scale(0.75)",
                        transformOrigin: 'left top 0px',
                        color: 'rgba(0,0,0,0.3)',
                        fontSize: 15,
                        display: 'inline-block'}}>{label}</span>
                </div>
            }
            <RadioButtonGroup
                name={this.props.name || this.props.dataKey || utils.uuid()}
                className="row"
                valueSelected={value}
                style={{width: this.props.width}}
                onChange={this.handleChange}>
                {this.state.dataSource.map((row, index) => {
                    return <RadioButton className="col"
                                        key={index} label={row.text}
                                        value={row.value}/>
                })}
            </RadioButtonGroup>
        </div>
    }
}
