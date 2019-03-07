/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import style from '../style';
import areIntlLocalesSupported from 'intl-locales-supported';
import IconButton from 'material-ui/IconButton';
import utils from '../utils';

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

export default class Date extends Component {

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

    initData(props) {
        if (props.value !== undefined) {
            let value = props.value;
            if (this.props.timestamp) {
                value = utils.date('Y-m-d', value);
            }
            this.state.value = value;
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue(value) {
        this.setState({value: value});
        if (this.props.onChange) {
            if (value && this.props.timestamp) {
                value = utils.strToTime(value);
            }
            this.props.onChange(value, this);
        }
    }

    /**
     *
     * @returns {*}
     */
    getValue() {
        return this.state.value === undefined ? (this.props.defaultValue === undefined ? '' : this.props.defaultValue) : this.state.value;
    }

    /**
     * @param nul
     * @param date
     */
    handleChange = (nul, date) => {
        if (!this.props.immutable) {
            let value = utils.dateToStr(date);
            this.setValue(value);
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
        return <div style={{position: 'relative'}}>
            <DatePicker
                ref="picker"
                name={this.props.name || this.props.dataKey || utils.uuid()}
                fullWidth={this.props.fullWidth}
                value={utils.strToDate(value)}
                defaultDate={utils.strToDate(value)}
                floatingLabelText={label}
                floatingLabelFixed={this.props.labelFixed}
                onChange={this.handleChange}
                autoOk={this.props.autoOk}
                DateTimeFormat={DateTimeFormat}
                locale="zh"
                disabled={this.props.disabled}
                cancelLabel={this.props.cancelLabel}
                okLabel={this.props.okLabel}
                minDate={this.props.minDate ? utils.strToDate(this.props.minDate) : null}
                maxDate={this.props.maxDate ? utils.strToDate(this.props.maxDate) : null}
                formatDate={utils.dateToStr}
                textFieldStyle={{...styleProps.style, cursor: 'pointer'}}
                floatingLabelStyle={styleProps.floatingLabelStyle}
                floatingLabelFocusStyle={styleProps.floatingLabelFocusStyle}
                floatingLabelShrinkStyle={styleProps.floatingLabelShrinkStyle}
                errorStyle={styleProps.errorStyle}
                hintStyle={styleProps.hintStyle}
                underlineShow={this.props.borderShow}
                underlineStyle={styleProps.underlineStyle}
                inputStyle={styleProps.inputStyle}
                container={this.props.container}
                errorText={this.props.errorText}
            />
            {
                value && this.props.hasClear && !this.props.disabled ?
                    <IconButton iconClassName="iconfont icon-close-circle-fill" onClick={this.handleClear}
                                style={{position: 'absolute', right: 0, ...styleProps.iconStyle.style}}
                                iconStyle={{color: '#e0e0e0', ...styleProps.iconStyle.iconStyle}}/> : null
            }
        </div>
    }

}
