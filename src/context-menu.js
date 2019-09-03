import React, {Component} from 'react';
import Popover from './popover';

export default class ContextMenu extends Component {

    static defaultProps = {
        style: undefined
    };

    state = {
        open: false
    };

    constructor(props) {
        super(props);
    }

    handleContextMenu(event) {
        console.log(event);
        event.preventDefault();
        this.setState({
            open: true,
            target: event.target
        })
    }

    render() {
        return <div style={this.props.style} onContextMenu={this.handleContextMenu}>
            {this.props.children}
            <Popover open={this.state.open}>
                <div></div>
            </Popover>
        </div>
    }

}