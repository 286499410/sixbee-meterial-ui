import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Date from './date';
import utils from "../utils";

export default class DateRange extends Component {

    static defaultProps = {
        label: undefined,           //标签
        borderShow: true,           //是否显示下划线
        hasClear: true,             //最右边是否显示清除按钮
        disabled: false,            //是否禁止输入
        immutable: false,           //是否不可更改
        fullWidth: true,            //宽度100%
        hintText: undefined,        //输入提示
        errorText: undefined,       //错误提示
        defaultValue: undefined,    //默认值
        activeStartDate: undefined, //开始日期
        minDate: undefined,         //最小日期
        maxDate: undefined,         //最大日期
        timestamp: false,           //value是否为时间戳
    };

    state = {
        startDate: undefined,
        endDate: undefined
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
        if (_.isArray(props.value) && props.value.length == 2) {
            let value = props.value;
            [this.state.startDate, this.state.endDate] = this.convertValue(value);
        } else if(props.hasOwnProperty('value') && props.value === undefined) {
            this.state.startDate = undefined;
            this.state.endDate = undefined;
        }
    }

    convertValue(value) {
        let [startDate, endDate] = value;
        if (this.props.timestamp) {
            if (!this.isEmpty(startDate)) {
                startDate = utils.date('Y-m-d', startDate);
            }
            if (!this.isEmpty(endDate)) {
                endDate = utils.date('Y-m-d', endDate);
            }
        }
        return [startDate, endDate];
    }

    isEmpty(value) {
        return value === undefined || value === '' || value === null;
    }

    /**
     * 设置值
     * @param value
     */
    setValue(value) {
        let [startDate, endDate] = this.convertValue(value);
        if (this.props.onChange) {
            if (this.isEmpty(startDate) && this.isEmpty(endDate)) {
                this.props.onChange(undefined, this);
            } else if (this.props.timestamp) {
                this.props.onChange([
                    !this.isEmpty(startDate) ? utils.strToTime(startDate) : undefined,
                    !this.isEmpty(endDate) ? utils.strToTime(endDate) + 86400 - 1 : undefined
                ], this);
            } else {
                this.props.onChange([startDate, endDate], this);
            }
        }
        this.setState({
            startDate: startDate,
            endDate: endDate
        })
    }

    /**
     * 获取当前值
     * @returns {any}
     */
    getValue() {
        if (this.state.startDate === undefined &&
            this.state.endDate === undefined &&
            this.props.defaultValue !== undefined &&
            _.isArray(this.props.defaultValue) &&
            this.props.defaultValue.length == 2
        ) {
            return this.convertValue(this.props.defaultValue);
        } else {
            return [this.state.startDate, this.state.endDate];
        }
    }

    handleChange = (index) => (value) => {
        let originValue = this.getValue();
        originValue[index] = value;
        if (this.props.timestamp) {
            this.setValue([
                !this.isEmpty(originValue[0]) ? utils.strToTime(originValue[0]) : undefined,
                !this.isEmpty(originValue[1]) ? utils.strToTime(originValue[1]) : undefined
            ]);
        } else {
            this.setValue(originValue);
        }
    };

    render() {
        let label = this.props.label;
        let [startDate, endDate] = this.getValue();
        let borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
        let content = <div className="flex middle">
            <div style={{width: 'calc(50% - 10px)', minWidth: 'calc(50% - 10px)'}}>
                <Date
                    borderShow={this.props.borderShow && borderStyle === 'underline'}
                    hasClear={this.props.hasClear}
                    disabled={this.props.disabled}
                    immutable={this.props.immutable}
                    fullWidth={this.props.fullWidth}
                    value={startDate}
                    maxDate={endDate}
                    onChange={this.handleChange(0)}
                />
            </div>
            <div className="text-center" style={{color: '#ccc', width: 20, minWidth: 20}}>-</div>
            <div style={{width: 'calc(50% - 10px)', minWidth: 'calc(50% - 10px)'}}>
                <Date
                    borderShow={this.props.borderShow && borderStyle === 'underline'}
                    hasClear={this.props.hasClear}
                    disabled={this.props.disabled}
                    immutable={this.props.immutable}
                    fullWidth={this.props.fullWidth}
                    value={endDate}
                    minDate={startDate}
                    onChange={this.handleChange(1)}
                />
            </div>
        </div>;
        return <div>
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
            {
                borderStyle === 'border' && this.props.borderShow ? <div className="control-border">{content}</div> : content
            }
        </div>
    }

}