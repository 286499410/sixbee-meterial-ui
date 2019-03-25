import React, {Component} from 'react';

export default class SvgIcon extends Component {

    static defaultProps = {
        name: undefined
    };

    render() {
        let useTag = '<use xlink:href="#icon-' + this.props.name + '"></use>';
        return <svg className="icon" aria-hidden="true" style={this.props.style} dangerouslySetInnerHTML={{__html: useTag }}/>
    }
}