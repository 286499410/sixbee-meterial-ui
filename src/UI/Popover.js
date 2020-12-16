import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {joinBlankSpace} from "./tool";

export default class Popover extends Component {

    static defaultProps = {
        open: false,
        onRequestClose: undefined,      //请求关闭弹出层
        className: undefined,
        anchorEl: undefined,
        anchorOrigin: "left bottom",
        targetOrigin: "left top",       //(left|middle|right) (top|center|bottom)
        scaleX: 0,
        scaleY: 0,
        style: {
            width: undefined,           //宽度
            height: undefined,          //高度
        },
        zIndex: 3000
    };

    constructor(props) {
        super(props);
        this.content = React.createRef();
        this.state = {
            id: "popover" + new Date().getTime()
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const id = prevState.id;
        if (nextProps.open === true && !document.getElementById(id)) {
            let div = document.createElement("div");
            div.id = id;
            document.body.appendChild(div);
        }
        return null;
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        if (this.props.open) {
            this.renderPopoverContent();
        } else if (this.content && this.content.current) {
            this.content.current.unmount();
        }
    }

    renderPopoverContent() {
        ReactDOM.render(
            <PopoverContent ref={this.content} {...this.props} id={this.state.id}/>,
            document.getElementById(this.state.id)
        );
    }

    render() {
        return null;
    }

}

class PopoverContent extends Component {

    state = {
        open: false,
        position: {}
    };

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state.position = this.getPosition();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open === true && prevState.open === false) {
            return {open: true};
        }
        return null;
    }

    componentDidMount() {
        let containerDOM = ReactDOM.findDOMNode(this.containerRef.current);
        if (containerDOM && this.props.open === true) {
            setTimeout(() => {
                const position = this.getPosition();
                containerDOM.style.left = position.left + "px";
                containerDOM.style.top = position.top + "px";
                containerDOM.style.opacity = "1";
                containerDOM.style.transform = "scale(1, 1)";
                this.state.position = position;
            });
        }
        if (this.state.open === true && this.props.open === false) {
            //关闭弹出层
            containerDOM.style.opacity = "0";
            containerDOM.style.transform = `scale(${this.props.scaleX}, ${this.props.scaleY})`;
            setTimeout(() => {
                this.setState({open: this.props.open});
            }, 300);
        }
    }

    unmount = () => {
        let containerDOM = ReactDOM.findDOMNode(this.containerRef.current);
        containerDOM.style.opacity = "0";
        containerDOM.style.transform = `scale(${this.props.scaleX}, ${this.props.scaleY})`;
        setTimeout(() => {
            let node = document.getElementById(this.props.id);
            if(node) {
                ReactDOM.unmountComponentAtNode(node);
                node.parentNode.removeChild(node);
            }
        }, 300);
    };

    handleRequestClose = (event) => {
        event.stopPropagation();
        if (this.props.onRequestClose) {
            this.props.onRequestClose(event);
        }
    };

    getAnchorPosition() {
        let position = {};
        const el = this.props.anchorEl;
        if (el && el.getBoundingClientRect) {
            let rect = el.getBoundingClientRect();
            position = {
                top: rect.top,
                left: rect.left,
                width: el.offsetWidth,
                height: el.offsetHeight
            };
            position.right = rect.right || position.left + position.width;
            position.bottom = rect.bottom || position.top + position.height;
            position.middle = position.left + (position.right - position.left) / 2;
            position.center = position.top + (position.bottom - position.top) / 2;
        }
        return position;
    }

    getTargetPosition() {
        let targetEl = this.containerRef.current && ReactDOM.findDOMNode(this.containerRef.current);
        return {
            left: 0,
            middle: targetEl ? targetEl.offsetWidth / 2 : 0,
            right: targetEl ? targetEl.offsetWidth : 0,
            top: 0,
            center: targetEl ? targetEl.offsetHeight / 2 : 0,
            bottom: targetEl ? targetEl.offsetHeight : 0,
            width: targetEl ? targetEl.offsetWidth : undefined,
            height: targetEl ? targetEl.offsetHeight : undefined
        }
    }

    getPosition() {
        const anchorOrigin = this.props.anchorOrigin.split(' ');
        const targetOrigin = this.props.targetOrigin.split(' ');
        let anchorPosition = this.getAnchorPosition();
        let targetPosition = this.getTargetPosition();
        return {
            left: anchorPosition[anchorOrigin[0]] - targetPosition[targetOrigin[0]],
            top: anchorPosition[anchorOrigin[1]] - targetPosition[targetOrigin[1]],
            width: _.get(this.props, 'style.width', targetPosition.width),
            opacity: 0,
            transform: `scale(${this.props.scaleX}, ${this.props.scaleY})`,
            transformOrigin: this.props.targetOrigin.replace('middle', 'center')
        };
    }

    render() {
        if (this.state.open) {
            return <div>
                <div className="full-screen-fixed" style={{zIndex: this.props.zIndex - 1}}
                     onClick={this.handleRequestClose}></div>
                <div ref={this.containerRef} className={joinBlankSpace("popover", this.props.className)}
                     style={{...this.props.style, ...this.state.position}}>
                    {this.props.children}
                </div>
            </div>
        } else {
            return null;
        }

    }
}