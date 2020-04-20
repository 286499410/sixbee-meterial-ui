import React, {Component} from 'react';
import Icon from './icon';

const style = {
    content: {
        marginTop: 12,
        fontSize: 14
    }
};

export default class Alert extends Component {

    state = {
        open: false,
        message: '',
        type: 'info',       //info|success|error
        autoHideDuration: 4000
    };

    icon = {
        info: 'info-circle',
        error: 'close-circle',
        success: 'check-circle'
    };

    show(message, type = 'info', duration = 4000) {
        this.setState({
            open: true,
            message: message,
            type: type,
            autoHideDuration: duration
        });
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refs.container.addEventListener('click', this.handleClick);
    }

    handleClick = (event) => {
        event.stopPropagation();
    };

    handleClose = () => {
        this.setState({open: false});
        document.removeEventListener('click', this.handleClose);
    };

    render() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.state.open) {
            this.interval = setInterval(() => {
                this.handleClose();
            }, this.state.autoHideDuration);
            document.addEventListener('click', this.handleClose);
        }
        return <div ref="container"
                    className="alert center"
                    style={{display: this.state.open ? 'block' : 'none'}}
                    onClick={this.handleClick}>
            <div className="text-center">
                {this.icon[this.state.type] ? <div><Icon name={this.icon[this.state.type]} size={50}/></div> : null}
                <div style={style.content}>{this.state.message}</div>
            </div>
        </div>
    }

}