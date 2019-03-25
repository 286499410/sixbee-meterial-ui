import React, {Component} from 'react';
import utils from "../utils";
import _ from 'lodash';

export default class SelectTag extends Component {

    static defaultProps = {
        label: undefined,       //标签
        dataSource: [],         //数据源
        dataSourceConfig: {text: 'text', value: 'value'}, //数据配置，text支持多参数，例如{text: '[code] [name]', value: 'value'},
        multiple: false,        //是否多选
        carryKey: true,         //多选时，值是否携带KEY
        disabled: [],           //禁用的选项,
    };

    state = {
        value: undefined
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    /**
     * 参数初始化处理
     * @param props
     */
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
     * 根据value获取data
     * @param value
     * @returns {*}
     */
    getData(value) {
        let index = _.findIndex(this.props.dataSource, (o) => {
            return _.get(o, this.props.dataSourceConfig.value) == value;
        });
        return index >= 0 ? this.props.dataSource[index] : undefined;
    }

    handleChange = (value) => {
        this.setValue(value);
    };

    handleClick = (data) => (event) => {
        if (data.disabled) {
            return;
        }
        let clickValue = _.get(data, this.props.dataSourceConfig.value);
        let value = clickValue;
        let originValue = this.getValue();
        if (this.props.multiple) {
            if (this.props.carryKey) {
                value = {};
                value[this.props.dataSourceConfig.value] = _.get(data, this.props.dataSourceConfig.value);
            }
            let indexOf = _.findIndex(originValue, (n) => {
                return this.props.carryKey ? n[this.props.dataSourceConfig.value] == clickValue : n == clickValue;
            });
            if (indexOf >= 0) {
                originValue.splice(indexOf, 1);
            } else {
                originValue.push(value);
            }

        } else {
            if (originValue != value) {
                originValue = value;
            } else {
                originValue = '';
            }
        }
        this.setValue(originValue);
    };

    isChecked(value) {
        let valueArr = this.getValue();
        if (this.props.multiple) {
            let indexOf = _.findIndex(valueArr, (n) => {
                return this.props.carryKey ? n[this.props.dataSourceConfig.value] == value : n == value;
            });
            if (indexOf >= 0) {
                return true;
            }
            return false;
        } else {
            return valueArr == value;
        }
    }

    render() {
        let label = this.props.label;
        return <div style={{marginTop: 12}}>
            {
                label === false ? null : <div>
                    <span style={{
                        transform: "scale(0.75)",
                        transformOrigin: 'left top 0px',
                        color: 'rgba(0,0,0,0.3)',
                        fontSize: 15,
                        display: 'inline-block'
                    }}>{label}</span>
                </div>
            }
            <div className="flex" style={{flexWrap: 'wrap'}}>
                {
                    this.props.dataSource.map((data, index) => {
                        let style = {
                            background: '#f1f1f1',
                            padding: '4px 8px',
                            marginRight: 8,
                            marginBottom: 8,
                            color: '#222'
                        };
                        let value = _.get(data, this.props.dataSourceConfig.value);
                        if (this.isChecked(value)) {
                            style.background = '#5bc0de';
                            style.color = '#fff';
                        }
                        if (data.disabled) {
                            style.opacity = 0.3;
                            style.cursor = 'not-allowed'
                        }
                        let text = utils.replaceText(this.props.dataSourceConfig.text, data);
                        return <div className="cursor-pointer" key={index} style={style}
                                    onClick={this.handleClick(data)}>
                            {text}
                        </div>
                    })
                }
            </div>
        </div>
    }

}