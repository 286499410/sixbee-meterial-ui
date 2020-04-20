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
        let key = this.props.formKey || this.props.dataKey;
        _.set(data, key, this.props.value);
        return utils.render(data, {
            key: key,
            type: this.props.staticType || 'text',
            dataSource: this.props.dataSource,
            dataSourceConfig: this.props.dataSourceConfig
        }) || null;
    }

}