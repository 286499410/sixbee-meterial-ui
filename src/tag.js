import React, {Component} from 'react';

export default class Tag extends Component {

    static defaultProps = {
        size: 'default',    //大小：default, small, large
        text: undefined,    //标签名
        value: undefined,   //值
        dataSource: [],     //数据源
    };

    getClass() {
        let className = 'default';
        this.props.dataSource.map((data) => {
            if (data.value == this.props.value && data.tag) {
                className = data.tag;
            }
        });
        return 'tag tag-' + className + (this.props.size !== 'default' ? ' tag-' + this.props.size : '');
    }

    render() {
        return <span className={this.getClass()}>{this.props.text}</span>;
    }

}