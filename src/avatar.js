/**
 * Created by zhengzhaowei on 2018/5/22.
 */

import React, {Component} from 'react';
import MaterialAvatar from 'material-ui/Avatar';

export default class Avatar extends Component {

    state = {
        src: ''
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        this.state.src = props.src;
    }

    render() {
        let props = {...this.props};
        delete props.defaultSrc;
        return <MaterialAvatar {...props} src={this.state.src} onError={() => {
            if (this.props.defaultSrc) {
                this.setState({src: this.props.defaultSrc});
            }
            if(this.props.onError) {
                this.props.onError();
            }
        }}/>
    }
};