import React, {Component} from 'react';

class WindowTabs extends Component {

    state = {
        currentKey: ''
    };

    constructor(props) {
        super(props);
        this.lib = props.context.lib;
        this.state.currentKey = props.currentKey;
        this.lib.subscribe(() => {
            let windows = this.lib.getWindows();
            windows.map(window => {
                if (window.state.title == '') {
                    window.state.title = this.lib.getTitle(window.key);
                }
            });
            this.forceUpdate();
        })
    }

    componentWillReceiveProps(nextProps) {
        this.state.currentKey = nextProps.currentKey;
    }

    /**
     * 移除窗口
     * @param win
     */
    removeWindow(key = this.lib.getCurrentKey()) {
        /**
         * 前置条件检查，是否允许删除
         */
        if (this.props.shouldWindowRemove) {
            let window = this.lib.getWindow(key);
            if (this.props.shouldWindowRemove(key, window.state) == false) {
                return false;
            }
        }
        this.lib.removeWindow(key);
        if (this.lib.getCurrentKey() == key) {
            //删除当前窗口，回到上一个浏览的窗口
            let order = this.lib.getOrder();
            let lastKey = _.last(order);
            this.handleClick(this.lib.getWindow(lastKey))();
        }
        this.forceUpdate();
    }

    /**
     * 关闭其他窗口
     * @param key
     */
    removeOtherWindows = (event, data) => {
        let windows = this.lib.getWindows();
        let key = data.key;
        for (let i = windows.length - 1; i >= 0; i--) {
            let window = windows[i];
            if (window.key != key) {
                /**
                 * 前置条件检查，是否允许删除
                 */
                if (this.props.shouldWindowRemove && this.props.shouldWindowRemove(window.key, window.state) == false) {
                    return false;
                }
                this.lib.removeWindow(window.key);
            }
        }
        this.lib.saveSession();
        if (this.state.currentKey != key) {
            this.lib.switchWindow(key);
        }
        this.forceUpdate();
    };

    /**
     * 切换窗口
     * @param window
     * @returns {Function}
     */
    handleClick = (window) => (event) => {
        if (this.state.currentKey != window.key) {
            this.state.currentKey = window.key;
            this.props.context.showMasker();
            this.forceUpdate();
            setTimeout(() => {
                this.lib.switchWindow(window.key);
            }, 50);
        }
    };

    render() {
        let width = 98 / this.lib.getWindowsNumber();
        let windows = this.lib.getWindows();
        return <div className="windows">
            {windows.map((window, index) => {
                return <div key={index}
                            className={`window-tab flex middle ${window.key == this.state.currentKey ? 'active text-primary' : ''}`}
                            style={{width: width + '%'}}>
                    <div className="label" onClick={this.handleClick(window)} title={window.state.title}>
                        <ContextMenuTrigger id="contextMenu" ref="contextMenuTrigger" collect={() => {
                            return window;
                        }}>
                            {window.state.title}
                        </ContextMenuTrigger>
                    </div>
                    {
                        windows.length > 1 ?
                            <div className="window-close" onClick={this.removeWindow.bind(this, window.key)}>
                                <i className="iconfont icon-reject"/>
                            </div> : null
                    }
                </div>
            })}
            <ContextMenu id="contextMenu"
                         ref="contextMenu"
                         style={{background: '#fff', boxShadow: '0 0 6px #888', padding: '6px 0', zIndex: 2}}>
                <MenuItem onClick={this.removeOtherWindows}>关闭其他窗口</MenuItem>
            </ContextMenu>
        </div>
    }
}

export default class Windows extends Component {

    static defaultProps = {
        maxTabs: 8
    };

    static childContextTypes = {
        window: PropTypes.object,
    };

    getChildContext() {
        return {
            window: this.lib
        }
    }

    constructor(props) {
        super(props);
        this.sessionKey = 'windows.' + props.group;
        this.lib = App.lib(this.sessionKey);
        this.lib.setComponent(this);
        this.componentInit(props);
    }

    componentWillReceiveProps(nextProps) {
        this.componentInit(nextProps);
    }

    componentDidUpdate() {
        this.hideMasker();
    }

    componentInit(props) {
        let currentUrl = props.location.pathname + props.location.search;
        let key = currentUrl;
        let currentWindow = this.lib.getWindow(key);
        if (currentWindow) {
            currentWindow.url = currentUrl;
            this.lib.setCurrentKey(key);
        } else {
            currentWindow = {
                key: currentUrl,
                url: currentUrl,
                state: {
                    title: this.lib.getTitle(props.location.pathname.replace(App.request.getRoot(), ''), currentUrl.replace(App.request.getRoot(), ''))
                }
            };
            this.lib.addWindow(currentWindow);
        }
        this.lib.setCurrentKey(key);
    }

    removeWindow = (key = this.lib.getCurrentKey()) => {
        this.refs.tabs.removeWindow(key);
    };

    showMasker = () => {
        this.hasMasker = true;
        $(this.refs.masker).show();
    };

    hideMasker = () => {
        this.hasMasker = false;
        $(this.refs.masker).hide();
    };

    render() {
        return <Container fullScreen direction="column">
            <WindowTabs context={this} ref="tabs" {...this.props} currentKey={this.lib.getCurrentKey()}/>
            <Content className="space" style={{height: 0}}>
                <div ref="masker" className="masker hidden" style={{zIndex: 10}}>
                    <div className="position-center">
                        <Refresh size={50}
                                 left={-25}
                                 top={-25}
                                 loadingColor="#fff"
                                 style={{backgroundColor: 'transparent', boxShadow: 'none'}}
                        />
                    </div>
                </div>
                {this.props.children}
            </Content>
        </Container>
    }

}