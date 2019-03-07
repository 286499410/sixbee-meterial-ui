import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Popover from 'material-ui/Popover';
import Control from '../control';

export default class Filter extends Component {

    static contextTypes = {
        state: PropTypes.object,
        props: PropTypes.object,
        setListState: PropTypes.func
    };

    static defaultProps = {
        anchorOrigin: {"horizontal": "left", "vertical": "bottom"},
        targetOrigin: {"horizontal": "left", "vertical": "top"}
    };

    state = {
        open: false,
        value: undefined,
        anchorEl: undefined,
    };

    constructor(props) {
        super(props);
    }

    /**
     * 点击过滤图标事件
     * @param event
     */
    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            value: this.getValue(),
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    getValue = () => {
        return this.context.state.filterText;
    };

    setValue = (value) => {
        this.setState({value: value});
        this.context.setListState({
            filterText: value
        });
    };

    handleChange = (value) => {
        this.setState({value: value});
    };

    handleKeyUp = (event) => {
        if (event.keyCode == 13) {
            this.handleConfirm()
        }
    };

    handleConfirm() {
        this.handleRequestClose(event);
        this.setValue(this.state.value);
    }

    render() {
        let value = this.getValue();
        return <div ref="container" className="icon-events" style={{display: 'inline-block',right: 'auto'}}>
            <Icon ref="filterIcon"
                  type="button"
                  name="filter"
                  color={value !== undefined && value !== '' ? '#1890ff' : undefined}
                  onClick={this.handleClick}
            />
            <Popover
                open={this.state.open}
                style={{left: -10000}}
                anchorEl={this.state.anchorEl}
                anchorOrigin={this.props.anchorOrigin}
                targetOrigin={this.props.targetOrigin}
                onRequestClose={this.handleRequestClose}
            >
                <div className="flex middle" style={{width: 180, height: 50, padding: 8}}>
                    <div className="border-primary" style={{width: 128, padding: '0 4px'}}>
                        <Control
                            borderShow={false}
                            ref="control"
                            name="filter"
                            type="text"
                            value={this.state.value}
                            hintText={"输入筛选内容"}
                            size={"small"}
                            onKeyUp={this.handleKeyUp}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="text-primary cursor-pointer" onClick={this.handleConfirm.bind(this)} style={{marginLeft: 8}}>确定</div>
                </div>
            </Popover>
        </div>
    }
}