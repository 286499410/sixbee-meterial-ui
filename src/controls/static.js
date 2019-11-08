import React, {Component} from 'react';

export default class Static extends Component {

    state = {
        value: undefined
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (props.hasOwnProperty('value')) {
            this.state.value = props.value;
        }
    }

    setValue(value) {
        this.setValue(value);
    }

    getValue() {
        return this.state.value;
    }

    render() {
        return this.state.value == undefined ? null : this.state.value;
    }

}