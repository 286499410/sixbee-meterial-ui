/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import Auto from './controls/auto';
import Date2 from './controls/date2';
import Checkbox from './controls/checkbox';
import Date from './controls/date';
import DateTime from './controls/datetime';
import DateRange from './controls/date-range';
import File from './controls/file';
import Money from './controls/money';
import MoneyRange from './controls/money-range';
import Radio from './controls/radio';
import Select from './controls/select';
import Text from './controls/text';
import Time from './controls/time';
import Image from './controls/image';
import Editor from './controls/editor';
import SelectTag from './controls/select-tag';

export default class Control extends Component {

    static defaultProps = {
        type: 'text',
        size: 'default'
    };

    controls = {
        text: Text,
        password: Text,
        number: Text,
        mobile: Text,
        textarea: Text,
        money: Money,
        select: Select,
        date: Date,
        'date-range': DateRange,
        'money-range': MoneyRange,
        datetime: DateTime,
        time: Time,
        date2: Date2,
        auto: Auto,
        checkbox: Checkbox,
        radio: Radio,
        file: File,
        image: Image,
        editor: Editor,
        selectTag: SelectTag
    };

    constructor(props) {
        super(props);
    }

    setValue(value) {
        return this.refs.control.setValue(value);
    }

    getValue() {
        return this.refs.control.getValue();
    }

    render() {
        let props = {...this.props};
        let type = props.type;
        let Component = this.controls[type];
        if(typeof props.disabled === 'function') {
            props.disabled = props.disabled(props.data, props.context);
        }
        delete props.type;
        switch (type) {
            case 'text':
            case 'password':
            case 'number':
            case 'mobile':
                props.type = type;
                break;
            case 'textarea':
                props.multiLine = true;
                break;
            case 'render':
                Component = props.render;
                break;
            case 'component':
                Component = props.component;
                break;
        }
        return <Component ref={"control"} {...props}/>
    }
}
