/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import style from '../style';
import utils from "../utils";
import Icon from '../icon';

export default class Number extends Component {

    static defaultProps = {
        label: undefined,           //标题
        defaultValue: undefined,    //默认值
        type: 'text',               //输入框类型：text,password,mobile,number
        disabled: false,            //是否禁用
        immutable: false,           //是否不可修改
        multiLine: false,           //是否能多行显示
        borderShow: true,           //是否显示下划线
        rows: 1,                    //显示多少行
        fullWidth: true,            //宽度是否100%显示
        hintText: undefined,        //文本提示，文本款显示
        errorText: undefined,       //错误信息，下滑线下方显示
        labelFixed: false,          //文本固定显示
        autoComplete: "off",        //自动完成
        textAlign: undefined,       //文本对齐方式
        styleProps: {},             //样式
        borderStyle: undefined,     //边框风格，border，underline
        float: undefined,           //浮点数位
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
    };

    state = {
        value: undefined,
        errorText: '',
        focus: false
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(this.state, nextState) && _.isEqual(this.props, nextProps)) {
            return false;
        }
        return true;
    }

    initData(props) {
        if (props.hasOwnProperty('value')) {
            this.state.value = props.value;
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue = (value) => {
        this.state.value = value;
        if (this.props.onChange) {
            this.props.onChange(value, this);
        }
        this.forceUpdate();
    };

    /**
     * 获取值
     * @returns {*}
     */
    getValue() {
        return this.state.value === undefined ? (this.props.defaultValue === undefined ? '' : this.props.defaultValue) : this.state.value;
    };

    /**
     * 样式
     * @returns {*}
     */
    getStyleProps() {
        let styleProps = style.getStyle('text', this.props);
        if (this.props.textAlign) {
            styleProps.inputStyle = Object.assign({}, styleProps.inputStyle, {textAlign: this.props.textAlign});
        }
        return _.merge(styleProps, this.props.styleProps);
    };

    /**
     * 输入触发
     * @param event
     */
    handleChange = (event) => {
        let value = event.target.value;
        if (!this.props.immutable) {
            if (!(/^-?\d*((\.\d*)?)$/.test(value))) {
                return;
            }
            this.setValue(value);
        }
    };

    /**
     * 失去焦点时触发
     * @param event
     */
    handleBlur = (event) => {
        this.state.focus = false;
        let float = this.getFloat();
        if (float) {
            let value = this.getValue();
            if (value === undefined || value === null || value === '') {
                this.forceUpdate();
                return;
            }
            value = utils.toFixed(value, float);
            if (this.state.value !== value) {
                this.setValue(utils.toFixed(value, float));
            } else {
                this.forceUpdate();
            }
        } else {
            this.forceUpdate();
        }
        if (this.props.onBlur) {
            this.props.onBlur(event, this);
        }
    };

    /**
     * 获取焦点时触发
     * @param event
     */
    handleFocus = (event) => {
        this.setState({focus: true});
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
        if (event.keyCode == 13 && this.props.onEnter) {
            this.props.onEnter(event, this);
        }
    };

    focus = () => {
        this.refs.text.focus();
    };

    getFloat(props = this.props) {
        if (_.isFunction(props.float)) {
            return props.float();
        }
        return props.float;
    }

    render() {
        let borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
        let value = this.getValue();
        let label = this.props.label;
        let styleProps = this.getStyleProps();
        let textField = <TextField
            ref="text"
            name={this.props.name || this.props.dataKey || utils.uuid()}
            fullWidth={this.props.fullWidth}
            floatingLabelText={label}
            type={"text"}
            value={value == null ? '' : value}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onKeyUp={this.handleKeyUp}
            multiLine={this.props.multiLine}
            rows={this.props.rows}
            hintText={this.props.hintText}
            errorText={borderStyle === 'underline' ? this.props.errorText : undefined}
            floatingLabelFixed={this.props.labelFixed}
            underlineShow={borderStyle === 'underline' && this.props.borderShow}
            autoComplete={this.props.autoComplete}
            {...styleProps}
        />;
        let content = textField;
        if (this.props.leftIcon) {
            content = <div className="flex middle" style={this.props.rootStyle}>
                <div style={{paddingRight: 8}}>
                    <Icon name={this.props.leftIcon}/>
                </div>
                {textField}
            </div>
        }
        if (borderStyle === 'border' && this.props.borderShow) {
            return <div className="full-width" style={this.props.rootStyle}>
                <div
                    className={"control-border" + (this.state.focus ? ' focus' : '') + (this.props.errorText ? ' error' : '')}>
                    {content}
                </div>
                <div className="text-small text-danger" style={{marginTop: 2}}>{this.props.errorText}</div>
            </div>
        } else {
            return content;
        }
    }

}