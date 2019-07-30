/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import Text from './text';
import areIntlLocalesSupported from 'intl-locales-supported';
import utils from '../utils';
import style from "../style";

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['zh'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/zh');
}

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
    };

    dateClickDiv = {
        small: {
            top: 20,
            width: 70
        },
        default: {
            top: 20,
            width: 80
        },
        large: {
            top: 30,
            width: 90
        }
    };
    timeClickDiv = {
        small: {
            top: 20,
            left: 74,
            width: 32
        },
        default: {
            top: 20,
            left: 83,
            width: 38
        },
        large: {
            top: 30,
            left: 95,
            width: 40
        }
    };

    state = {
        date: undefined,
        time: undefined,
        clickType: 'datetime'
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (props.value !== undefined && props.value !== '' && props.value !== null) {
            let value = props.value;
            if (this.props.timestamp) {
                value = utils.date('Y-m-d H:i', value);
            }
            [this.state.date, this.state.time] = value.split(' ');
        }
    }

    handleChange() {
        if (this.props.onChange) {
            let value = (this.state.date === undefined || this.state.time === undefined || this.state.date === null || this.state.time === null) ? '' : this.state.date + ' ' + this.state.time;
            if (value && value !== '' && this.props.timestamp) {
                value = utils.strToTime(value);
            }
            this.props.onChange(value, this);
        }
    }

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
        [this.state.date, this.state.time] = value.split(' ');
        this.handleChange();
    }

    getValue() {
        if (this.state.date === undefined && this.state.time === undefined && this.props.defaultValue !== undefined) {
            let defaultValue = this.props.defaultValue;
            if (this.props.timestamp) {
                defaultValue = utils.date('Y-m-d H:i', defaultValue);
            }
            let [date, time] = defaultValue.split(' ');
            return {
                date: date,
                time: time
            }
        } else {
            return {
                date: this.state.date,
                time: this.state.time
            };
        }
    }

    /**
     * 选择日期触发
     * @param nul
     * @param date
     */
    handleDataChange = (nul, date) => {
        let value = utils.dateToStr(date);
        this.setDate(value);
        this.refs.time.focus();
    };

    /**
     * 选择时间触发
     * @param nul
     * @param date
     */
    handleTimeChange = (nul, date) => {
        let value = utils.dateToTimeStr(date);
        this.setTime(value);
    };

    handleClick = (type) => (event) => {
        event.stopPropagation();
        let value = this.getValue();
        if (value.date === undefined && value.time === undefined) {
            type = 'datetime';
        }
        this.state.clickType = type;
        switch (type) {
            case 'datetime':
                this.refs.date.focus();
                break;
            case 'date':
                this.refs.date.focus();
                break;
            case 'time':
                this.refs.time.focus();
                break;
        }
    };

    /**
     * 清除
     * @param event
     */
    handleClear = (event) => {
        this.state.date = null;
        this.state.time = null;
        this.forceUpdate();
        this.handleChange();
    };

    render() {
        let {date, time} = this.getValue();
        let value = (date || '--/--/--') + ' ' + (time || '--:--');
        let clickDivStyle = {position: 'absolute', top: 30, bottom: 0, left: 0, width: 75, cursor: 'pointer'};
        let size = this.props.size || 'default';
        let styleProps = style.getStyle('date', this.props);
        return (
            <div style={{position: 'relative'}}>
                <Text {...this.props} value={value} name={this.props.name || this.props.dataKey || utils.uuid()}/>
                <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
                     onClick={this.handleClick('datetime')}>
                    <div>
                        <div style={{...clickDivStyle, ...this.dateClickDiv[size]}}
                             onClick={this.handleClick('date')}></div>
                        <div style={{...clickDivStyle, ...this.timeClickDiv[size]}}
                             onClick={this.handleClick('time')}></div>
                    </div>
                </div>
                {
                    (date !== undefined || time !== undefined) && this.props.hasClear && !this.props.disabled && !this.props.immutable ?
                        <IconButton iconClassName="iconfont icon-close-circle-fill" onClick={this.handleClear}
                                    style={{position: 'absolute', right: 0, ...styleProps.iconStyle.style}}
                                    iconStyle={{color: '#e0e0e0', ...styleProps.iconStyle.iconStyle}}

                        /> : null
                }
                <div style={{display: 'none'}}>
                    <DatePicker
                        name="date"
                        ref="date"
                        defaultDate={utils.strToDate(date)}
                        onChange={this.handleDataChange}
                        autoOk={this.props.autoOk == false ? false : true}
                        DateTimeFormat={DateTimeFormat}
                        locale="zh"
                        cancelLabel="取消"
                        okLabel="确定"
                        minDate={this.props.minDate || null}
                        maxDate={this.props.maxDate || null}
                    />
                    <TimePicker
                        name="time"
                        ref="time"
                        defaultTime={utils.strToDate(time ? `1970-01-01 ${time}` : undefined)}
                        format="24hr"
                        onChange={this.handleTimeChange}
                        autoOk={this.props.autoOk == false ? false : true}
                        minutesStep={this.props.minutesStep || 5}
                        cancelLabel="取消"
                        okLabel="确定"
                    />
                </div>
            </div>
        )
    }

}
