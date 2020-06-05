import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {TableBodyColGroup} from './body';
import _ from 'lodash';

export default class Footer extends Component {

    static contextTypes = {
        state: PropTypes.object,
        props: PropTypes.object,
        setTableState: PropTypes.func
    };

    render() {
        let props = this.context.props;
        let state = this.context.state;
        return <div ref="container"
                    className="table-footer"
                    style={{overflow: 'hidden', width: state.containerWidth + 2}}>
            <table className={`table ${props.bordered ? 'bordered' : ''} ${props.condensed ? 'condensed' : ''}`}
                   style={{width: state.tableWidth || '100%'}}>
                <TableBodyColGroup showCheckboxes={props.showCheckboxes} showSeries={props.showSeries}/>
                <tbody>
                {
                    props.footerData.map((row, i) => {
                        return <tr key={i}>
                            {row.map((col, j) => {
                                return _.isString(col) || col === null ? <td key={j}>{col}</td> : <td key={j} colSpan={col.colSpan || 1} rowSpan={col.rowSpan || 1}
                                           style={{textAlign: col.textAlign || 'left', ...col.style}}>{col.content}</td>
                            })}
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    }

}