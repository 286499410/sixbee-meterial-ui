/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import style from '../style';
import utils from '../utils';

export default class Money extends Component {

    static defaultProps = {

        label: undefined,               //标题
        defaultValue: undefined,        //默认值
        disabled: false,                //是否禁用
        immutable: false,               //是否不可修改
        borderShow: true,               //是否显示下划线
        fullWidth: true,                //宽度是否100%显示
        hintText: undefined,            //文本提示，文本款显示
        errorText: undefined,           //错误信息，下滑线下方显示
        labelFixed: false,              //文本固定显示
        autoComplete: "off",            //自动完成
        textAlign: undefined,           //文本对齐方式：left，right，center
        styleProps: {},                 //样式
        float: 2,                       //保留几位小数
        deficitStyle: {color: 'red'},   //赤字样式
        showZero: true,                 //值为零时是否显示
    };

    state = {
        value: undefined,
        focus: false,
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

    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(this.state, nextState) && _.isEqual(this.props, nextProps)) {
            return false;
        }
        return true;
    }

    initData(props) {
        if (props.hasOwnProperty('value')) {
            if (props.value != utils.parseNumber(this.state.value)) {
                this.state.value = props.value === '' ? '' : utils.toFixed(utils.parseNumber(props.value), this.getFloat(props));
            }
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue = (value) => {
        value = _.trim(value);
        if (/^-?\d{0,3}((,\d{3})*)((,\d{0,3})?)((\.\d{0,16})?)$/.test(value) || /^-?\d*((\.\d{0,16})?)$/.test(value)) {
            value = value.toString().replace(/,/g, '');
            this.state.value = value;
            this.forceUpdate();
            if (this.props.onChange) {
                this.props.onChange(value, this);
            }
        }
    };

    /**
     * 获取值
     * @returns {*}
     */
    getValue() {
        return this.state.value === undefined ? (this.props.defaultValue === undefined ? '' : this.props.defaultValue) : this.state.value;
    };

    /**
     * 数字输入触发
     * @param event
     */
    handleChange = (event) => {
        if (!this.props.immutable) {
            let value = event.target.value;
            this.setValue(value);
        }
    };

    /**
     * 失去焦点
     * @param event
     */
    handleBlur = (event) => {
        //this.state.value = this.state.value !== '' && this.state.value !== undefined ? utils.parseNumber(this.state.value) : this.state.value;
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
            this.props.onBlur(event, this)
        }
    };

    /**
     * 获取焦点
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
    };

    getStyleProps() {
        let styleProps = style.getStyle('text', this.props);
        if (this.props.textAlign) {
            styleProps.inputStyle = {
                ...styleProps.inputStyle,
                textAlign: this.props.textAlign
            };
        }
        if (!this.state.focus && this.state.value < 0) {
            styleProps.inputStyle = {
                ...styleProps.inputStyle,
                ...this.props.deficitStyle
            };
        }
        return styleProps;
    };

    getFloat(props = this.props) {
        if (_.isFunction(props.float)) {
            return props.float();
        }
        return props.float;
    }

    render() {
        let borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
        let value = this.getValue() || '';
        let label = this.props.label;
        let styleProps = this.getStyleProps();
        if (!this.state.focus) {
            if (!this.props.showZero && value == 0) {
                value = '';
            } else {
                value = value !== '' ? utils.parseMoney(value, this.getFloat()) : '';
            }
        }
        let textField = <TextField
            name={this.props.name || this.props.dataKey || utils.uuid()}
            fullWidth={this.props.fullWidth}
            floatingLabelText={label}
            type={'text'}
            value={value}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onKeyUp={this.handleKeyUp}
            hintText={this.props.hintText}
            errorText={this.props.errorText}
            floatingLabelFixed={this.props.labelFixed}
            underlineShow={borderStyle === 'underline' && this.props.borderShow}
            autoComplete={this.props.autoComplete}
            {...styleProps}
        />;
        if (borderStyle === 'border' && this.props.borderShow) {
            return <div className={"control-border" + (this.state.focus ? ' focus' : '')} style={this.props.rootStyle}>{textField}</div>
        } else {
            return textField;
        }
    }

}
