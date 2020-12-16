import React, {Component} from 'react';
import Auto from './controls/auto';
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
import Number from './controls/number';
import Time from './controls/time';
import Image from './controls/image';
import Editor from './controls/editor';
import SelectTag from './controls/select-tag';
import SelectCheck from './controls/select-check';
import Static from './controls/static';
import Table from './controls/form-table';
import NewControl from "./UI/Control";

export default class Control extends Component {

    static defaultProps = {
        type: 'text',
        size: 'default'
    };

    controls = {
        text: Text,
        password: Text,
        number: Number,
        mobile: Text,
        textarea: Text,
        money: Money,
        select: Select,
        date: Date,
        'date-range': DateRange,
        'money-range': MoneyRange,
        datetime: DateTime,
        time: Time,
        auto: Auto,
        checkbox: Checkbox,
        radio: Radio,
        file: File,
        image: Image,
        editor: Editor,
        selectTag: SelectTag,
        'select-check': SelectCheck,
        static: Static,
        table: Table
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.onComponentDidMount) {
            this.props.onComponentDidMount(this);
        }
    }

    setValue(value) {
        return this.getControl().setValue(value);
    }

    getValue() {
        return this.getControl().getValue();
    }

    getControl() {
        return this.refs.control;
    }

    focus() {
        let control = this.getControl();
        if (control && control.focus) {
            control.focus();
        }
    }

    render() {
        let props = {...this.props};
        let type = props.type;
        let Component = this.controls[type];
        if (typeof props.disabled === 'function') {
            props.disabled = props.disabled(props.data, props.context);
        }
        delete props.type;


        if(props.useNewControl) {
            return <NewControl
                ref={type === 'render' ? undefined : "control"}
                {...props}
                type={type}
            />
        }

        switch (type) {
            case 'text':
            case 'password':
            case 'number':
            case 'mobile':
                props.type = type;
                break;
            case 'table':
                props.columns = props.fields;
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
        return <Component ref={type === 'render' ? undefined : "control"} {...props}/>
    }
}
