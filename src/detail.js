import React, {Component} from 'react';
import utils from './utils';

export default class Detail extends Component {

    static defaultProps = {
        data: {},
        cols: 2,
        fields: []
    };

    renderFields(fields) {
        return fields.map((field, index) => {
            if (field.type === 'group') {
                return <div className="col col-full" key={index}>
                    <div className="text-bold" style={{fontSize: 16, marginTop: 16}}>{field.label}</div>
                    <div className="row" cols={field.cols || this.props.cols}>
                        {this.renderFields(field.fields || [])}
                    </div>
                </div>
            } else {
                let text = utils.render(this.props.data, field);
                return <div key={index} className={`col col-${field.cols || 1}`} style={{marginTop: 12, marginBottom: 8}}>
                    <div className="text-muted text-small" style={{marginBottom: 6}}>{field.label}</div>
                    <div className={"text-normal"}
                         style={{minHeight: 20}}>{field.render ? field.render(this.props.data) : (text === '' || text === undefined || text === null ? '-' : text)} </div>
                </div>
            }
        })
    }

    render() {
        return <div className="row" cols={this.props.cols}>
            {this.renderFields(this.props.fields)}
        </div>
    }

}