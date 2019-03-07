/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import style from './style';

export default class Dropdown extends Component {

    static defaultProps = {
        anchorOrigin: {horizontal: 'left', vertical: 'bottom'},
        targetOrigin: {horizontal: 'left', vertical: 'top'}
    };

    state = {
        open: false
    };

    constructor(props) {
        super(props);
    }

    handleOpen = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleClick = (item) => (event) => {
        this.setState({
            open: false
        });
        if (item.onClick) {
            item.onClick(item, this.props.context);
        }
        if (this.props.onClick) {
            this.props.onClick(item);
        }
    };

    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    render() {
        let styleProps = style.getStyle('dropdown', this.props);
        return <div style={{display: 'table'}}>
            <div onClick={this.handleOpen} style={{cursor: 'pointer'}}>
                {this.props.children}
            </div>
            <Popover
                style={{marginTop: 8, left: -10000}}
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={this.props.anchorOrigin}
                targetOrigin={this.props.targetOrigin}
                onRequestClose={this.handleRequestClose}
            >
                <Menu {...styleProps.menuStyle}>
                    {this.props.dataSource.map((item, index) => {
                        if (item.type == 'divider') {
                            return <Divider key={index}/>
                        }
                        return <MenuItem
                            key={index}
                            primaryText={item.label}
                            disabled={item.disabled}
                            onClick={this.handleClick(item)}
                        />
                    })}
                </Menu>
            </Popover>
        </div>
    }
}