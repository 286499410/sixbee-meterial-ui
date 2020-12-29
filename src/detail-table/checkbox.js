import React from "react";
import Icon from "../icon";

export default class Checkbox extends React.Component{

    static defaultProps = {
        checked: 0,
        onCheck: undefined,
        size: 20
    };

    constructor(props) {
        super(props);
    }

    getIconName() {
        return {
            0: "border",
            1: "check-square-fill",
            2: "minus-square-fill"
        }[this.props.checked];
    }

    handleClick = (event) => {
        const isInputChecked = this.props.checked != 1 ? 1 : 0;
        if(this.props.onCheck) {
            this.props.onCheck(event, isInputChecked);
        }
    };

    render() {
        return (
            <Icon type="button"
                  size={this.props.size}
                  name={this.getIconName()}
                  onClick={this.handleClick}
                  className={this.props.checked == 1 || this.props.checked == 2 ? "text-primary" : ""}
                  color={" "}
                  padding={2}
                  iconStyle={{
                      transition: "none"
                  }}
            />
        );
    }

}