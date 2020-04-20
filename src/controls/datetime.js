/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import utils from '../utils';
import style from "../style";
import Date from './date';
import Time from './time';
import Text from './text';

export default class DateTime extends Component {

    static defaultProps = {
        autoOk: true,               //选择日期后是否自动关闭日历
        okLabel: "确认",
        cancelLabel: "取消",
        timestamp: false,           //value是否为时间戳
        container: "dialog",        //日历展示方式
        label: undefined,           //标签
        borderShow: true,           //是否显示下划线
        hasClear: true,             //最右边是否显示清除按钮
        disabled: false,            //是否禁止输入
        immutable: false,           //是否不可更改
        fullWidth: true,            //宽度100%
        multiLine: false,           //是否多行显示
        rows: 1,                    //行数
        labelFixed: false,          //是否固定标签
        hintText: undefined,        //输入提示
        errorText: undefined,       //错误提示
        defaultValue: undefined,    //默认值
        activeStartDate: undefined, //开始日期
        minDate: undefined,         //最小日期
        maxDate: undefined,         //最大日期
        defaultDate: undefined,     //默认日期
        defaultTime: undefined,     //默认时间
        minuteStep: 15,             //时间增量
    };

    state = {
        date: undefined,
        time: undefined
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (!this.isEmpty(props.value)) {
            let value = props.value;
            if (this.props.timestamp) {
                value = utils.date('Y-m-d H:i', value);
            }
            [this.state.date, this.state.time] = value.split(' ');
        } else if ((props.value === '' || props.value === null) && !this.isEmpty(this.state.date) && !this.isEmpty(this.state.time)) {
            this.state.date = null;
            this.state.time = null;
        }
    }

    handleChange = (type) => (value) => {
        switch (type) {
            case 'date':
                this.state.date = value;
                break;
            case 'time':
                this.state.time = value;
                break;
        }
        let {date, time} = this.getValue();
        if (type === 'date' && this.isEmpty(time)) {
            this.refs.time.focus();
        }
        this.setValue((date || '') + ' ' + (time || ''));
    };

    setDate(date) {
        this.state.date = date;
        this.forceUpdate();
        this.handleChange();
    }

    setTime(time) {
        this.state.time = time;
        this.forceUpdate();
        this.handleChange();
    }

    setValue(value) {
        if (this.isEmpty(value)) {
            this.state.date = null;
            this.state.time = null;
        } else {
            [this.state.date, this.state.time] = value.split(' ');
        }
        this.forceUpdate();
        if (this.props.onChange) {
            let value = (
                this.isEmpty(this.state.date) ||
                this.isEmpty(this.state.time)
            ) ? '' : this.state.date + ' ' + this.state.time;
            if (value && value !== '' && this.props.timestamp) {
                value = utils.strToTime(value);
            }
            this.props.onChange(value, this);
        }
    }

    isEmpty(value) {
        return value === undefined || value === null || value === '';
    }

    getValue() {
        if (this.state.date === undefined && this.state.time === undefined && this.props.defaultValue !== undefined) {
            let defaultValue = this.props.defaultValue;
            if (this.props.timestamp) {
                defaultValue = utils.date('Y-m-d H:i', defaultValue);
            }
            let [date, time] = defaultValue.split(' ');
            return {
                date: date !== undefined ? date : this.props.defaultDate,
                time: time !== undefined ? time : this.props.defaultTime
            }
        } else {
            return {
                date: this.state.date !== undefined ? this.state.date : this.props.defaultDate,
                time: this.state.time !== undefined ? this.state.time : this.props.defaultTime
            };
        }
    }

    /**
     * 清除
     * @param event
     */
    handleClear = (event) => {
        this.setValue(null);
    };

    render() {
        let {date, time} = this.getValue();
        let styleProps = style.getStyle('date', this.props);
        let label = this.props.label;
        return (
            <div style={{position: 'relative', ...this.props.rootStyle}}>
                {
                    label === false ? null : <div>
                        <span style={{
                            transform: "scale(0.75)",
                            transformOrigin: 'left top 0px',
                            color: 'rgba(0,0,0,0.3)',
                            fontSize: 15,
                            display: 'inline-block',
                            position: 'relative',
                            top: 12
                        }}>{label}</span>
                    </div>
                }
                <div className="flex">
                    <div style={{width: 90, minWidth: 90}}>
                        <Date
                            ref="date"
                            hintText="日期"
                            value={date || ''}
                            minDate={this.props.minDate || null}
                            maxDate={this.props.maxDate || null}
                            hasClear={false}
                            onChange={this.handleChange('date')}
                            errorText={this.props.errorText}
                            errorStyle={{whiteSpace: 'nowrap'}}
                        />
                    </div>
                    <div style={{width: 70, minWidth: 70}}>
                        <Time
                            ref="time"
                            hintText="时间"
                            value={time || ''}
                            hasClear={false}
                            errorText={this.props.errorText ? ' ' : undefined}
                            onChange={this.handleChange('time')}
                            minuteStep={this.props.minuteStep}
                        />
                    </div>
                    <div className="relative" style={{flexGrow: 1}}>
                        <Text
                            errorText={this.props.errorText ? ' ' : undefined}
                        />
                        <div className="full-screen" onClick={() => {
                            this.refs.date.focus();
                        }}></div>
                    </div>
                </div>
                {
                    (!this.isEmpty(date) || !this.isEmpty(time)) && this.props.hasClear && !this.props.disabled && !this.props.immutable ?
                        <IconButton iconClassName="iconfont icon-close-circle-fill" onClick={this.handleClear}
                                    style={{position: 'absolute', right: 0, ...styleProps.iconStyle.style}}
                                    iconStyle={{color: '#e0e0e0', ...styleProps.iconStyle.iconStyle}}

                        /> : null
                }
            </div>
        )
    }

}
