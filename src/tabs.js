/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import _ from 'lodash';
import SwipeableViews from 'react-swipeable-views';
import {Scrollbars} from 'react-custom-scrollbars';

export default class Tabs extends Component {

    static defaultProps = {
        defaultActiveIndex: 0,      //默认
        activeIndex: undefined,     //当前
        transition: 'fade',         //切换效果
        contentStyle: {},
        tabClassName: undefined
    };

    state = {
        activeIndex: undefined
    };

    transition = {
        fade: FadeViews,
        slide: SwipeableViews
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (props.activeIndex !== undefined) {
            this.state.activeIndex = props.activeIndex;
        }
    }

    getActiveIndex() {
        return this.state.activeIndex === undefined ? this.props.defaultActiveIndex : this.state.activeIndex;
    }

    handleChange = (value) => (event) => {
        this.setState({
            activeIndex: value
        });
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    renderContent() {
        switch (this.props.transition) {
            case 'slide':
                return <SwipeableViews index={this.state.activeIndex}>
                    {this.props.dataSource.map((data, index) => {
                        return <div key={index}>{data.content}</div>
                    })}
                </SwipeableViews>;
            case 'fade':
            default:
                return <FadeViews index={this.state.activeIndex}>
                    {this.props.dataSource.map((data, index) => {
                        return <div key={index}>{data.content}</div>
                    })}
                </FadeViews>;
        }
    }

    render() {
        let Transition = this.transition[this.props.transition];
        let activeIndex = this.getActiveIndex();
        return <div ref="container" className="layout direction-column">
            <div className={"tab " + this.props.tabClassName} style={this.props.labelStyle}>
                {this.props.dataSource.map((data, index) => {
                    return <div className={`tab-item ${activeIndex == index ? 'active' : ''}`} key={index} style={data.style}
                                onClick={this.handleChange(index)}>
                        {data.label}
                    </div>
                })}
            </div>
            <div className="relative" style={{flexGrow: 1, height: 0, ...this.props.contentStyle}}>
                <Transition index={activeIndex}>
                    {this.props.dataSource.map((data, index) => {
                        return <div key={index} style={{height: '100%'}}>{data.content}</div>
                    })}
                </Transition>
            </div>
        </div>
    }

}

class FadeViews extends Component {

    render() {
        let children = _.isArray(this.props.children) ? this.props.children : [this.props.children];
        return <div ref="container" className="full-screen">
            {children.map((data, index) => {
                let isActive = index === this.props.index;
                return <div className="tab-container full-screen" key={index}
                            style={{
                                transition: 'opacity .3s ease-out',
                                opacity: isActive ? 1 : 0,
                                height: '100%',
                                zIndex: isActive ? 2 : 1
                            }}>
                    <Scrollbars>
                        {data}
                    </Scrollbars>
                </div>
            })}
        </div>
    }
}
