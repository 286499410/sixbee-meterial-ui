import React, {Component} from 'react';
import utils from '../utils';

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
        this.state.value = value;
        this.forceUpdate();
        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }

    getValue() {
        return this.state.value;
    }

    render() {
        let data = {};
        let dataKey = this.props.formKey || this.props.dataKey || this.props.key;
        _.set(data, dataKey, this.props.value);
        return utils.render(data, {
            ...this.props,
            dataKey: dataKey,
            type: this.props.staticType || 'text',
        }) || null;
    }

}