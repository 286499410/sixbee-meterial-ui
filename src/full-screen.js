import React, {Component} from 'react';
import Icon from './icon';

const style = {
    fullScreen: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 36
    },
    exitIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
};

export default class FullScreen extends Component {

    state = {
        open: false
    };

    constructor(props) {
        super(props);
    }

    handleOpen = (event) => {
        this.setState({open: true});
    };

    handleClose = (event) => {
        this.setState({open: false});
    };

    render() {
        if (this.state.open) {
            return <div style={style.fullScreen}>
                <div style={style.exitIcon}><Icon size={20} type="button" name="fullscreen-exit" onClick={this.handleClose}/></div>
                {this.props.children}
            </div>
        } else {
            return <div style={{lineHeight: 1}}><Icon type="button" name="fullscreen" onClick={this.handleOpen}/></div>
        }
    }

}