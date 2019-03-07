import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Page from '../page';

/**
 * 分页器
 */
export default class Pager extends Component {

    static contextTypes = {
        Table: PropTypes.object,
        state: PropTypes.object,
        props: PropTypes.object,
        setTableState: PropTypes.func,
        handleStateChange: PropTypes.func,
        getDataRows: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        let props = Object.assign({}, _.isFunction(this.context.props.pager) ? this.context.props.pager(this.context.Table) : this.context.props.pager);
        return <div className={`table-pager clearfix ${this.context.props.bordered ? 'bordered' : ''}`}>
            <div className="pull-right" style={{marginRight: 12}}>
                <Page {...props} onChange={(data) => {
                    this.context.Table.state.scrollTop = 0;
                    this.context.Table.state.checked = {};
                    this.context.Table.handleStateChange();
                    this.context.Table.forceUpdate();
                    props.onChange(data);
                }}/>
            </div>
        </div>
    }
}