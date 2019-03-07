import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from "../icon";

export default class Item extends Component {

    static defaultProps = {
        selected: false,            //是否选中的
        hide: false,                //是否隐藏的
    };

    static contextTypes = {
        state: PropTypes.object,
        props: PropTypes.object,
        setListState: PropTypes.func
    };

    handleClick = (event) => {
        event.stopPropagation();
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    handleIconClick = (e) => (event) => {
        event.stopPropagation();
        if (e.onClick) {
            e.onClick(this.props.data);
        }
    };

    render() {
        return <div className={`item ${this.props.selected ? 'selected' : ''}`}
                    style={{display: this.props.hide ? 'none' : 'block'}}
                    onClick={this.handleClick}>
            {this.props.children}
            <div className="icon-events">
                <div className="flex middle">
                    {this.context.props.iconEvents.map((event, key) => {
                        let disabled = _.isFunction(event.disabled) ? event.disabled(this.props.data) : event.disabled;
                        return <Icon key={key}
                                     type="button"
                                     size={16}
                                     name={event.icon}
                                     title={event.title}
                                     hoverColor="#1890ff"
                                     disabled={disabled}
                                     onClick={this.handleIconClick(event)}/>
                    })}
                </div>
            </div>
        </div>
    }
}