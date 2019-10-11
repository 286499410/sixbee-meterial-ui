/**
 * Created by zhengzhaowei on 2018/5/22.
 */


import React, {Component} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import $ from 'jquery';

class Container extends Component {

    static defaultProps = {
        fullScreen: false,
        direction: 'row',
        scrollbar: 'custom', //default | custom
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <div
            className={`layout ${this.props.className} ${this.props.fullScreen ? 'full-screen' : ''} direction-${this.props.direction}`}
            style={{...this.props.style}}>
            {this.props.children}
        </div>
    }
}

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={`header ${this.props.className}`} style={{...this.props.style}}>
            {this.props.children}
        </div>
    }
}

class Sidebar extends Component {

    static defaultProps = {
        width: 200
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={`sidebar ${this.props.className}`}
                    style={{width: this.props.width, minWidth: this.props.width, ...this.props.style}}>
            {this.props.children}
        </div>
    }
}

class Content extends Component {

    static defaultProps = {
        transition: 'fade'
    };

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    componentDidMount() {
        this.transition();
    }

    componentDidUpdate() {
        this.transition();
    }

    transition() {
        switch (this.props.transition) {
            case 'fade':
                this.fadeIn();
                break;
        }
    }

    fadeIn() {
        $(this.refs.container).animate({opacity: 1}, 350, 'linear');
    }

    init(props) {
        switch (props.transition) {
            case 'fade':
                $(this.refs.container).css({opacity: 0.1});
                break;
        }
    }

    render() {
        let style = {};
        switch (this.props.transition) {
            case 'fade':
                style.opacity = 0.1;
                break;
        }
        return <div ref="container" className="content" style={{...this.props.style, ...style}}>
            {
                this.props.scrollbar == 'default' ? <div className={`full-height ${this.props.className}`}>
                    {this.props.children}
                </div> : <Scrollbars>
                    <div className={`full-height ${this.props.className}`}>
                        {this.props.children}
                    </div>
                </Scrollbars>
            }
        </div>
    }
}


class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={`footer ${this.props.className}`} style={{...this.props.style}}>
            {this.props.children}
        </div>
    }
}

export default {
    Container,
    Header,
    Sidebar,
    Footer,
    Content
}