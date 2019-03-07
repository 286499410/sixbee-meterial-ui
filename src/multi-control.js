/**
 * Created by zhengzhaowei on 2018/8/9.
 */


import React, {Component} from 'react';
import _ from 'lodash';
import Control from './control';

export default class MultiControl extends Component {


    static defaultProps = {
        fields: [],           //多控件定义
    };

    state = {};

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

    }

    handleChange = (field) => (value, data) => {
        let control = this.refs[field.key];
        if (field.onChange) {
            field.onChange(value, control, this);
        }
        if (this.props.onChange) {
            let changeData = {};
            changeData[control.key] = value;
            this.props.onChange(changeData, null, true);
        }
    };

    getControl = (key) => {
        return this.refs[key].getControl();
    };

    render() {
        return <div className="row-space large" cols={this.props.fields.length} style={{position: 'relative'}}>
            {this.props.fields.map((field, index) => {
                let value = _.get(this.props.value, field.key);
                return <div key={index} className="col">
                    <Control
                        ref={field.key}
                        key={index}
                        value={value}
                        {...field}
                        onChange={this.handleChange(field)}
                    />
                </div>
            })}
            <div style={{position: 'absolute', left: '50%', top: 10, marginLeft: -4, color: '#ccc'}}>-</div>
        </div>
    }

}