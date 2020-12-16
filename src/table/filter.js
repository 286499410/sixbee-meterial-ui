import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from "../icon";
import Popover from '../popover';
import Control from '../control';

/**
 * 过滤器
 */
export default class Filter extends Component {

    static contextTypes = {
        Table: PropTypes.object,
        state: PropTypes.object,
        props: PropTypes.object,
        setTableState: PropTypes.func,
        handleStateChange: PropTypes.func,
        getDataRows: PropTypes.func
    };

    static defaultProps = {
        reset: true,
        submit: true,
        resetLabel: '重置',
        submitLabel: '确定',
        filterColor: '#28a7e1',
        hoverColor: '#a1a1a1',
        color: '#bfbfbf',
        field: {},
        onFilter: undefined
    };

    defaultWidth = {
        "money-range": 300,
        "date-range": 260,
        "text": 200,
        "select": 200,
        "select-check": 200,
        "auto": 200
    };

    defaultFilterType = {
        "money": "money-range",
        "date": "date-range"
    };

    state = {
        open: false,
        value: undefined,
        anchorEl: {}
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        this.state.value = props.value;
    }

    handleOpen = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
        let type = this.getFilterType();
        // if (type == 'text' || type == 'auto' || type == 'date') {
        //     setTimeout(() => {
        //         this.refs.control.focus();
        //     }, 50);
        // }
        if(type == 'date-range') {
            // setTimeout(() => {
            //     this.refs.control.refs.control.refs.container.click();
            // }, 50);
        }
    };

    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    handleReset = (event) => {
        if(this.getFilterType() === 'money-range') {
            this.state.value = [];
            this.refs.control.setValue([]);
        } else {
            this.state.value = undefined;
            this.refs.control.setValue(undefined);
        }
        this.filter();
    };

    handleSubmit = (event) => {
        this.filter();
    };

    filter() {
        this.setState({open: false});
        if (this.props.onFilter) {
            this.props.onFilter(this.state.value, this.props.field);
        }
    }

    getFilterType() {
        return this.props.field.filterType || this.defaultFilterType[this.props.field.type] || this.props.field.type;
    }

    render() {
        let hintText;
        let type = this.getFilterType();
        if (type == 'text' || type == 'auto') {
            hintText = '输入关键字查询';
        }
        return <div ref="container" style={{display: 'inline-block', position: 'relative', lineHeight: 1}}>
            <Icon type="button"
                  name="filter-fill"
                  color={this.state.value ? this.props.filterColor : this.props.color}
                  hoverColor={this.props.hoverColor}
                  padding={2}
                  size={14}
                  onClick={this.handleOpen}/>
            <Popover style={{left: -10000}}
                     open={this.state.open}
                     anchorEl={this.state.anchorEl}
                     onRequestClose={this.handleRequestClose}>
                <div className="space" style={{width: this.props.field.filterWidth || this.defaultWidth[type] || 'auto'}}>
                    <Control
                        ref="control"
                        hintText={hintText}
                        {...this.props.field}
                        label={false}
                        value={this.state.value}
                        filter={undefined}
                        hasClear={false}
                        defaultValue={undefined}
                        onEnter={(event) => {
                            this.handleSubmit(event);
                        }}
                        textAlign="left"
                        type={type}
                        onChange={(value) => {
                            this.state.value = value;
                            if (this.props.field.onChange) {
                                this.props.field.onChange(value);
                            }
                        }}/>
                    <div className="flex text-center right" style={{marginTop: 12, flexDirection: 'row-reverse'}}>
                        {this.props.submit ? <div className="text-primary cursor-pointer" style={{marginLeft: 12}} onClick={this.handleSubmit}>
                            {this.props.submitLabel}
                        </div> : null}
                        {this.props.reset ? <div className="text-muted cursor-pointer" onClick={this.handleReset}>
                            {this.props.resetLabel}
                        </div> : null}
                    </div>
                </div>
            </Popover>
        </div>
    }
}
