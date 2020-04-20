import React, {Component} from 'react';
import Popover from './popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import style from "./style";

export default class ContextMenu extends Component {

    static defaultProps = {
        style: undefined,
        dataSource: [
            //示例
            // {label: '', onClick: () => {}}
        ],
        onClick: undefined
    };

    state = {
        open: false,
        anchorEl: undefined
    };

    constructor(props) {
        super(props);
    }

    /**
     * 打开菜单
     * @param event
     */
    handleContextMenu = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.target
        })
    };

    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    /**
     * 菜单点击事件
     * @param item
     * @returns {Function}
     */
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

    render() {
        let styleProps = style.getStyle('dropdown', this.props);
        return <div style={this.props.style} onContextMenu={this.handleContextMenu}>
            {this.props.children}
            <Popover style={{left: -10000}}
                     open={this.state.open}
                     anchorEl={this.state.anchorEl}
                     onRequestClose={this.handleRequestClose}>
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