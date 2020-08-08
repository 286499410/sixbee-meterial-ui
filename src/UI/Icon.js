import React, {Component} from 'react';
import {joinBlankSpace} from "./tool";

export default class Icon extends Component {

    static defaultProps = {
        classPrefix: 'iconfont icon-',  //样式前缀
        name: undefined,                //iconfont class
        onClick: undefined
    };

    handleClick = (event) => {
        this.props.onClick && this.props.onClick(event);
    };

    render() {
        return <i className={joinBlankSpace(
            this.props.classPrefix + this.props.name,
            this.props.className,
            this.props.onClick && 'cursor-pointer'
        )} style={this.props.style} onClick={this.handleClick}/>
    }
}