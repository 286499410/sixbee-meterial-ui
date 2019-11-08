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
    };

    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    handleReset = (event) => {
        this.refs.control.setValue(undefined);
        this.filter();
    };

    handleSubmit = (event) => {
        this.filter();
    };

    filter() {
        this.setState({open: false});
        let value = this.refs.control.getValue();
        if (this.props.onFilter) {
            this.props.onFilter(value, this.props.field);
        }
    }

    render() {
        let hintText;
        if(this.props.field.type == 'text' || this.props.field.type == 'auto') {
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
                <div className="space-small">
                    <Control
                        ref="control"
                        hintText={hintText}
                        {...this.props.field}
                        label={false}
                        value={this.state.value}
                        filter={undefined}
                        hasClear={false}
                        defaultValue={undefined}
                        onChange={(value) => {
                            this.state.value = value;
                            if (this.props.field.onChange) {
                                this.props.field.onChange(value);
                            }
                        }}/>
                    <div className="row text-center text-primary" cols="2" style={{padding: '6px 0', marginTop: 6}}>
                        {this.props.reset ? <div className="col text-left">
                            <span className="cursor-pointer" style={{padding: 6}}
                                  onClick={this.handleReset}>{this.props.resetLabel}</span>
                        </div> : <div></div>}
                        {this.props.submit ? <div className="col text-right">
                            <span className="cursor-pointer" style={{padding: 6}}
                                  onClick={this.handleSubmit}>{this.props.submitLabel}</span>
                        </div> : <div></div>}
                    </div>
                </div>
            </Popover>
        </div>
    }
}
