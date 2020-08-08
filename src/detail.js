import React, {Component} from 'react';
import utils from './utils';

export default class Detail extends Component {

    static defaultProps = {
        data: {},
        cols: 2,
        fields: [],
        labelWidth: 90
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
                let value = field.render ? field.render(this.props.data) : (text === '' || text === undefined || text === null ? '-' : text);
                return <div key={index} className={`col col-${field.cols || 1}`}
                            style={{marginTop: 12, marginBottom: 8}}>
                    {
                        field.inline === true ? <div className="flex middle">
                            <div className="text-muted"
                                 style={{width: field.labelWidth || this.props.labelWidth}}>{field.label}</div>
                            <div className={"text-normal"} style={{flowGrow: 1}}>{value}</div>
                        </div> : <div>
                            <div className="text-muted text-small" style={{marginBottom: 6}}>{field.label}</div>
                            <div className={"text-normal" + (field.onClick ? ' text-primary cursor-pointer' : '')}
                                 style={{minHeight: 20}}
                                 onClick={field.onClick ? field.onClick.bind(this, this.props.data) : undefined}>{value}</div>
                        </div>
                    }
                </div>
            }
        });
    }

    render() {
        return <div className="row" cols={this.props.cols}>
            {this.renderFields(this.props.fields)}
        </div>
    }

}