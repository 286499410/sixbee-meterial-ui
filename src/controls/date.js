/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import ReactCalendar from 'react-calendar';
import style from '../style';
import utils from '../utils';

export default class Date extends Component {

    static defaultProps = {
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
        anchorEl: {},
        value: undefined,
        open: false
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
     * 获取当前值
     * @returns {any}
     */
    getValue() {
        return this.state.value === undefined ? (this.props.defaultValue === undefined ? '' : this.props.defaultValue) : this.state.value;
    }

    /**
     * 文本不支持修改，只允许全部删除
     * @param event
     */
    handleTextChange = (event) => {
        if (event.target.value === '') {
            this.setValue('');
        }
    };

    /**
     * 事件 - 数值
     * @param date
     */
    handleChange = (date) => {
        let value = utils.dateToStr(date);
        if (this.props.onChange) {
            this.props.onChange(value, this);
        }
        this.setState({
            value: value,
            open: false
        });
    };

    /**
     * 失去焦点时触发
     * @param event
     */
    handleBlur = (event) => {
        if (this.props.onBlur) {
            this.props.onBlur(event, this);
        }
    };

    /**
     * 获取焦点时触发
     * @param event
     */
    handleFocus = (event) => {
        this.setState({
            open: true,
            anchorEl: this.refs.container
        });
        if (this.props.onFocus) {
            this.props.onFocus(event, this)
        }
    };

    /**
     * 按键后触发
     * @param event
     */
    handleKeyUp = (event) => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event, this)
        }
    };

    /**
     * 清除值
     * @param event
     */
    handleClear = (event) => {
        this.setValue('');
    };

    /**
     * 关闭日历控件
     * @param event
     */
    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    render() {
        let value = this.getValue();
        let label = this.props.label;
        let styleProps = style.getStyle('calender', this.props);
        return <div ref="container" style={{position: 'relative'}}>
            <TextField
                ref="text"
                name={this.props.name || this.props.dataKey || utils.uuid()}
                fullWidth={this.props.fullWidth}
                floatingLabelText={label}
                type={'text'}
                value={value}
                disabled={this.props.disabled}
                onChange={this.handleTextChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onKeyUp={this.handleKeyUp}
                multiLine={this.props.multiLine}
                rows={this.props.rows}
                hintText={this.props.hintText}
                errorText={this.props.errorText}
                floatingLabelFixed={this.props.labelFixed}
                underlineShow={this.props.borderShow}
                autoComplete="off"
                textareaStyle={styleProps.textareaStyle}
                floatingLabelStyle={styleProps.floatingLabelStyle}
                floatingLabelFocusStyle={styleProps.floatingLabelFocusStyle}
                floatingLabelShrinkStyle={styleProps.floatingLabelShrinkStyle}
                errorStyle={styleProps.errorStyle}
                hintStyle={styleProps.hintStyle}
                underlineStyle={styleProps.underlineStyle}
                inputStyle={styleProps.inputStyle}
                style={styleProps.style}
            />
            {
                (value !== undefined && value !== null && value !== '') && this.props.hasClear && !this.props.disabled && !this.props.immutable ?
                    <IconButton iconClassName="iconfont icon-close-circle-fill" onClick={this.handleClear}
                                style={{position: 'absolute', right: 0, ...styleProps.iconStyle.style}}
                                iconStyle={{color: '#e0e0e0', ...styleProps.iconStyle.iconStyle}}

                    /> : null
            }
            <Popover
                ref="popover"
                style={styleProps.popoverStyle}
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onRequestClose={this.handleRequestClose}
            >
                <div>
                    <ReactCalendar
                        onChange={this.handleChange}
                        value={utils.strToDate(value)}
                        activeStartDate={this.props.activeStartDate ? utils.strToDate(this.props.activeStartDate) : null}
                        minDate={this.props.minDate ? utils.strToDate(this.props.minDate) : null}
                        maxDate={this.props.maxDate ? utils.strToDate(this.props.maxDate) : null}
                    />
                </div>
            </Popover>
        </div>
    }

}