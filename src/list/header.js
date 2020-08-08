import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Filter from './filter';
import Icon from '../icon';

export default class Header extends Component {

    static contextTypes = {
        state: PropTypes.object,
        props: PropTypes.object,
        setListState: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    handleIconClick = (e) => (event) => {
        event.stopPropagation();
        if (e.onClick) {
            e.onClick();
        }
    };

    render() {
        if(!this.context.props.title && !this.context.props.filter && (!this.context.props.headerIconEvents || this.context.props.headerIconEvents.length == 0)) {
            return null;
        }
        return <div className="list-header">
            <div className="relative">
                {this.context.props.title}
                {this.context.props.filter ? <Filter/> : null}
                <div className="icon-events">
                    <div className="flex middle" style={{marginRight: -10}}>
                        {this.context.props.headerIconEvents.map((event, key) => {
                            return <Icon key={key}
                                         type="button"
                                         name={event.icon}
                                         title={event.title}
                                         hoverColor="#1890ff"
                                         onClick={this.handleIconClick(event)}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    }
}