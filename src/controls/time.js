/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import Popover from 'material-ui/Popover';
import Text from './text';
import style from '../style';
import utils from '../utils';
import $ from 'jquery';
import {Scrollbars} from 'react-custom-scrollbars';

export default class Time extends Component {

    static defaultProps = {
        autoOk: true,               //选择日期后是否自动关闭日历
        format: "24hr",             //时间格式
        minutesStep: 5,             //最小分钟间隔
        label: undefined,           //标签
        borderShow: true,           //是否显示下划线
        hasClear: true,             //最右边是否显示清除按钮
        disabled: false,            //是否禁止输入
        immutable: false,           //是否不可更改
        fullWidth: true,            //宽度100%
        labelFixed: false,          //是否固定标签
        hintText: undefined,        //输入提示
        errorText: undefined,       //错误提示
        defaultValue: undefined,    //默认值
        defaultHour: '12',
        defaultMinute: '00',
        minuteStep: 15,             //分钟增量
    };

    state = {
        value: undefined,
        open: false,
        popoverWidth: 100
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        this.state.value = props.value;
    }

    getHours() {
        let hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(i.toString().padStart(2, '0'));
        }
        return hours;
    }

    getMinutes() {
        let minutes = [];
        for (let i = 0; i < 60; i+= this.props.minuteStep) {
            minutes.push(i.toString().padStart(2, '0'));
        }
        return minutes;
    }

    getHour() {
        let value = this.state.value || '';
        return value.split(':')[0] || this.props.defaultHour;
    }

    getMinute() {
        let value = this.state.value || '';
        return value.split(':')[1] || this.props.defaultMinute;
    }

    /**
     * 获取值
     * @param value
     */
    setValue(value) {
        if (value !== undefined && value !== '' && /^[0-5]\d:[0-5]\d$/.test(value)) {
            this.setState({value: value});
            if (this.props.onChange) {
                this.props.onChange(value);
            }
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
     * 选择时间后触发
     * @param event
     * @param date
     */
    handleChange = (type, value) => (event) => {
        let hour = this.getHour();
        let minute = this.getMinute();
        switch (type) {
            case 'hour':
                this.refs.hour.scrollTop(this.refs.hour.getScrollTop() + $(this.refs['hour' + value]).position().top);
                hour = value;
                break;
            case 'minute':
                this.refs.minute.scrollTop(this.refs.minute.getScrollTop() + $(this.refs['minute' + value]).position().top);
                minute = value;
                this.state.open = false;
                break;
        }
        this.setValue(hour + ':' + minute);
    };

    handleFocus = (event) => {
        this.setState({
            open: true,
            anchorEl: this.refs.container,
            width: $(this.refs.container).width()
        });
        setTimeout(() => {
            let hour = this.getHour();
            let minute = this.getMinute();
            this.refs.hour.scrollTop(this.refs.hour.getScrollTop() + $(this.refs['hour' + hour]).position().top);
            this.refs.minute.scrollTop(this.refs.minute.getScrollTop() + $(this.refs['minute' + minute]).position().top);
        }, 50);
        if (this.props.onFocus) {
            this.props.onFocus(event, this);
        }
    };

    handleBlur = (event) => {
        let value = event.target.value;
        if(this.state.value !== value) {
            this.setValue(value);
        }
    };

    /**
     * 关闭时间控件
     * @param event
     */
    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    /**
     * 清除
     * @param event
     */
    handleClear = (event) => {
        this.setValue('');
    };

    focus = () => {
        this.refs.text.focus();
    };

    render() {
        let label = this.props.label;
        let styleProps = style.getStyle('text', this.props);
        let currentHour = this.getHour();
        let currentMinute = this.getMinute();
        let value = this.getValue();
        return (
            <div ref="container" style={{position: 'relative'}}>
                <Text
                    ref="text"
                    name={this.props.name || this.props.dataKey || utils.uuid()}
                    fullWidth={this.props.fullWidth}
                    value={value}
                    floatingLabelText={label}
                    floatingLabelFixed={this.props.labelFixed}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                    floatingLabelStyle={styleProps.floatingLabelStyle}
                    floatingLabelFocusStyle={styleProps.floatingLabelFocusStyle}
                    floatingLabelShrinkStyle={styleProps.floatingLabelShrinkStyle}
                    errorStyle={styleProps.errorStyle}
                    hintStyle={styleProps.hintStyle}
                    underlineStyle={styleProps.underlineStyle}
                    inputStyle={styleProps.inputStyle}
                    hintText={this.props.hintText}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    errorText={this.props.errorText}
                />
                <Popover
                    ref="popover"
                    style={styleProps.popoverStyle}
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handleRequestClose}
                >
                    <div className="flex" style={{width: this.state.popoverWidth}}>
                        <div className="relative" style={{maxHeight: 210, height: 210, width: 'calc(50% + 1px)', borderRight: '1px solid #e5e5e5'}}>
                            <Scrollbars ref="hour" autoHide>
                                {
                                    this.getHours().map(hour => {
                                        let selected = currentHour == hour;
                                        return <div key={hour}
                                                    ref={'hour' + hour}
                                                    className={"space-small text-center hover-bg cursor-pointer" + (selected ? " bg-gray" : "")}
                                                    onClick={this.handleChange('hour', hour)}>
                                            {hour}
                                        </div>
                                    })
                                }
                                <div style={{height: 210 - 35}}></div>
                            </Scrollbars>
                        </div>
                        <div className="relative" style={{maxHeight: 210, height: 210, width: '50%'}}>
                            <Scrollbars ref="minute" autoHide>
                                {
                                    this.getMinutes().map(minute => {
                                        let selected = currentMinute == minute;
                                        return <div key={minute}
                                                    ref={'minute' + minute}
                                                    className={"space-small text-center hover-bg cursor-pointer" + (selected ? " bg-gray" : "")}
                                                    onClick={this.handleChange('minute', minute)}>
                                            {minute}
                                        </div>
                                    })
                                }
                                <div style={{height: 210 - 35}}></div>
                            </Scrollbars>
                        </div>
                    </div>
                </Popover>
            </div>
        )
    }

}
