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
        const {Table} = this.context;
        let props = Object.assign({}, _.isFunction(Table.props.pager) ? Table.props.pager(Table) : Table.props.pager);
        return <div className={`table-pager clearfix ${Table.props.bordered ? 'bordered' : ''}`}>
            <div className="pull-right" style={{marginRight: 12}}>
                <Page {...props} onChange={(data) => {
                    Table.handleStateChange({
                        scrollTop: 0,
                        checked: {}
                    });
                    Table.forceUpdate();
                    props.onChange(data);
                }}/>
            </div>
        </div>
    }
}