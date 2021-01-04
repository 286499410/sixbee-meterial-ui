import React from "react";

export default class Label extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span style={{
                    transform: "scale(0.75)",
                    transformOrigin: 'left top 0px',
                    color: 'rgba(0,0,0,0.3)',
                    fontSize: 15,
                    display: 'inline-block'
                }}>{this.props.children}</span>
            </div>
        );
    }

}