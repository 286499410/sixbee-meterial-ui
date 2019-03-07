/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import _ from 'lodash';
import style from '../style';
import utils from '../utils';

export default class Time extends Component {

    static defaultProps = {
        autoOk: true,               //选择日期后是否自动关闭日历
        okLabel: "确认",
        cancelLabel: "取消",
        format: "24hr",             //时间格式
        minutesStep: 5,             //最小分钟间隔
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

    state = {
        value: undefined,
        date: undefined
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (props.value !== undefined) {
            this.state.value = props.value;
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
        }
    }

    /**
     * 获取值
     * @param value
     */
    setValue(value) {
        this.setState({value: value});
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
    handleChange = (event, date) => {
        let value = utils.dateToTimeStr(date);
        this.setValue(value);
    };

    toTime = (str) => {
        if (str === undefined || str === '') {
            return undefined;
        } else if (_.isDate(str)) {
            return str;
        } else {
            str = '1970/01/01 ' + str;
            return new Date(str);
        }
    };

    /**
     * 清除
     * @param event
     */
    handleClear = (event) => {
        this.setValue('');
    };

    render() {
        let value = this.getValue();
        let label = this.props.label;
        let styleProps = style.getStyle('date', this.props);
        return (
            <div style={{position: 'relative'}}>
                <TimePicker
                    name={this.props.name || this.props.dataKey || utils.uuid()}
                    fullWidth={this.props.fullWidth}
                    value={this.toTime(value)}
                    floatingLabelText={label}
                    floatingLabelFixed={this.props.labelFixed}
                    onChange={this.handleChange}
                    autoOk={this.props.autoOk}
                    disabled={this.props.disabled}
                    format={this.props.format}
                    minutesStep={this.props.minutesStep}
                    cancelLabel={this.props.cancelLabel}
                    okLabel={this.props.okLabel}
                    textFieldStyle={{...styleProps.style, cursor: 'pointer'}}
                    floatingLabelStyle={styleProps.floatingLabelStyle}
                    floatingLabelFocusStyle={styleProps.floatingLabelFocusStyle}
                    floatingLabelShrinkStyle={styleProps.floatingLabelShrinkStyle}
                    errorStyle={styleProps.errorStyle}
                    hintStyle={styleProps.hintStyle}
                    underlineStyle={styleProps.underlineStyle}
                    inputStyle={styleProps.inputStyle}
                />
                {
                    value && this.props.hasClear && !this.props.disabled ?
                        <IconButton iconClassName="iconfont icon-close-circle-fill" onClick={this.handleClear}
                                    style={{position: 'absolute', right: 0, ...styleProps.iconStyle.style}}
                                    iconStyle={{color: '#e0e0e0', ...styleProps.iconStyle.iconStyle}}/> : null
                }
            </div>
        )
    }

}
