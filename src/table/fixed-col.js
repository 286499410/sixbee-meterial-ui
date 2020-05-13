import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TableHeader from "./header";
import TableBody from "./body";

export default class FixedCol extends Component {

    static contextTypes = {
        state: PropTypes.object,
        props: PropTypes.object,
        setTableState: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    getWidth() {
        let state = this.context.state;
        let props = this.context.props;
        let width = 0;
        if (props.fixedCheckbox && this.props.position == 'left') {
            width += props.checkboxColumnWidth;
        }
        if (this.props.columns) {
            this.props.columns.map(columnKey => {
                width += state.columnWidths[columnKey];
            })
        }
        return width;
    }

    render() {
        let state = this.context.state;
        let props = this.context.props;
        let width = this.getWidth();
        let style = {
            position: 'absolute',
            top: 0,
            zIndex: 3,
            width: width - 1,
            backgroundColor: '#fff',
            overflow: 'hidden',
            // maxHeight: state.headerHeight + state.bodyHeight,
            // height: state.headerHeight + state.dataSource.length * props.bodyRowHeight,
            // overflow: 'hidden'
        };
        if (this.props.position == 'right') {
            style.width--;
            style.right = 0;
            if (state.scrollLeft < state.tableWidth - state.containerWidth - 1) {
                style.boxShadow = '-6px 0 6px rgba(0,0,0,0.1)';
            }
        } else {
            style.left = 0;
            style.width--;
            if (state.scrollLeft && state.scrollLeft > 0) {
                style.boxShadow = '6px 0 6px rgba(0,0,0,0.1)';
            }
        }
        if (state.containerWidth > state.tableWidth) {
            return null;
        }
        if (state.dataSource.length == 0) {
            return null;
        }
        return <div style={style}>
            <TableHeader
                ref="header"
                width={width}
                showColumns={this.props.columns}
                showCheckboxes={this.props.position == 'left'}
                showSeries={this.props.position == 'left'}
            />
            <div style={{marginTop: -2}}>
                <TableBody
                    ref="body"
                    hasScrollbar={false}
                    hasEmptyTip={false}
                    hasLoading={false}
                    width={width}
                    height={20}
                    showColumns={this.props.columns}
                    showCheckboxes={this.props.position == 'left'}
                    showSeries={this.props.position == 'left'}
                />
            </div>
        </div>
    }
}