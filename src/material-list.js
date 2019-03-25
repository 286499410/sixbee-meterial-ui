/**
 * Created by zhengzhaowei on 2018/5/22.
 */
import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';

export default class MaterialList extends Component {

    static defaultProps = {
        dataSource: []
    };

    render() {
        return <List>
            {
                this.props.dataSource.map((data, index) => {
                    return <ListItem style={{fontSize: 14}} innerDivStyle={{padding: 12}} key={index} primaryText={data.label} leftIcon={data.icon} onClick={data.onClick}/>
                })
            }
        </List>
    }

}