import React, {Component} from 'react';
import _ from 'lodash';
import Money from './money';
import utils from "../utils";

export default class DateRange extends Component {

    static defaultProps = {
        label: undefined,           //标签
        borderShow: true,           //是否显示下划线
        disabled: false,            //是否禁止输入
        immutable: false,           //是否不可更改
        fullWidth: true,            //宽度100%
        hintText: undefined,        //输入提示
        errorText: undefined,       //错误提示
        defaultValue: undefined,    //默认值
    };

    state = {
        startMoney: undefined,
        endMoney: undefined
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (_.isArray(props.value) && props.value.length == 2) {
            let value = props.value;
            [this.state.startMoney, this.state.endMoney] = value;
        }
    }

    isEmpty(value) {
        return value === undefined || value === '' || value === null;
    }

    /**
     * 设置值
     * @param value
     */
    setValue(value) {
        let [startMoney, endMoney] = value;
        if (this.props.onChange) {
            if (this.isEmpty(startMoney) && this.isEmpty(endMoney)) {
                this.props.onChange(undefined, this);
            } else {
                this.props.onChange([startMoney, endMoney], this);
            }
        }
        this.setState({
            startMoney: startMoney,
            endMoney: endMoney
        })
    }

    /**
     * 获取当前值
     * @returns {any}
     */
    getValue() {
        if (this.state.startMoney === undefined &&
            this.state.endMoney === undefined &&
            this.props.defaultValue !== undefined &&
            _.isArray(this.props.defaultValue) &&
            this.props.defaultValue.length == 2
        ) {
            return this.props.defaultValue;
        } else {
            return [this.state.startMoney, this.state.endMoney];
        }
    }

    handleChange = (index) => (value) => {
        let originValue = this.getValue();
        originValue[index] = value;
        this.setValue(originValue);
    };

    render() {
        let label = this.props.label;
        let [startMoney, endMoney] = this.getValue();
        return <div style={this.props.rootStyle}>
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
            <div className="flex middle">
                <div style={{width: 'calc(50% - 10px)', minWidth: 'calc(50% - 10px)'}}>
                    <Money
                        borderShow={this.props.borderShow}
                        disabled={this.props.disabled}
                        immutable={this.props.immutable}
                        fullWidth={this.props.fullWidth}
                        value={startMoney}
                        onChange={this.handleChange(0)}
                    />
                </div>
                <div className="text-center" style={{color: '#ccc', width: 20, minWidth: 20}}>-</div>
                <div style={{width: 'calc(50% - 10px)', minWidth: 'calc(50% - 10px)'}}>
                    <Money
                        borderShow={this.props.borderShow}
                        disabled={this.props.disabled}
                        immutable={this.props.immutable}
                        fullWidth={this.props.fullWidth}
                        value={endMoney}
                        onChange={this.handleChange(1)}
                    />
                </div>
            </div>
        </div>
    }

}