/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import style from '../style';
import utils from '../utils';

export default class Radio extends Component {

    static defaultProps = {
        label: undefined,           //标签
        errorText: undefined,       //错误提示
        size: 'default',
        options: {
            initialFrameWidth: '100%',
            initialFrameHeight: 320
        }
    };

    state = {
        id: undefined,
        ue: undefined,
        value: undefined
    };

    constructor(props) {
        super(props);
        this.state.id = utils.uuid();
        this.initData(props);
        this.setDataSource();
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    componentDidMount() {
        this.state.ue = UE.getEditor(this.state.id, this.props.options);
        this.state.ue.addListener('contentChange', () => {
            this.state.value = this.state.ue.getContent();
            if (this.props.onChange) {
                this.props.onChange(this.state.value, this);
            }
        });
    }

    initData(props) {
        if (props.value !== undefined) {
            this.state.value = props.value;
        }
    }

    /**
     * 设置值
     * @param value
     */
    setValue(value) {
        this.state.value = value;
        this.state.ue.setContent(value);
        if (this.props.onChange) {
            this.props.onChange(value, this);
        }
    }

    /**
     * 获取值
     * @returns {*}
     */
    getValue() {
        return this.state.value === undefined ? this.props.defaultValue : this.state.value;
    }

    /**
     * 设置数据源
     * @param dataSource
     */
    setDataSource(dataSource = this.props.dataSource) {
        utils.getDataSource(undefined, dataSource, this.props.dataSourceConfig).then((dataSource) => {
            this.setState({dataSource: dataSource});
        });
    }

    render() {
        let value = this.getValue();
        let label = this.props.label;
        let styleProps = style.getStyle('radio', this.props);
        return <div style={{width: '100%', zIndex: 1, position: 'relative', ...this.props.rootStyle}}>
            {
                label === false ? null : <div style={styleProps.labelStyle}>
                    <span style={{display: 'inline-block', transform: "scale(0.75)"}}>{label}</span>
                </div>
            }
            <div>
                <script id={this.state.id} name={this.props.name || this.props.dataKey} type="text/plain">
                    {value}
                </script>
            </div>
            {
                this.props.errorText ? <div className="text-danger text-small" style={{marginTop: 2}}>{this.props.errorText}</div> : null
            }
        </div>
    }
}
