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

export default class Text extends Component {

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
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
    };

    state = {
        value: undefined,
        errorText: '',
        focus: false,
        pyInputing: false
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
        if (this.props.onChange && !this.state.pyInputing) {
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
     * 文本输入触发
     * @param event
     */
    handleChange = (event) => {
        let value = event.target.value;
        if (!this.props.immutable) {
            switch (this.props.type) {
                case 'number':
                    if (!(/^-?\d*((\.\d*)?)$/.test(value))) {
                        return;
                    }
                    break;
                case 'mobile':
                    if (!(/^\d*$/.test(value))) {
                        return;
                    }
                    break;
            }
            this.setValue(value);
        }
    };

    /**
     * 失去焦点时触发
     * @param event
     */
    handleBlur = (event) => {
        this.setState({focus: false});
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

    render() {
        let borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
        let value = this.getValue();
        let label = this.props.label;
        let styleProps = this.getStyleProps();
        let type = this.props.type;
        if (type == 'number' || type == 'mobile') {
            type = 'text';
        }
        let textField = <TextField
            ref="text"
            name={this.props.name || this.props.dataKey || utils.uuid()}
            fullWidth={this.props.fullWidth}
            floatingLabelText={label}
            type={type}
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
            onCompositionStart={() => {
                this.state.pyInputing = true;
            }}
            onCompositionEnd={(event) => {
                this.state.pyInputing = false;
                this.handleChange(event);
            }}
            {...styleProps}
        />;
        let content = textField;
        if (this.props.leftIcon) {
            content = <div className="flex middle">
                <div style={{paddingRight: 8}}>
                    <Icon name={this.props.leftIcon}/>
                </div>
                {textField}
            </div>
        }
        if (borderStyle === 'border' && this.props.borderShow) {
            return <div className="full-width" style={{...this.props.rootStyle}}>
                <div className={"control-border" + (this.state.focus ? ' focus' : '') + (this.props.errorText ? ' error' : '')}>
                    {content}
                </div>
                <div className="text-small text-danger" style={{marginTop: 2}}>{this.props.errorText}</div>
            </div>
        } else {
            return <div className="full-width" style={{...this.props.rootStyle}}>{content}</div>;
        }
    }

}