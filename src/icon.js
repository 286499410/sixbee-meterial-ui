/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class Icon extends Component {

    static defaultProps = {
        classPrefix: 'iconfont icon-',  //样式前缀
        disabled: false,                //是否禁用
        color: 'inherit',               //颜色
        hoverColor: undefined,          //hover颜色
        name: undefined,                //iconfont class
        type: undefined,                //button 按钮图标
        onClick: undefined,             //点击事件
        size: 16,                       //大小
        padding: 8,                     //内边距，type=button生效
        tooltip: undefined,             //提示，type=button生效
        tooltipPosition: undefined,     //提示位置，type=button生效， bottom-left bottom-center bottom-right top-left top-center top-right
        iconStyle: undefined,           //图标样式
        buttonStyle: undefined,         //按钮样式，type=button生效
    };

    handleClick = (event) => {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick(event);
        }
    };

    render() {
        let iconClassName = this.props.classPrefix + this.props.name;
        if (this.props.type == 'button') {
            return <IconButton
                disabled={this.props.disabled}
                style={{
                    color: this.props.color,
                    width: this.props.size + this.props.padding * 2,
                    height: this.props.size + this.props.padding * 2,
                    padding: this.props.padding,
                    ...this.props.buttonStyle
                }}
                hoveredStyle={{
                    color: this.props.hoverColor
                }}
                iconStyle={{
                    width: this.props.size,
                    height: this.props.size
                }}
                tooltip={this.props.tooltip}
                title={this.props.title}
                onClick={this.handleClick}>
                <div className="relative">
                    <div className="position-center">
                        <FontIcon className={iconClassName} color={'inherit'} style={{
                            fontSize: this.props.size,
                            ...this.props.iconStyle
                        }}/>
                        {this.props.children}
                    </div>
                </div>
            </IconButton>
        } else {
            return <FontIcon className={iconClassName}
                             title={this.props.title}
                             color={this.props.color}
                             hoverColor={this.props.hoverColor}
                             style={{
                                 fontSize: this.props.size,
                                 ...this.props.iconStyle
                             }}
            />
        }
    }
}