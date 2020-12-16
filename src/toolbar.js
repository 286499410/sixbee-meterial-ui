/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import _ from 'lodash';
import DropDown from './dropdown';
import Button from './button';
import Icon from './icon';
import Control from './control';

export default class Toolbar extends Component {

    static defaultProps = {
        dataSource: [
            [], []
        ]
    };

    state = {};

    setDataSource(dataSource) {
        this.setState({dataSource: dataSource});
    }

    handleClick = (e) => (event) => {
        if (e.onClick) {
            e.onClick(event, e, this.props.context);
        }
    };

    renderEvent = (event) => {
        if (_.isObject(event)) {
            switch (event.type) {
                case 'button':
                    return <Button
                        ref={event.key}
                        type={event.buttonType}
                        size={event.size || 'default'}
                        icon={event.icon}
                        label={event.label}
                        labelPosition={event.labelPosition || 'after'}
                    />;
                case 'dropdown':
                    return <DropDown
                        ref={event.key}
                        dataSource={event.dataSource}
                        context={this.props.context}
                        defaultValue={event.defaultValue}
                        size={event.size || 'default'}
                        anchorOrigin={event.anchorOrigin}
                        targetOrigin={event.targetOrigin}
                    >
                        {
                            (() => {
                                if (_.isString(event.children.type)) {
                                    switch (event.children.type) {
                                        case 'button':
                                            return <Button style={{marginTop: 0}}
                                                           type={event.children.buttonType}
                                                           size={event.size || 'default'}
                                                           icon={event.children.icon}
                                                           labelPosition={event.children.labelPosition || 'after'}
                                                           label={event.children.label}
                                            />;
                                        default:
                                            return null;
                                    }
                                } else {
                                    return event.children
                                }
                            })()
                        }
                    </DropDown>;
                case 'control':
                    let styleProps = {
                        select: {
                            style: {
                                height: 30
                            },
                            labelStyle: {
                                height: 30,
                                lineHeight: '30px',
                                paddingLeft: 24
                            },
                            iconStyle: {
                                top: 2,
                                right: 0
                            },
                            menuItemStyle: {
                                paddingLeft: 8
                            }
                        },
                        auto: {
                            style: {
                                paddingLeft: 8
                            },
                            iconStyle: {
                                style: {
                                    right: 0
                                }
                            }
                        },
                        checkbox: {
                            style: {
                                marginTop: 0,
                                marginLeft: 8
                            },
                            labelStyle: {
                                whiteSpace: 'nowrap',
                                marginTop: 1
                            }
                        }
                    };
                    return <div className="flex middle" style={{width: event.width || 'auto'}}>
                        <div>{event.label}</div>
                        <div style={{flexGrow: 1}}>
                            <div style={{
                                border: '1px solid rgb(217, 227, 239)',
                                height: 30,
                                background: '#fff',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                borderRadius: 3
                            }}>
                                <Control
                                    ref={event.key}
                                    label={false}
                                    borderShow={false}
                                    {...event.field}
                                    onChange={event.onChange}
                                />
                            </div>
                        </div>
                    </div>;
                case 'component':
                    let Component = event.component;
                    return <Component {...(_.isFunction(event.props) ? event.props() : event.props)}/>;
                case 'refresh':
                    return <Icon type="button" name="refresh" size={22}/>;
                case 'render':
                    return event.render(this.props);
                case 'text':
                default:
                    return <div style={{display: 'table', fontSize: 14, ...event.style}}>{event.label}</div>
            }
        }
        return null;
    };

    getControl = (key) => {
        return this.refs[key];
    };

    render() {
        let dataSource = this.state.dataSource || this.props.dataSource;
        let AuthKey = App && App.lib("authKey");
        return <div className="toolbar" style={this.props.style}>
            {
                dataSource.map((rows, index) => {
                    return <div className="toolbar-group" key={index}>
                        {rows.map((event, j) => {
                            if (_.isString(event) && this.props.events && this.props.events[event]) {
                                event = this.props.events[event];
                            } else if (_.isObject(event) && this.props.events && this.props.events[event.key]) {
                                event = {...this.props.events[event.key], ...event}
                            }
                            if (event.isShow) {
                                let isShow = _.isFunction(event.isShow) ? event.isShow() : event.isShow;
                                if (!isShow) {
                                    return null;
                                }
                            }
                            return <div className="toolbar-item"
                                        key={j}
                                        onClick={this.handleClick(event)}
                                        auth-key={_.isFunction(event.authKey) ? event.authKey() : (AuthKey ? AuthKey.get(event.authKey) : event.authKey)}>
                                {this.renderEvent(event)}
                            </div>
                        })}
                    </div>
                })
            }
        </div>
    }
}
