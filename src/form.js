/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';
import _ from 'lodash';
import Control from './control';
import FormTable from './controls/form-table';
import Button from './button';
import Tabs from './tabs';

const STATUS_INIT = 'init';                 //初始状态
const STATUS_EDITING = 'editing';           //编辑中
const STATUS_CHECKERROR = 'checkError';     //验证错误
const STATUS_SUBMITTING = 'submitting';     //提交中
const STATUS_SUBMITTED = 'submitted';       //已提交
const STATUS_ERROR = 'error';               //提交发生错误

export default class Form extends Component {

    static childContextTypes = {
        Form: PropTypes.object,
        state: PropTypes.object
    };

    getChildContext() {
        return {
            Form: this,
            state: this.state
        }
    }

    static defaultProps = {

        onChange: undefined,            //更改触发事件
        onChangeStatus: undefined,      //表单状态变化触发事件
        onDidMount: undefined,          //组件挂载完成触发事件
        onDidUpdate: undefined,         //组件重新渲染完成触发事件
        beforeSubmit: undefined,        //提交之前触发事件，return false时可阻止提交

        inline: false,                  //true时，label与控件同行显示
        width: '100%',                  //表单宽度
        height: 400,                    //表单高度
        cols: 1,                        //多少列
        actions: ['reset', 'submit'],   //按钮事件
        defaultData: {},                //默认数据，一定会提交，优先控件的defaultValue
        originData: undefined,          //源数据，支持函数和Object，函数return Object
        dataScope: 'changed',           //changed修改了才提交，all全部提交
        controlSize: 'default',         //控件大小，size，default，large
        controlWidth: '100%',           //控件宽度
        fields: [],                     //控件定义
        controlBetweenSpace: 0,         //控件之间的间距
        controlProps: {},               //控件参数

        resetLabel: '重置',
        submitLabel: '提交',
        cancelLabel: '取消',
    };

    state = {
        formStatus: STATUS_INIT,            //init初始化，editing编辑中，checking验证中，checkError验证错误, submitting提交中，submitted已提交
        originData: {},                     //原值
        fieldDefaultData: {},               //从控件定义中提取出defaultValue
        fieldOriginData: {},                //从originData取出控件原值
        changedData: {},                    //变化值
        errorText: {},                      //错误信息
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData = (props) => {
        if (_.isFunction(props.originData)) {
            this.state.originData = props.originData();
        } else if (props.originData !== undefined) {
            this.state.originData = props.originData;
        }
        //提取控件默认值
        this.state.fieldDefaultData = {};
        this.setFieldDefaultData(this.props.fields);
        //提取控件原值
        this.state.feildOriginData = {};
        this.setFieldOriginData(this.props.fields);
    };

    componentDidMount() {
        if (this.props.onDidMount) {
            this.props.onDidMount(this);
        }
    }

    componentDidUpdate() {
        if (this.props.onDidUpdate) {
            this.props.onDidUpdate(this);
        }
    }

    /**
     * 提取控件默认值
     * @param fields
     */
    setFieldDefaultData(fields) {
        fields.map((field) => {
            if (field.defaultValue !== undefined) {
                let defaultValue = field.defaultValue;
                if (_.isFunction(defaultValue)) {
                    defaultValue = defaultValue(this);
                }
                _.set(this.state.fieldDefaultData, field.formKey || field.key, defaultValue);
            }
            if (field.fields) {
                this.setFieldDefaultData(field.fields);
            }
        })
    }

    /**
     * 提取控件原值
     * @param fields
     */
    setFieldOriginData(fields) {
        fields.map((field) => {
            let value = _.get(this.state.originData, field.formKey || field.key);
            if (value !== undefined) {
                _.set(this.state.feildOriginData, field.formKey || field.key, value);
            }
            if (field.fields) {
                this.setFieldOriginData(field.fields);
            }
        })
    }

    /**
     * 获取提交数据
     * @param dataScope
     * @returns {*}
     */
    getData(dataScope = this.props.dataScope) {
        //默认数据
        let defaultData = Object.assign({}, this.state.fieldDefaultData, this.props.defaultData);
        for (let key of Object.keys(defaultData)) {
            if (this.state.feildOriginData[key] !== undefined) {
                delete defaultData[key];
            }
        }
        switch (dataScope) {
            case 'all': //所有控件的值
                return {
                    ...defaultData,
                    ...this.state.feildOriginData,
                    ...this.state.changedData
                };
            case 'changed': //修改控件的值
                return {
                    ...defaultData,
                    ...this.state.changedData
                };
            case 'all-extra': //所有值
                return {
                    ...defaultData,
                    ...this.state.originData,
                    ...this.state.changedData
                }
        }
    };

    /**
     * 数据改时执行事件
     * @param field
     */
    handleChange = (field) => (value, control) => {
        this.setFormStatus(STATUS_EDITING);
        _.set(this.state.changedData, field.formKey || field.key, value);
        let data = this.getData('all');
        if (field.onChange) {
            let value = _.get(data, field.formKey || field.key);
            field.onChange(value, control, this);
        }
        if (this.props.onChange) {
            this.props.onChange(data, field, control, this);
        }
        if(Object.keys(this.state.errorText).length > 0) {
            let allData = this.getData('all');
            this.check(allData);
        }
        this.forceUpdate();
    };

    /**
     * 表单提交前执行,返回false时阻止提交
     * @param submitData
     * @param allData
     * @returns {*}
     */
    beforeSubmit(submitData, allData) {
        if (this.props.beforeSubmit) {
            return this.props.beforeSubmit(submitData, allData, this)
        }
        return true;
    }

    check(data) {
        if (this.props.check) {
            let errorMsg = this.props.check(data);
            if (errorMsg !== true) {
                console.log('errorMsg', errorMsg);
                this.setState({errorText: errorMsg});
                return false;
            } else {
                this.setState({errorText: {}});
            }
        }
        return true;
    }

    /**
     * 提交处理
     * @param data
     */
    submit() {
        let allData = this.getData('all');
        let submitData = this.getData();
        console.log('submitData', submitData);
        //验证
        if (!this.check(allData)) {
            return false;
        }
        if (this.beforeSubmit(submitData, this) === false) {
            return false;
        }
        this.state.errorText = {};
        if (this.props.onSubmit) {
            this.setFormStatus(STATUS_SUBMITTING);
            let promise = this.props.onSubmit(submitData);
            if (promise instanceof Promise) {
                promise.then(() => {
                    this.setFormStatus(STATUS_SUBMITTED);
                }, (res) => {
                    if (res instanceof Response) {
                        res.json().then((json) => {
                            if (json.errCode == 10002 && json.validator) {
                                //提交后，服务器返回的错误验证信息
                                this.setFormStatus(STATUS_CHECKERROR);
                                this.setState({errorText: json.validator});
                            }
                        })
                    } else {
                        this.setFormStatus(STATUS_ERROR);
                    }
                });
            } else {
                this.setFormStatus(STATUS_ERROR);
            }
        }
        return true;
    };

    /**
     * 重置
     */
    reset() {
        this.setState({
            changedData: {}
        });
        if (this.props.onReset) {
            this.props.onReset(this);
        }
    }

    /**
     * 设置表单状态
     * @param status
     */
    setFormStatus(status) {
        this.state.formStatus = status;
        if (this.refs.actions)
            this.refs.actions.forceUpdate();
        if (this.props.onChangeStatus) {
            this.props.onChangeStatus(status);
        }
    }

    /**
     * 获取控件
     * @param key
     * @returns {*|undefined}
     */
    getControl(key) {
        return this.refs[key] || undefined;
    }

    /**
     * 获取指定KEY的字段
     * @param keys
     * @returns {Array}
     */
    getFields(keys) {
        let fields = [];
        this.props.fields.map((field) => {
            if (keys.indexOf(field.key) >= 0) {
                fields.push(field);
            }
        });
        return fields;
    }

    /**
     * 是否显示
     * @param field
     * @param data
     * @returns {*}
     */
    isShow(field, data) {
        if (field.isShow) {
            if (_.isBoolean(field.isShow)) {
                return field.isShow;
            } else if (_.isFunction(field.isShow)) {
                return field.isShow(data, this);
            }
        }
        return true;
    }

    /**
     * 渲染控件
     * @param fields
     * @param inline
     * @returns {Array}
     */
    renderControls = (fields) => {
        let data = this.getData('all');
        let allExtraData = this.getData('all-extra');
        let cols = this.props.cols || 1;
        return fields.map((field, index) => {
            let value = _.get(data, field.formKey || field.key);
            let isShow = this.isShow(field, data);
            //强制转换
            if (field.convert)
                value = field.convert(allExtraData);
            let fieldCols = (field.cols || 1);
            let controlProps = _.get(this.props.controlProps, field.formKey || field.key, {});
            switch (field.type) {
                case 'group':
                    //分组类型，有组标签field.label
                    return <div key={index} className={`col col-${fieldCols} ${!isShow ? 'hidden' : ''}`}>
                        <div style={{
                            width: field.width || this.props.controlWidth,
                            marginBottom: this.props.controlBetweenSpace
                        }}>
                            <div className="row-space" cols={field.groupCols || cols}>
                                {
                                    field.label ? <div className="col col-full"
                                                       style={{
                                                           color: 'cadetblue',
                                                           marginTop: 16,
                                                           marginBottom: this.props.inline ? 16: 0
                                                       }}>{field.label}</div> : null
                                }
                                {this.renderControls(field.fields)}
                            </div>
                        </div>
                    </div>;
                case 'table':
                    //表格多行多列控件组合
                    return <div className={`col col-${fieldCols} ${!isShow ? 'hidden' : ''}`} key={index}>
                        <FormTable
                            ref={field.key}
                            {...field}
                            columns={field.fields}
                            value={value}
                            controlSize={this.props.controlSize}
                            data={allExtraData}
                            onChange={this.handleChange(field)}/>
                    </div>;
                case 'multi':
                    return <div key={index} cols={cols} className="col col-full">
                        <div className="flex middle">
                            {
                                field.label ?
                                    (this.props.inline ?
                                        <div
                                            style={{
                                                width: this.props.labelWidth,
                                                minWidth: this.props.labelWidth
                                            }}>{field.label}</div> :
                                        <div className="col col-full"
                                             style={{marginTop: 16}}>{field.label}</div>) : null
                            }
                            <div style={{flexGrow: 1, position: 'relative'}}>
                                <div className="row-space large" cols={field.cols || field.fields.length}>
                                    {this.renderControls(field.fields, false)}
                                </div>
                                <div className="row-delimiter full-screen flex middle" style={{right: -25, zIndex: -1}}>
                                    {
                                        field.fields.map((data, index) => {
                                            return <div key={index}
                                                        className="col text-right">{index == field.fields.length - 1 ? '' : field.delimiter}</div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>;
                case 'render':
                    return <div key={index} className={`col col-${fieldCols}`}>
                        <div style={{
                            width: field.width || this.props.controlWidth,
                            marginBottom: this.props.controlBetweenSpace
                        }}>
                            {field.render(data, this)}
                        </div>
                    </div>;
                default:
                    let control = <Control ref={field.key}
                                           value={value}
                                           size={this.props.controlSize}
                                           {...{...field, label: this.props.inline ? false : field.label}}
                                           labelFixed={this.props.labelFixed}
                                           errorText={_.get(this.state.errorText, field.key)}
                                           validate={this.props.validate ? this.state.validate : false}
                                           onChange={this.handleChange(field)}
                                           data={allExtraData}
                                           context={this}
                                           {...controlProps}
                    />;
                    if (this.props.inline) {
                        return <div className={`col col-${fieldCols}`}
                                    style={{width: '100%', marginBottom: this.props.controlBetweenSpace}}
                                    key={index}>
                            <div className={`flex middle ${!isShow ? 'hidden' : ''}`}
                                 style={{width: field.width || this.props.controlWidth}}>
                                {
                                    field.label ? <div
                                        style={{
                                            width: this.props.labelWidth,
                                            minWidth: this.props.labelWidth
                                        }}>{field.label}：</div> : null
                                }
                                <div style={{flexGrow: 1, width: 0}}>
                                    <div>
                                        {control}
                                    </div>
                                </div>
                            </div>
                            {field.helperText ? <div className="helper-text">{field.helperText}</div> : null}
                        </div>
                    } else {
                        return <div className={`col col-${fieldCols} ${!isShow ? 'hidden' : ''}`} key={index}
                                    style={{marginBottom: this.props.controlBetweenSpace}}>
                            <div style={{width: field.width || this.props.controlWidth}}>
                                {control}
                            </div>
                            {field.helperText ? <div className="helper-text">{field.helperText}</div> : null}
                        </div>
                    }
            }
        });
    };

    getTabDataSource() {
        return this.props.tabs.map((tab) => {
            return {
                label: tab.label,
                content: <Scrollbars style={{width: this.props.width, height: '100%'}}>
                    <div className="space" style={{width: '100%', overflowX: 'hidden', ...this.props.style}}>
                        <div className="form row-space" cols={this.props.cols}>
                            {this.renderControls(this.getFields(tab.fields))}
                        </div>
                    </div>
                </Scrollbars>
            }
        });
    }

    render() {
        let footerHeight = 54;
        let contentHeight = this.props.height;
        if (this.props.actions !== false) {
            contentHeight = `calc(100% - ${footerHeight}px)`;
        }
        return (
            <div className={"relative " + this.props.className}
                 style={{
                     width: this.props.width,
                     height: _.isNumber(this.props.height) ? this.props.height : `calc(${this.props.height})`
                 }}>
                {
                    this.props.tabs ?
                        <div style={{width: this.props.width, height: contentHeight}}>
                            <Tabs dataSource={this.getTabDataSource()}
                                  labelStyle={{justifyContent: 'center', margin: 12}}/>
                        </div> :
                        <Scrollbars style={{width: this.props.width, height: contentHeight}}
                                    autoHeight={this.props.height == 'auto'}
                                    autoHeightMax={contentHeight}>
                            <div className="space" style={{width: '100%', overflowX: 'hidden', ...this.props.style}}>
                                <div className="form row-space" cols={this.props.cols}>
                                    {this.renderControls(this.props.fields)}
                                </div>
                            </div>
                        </Scrollbars>
                }
                {
                    this.props.actions === false || this.props.actions.length == 0 ? null : <div>
                        <div style={{height: footerHeight}}></div>
                        <div style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                            <FormActions ref="actions" actions={this.props.actions} style={this.props.actionStyle}/>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

class FormActions extends Component {

    static contextTypes = {
        Form: PropTypes.object,
        state: PropTypes.object
    };

    handleClick = (key) => (event) => {
        switch (key) {
            case 'reset':
                this.context.Form.reset.bind(this.context.Form)();
                break;
            case 'submit':
                this.context.Form.submit.bind(this.context.Form)();
                break;
            case 'cancel':
                history.go(-1);
                break;
        }
    };

    getActions() {
        let actions = [];
        let label = {
            reset: {label: this.context.Form.props.resetLabel, onClick: this.handleClick('reset')},
            submit: {
                label: this.context.Form.props.submitLabel + (this.context.state.formStatus == STATUS_SUBMITTING ? '中...' : ''),
                type: this.context.state.formStatus == STATUS_SUBMITTING ? 'disabled' : 'primary',
                onClick: this.handleClick('submit')
            },
            cancel: {
                label: this.context.Form.props.cancelLabel,
                onClick: this.handleClick('cancel')
            }
        };
        this.props.actions.map((action) => {
            if (_.isString(action)) {
                actions.push({
                    ...label[action]
                })
            } else {
                actions.push(action);
            }
        });
        return actions;
    }

    render() {
        let actions = this.getActions();
        return <div className="bg-white space"
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        textAlign: 'right',
                        boxShadow: '0 -1px 5px #ddd',
                        zIndex: 2,
                        ...this.props.style
                    }}>
            {
                actions.map((action, index) => {
                    return <Button key={index} {...action} style={{marginLeft: 12}}/>
                })
            }
        </div>
    }
}


