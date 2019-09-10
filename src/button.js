/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import style from './style';

export default class Button extends Component {

    static defaultProps = {
        classPrefix: 'iconfont icon-',  //样式前缀
        icon: undefined,                //
        type: 'default',
        size: 'default',
        labelPosition: 'after',
        iconStyle: undefined,           //图标样式
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
    };

    type = [
        'default',
        'primary',
        'secondary',
        'disabled'
    ];

    render() {
        let styleProps = style.getStyle('button', this.props);
        let props = _.merge({},
            styleProps,
            this.props
        );
        props[this.props.type] = true;
        if (this.props.icon) {
            let iconClassName = this.props.classPrefix + this.props.icon;
            props.icon = <FontIcon className={iconClassName} style={styleProps.iconStyle}/>;
        }
        delete props.classPrefix;
        delete props.iconStyle;
        return <RaisedButton {...props}/>
    }
}