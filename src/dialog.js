/**
 * Created by zhengzhaowei on 2018/6/14.
 */

import React, {Component} from 'react';
import MaterialDialog from 'material-ui/Dialog';
import Icon from './icon';
import $ from 'jquery';
import utils from './utils';

export default class Dialog extends Component {

    static defaultProps = {
        open: false,
    };

    state = {
        style: {
            textAlign: 'center',
            zIndex: 1500,
            left: -10000,
            top: 0
        },
        startPosition: {
            x: 0,
            y: 0
        },
        open: false
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }
    componentDidMount() {

    }

    initData(props) {
        this.state.open = props.open || false;
        if(this.state.open) {
            this.state.style.left = 0;
        }
    }

    show() {
        this.state.style.left = 0;
        this.setState({open: true});
    }

    hide() {
        this.state.style.left = -10000;
        this.setState({open: false});
    }

    handleClose = (event) => {
        event.stopPropagation();
        this.hide();
        if (typeof this.props.onClose == 'function') {
            this.props.onClose();
        }
    };

    handleMouseDown = (event) => {
        let position = utils.getMousePosition(event);
        let lastStyle = Object.assign({}, this.state.style);
        this.state.startPosition = position;
        $(document).mousemove((event) => {
            let position = utils.getMousePosition(event);
            let offsetX = position.x - this.state.startPosition.x;
            let offsetY = position.y - this.state.startPosition.y;
            this.state.style.left = lastStyle.left + offsetX;
            this.state.style.top = lastStyle.top + offsetY;
            this.forceUpdate();
        });
        $(document).mouseup((event) => {
            $(document).unbind("mousemove");
        });
    };

    render() {
        let title = <div style={{position: 'relative', fontSize: 14, zIndex: 1}}>
            <div style={{backgroundColor:'#F6F7FB', color:'#333', lineHeight: '40px', paddingLeft: 8, ...this.props.titleStyle}} onMouseDown={this.handleMouseDown}>{this.props.title}</div>
            <div style={{position: 'absolute', right: 2, top: '50%', marginTop: -17, zIndex: 1, lineHeight: 1}}>
                <Icon size={18}
                      name="close"
                      color="#666"
                      hoverColor="#5c8feb"
                      type="button"
                      onClick={this.handleClose}
                />
            </div>
        </div>;
        return (
            <MaterialDialog
                bodyClassName="dialogBody"
                ref={"dialog"}
                style={{...this.state.style, ...this.props.style}}
                contentStyle={{width: 'auto', maxWidth: 'auto', textAlign: 'left', display: 'inline-block'}}
                bodyStyle={{padding:'1px 0 0', fontSize: 15, maxHeight: 800}}
                title={this.props.title ? title : undefined}
                titleStyle={{padding: 0, cursor: 'move'}}
                overlayStyle={{backgroundColor:'rgba(0,0,0, 0.2)'}}
                open={this.state.open}
                autoScrollBodyContent={true}
            >
                {this.props.children}
            </MaterialDialog>
        )
    }
}