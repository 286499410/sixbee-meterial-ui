import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import ContextMenu from './context-menu';

let {Container, Content} = Layout;

export default class Windows extends Component {

    static defaultProps = {
        maxTabs: 8,
        pages: [
            //示例
            // {url: '/finance/voucher', title: '凭证列表', state: {}},
            // {url: '/finance/voucher/add', title: '录凭证', state: {}}
        ],
        shouldWindowRemove: undefined,      //是否关闭窗口，函数，return false时不关闭
        onChange: undefined,                //当前页面改变
        track: [],                          //足迹
        history: undefined,                 //
        onRequestClose: undefined,          //窗口关闭后的触发事件
        contentClassName: undefined
    };

    static childContextTypes = {
        window: PropTypes.object
    };

    state = {
        pages: [],
        track: []
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        this.state.pages = props.pages || [];
        this.state.track = props.track || [];
        let currentUrl = this.getCurrentUrl();
        let currentPage = _.find(this.state.pages, {url: currentUrl});
        if (!currentPage) {
            this.addPage({
                url: currentUrl,
                title: window.document.title,
                state: {}
            });
        }
        this.addTrack(currentUrl);
    }

    /**
     * 当前URL
     * @returns {string}
     */
    getCurrentUrl() {
        return window.location.pathname + window.location.search;
    }

    getChildContext() {
        return {
            window: this
        }
    }

    /**
     * 新增Page
     * @param page
     */
    addPage(page) {
        this.state.pages.push(page);
    }

    /**
     * 添加浏览足迹
     * @param page
     */
    addTrack(url) {
        _.remove(this.state.track, (n) => {
            return n == url;
        });
        this.state.track.push(url);
        this.handleChange();
    }

    handleChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state);
        }
    }

    /**
     * 选择窗口
     * @param page
     */
    handleClick = (page) => (event) => {
        if (page && this.getCurrentUrl() !== page.url) {
            this.addTrack(page.url);
            this.props.history.replace(page.url);
        }
    };

    /**
     * 关闭窗口
     * @param key
     */
    closeWindow = (page = {url: this.getCurrentUrl()}, handleChange = true) => {
        if (_.isFunction(this.props.shouldWindowRemove) && this.props.shouldWindowRemove(page) === false) {
            return false;
        }
        _.remove(this.state.pages, (n) => {
            return n.url == page.url;
        });
        _.remove(this.state.track, (n) => {
            return n == page.url;
        });
        if (page.url == this.getCurrentUrl()) {
            //关闭的当前窗口
            this.handleClick(_.find(this.state.pages, {url: _.last(this.state.track)}))(event);
        }
        if(this.props.onRequestClose) {
            this.props.onRequestClose(page);
        }
        if (handleChange)
            this.handleChange();
        if(this.refs.tabs) {
            this.refs.tabs.forceUpdate();
        }
        return true;
    };

    /**
     * 关闭其他窗口
     */
    closeOtherWindow = (currentPage = {url: this.getCurrentUrl()}) => {
        let pages = _.cloneDeep(this.state.pages);
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            if (currentPage.url !== page.url) {
                if (this.closeWindow(page, false) === false) {
                    this.handleChange();
                    return false;
                }
            }
        }
        this.handleChange();
        return true;
    };

    render() {
        return <Container direction="column" style={{flexGrow: 1}}>
            <WindowTabs
                ref={"tabs"}
                currentUrl={this.getCurrentUrl()}
                pages={this.state.pages}
                closeWindow={this.closeWindow}
                closeOtherWindow={this.closeOtherWindow}
                handleClick={this.handleClick}
            />
            <Content className={this.props.contentClassName} style={{height: 0}}>
                {this.props.children}
            </Content>
        </Container>
    }

}

class WindowTabs extends Component {

    static defaultProps = {
        pages: [],
        currentUrl: undefined
    };

    state = {
        left: 20
    };

    handleClickLeftArrow = (event) => {
        this.state.left += 100;
        this.state.left = Math.min(this.state.left, 20);
        this.forceUpdate();
    };

    handleClickRightArrow = (event) => {
        let containerWidth = this.refs.container.clientWidth;
        let contentWidth = this.refs.content.clientWidth;
        if(contentWidth > containerWidth) {
            this.state.left -= 100;
            this.state.left = Math.max(this.state.left, -(contentWidth - containerWidth + 20));
            this.forceUpdate();
        }
    };

    render() {
        return <div ref="container" className="windows">
            <div ref="content" className="window-content" style={{
                left: this.state.left
            }}>
                {
                    this.props.pages.map((page, index) => {
                        return (
                            <div key={index} className={'window-tab flex middle' + (page.url == this.props.currentUrl ? ' active text-primary' : '')}>
                                <ContextMenu style={{width: '100%'}} dataSource={[
                                    {label: '关闭其他窗口', onClick: this.props.closeOtherWindow.bind(this, page)}
                                ]}>
                                    <div className="label" onClick={this.props.handleClick(page)}
                                         title={page.title}>{page.title}</div>
                                </ContextMenu>
                                {
                                    this.props.pages.length > 1 ?
                                        <div className="window-close" onMouseOver={(event) => {
                                            let target = event.target;
                                            if (target.tagName == 'I') {
                                                target = target.parentNode;
                                            }
                                            target.style.background = 'rgba(0,0,0,0.2)';
                                        }} onMouseOut={(event) => {
                                            let target = event.target;
                                            if (target.tagName == 'I') {
                                                target = target.parentNode;
                                            }
                                            target.style.background = 'none';
                                        }}
                                             onClick={this.props.closeWindow.bind(this, page)}>
                                            <i className="iconfont icon-close" style={{fontSize: 12}}/>
                                        </div> : null
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="left-arrow" onClick={this.handleClickLeftArrow}>
                <i className="iconfont icon-left"></i>
            </div>
            <div className="right-arrow" onClick={this.handleClickRightArrow}>
                <i className="iconfont icon-right"></i>
            </div>
        </div>
    }

}