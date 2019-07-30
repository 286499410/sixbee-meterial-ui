import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import _ from 'lodash';

export default class Sort extends Component {

    static contextTypes = {
        Table: PropTypes.object,
        state: PropTypes.object,
        props: PropTypes.object
    };

    static defaultProps = {
        field: {},
        unCheckedColor: '#bfbfbf',
        checkedColor: '#28a7e1',
        onSort: undefined
    };

    constructor(props) {
        super(props);
    }

    isCurrent(direction) {
        let state = this.context.state;
        let sortData = {
            key: _.get(state.sortData.field, 'key'),
            dataKey: _.get(state.sortData.field, 'dataKey'),
            direction: _.get(state.sortData, 'direction')
        };
        return _.isEqual({
            key: this.props.field.key,
            dataKey: this.props.field.dataKey,
            direction: direction
        }, sortData);
    }

    handleClick = (direction) => (event) => {
        if(this.isCurrent(direction)) {
            //取消选中状态
            direction = undefined;
        }
        if (this.props.onSort) {
            this.props.onSort(direction, this.props.field);
        }
    };

    render() {
        return <div style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1,
            paddingLeft: 2,
            paddingRight: 2,
            marginTop: -2
        }}>
            <div className="cursor-pointer" style={{width: 12, height: 12, paddingTop: 4}}
                 onClick={this.handleClick('asc')}>
                <Icon name="caret-up"
                      style={{position: 'relative', bottom: 1}}
                      color={this.isCurrent('asc') ? this.props.checkedColor : this.props.unCheckedColor} size={12}/>
            </div>
            <div className="cursor-pointer" style={{width: 12, height: 12, paddingBottom: 4}}
                 onClick={this.handleClick('desc')}>
                <Icon name="caret-down"
                      style={{position: 'relative', top: -1}}
                      color={this.isCurrent('desc') ? this.props.checkedColor : this.props.unCheckedColor} size={12}/>
            </div>
        </div>
    }

}