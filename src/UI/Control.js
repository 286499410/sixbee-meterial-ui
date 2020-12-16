import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {joinBlankSpace} from "./tool";
import Text from "./Text";
import Auto from "./Auto";

export default class Control extends Component {

    static defaultProps = {
        type: 'text',                       //控件类型
        name: undefined,
        onChange: undefined,
        clearStyle: false,                  //清除样式
    };

    controlComponent = {
        text: Text,
        auto: Auto,
    };

    state = {
        focus: false
    };

    constructor(props) {
        super(props);
        this.control = React.createRef();
    }

    /**
     * 获取值
     * @returns {*}
     */
    getValue() {
        if (this.props.hasOwnProperty('value')) {
            return this.props.value;
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue(value) {
        this.handleChange({target: {value: value}});
    }

    /**
     * 错误文本
     * @returns {*}
     */
    getErrorText() {
        if (this.props.hasOwnProperty('errorText')) {
            return this.props.errorText;
        }
    }

    handleChange = ({value}) => {
        const control = this;
        if (this.props.onChange) {
            this.props.onChange(value, control);
        }
    };

    getControlProps() {
        const control = this, form = this.context.Form;
        return _.isFunction(this.props.controlProps) ? this.props.controlProps({
            control,
            form
        }) : this.props.controlProps || {};
    }

    getComponent() {
        if (this.props.type === 'component') {
            return this.props.component;
        }
        return this.controlComponent[this.props.type] || Text;
    }

    focus = () => {
        if (this.control && this.control.current) {
            if (this.control.current.focus) {
                this.control.current.focus();
            }
        }
    };

    getControl() {
        return this.control.current;
    }

    render() {
        let value = this.getValue();
        let Com = this.getComponent();
        let controlProps = this.getControlProps();
        let errorText = this.getErrorText();
        return (
            <div className={joinBlankSpace(
                "form-group",
                this.props.groupClassName,
            )} style={this.props.groupStyle}>
                {this.props.label && <label>{this.props.label}</label>}
                <div className="full-width">
                    <Com
                        ref={this.control}
                        size={this.props.size}
                        value={value === undefined ? '' : value}
                        type={this.props.type}
                        onChange={this.handleChange}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        leftIcon={this.props.leftIcon}
                        rightIcon={this.props.rightIcon}
                        placeholder={this.props.placeholder}
                        style={this.props.style}
                        inputStyle={this.props.inputStyle}
                        dataSource={this.props.dataSource}
                        dataSourceConfig={this.props.dataSourceConfig}
                        onCreate={this.props.onCreate}
                        menuProps={this.props.menuProps}
                        context={this.props.context}
                        position={this.props.position}
                        {...controlProps}
                        className={joinBlankSpace(
                            controlProps.className || this.props.className,
                            errorText && 'control-error'
                        )}
                    />
                    {
                        errorText && <div className="text-small text-danger" style={{marginTop: 2}}>{this.getErrorText()}</div>
                    }
                </div>
            </div>
        );
    }

}

Control.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    observeChangeKeys: PropTypes.array,
    onObserveChange: PropTypes.func
};