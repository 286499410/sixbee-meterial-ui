/**
 * Created by jason on 2017/9/26.
 */
import React, {Component} from 'react';
import Icon from '../icon';
import _ from 'lodash';

export default class Image extends Component {

    static defaultProps = {
        documentRoot: '',
        width: 100,
        height: 100,
        accept: '.jpg,.jpeg,.png,.gif',
    };

    state = {
        file: [],
        value: undefined,
        imageStyle: {}
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    initData(props) {
        if (props.value !== undefined) {
            if (_.isString(props.value)) {
                this.state.value = props.value;
            } else if (_.isObject(props.value)) {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(props.value);
                fileReader.onload = () => {
                    this.setState({value: fileReader.result});
                };
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    isBase64OrUrl(str) {
        return _.isString(str) ? str.substr(0, 4) === 'http' || str.substr(0, 10) === 'data:image' : false;
    }

    /**
     * 获取文件扩展名
     * @param name
     * @returns {string}
     */
    getFileExtName(name = this.state.file.name) {
        return name.substring(name.lastIndexOf(".") + 1, name.length);
    }

    handleChange = (event) => {
        let file = this.refs.file.files[0];
        let extName = this.getFileExtName(file.name);
        if (this.props.accept && this.props.accept.indexOf('.' + extName) == -1) {
            if (this.props.onError) {
                this.props.onError('请选择正确的文件类型：' + this.props.accept);
            }
            return false;
        }

        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            this.setState({value: fileReader.result});
        };

        this.setState({file: file});
        if (this.props.onChange) {
            this.props.onChange(file, this);
        }
    };

    render() {
        let min = Math.min(this.props.width, this.props.height);
        return <div style={{marginBottom: 6, marginTop: 6}}>
            {this.props.label ? <div style={{
                transform: 'scale(0.75)',
                transformOrigin: 'left top 0px',
                color: 'rgba(0,0,0,0.3)',
                fontSize: 15,
                marginBottom: 4,
                marginTop: 12,
                display: 'inline-block',
            }}>{this.props.label}</div> : null}
            <div className="relative hover" style={{
                width: this.props.width,
                height: this.props.height,
                border: '1px dashed rgba(0,0,0,0.3)',
                borderRadius: 10,
                overflow: 'hidden', ...this.props.style
            }}>
                {
                    this.state.value ? <div className="hover-show" style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.3)',
                        width: '100%'
                    }}>
                        <div className="flex center middle" style={{height: '100%', color: '#fff'}}>点击选择</div>
                    </div> : null
                }
                <div className="flex center middle" style={{height: '100%'}}>
                    {this.state.value ?
                        <img ref="img" style={this.state.imageStyle}
                             src={this.isBase64OrUrl(this.state.value) ? this.state.value : this.props.documentRoot + this.state.value}
                             onLoad={() => {
                                 let width = this.refs.img.clientWidth;
                                 let height = this.refs.img.clientHeight;
                                 let radio = height / width;
                                 let propsRadio = this.props.height / this.props.width;
                                 if(radio >= propsRadio) {
                                     this.setState({imageStyle: {width: '100%'}});
                                 } else if(radio < propsRadio) {
                                     this.setState({imageStyle: {height: '100%'}});
                                 }
                             }}/> : <Icon name="plus" size={min / 2} color={"rgba(0,0,0,0.3)"}/>}
                </div>
                <input key="file"
                       ref="file"
                       type="file"
                       style={{
                           width: '100%',
                           position: 'absolute',
                           left: 0,
                           right: 0,
                           top: 0,
                           bottom: 0,
                           opacity: 0,
                           zIndex: 1,
                           cursor: 'pointer'
                       }}
                       accept={this.props.accept}
                       onChange={this.handleChange}/>
            </div>
        </div>
    }
}
