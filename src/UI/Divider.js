import React, {Component} from 'react';
import {joinBlankSpace} from "./tool";

export default class Divider extends Component {

    static defaultProps = {
        space: 0
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={joinBlankSpace("divider", this.props.className)} space={this.props.space}
                 style={this.props.style}></div>
        );
    }

}