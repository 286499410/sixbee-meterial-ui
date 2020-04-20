/**
 * Created by jason on 2017/7/18.
 */
import React, {Component} from 'react';
import Icon from './icon';

export default class Page extends Component {

    static defaultProps = {
        eachPageRows: [10, 20, 50, 100, 200, 500, 1000],
        page: 1,
        limit: 20,
        pages: 1,
        rows: 0,
        onChange: undefined
    };

    state = {
        value: undefined,
        page: undefined,
        limit: undefined
    };

    constructor(props = {}) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (props.page !== undefined) {
            this.state.page = props.page;
        }
        if (props.limit !== undefined) {
            this.state.limit = props.limit;
        }
    }

    handleChange = (page, limit) => {
        page = parseInt(page || this.getPage());
        limit = parseInt(limit || this.getLimit());
        if (page > 0 && page <= this.props.pages) {
            this.setState({value: page, page: page, limit: limit});
            if (this.props.onChange) {
                this.props.onChange({
                    page: page,
                    limit: limit
                });
            }
        }
    };

    getPage() {
        return parseInt(this.state.page || this.props.page);
    }

    getLimit() {
        return parseInt(this.state.limit || this.props.limit);
    }

    /**
     * 下一页
     */
    nextPage = () => {
        this.handleChange(this.getPage() + 1);
    };

    /**
     * 上一页
     */
    prevPage = () => {
        this.handleChange(this.getPage() - 1);
    };

    /**
     * 首页
     */
    firstPage = () => {
        this.handleChange(1);
    };

    /**
     * 最后一页
     */
    lastPage = () => {
        this.handleChange(this.props.pages);
    };

    /**
     * 修改每页条数
     * @param event
     */
    handleSelectChange = (event) => {
        let value = event.target.value;
        this.handleChange(1, value);
    };

    /**
     * 输入页数，失去焦点触发
     * @param event
     */
    handleBlur = (event) => {
        let value = event.target.value;
        if (value != this.state.page) {
            this.handleChange(value);
        }
    };

    handleInputChange = (event) => {
        let value = event.target.value;
        this.setState({value: value});
    };

    render() {
        let page = this.getPage();
        let limit = this.getLimit();
        let value = this.state.value || page;
        return (
            <div className="page">
                <Icon type="button"
                      name="doubleleft"
                      disabled={page == 1}
                      onClick={this.firstPage}
                      title="首页"/>
                <Icon type="button"
                      name="left"
                      disabled={page == 1}
                      onClick={this.prevPage}
                      title="上一页"/>
                <span>
                    <input value={value}
                           onBlur={this.handleBlur}
                           onChange={this.handleInputChange}/>
                    &nbsp;页 / {this.props.pages}页
                </span>
                <Icon type="button"
                      name="right"
                      disabled={page == this.props.pages}
                      onClick={this.nextPage}
                      title="下一页"/>
                <Icon type="button"
                      name="doubleright"
                      disabled={page == this.props.pages}
                      onClick={this.lastPage}
                      title="尾页"/>
                <span>&nbsp;每页显示&nbsp;</span>
                <select onChange={this.handleSelectChange} defaultValue={limit}>
                    {this.props.eachPageRows.map((limit, key) => {
                        return <option key={key} value={limit}>{limit}</option>
                    })}
                </select>
                <span>&nbsp;行</span>
                <span>&nbsp;共{this.props.rows}条记录</span>
            </div>
        )
    }
}
