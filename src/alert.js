
import React, {Component} from 'react';

export default class Alert extends Component {

    state = {
        open: false,
        message: '',
        type: 'info',
        autoHideDuration: 4000
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
        return <div ref="container" className="alert bottom"
                    style={{opacity: this.state.open ? 1 : 0}} onClick={this.handleClick}>{this.state.message}</div>
    }
}